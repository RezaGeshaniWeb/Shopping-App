'use client'

import { Button } from "@/components/ui/button"
import { addItemToCart, removeItemFromCart } from "@/lib/actions/cart.actions"
import { Cart, CartItem } from "@/types"
import { Minus, Plus } from "lucide-react";

export default function AddToCart({ cart, item }: { cart?: Cart; item: CartItem }) {
    async function handleAddToCart() {
        await addItemToCart(item)
    }

    async function handleRemoveFromCart() {
        await removeItemFromCart(item.productId)
    }

    const existItem = cart && cart.items.find((p) => p.productId === item.productId)

    return existItem ? (
        <div>
            <Button type="button" variant={"outline"} onClick={handleRemoveFromCart}>
                <Minus className="w-4 h-4" />
            </Button>
            <span className="px-2">{existItem.qty}</span>
            <Button type="button" variant={"outline"} onClick={handleAddToCart}>
                <Plus className="w-4 h-4" />
            </Button>
        </div>
    ) : (
        <Button className="w-full" type="button" onClick={handleAddToCart}>افزودن به سبد خرید</Button>
    )
}
