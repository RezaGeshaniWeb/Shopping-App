import ProductList from "@/components/shared/product/ProductList";
import data from "@/data/products";

export default function Home() {
  return (
    <>
      <ProductList title="محصولات" data={data.products} />
    </>
  );
}
