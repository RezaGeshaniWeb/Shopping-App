'use server'

import { auth } from "@/auth"
import { getMyCart } from "./cart.actions"
import { getUserById } from "./user.actions"
import { insertOrderSchema } from "../validators"
import { type CartItem } from "@/types"
import { prisma } from "../prisma"
import { convertToPlainObject } from "../utils"

export async function createOrder() {
    try {
        const session = await auth()
        if (!session) throw new Error('session not found')
        const cart = await getMyCart()
        const userId = session?.user?.id
        if (!userId) throw new Error('user not found')
        const user = await getUserById(userId)
        if (!cart || cart.items.length === 0) {
            return {
                success: false,
                message: 'Cart is empty',
                redirectTo: '/cart',
            }
        }

        const order = insertOrderSchema.parse({
            userId: user?.id,
            shippingAddress: user?.address,
            paymentMethod: user?.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            totalPrice: cart.totalPrice,
        })

        const insertedOrderId = await prisma.$transaction(async (tx) => {
            const insertedOrder = await tx.order.create({
                data: {
                    ...order,
                    itemsPrice: parseInt(order.itemsPrice),
                    shippingPrice: parseInt(order.shippingPrice),
                    totalPrice: parseInt(order.totalPrice),
                    paymentResult: {},
                    isDeliverd: false,
                    createdAt: new Date(),
                }
            })

            for (const item of cart.items as CartItem[]) {
                await tx.orderItem.create({
                    data: {
                        ...item,
                        price: item.price,
                        orderId: insertedOrder.id,
                    }
                })
            }

            await tx.cart.update({
                where: { id: cart.id },
                data: {
                    items: [],
                    totalPrice: 0,
                    shippingPrice: 0,
                    itemsPrice: 0,
                }
            })

            return insertedOrder.id
        })

        if (!insertedOrderId) throw new Error('order not created')

        return {
            success: true,
            message: 'order created',
            redirectTo: `/order/${insertedOrderId}`
        }
    } catch (error) {
        return {
            success: false,
            message: error
        }
    }
}

export async function getOrderById(orderId: string) {
    const data = await prisma.order.findFirst({
        where: {
            id: orderId
        },
        include: {
            orderItems: true,
            user: { select: { name: true, email: true } }
        }
    })

    return convertToPlainObject(data)
}