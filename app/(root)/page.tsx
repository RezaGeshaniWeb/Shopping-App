import ProductList from "@/components/shared/product/ProductList";
import { getLatestProducts } from "@/lib/actions/product.actions";

export default async function Home() {
  const latestProducts = await getLatestProducts()

  return (
    <>
      <ProductList title="محصولات" data={latestProducts} limit={4} />
    </>
  );
}
