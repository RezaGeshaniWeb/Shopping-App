import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { getProductBySlug } from "@/lib/actions/product.actions"
import Image from "next/image"
import { notFound } from "next/navigation"

export default async function ProductPage(props: { params: Promise<{ slug: string }> }) {
    const { slug } = await props.params
    const product = await getProductBySlug(slug)

    if (!product) notFound()

    return (
        <>
            <section>
                <div className="grid grid-cols-5">
                    <div className="col-span-2">
                        <Image src={product.image} className="min-h-75 rounded-2xl object-cover object-center" alt={product.name} width={1000} height={1000} />
                    </div>
                    <div className="col-span-2 p-5">
                        <div className="flex flex-col gap-6">
                            <p>
                                {product.brand} {product.category}
                            </p>
                            <h1 className="font-bold text-2xl">{product.name}</h1>
                            <div className="flex flex-col gap-3">
                                <p>{product.price} تومان</p>
                            </div>
                        </div>
                        <div className="mt-10">
                            <p className="font-semibold">توضیح محصول</p>
                            <p>{product.description}</p>
                        </div>
                    </div>
                    <div>
                        <Card>
                            <CardContent className="p-4">
                                <div className="flex justify-between">
                                    <div>قیمت</div>
                                    <div>{product.price} تومان</div>
                                </div>
                                <div className="my-4 flex justify-between">
                                    <div>وضعیت</div>
                                    {product.price > 0 ? (
                                        <Badge variant={"outline"}>موجود</Badge>
                                    ) : <Badge variant={"destructive"}>ناموجود</Badge>}
                                </div>
                                {product.stock > 0 && (
                                    <div className="flex items-center">
                                        <Button className="w-full">افزودن به سبد خرید</Button>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>
        </>
    )
}
