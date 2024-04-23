import { SecondaryHero, UpdateForm } from "@/components";
import { ProductDetailsProps } from "@/types";
import { addMilletProducts } from "@/utils";
import React from "react";

export default function updateproducts() {
  const handleSubmit = async (product: ProductDetailsProps) => {
    "use server";
    await addMilletProducts(product);
    return null;
  };

  return (
    <main className="overflow-hidden">
      <SecondaryHero
        title="Add Product"
        subtitle="Add product name, millet type, product description, etc."
      />
      <UpdateForm handleClick={handleSubmit} />
    </main>
  );
}
