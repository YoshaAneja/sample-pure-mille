"use client";

import React, { useState } from "react";
import Image from "next/image";

import { BlogProps } from "@/types";
import CustomButtonStatic from "./CustomButtonStatic";
import BlogDetails from "./BlogDetails";

interface BlogCardProps {
  blogPost: BlogProps;
}
const BlogCard = ({ blogPost }: BlogCardProps) => {
  const { title, category, content, author, blog_image } = blogPost;

  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="recipe-card group z-0">
      <div className="recipe-card__content">
        <h2 className="recipe-card__content-title">{title}</h2>
      </div>
      <div className="relative w-full my-3 object-contain h-56">
        <Image
          src={blog_image || "/placeholder-img.png"}
          alt={title}
          fill
          priority
          className="object-cover rounded-2xl"
        />
      </div>
      <div className="relative flex w-full my-2 flex-col gap-5">
        <div className="flex g w-full flex-start text-primary-brown gap-2">
          {category === "Health" && (
            <Image src="/millet.svg" width={20} height={20} alt="Millet icon" />
          )}
          {category === "Environment" && (
            <Image
              src="/environment.svg"
              width={20}
              height={20}
              alt="Environment icon"
            />
          )}
          {category === "Beauty" && (
            <Image src="/beauty.svg" width={20} height={20} alt="Beauty icon" />
          )}
          {category}
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
      <BlogDetails
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        blogPost={blogPost}
      />
    </div>
  );
};

export default BlogCard;
