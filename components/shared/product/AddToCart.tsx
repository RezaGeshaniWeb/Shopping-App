'use client'

import { Button } from "@/components/ui/button"
import { addItemToCart } from "@/lib/actions/cart.actions"
import { CartItem } from "@/types"

export default function AddToCart({ item }: { item: CartItem }) {
    async function handleAddToCart() { 
        const response = await addItemToCart(item)
    }

    return (
        <Button className="w-full" type="button" onClick={handleAddToCart}>افزودن به سبد خرید</Button>
    )
}
