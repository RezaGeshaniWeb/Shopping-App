import { auth } from "@/auth"
import { getMyCart } from "@/lib/actions/cart.actions"
import { getUserById } from "@/lib/actions/user.actions"
import { redirect } from "next/navigation"
import ShippingForm from "./ShippingForm"
import { type ShippingAddress } from "@/types"
import CheckoutSteps from "@/components/shared/CheckoutSteps"

export default async function ShippingPage() {
    const cart = await getMyCart()
    if (!cart || cart.items.length === 0) redirect('/cart')
    const session = await auth()
    const userId = session?.user?.id
    if (!userId) throw new Error('no user id')
    const user = await getUserById(userId)

    return (
        <div>
            <CheckoutSteps current={1} />
            <ShippingForm address={user?.address as ShippingAddress} />
        </div>
    )
}
