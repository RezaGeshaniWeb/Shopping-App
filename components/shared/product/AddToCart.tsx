'use client'

import { Button } from "@/components/ui/button"
import { CartItem } from "@/types"

export default function AddToCart({ item }: { item: CartItem }) {
    async function handleAddToCart() { }

    return (
        <Button className="w-full" type="button" onClick={handleAddToCart}>افزودن به سبد خرید</Button>
    )
}
