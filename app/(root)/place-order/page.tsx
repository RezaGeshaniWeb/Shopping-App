import { redirect } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { auth } from "@/auth"
import { getMyCart } from "@/lib/actions/cart.actions"
import { getUserById } from "@/lib/actions/user.actions"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import CheckoutSteps from "@/components/shared/CheckoutSteps"
import { type ShippingAddress } from "@/types"

export default async function PlaceOrderPage() {
    const cart = await getMyCart()
    const session = await auth()
    const userId = session?.user?.id
    if (!userId) throw new Error('user not found')
    const user = await getUserById(userId)
    if (!cart || cart.items.length === 0) redirect('/cart')
    const userAddress = user?.address as ShippingAddress

    return (
        <>
            <CheckoutSteps current={3} />
        </>
    )
}
