import SecondaryHero from "@/components/SecondaryHero";
import React from "react";

export default function Recipes() {
  return (
    <main className="overflow-hidden">
      <SecondaryHero
        title="Recipes"
        subtitle=""
        buttonText="Learn More"
        scrollToID="recipes"
        image="9028.jpg"
      />
      <div id="recipes"> Recipes</div>
    </main>
  );
}
