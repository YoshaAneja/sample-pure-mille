"use client";

import React, { useState } from "react";
import Image from "next/image";

import { MilletProps, RecipeProps } from "@/types";
import RecipeDetails from "./RecipeDetails";
import CustomButtonStatic from "./CustomButtonStatic";

interface RecipeCardProps {
  recipe: RecipeProps;
  milletType: MilletProps;
}

const RecipeCard = ({ recipe, milletType }: RecipeCardProps) => {
  const {
    title,
    gluten_free,
    recipe_millet,
    instructions,
    ingredients,
    primary_image,
    secondary_images,
    cooking_time,
  } = recipe;

  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="recipe-card group z-0">
      <div className="recipe-card__content">
        <h2 className="recipe-card__content-title">{title}</h2>
      </div>
      <div className="relative w-full h-40 my-3 object-contain">
        <Image
          src={primary_image || "/placeholder-img.png"}
          alt={title}
          fill
          priority
          className="object-contain"
        />
      </div>
      <div className="relative flex w-full mt-2 flex-col gap-5">
        <div className="flex g w-full justify-between text-gray">
          <div className="flex flex-col justify-center items-center gap-2">
            <Image
              src="/millet.svg"
              width={20}
              height={20}
              alt={recipe_millet}
            />
            <p className="text-[14px]">{recipe_millet}</p>
          </div>
          {gluten_free === "true" ? (
            <div className="flex flex-col justify-center items-center gap-2">
              <Image
                src="/gluten-free.svg"
                width={25}
                height={25}
                alt="gluten free"
              />
              <p className="text-[14px]">Gluten Free</p>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center gap-2">
              <Image
                src="/plant-based.svg"
                width={25}
                height={25}
                alt="plant based"
              />
              <p className="text-[14px]">Plant Based</p>
            </div>
          )}
          <div className="flex flex-col justify-center items-center gap-2">
            <Image src="/time.svg" width={20} height={20} alt="cooking time" />
            <p className="text-[14px]">{cooking_time}</p>
          </div>
        </div>

        <div className="recipe-card__btn-container">
          <CustomButtonStatic
            title="View More"
            containerStyles="w-full py-[16px] rounded-full bg-primary-brown"
            textStyles="text-white text-[14px] leading-[17px] font-bold"
            rightIcon="/right-arrow.svg"
            handleClick={() => setIsOpen(true)}
          />
        </div>
      </div>
      <RecipeDetails
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        recipe={recipe}
        milletType={milletType || ""}
      />
    </div>
  );
};

export default RecipeCard;
