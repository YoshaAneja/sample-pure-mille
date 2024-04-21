import { ShowMore, SecondaryHero, SearchBarBlog, BlogCard } from "@/components";
import { fetchBlogPosts } from "@/utils";
import React from "react";

export default async function Blog({ searchParams }) {
  const allBlogPostsDocument = await fetchBlogPosts({
    category: searchParams.category,
  });
  const allBlogPosts = allBlogPostsDocument.documents;

  const isDataEmpty =
    !Array.isArray(allBlogPosts) || allBlogPosts.length < 1 || !allBlogPosts;
  return (
    <main className="overflow-hidden">
      <SecondaryHero
        title="Why Pure Mille"
        subtitle="Pure Mille is committed to providing you with the highest quality, sustainably sourced millets that are both delicious and packed with essential nutrients, antioxidants, and dietary fiber. Choose nature's nutritional gold - millets."
        buttonText="Read More"
        scrollToID="blog"
        image="9028.jpg"
      />
      <div className="mt-12 padding-x padding-y max-width" id="blog">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Our Blog</h1>
        </div>
        <div className="home__filters">
          <SearchBarBlog />
        </div>

        {!isDataEmpty ? (
          <section>
            <div className="home__products-wrapper">
              {allBlogPosts?.map(async (item) => {
                return <BlogCard blogPost={item} />;
              })}
            </div>
            <ShowMore
              pageNumber={(searchParams.limit || 10) / 10}
              isNext={(searchParams.limit || 10) > allBlogPosts.length}
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
