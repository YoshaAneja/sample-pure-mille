import SecondaryHero from "@/components/SecondaryHero";
import React from "react";

export default function Blog() {
  return (
    <main className="overflow-hidden">
      <SecondaryHero
        title="Why Pure Mille"
        subtitle="Pure Mille is committed to providing you with the highest quality, sustainably sourced millets that are both delicious and packed with essential nutrients, antioxidants, and dietary fiber. Choose nature's nutritional gold - millets."
        buttonText="Read More"
        scrollToID="blog"
        image="9028.jpg"
        imageAlt="Why Pure Mille"
      />
      <div id="blog"> blog</div>
    </main>
  );
}
