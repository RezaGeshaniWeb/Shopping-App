import { getMyCart } from "@/lib/actions/cart.actions"
import CartTable from "./CartTable"

export default async function CartPage() {
    const cart = await getMyCart()

    return (
        <div>
            <CartTable cart={cart} />
        </div>
    )
}
