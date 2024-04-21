import {
  CustomToggle,
  SearchBarRecipes,
  ShowMore,
  RecipeCard,
  SecondaryHero,
} from "@/components";
import CustomFilterRecipes from "@/components/CustomFilterRecipes";
import { typesSecondary } from "@/constants";
import { fetchMillets, fetchRecipes } from "@/utils";
import React from "react";

export default async function Recipes({ searchParams }) {
  const allRecipesDocuments = await fetchRecipes({
    recipe_millet: searchParams.recipe_millet,
    title: searchParams.in_recipe,
    gluten_free: searchParams.gluten_free,
  });
  const allRecipes = allRecipesDocuments.documents;

  const isDataEmpty =
    !Array.isArray(allRecipes) || allRecipes.length < 1 || !allRecipes;

  return (
    <main className="overflow-hidden">
      <SecondaryHero
        title="Recipes"
        subtitle="Dive into the world of nutritious and sustainable millets with us, and discover delicious recipes, health benefits, and more. Join our community and embrace a healthier, greener lifestyle today!"
        buttonText="Learn More"
        scrollToID="recipes"
        image="9028.jpg"
      />
      <div className="mt-12 padding-x padding-y max-width" id="recipes">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">The Pure Mille Cookbook</h1>
          <h2>Explore all our recipes</h2>
        </div>
        <div className="home__filters">
          <SearchBarRecipes />
          <div className="home__filter-container">
            <CustomToggle />
            <CustomFilterRecipes
              title="recipe_millet"
              options={typesSecondary}
            />
          </div>
        </div>

        {!isDataEmpty ? (
          <section>
            <div className="home__products-wrapper">
              {allRecipes?.map(async (recipe) => {
                const allMillets = await fetchMillets(recipe.recipe_millet);
                return (
                  <RecipeCard
                    recipe={recipe}
                    milletType={allMillets.document}
                  />
                );
              })}
            </div>
            <ShowMore
              pageNumber={(searchParams.limit || 10) / 10}
              isNext={(searchParams.limit || 10) > allRecipes.length}
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
