'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { addItemToCart, removeItemFromCart } from "@/lib/actions/cart.actions"
import { type Cart } from "@/types"
import { Minus, Plus } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
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
                    <div className="overflow-x-auto col-span-3">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="text-right">محصول</TableHead>
                                    <TableHead className="text-right">تعداد</TableHead>
                                    <TableHead className="text-right">قیمت</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {cart.items.map((item) => (
                                    <TableRow key={item.slug}>
                                        <TableCell>
                                            <Link href={`/product/${item.slug}`}>
                                                <Image src={item.image} alt={item.name} width={50} height={50} />
                                                <span className="px-2">{item.name}</span>
                                            </Link>
                                        </TableCell>
                                        <TableCell className="flex items-center gap-2">
                                            <Button variant={"outline"} type="button" onClick={async () => {
                                                const response = await removeItemFromCart(item.productId)
                                            }}>
                                                <Minus className="w-4 h-4" />
                                                <span>{item.qty}</span>
                                            </Button>
                                            <Button variant={"outline"} type="button" onClick={async () => {
                                                const response = await addItemToCart(item)
                                            }}>
                                                <Plus className="w-4 h-4" />
                                                <span>{item.qty}</span>
                                            </Button>
                                        </TableCell>
                                        <TableCell className="text-right">{item.price}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                    <Card>
                        <CardContent className="p-4 gap-4">
                            <div className="pb-3 text-xl">
                                مجموع قیمت: <span className="font-bold">{cart.itemsPrice}</span>
                            </div>
                            <Button className="w-full" onClick={() => router.push(`/shipping`)}>تسویه حساب</Button>
                        </CardContent>
                    </Card>
                </div>
            )}
        </>
    )
}
