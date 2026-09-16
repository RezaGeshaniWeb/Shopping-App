'use server'

import { auth } from "@/auth";
import { CartItem } from "@/types";
import { cookies } from "next/headers";
import { prisma } from "../prisma";
import { cartItemSchema } from "../validators";

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

        return {
            success: true,
            message: 'محصول به سبد خرید اضافه شد',
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