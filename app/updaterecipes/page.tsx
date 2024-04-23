import { SecondaryHero, UpdateFormRecipes } from "@/components";
import { RecipeDetailsProps } from "@/types";
import { addRecipe } from "@/utils";
import React from "react";

export default function updaterecipes() {
  const handleSubmit = async (recipe: RecipeDetailsProps) => {
    "use server";
    await addRecipe(recipe);
    return null;
  };

  return (
    <main className="overflow-hidden">
      <SecondaryHero
        title="Add Recipe"
        subtitle="Add recipe name, millet type, ingredients, instructions, etc."
      />
      <UpdateFormRecipes handleClick={handleSubmit} />
    </main>
  );
}
