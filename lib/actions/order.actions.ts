'use server'

import { auth } from "@/auth"
import { getMyCart } from "./cart.actions"
import { getUserById } from "./user.actions"

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
                redirect: '/cart',
            }
        }
    } catch (error) {
        return {
            success: false,
            message: error
        }
    }
}