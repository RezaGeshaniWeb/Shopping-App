'use client'

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { createOrder } from "@/lib/actions/order.actions"

export default function PlaceOrderForm() {
    const router = useRouter()

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault()
        const response = await createOrder()
        if (response.redirectTo) {
            router.push(response.redirectTo)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="w-full">
            <Button className="w-full">ثبت سفارش</Button>
        </form>
    )
}
