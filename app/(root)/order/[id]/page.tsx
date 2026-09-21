import { notFound } from "next/navigation"
import { getOrderById } from "@/lib/actions/order.actions"

export default async function orderDetailsPage(props: { params: Promise<{ id: string }> }) {
    const { id } = await props.params
    const order = await getOrderById(id)
    if (!order) notFound()

    return (
        <div>
            {order.totalPrice}
        </div>
    )
}
