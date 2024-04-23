"use client";

import React, { useState } from "react";
import Image from "next/image";

import { MilletProps, ProductProps } from "@/types";
import ProductDetails from "./ProductDetails";
import CustomButtonStatic from "./CustomButtonStatic";

interface ProductCardProps {
  product: ProductProps;
  milletType: MilletProps;
}

const ProductCard = ({ product, milletType }: ProductCardProps) => {
  const { product_name, weight, price, gluten_free, primary_image_url } =
    product;

  const { millet_type, millet_description } = milletType;

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="product-card group">
      <div className="product-card__content">
        <h2 className="card-card__content-title">{product_name}</h2>
      </div>
      <span className="self-start text-[14px] font-semibold">
        {millet_type} Millet
      </span>

      <div className="relative w-full h-40 my-3 object-contain">
        <Image
          src={primary_image_url || "/placeholder-img.png"}
          alt="millets"
          fill
          priority
          className="object-contain"
        />
      </div>
      <div className="relative flex w-full mt-2">
        <div className="flex group-hover:invisible w-full justify-between text-gray">
          <div className="flex flex-col justify-center items-center gap-2">
            <Image src="/scale.svg" width={20} height={20} alt="weight" />
            <p className="text-[14px]">{weight}</p>
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <Image src="/gluten-free.svg" width={25} height={25} alt="gf?" />
            <p className="text-[14px]">
              {gluten_free == "true" ? "Gluten Free" : "Plant Based"}
            </p>
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <Image src="/price-tag.svg" width={20} height={20} alt="price" />
            <p className="text-[14px]">${price}</p>
          </div>
        </div>

        <div className="product-card__btn-container">
          <CustomButtonStatic
            title="View More"
            containerStyles="w-full py-[16px] rounded-full bg-primary-brown"
            textStyles="text-white text-[14px] leading-[17px] font-bold"
            rightIcon="/right-arrow.svg"
            handleClick={() => setIsOpen(true)}
          />
        </div>
      </div>
      <ProductDetails
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        product={product}
        milletType={milletType}
      />
    </div>
  );
};

export default ProductCard;
