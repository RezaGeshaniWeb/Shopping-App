export default function ProductList({ data, title }: { data: any, title?: string }) {
    return (
        <div className="my-10">
            <h2 className="font-bold text-2xl mb-4">{title}</h2>
            {data.length > 0 ? (
                <div className="grid grid-cols-4 gap-4">
                    {
                        data.map((item: any) => (
                            <div key={item.slug}>
                                {item.name}
                            </div>
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
