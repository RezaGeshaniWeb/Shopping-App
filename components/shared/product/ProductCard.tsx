import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product }: { product: Product }) {
    return (
        <>
            <Card className="w-full max-w-sm">
                <CardHeader className="p-0 items-center">
                    <Link href={`/product/${product.slug}`}>
                        <Image src={product.image} alt={product.name} height={300} width={300} priority />
                    </Link>
                </CardHeader>
                <CardContent className="p-4 grid gap-4">
                    <div className="text-xs">{product.brand}</div>
                    <Link href={`/product/${product.slug}`}>
                        <h2 className="text-sm font-medium">{product.name}</h2>
                    </Link>
                    <div className="flex justify-between items-center gap-4">
                        {product.stock > 0 ? (
                            <p className="font-bold">{product.price}</p>
                        ) : (
                            <p>ناموجود</p>
                        )}
                    </div>
                </CardContent>
            </Card>
        </>
    )
}
