import ProductCard from "./ProductCard"

export default function ProductList({ data, title, limit }: { data: any, title?: string, limit?: number }) {
    const limitedData = limit ? data.slice(0, limit) : data

    return (
        <div className="my-10">
            <h2 className="font-bold text-2xl mb-4">{title}</h2>
            {limitedData.length > 0 ? (
                <div className="grid grid-cols-4 gap-4">
                    {
                        limitedData.map((item: any) => (
                            <ProductCard key={item.slug} product={item} />
                        ))
                    }
                </div>
            ) : (
                <div>
                    <p>محصولی پیدا نشد.</p>
                </div>
            )}
        </div>
    )
}
