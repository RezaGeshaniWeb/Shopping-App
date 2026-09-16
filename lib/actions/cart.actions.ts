'use server'

import { auth } from "@/auth";
import { CartItem } from "@/types";
import { cookies } from "next/headers";

export async function addItemToCart(data: CartItem) {
    try {
        const sessionCartId = (await cookies()).get('sessionCartId')?.value

        if (!sessionCartId) throw new Error('Session not found.')

        const session = await auth()

        const userId = session?.user?.id ? (session.user.id as string) : undefined

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