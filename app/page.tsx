import {
  CustomFilter,
  CustomToggle,
  Hero,
  ProductCard,
  SearchBar,
  ShowMore,
} from "@/components";
import { priceRanges } from "@/constants";
import { fetchMilletProducts, fetchMillets } from "@/utils";
import { all } from "axios";
import Image from "next/image";

export default async function Home({ searchParams }: any) {
  const allMilletProductsDocuments = await fetchMilletProducts({
    type: searchParams.type,
    product: searchParams.product,
    gluten_free: searchParams.gluten_free || undefined,
    price: searchParams.price,
  });
  const allMilletProducts = allMilletProductsDocuments.documents;

  const isDataEmpty =
    !Array.isArray(allMilletProducts) ||
    allMilletProducts.length < 1 ||
    !allMilletProducts;

  return (
    <main className="overflow-hidden">
      <Hero />

      <div className="mt-12 padding-x padding-y max-width" id="products">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Product Catalogue</h1>
          <p>Explore all our products</p>
        </div>
        <div className="home__filters">
          <SearchBar />
          <div className="home__filter-container">
            <CustomToggle />
            <CustomFilter title="price" options={priceRanges} />
          </div>
        </div>

        {!isDataEmpty ? (
          <section>
            <div className="home__products-wrapper">
              {allMilletProducts?.map(async (product) => {
                var allMillets = await fetchMillets(product.millet_type);
                return (
                  <ProductCard
                    product={product}
                    milletType={allMillets.document}
                  />
                );
              })}
            </div>
            <ShowMore
              pageNumber={(searchParams.limit || 10) / 10}
              isNext={(searchParams.limit || 10) > allMilletProducts.length}
            />
          </section>
        ) : (
          <div className="home__error-container">
            <h2 className="text-black text-xl font-bold">Oops, no results</h2>
          </div>
        )}
      </div>
    </main>
  );
}
