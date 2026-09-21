'use client'

import { type Order } from "@/types"
import { Card, CardContent } from "@/components/ui/card"
import { formatId } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

export default function OrderDetailsTable({ order }: { order: Order }) {
    const { id, shippingAddress, orderItems, itemsPrice, shippingPrice, totalPrice, paymentMethod, isDeliverd, isPaid, paidAt, deliverdAt } = order

    function formatDate(date: Date | null) {
        if (!date) return ''
        return new Date(date).toLocaleDateString('fa-IR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        })
    }

    return (
        <>
            <h1 className="py-4 text-2xl">سفارش: {formatId(id)}</h1>
            <div className="grid md:grid-cols-3 md:gap-5">
                <div className="col-span-2 space-y-4 overflow-x-auto">
                    <Card>
                        <CardContent className="p-4 gap-4">
                            <h2 className="text-xl pb-4">Payment Method</h2>
                            <p className="mb-2">{paymentMethod}</p>
                            {isPaid ? (
                                <Badge variant={"secondary"}>تاریخ پرداخت: {formatDate(paidAt)}</Badge>
                            ) : (
                                <Badge variant={"destructive"}>پرداخت نشده</Badge>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    )
}
