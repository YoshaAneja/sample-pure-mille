import { SecondaryHero, UpdateFormBlog } from "@/components";
import { BlogPostDetailsProps } from "@/types";
import { addBlogPosts } from "@/utils";
import Image from "next/image";
import React from "react";

export default function updateblog() {
  const handleSubmit = async (blogPost: BlogPostDetailsProps) => {
    "use server";
    await addBlogPosts(blogPost);
    return null;
  };

  return (
    <main className="overflow-hidden">
      <SecondaryHero
        title="Add Blog Post"
        subtitle="Add post title, author, image, content, and category"
      />
      <UpdateFormBlog handleClick={handleSubmit} />
    </main>
  );
}
