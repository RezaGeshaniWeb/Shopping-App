'use server'

import { auth } from "@/auth";
import { CartItem } from "@/types";
import { cookies } from "next/headers";
import { prisma } from "../prisma";
import { cartItemSchema } from "../validators";
import { revalidatePath } from "next/cache";

export async function addItemToCart(data: CartItem) {
    try {
        const sessionCartId = (await cookies()).get('sessionCartId')?.value
        if (!sessionCartId) throw new Error('Session not found.')
        const session = await auth()
        const userId = session?.user?.id ? (session.user.id as string) : undefined
        const cart = await getMyCart()
        const item = cartItemSchema.parse(data)
        const product = await prisma.product.findFirst({
            where: { id: item.productId }
        })
        if (!product) throw new Error('product not found.')
        if (!cart) {
            const newCart = {
                userId,
                items: [item],
                sessionCartId,
                ...calcPrice([item]),
            }
            await prisma.cart.create({ data: newCart })
            revalidatePath(`/product/${product.slug}`)
            return {
                success: true,
                message: 'محصول به سبد خرید اضافه شد',
            }
        } else {
            const existItem = (cart.items as CartItem[]).find((p) => p.productId === item.productId)
            if (existItem) {
                if (product.stock < existItem.qty + 1) {
                    throw new Error('محصول موجود نیست')
                }

                (cart.items as CartItem[]).find((p) => p.productId === item.productId)!.qty = existItem.qty + 1
            } else {
                if (product.stock < 1) throw new Error('محصول موجود نیست')
                cart.items.push(item)
            }

            await prisma.cart.update({
                where: { id: cart.id },
                data: {
                    items: cart.items,
                    ...calcPrice(cart.items as CartItem[])
                }
            })

            revalidatePath(`/product/${product.slug}`)
        }
    } catch (error) {
        return {
            success: false,
            message: error,
        }
    }
}

export async function getMyCart() {
    const sessionCartId = (await cookies()).get('sessionCartId')?.value
    if (!sessionCartId) throw new Error('Session not found.')
    const session = await auth()
    const userId = session?.user?.id ? (session.user.id as string) : undefined
    const cart = await prisma.cart.findFirst({
        where: userId ? { userId } : { sessionCartId }
    })
    if (!cart) return undefined

    return {
        ...cart,
        items: cart.items as CartItem[],
        itemsPrice: cart.itemsPrice.toString(),
        totalPrice: cart.totalPrice.toString(),
        shippingPrice: cart.shippingPrice.toString(),
    }
}

function calcPrice(items: CartItem[]) {
    const itemsPrice = items.reduce((acc, item) => acc + Number(item.price) * item.qty, 0)
    const shippingPrice = itemsPrice > 100 ? 0 : 100
    const totalPrice = itemsPrice + shippingPrice

    return {
        itemsPrice, shippingPrice, totalPrice
    }
}

export async function removeItemFromCart(productId: string) {
    try {
        const sessionCartId = (await cookies()).get('sessionCartId')?.value
        if (!sessionCartId) throw new Error('cart session not found')
        const product = await prisma.product.findFirst({
            where: { id: productId }
        })
        if (!product) throw new Error('product not found')
        const cart = await getMyCart()
        if (!cart) throw new Error('cart not found')
        const exist = (cart.items as CartItem[]).find((p) => p.productId === productId)
        if (!exist) throw new Error('item not found')
        if (exist.qty === 1) {
            cart.items = (cart.items as CartItem[]).filter((p) => p.productId !== exist.productId)
        } else {
            (cart.items as CartItem[]).find((p) => p.productId === productId)!.qty = exist.qty - 1
        }

        await prisma.cart.update({
            where: { id: cart.id },
            data: {
                items: cart.items,
                ...calcPrice(cart.items as CartItem[]),
            }
        })
        revalidatePath(`/product/${product.slug}`)

        return {
            success: true,
            message: 'محصول از سبد خرید حذف شد'
        }
    } catch (error) {
        return { success: false }
    }
}