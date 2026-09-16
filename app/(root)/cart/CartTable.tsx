'use client'

import { type Cart } from "@/types"
import { useRouter } from "next/navigation"

export default function CartTable({ cart }: { cart?: Cart }) {
    const router = useRouter()

    return (
        <>
            <h1 className="py-4 font-bold">سبد خرید</h1>
            {!cart || cart.items.length === 0 ? (
                <div>
                    سبد خرید خالی است
                </div>
            ) : (
                <div className="grid grid-cols-4 gap-5">
                    <div className="overflow-x-auto col-span-3">جدول</div>
                </div>
            )}
        </>
    )
}
