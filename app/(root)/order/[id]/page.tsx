import { notFound } from "next/navigation"
import { getOrderById } from "@/lib/actions/order.actions"
import OrderDetailsTable from "./OrderDetailsTable"
import { type ShippingAddress } from "@/types"

export default async function orderDetailsPage(props: { params: Promise<{ id: string }> }) {
    const { id } = await props.params
    const order = await getOrderById(id)
    if (!order) notFound()

    return (
        <OrderDetailsTable order={{
            ...order,
            itemsPrice: order.itemsPrice.toString(),
            shippingPrice: order.shippingPrice.toString(),
            totalPrice: order.totalPrice.toString(),
            orderItems: order.orderItems.map((item) => ({
                ...item,
                price: item.price
            })),
            user: {
                ...order.user,
                email: order.user.email || ''
            },
            shippingAddress: order.shippingAddress as ShippingAddress
        }} />
    )
}
