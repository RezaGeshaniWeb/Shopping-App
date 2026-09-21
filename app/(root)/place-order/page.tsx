import { redirect } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { auth } from "@/auth"
import { getMyCart } from "@/lib/actions/cart.actions"
import { getUserById } from "@/lib/actions/user.actions"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import CheckoutSteps from "@/components/shared/CheckoutSteps"
import { type ShippingAddress } from "@/types"
import PlaceOrderForm from "./PlaceOrderForm"

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
            <h1 className="py-4 text-2xl">ثبت سفارش</h1>
            <div className="grid grid-cols-3 gap-5">
                <div className="col-span-2 overflow-x-auto space-y-4">
                    <Card>
                        <CardContent className="p-4 gap-4">
                            <h2 className="text-xl pb-4">آدرس</h2>
                            <p>{userAddress?.fullName}</p>
                            <p>
                                {userAddress?.streetAddress}, {userAddress?.city}{' '}
                                {userAddress?.postalCode}
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4 gap-4">
                            <h2 className="text-xl pb-4">سفارش ها</h2>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="text-right">محصول</TableHead>
                                        <TableHead className="text-center">تعداد</TableHead>
                                        <TableHead className="text-left">قیمت</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {cart.items.map((item) => (
                                        <TableRow key={item.slug}>
                                            <TableCell className="text-right">
                                                <Link href={`/product/${item.slug}`} className="flex items-center gap-2">
                                                    <Image src={item.image} alt={item.name} width={50} height={50} className="rounded-md" />
                                                </Link>
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <span className="px-2">{item.qty}</span>
                                            </TableCell>
                                            <TableCell className="text-left">
                                                {item.price} تومان
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
                <div>
                    <Card>
                        <CardContent className="p-4 gap-4 space-y-4">
                            <div className="flex justify-between">
                                <div>قیمت محصولات</div>
                                <div>{cart.itemsPrice}</div>
                            </div>
                            <div className="flex justify-between">
                                <div>هزینه ارسال</div>
                                <div>{cart.shippingPrice}</div>
                            </div>
                            <div className="flex justify-between">
                                <div>مجموع هزینه</div>
                                <div>{cart.totalPrice}</div>
                            </div>
                            <PlaceOrderForm />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    )
}
