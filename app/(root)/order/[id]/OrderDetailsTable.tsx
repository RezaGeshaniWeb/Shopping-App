'use client'

import { type Order } from "@/types"
import { Card, CardContent } from "@/components/ui/card"
import { formatId } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

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
                    <Card className="my-2">
                        <CardContent className="p-4 gap-4">
                            <h2 className="text-xl pb-4">آدرس</h2>
                            <p>{shippingAddress.fullName}</p>
                            <p className="mb-2">
                                {shippingAddress.streetAddress},
                                {shippingAddress.city}{' '}
                                {shippingAddress.postalCode}
                            </p>
                            {isDeliverd ? (
                                <Badge variant={"secondary"}>
                                    دریافت شده در {formatDate(deliverdAt)}
                                </Badge>
                            ) : (
                                <Badge variant={"destructive"}>دریافت نشده</Badge>
                            )}
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
                                    {orderItems.map((item) => (
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
                                <div>{itemsPrice}</div>
                            </div>
                            <div className="flex justify-between">
                                <div>هزینه ارسال</div>
                                <div>{shippingPrice}</div>
                            </div>
                            <div className="flex justify-between">
                                <div>مجموع هزینه</div>
                                <div>{totalPrice}</div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    )
}
