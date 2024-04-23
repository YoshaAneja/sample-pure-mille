"use client";

import React, { useState } from "react";
import { BlogUpdateButtonProps } from "@/types";
import { useForm } from "react-hook-form";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { categories, products, types } from "@/constants";

interface UpdateBlogFormInputs {
  title: string;
  author: string;
  category: string;
  blogImage: string;
  content: string;
}

const UpdateFormBlog = ({ handleClick }: BlogUpdateButtonProps) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [blogImage, setBlogImage] = useState("");
  const [content, setContent] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { errors, isSubmitSuccessful },
  } = useForm<UpdateBlogFormInputs>({
    defaultValues: {
      title: "",
      author: "",
      category: "",
      blogImage: "",
      content: "",
    },
  });

  const [disabled, setDisabled] = useState(false);
  const [alertInfo, setAlertInfo] = useState({
    display: false,
    message: "",
    type: "",
  });
  const [isTimeout, setIsTimeout] = useState(false);

  // Shows alert message for form submission feedback
  const toggleAlert = (message: string, type: string) => {
    setAlertInfo({ display: true, message, type });
    // Hide alert after 5 seconds
    setTimeout(() => {
      setAlertInfo({ display: false, message: "", type: "" });
      setIsTimeout(true);
    }, 3000);
  };

  const onSubmit = async (data: UpdateBlogFormInputs) => {
    try {
      // Disable form while processing submission
      setDisabled(true);

      // Define template params
      const templateParams = {
        title,
        author,
        category,
        blogImage,
        content,
      };

      await handleClick(templateParams);
      // Display success alert
      toggleAlert("Post Added!", "success");
    } catch (e) {
      console.error(e);
      toggleAlert("Uh oh. Something went wrong. Please try again.", "danger");
    } finally {
      // Re-enable form submission
      // Reset contact form fields after submission
    }
  };
  if (isTimeout && isSubmitSuccessful) {
    reset();
    setDisabled(false);
    setContent("");
    setIsTimeout(false);
  }
  return (
    <div className="flex flex-col justify-center my-6 items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-8 p-16 bg-primary-millet-100 shadow-md rounded-lg lg:max-w-[800px] max-md:mx-16"
      >
        <div className="-mb-4 text-primary-brown font-bold text-[18px]">
          Blog Post Title
        </div>
        <div>
          <input
            className="p-5 shadow-lg rounded-lg w-full bg-primary-millet-100 text-primary-brown border-primary-millet-200 border placeholder-primary-brown-500"
            type="text"
            placeholder="Title"
            {...register("title", {
              required: {
                value: true,
                message: "Please enter the blog post title",
              },
            })}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {errors.title && (
            <span className="error-message">{errors.title.message}</span>
          )}
        </div>
        <div className="-mb-4 text-primary-brown font-bold text-[18px]">
          Author
        </div>
        <div>
          <input
            className="p-5 shadow-lg rounded-lg w-full bg-primary-millet-100 text-primary-brown border-primary-millet-200 border placeholder-primary-brown-500"
            type="text"
            placeholder="FirstName LastName"
            {...register("author", {
              required: {
                value: true,
                message: "Please enter the author's name",
              },
            })}
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          {errors.author && (
            <span className="error-message">{errors.author.message}</span>
          )}
        </div>
        <div className="-mb-4 text-primary-brown font-bold text-[18px]">
          Category
        </div>
        <div className="flex sm:flex-row flex-col justify-between gap-2 flex-1">
          {categories.map((item) => (
            <div className="flex flex-row md:justify-center items-center gap-2 text-primary-brown rounded-lg px-8 md:py-3 py-6 shadow-lg">
              <input
                type="radio"
                id={item}
                {...register("category", {
                  required: {
                    value: true,
                    message: "Please select a post category",
                  },
                })}
                name="category"
                value={item}
                onChange={(e) => setCategory(e.target.value)}
              />
              <label htmlFor={item}>{item}</label>
            </div>
          ))}
        </div>
        {errors.category && (
          <span className="error-message">{errors.category.message}</span>
        )}
        <div className="-mb-4 text-primary-brown font-bold text-[18px]">
          Image
        </div>
        <div>
          <input
            className="p-5 shadow-lg rounded-lg w-full bg-primary-millet-100 text-primary-brown border-primary-millet-200 border placeholder-primary-brown-500"
            type="text"
            placeholder="Blog Image Url"
            {...register("blogImage", {
              required: {
                value: true,
                message: "Please enter a blog image",
              },
            })}
            value={blogImage}
            onChange={(e) => setBlogImage(e.target.value)}
          />
          {errors.blogImage && (
            <span className="error-message">{errors.blogImage.message}</span>
          )}
        </div>
        <div className="-mb-4 text-primary-brown font-bold text-[18px]">
          Content
        </div>
        <div className="flex flex-col gap-4">
          <textarea
            className="p-5 shadow-lg rounded-lg w-full bg-primary-millet-100 text-primary-brown border-primary-millet-200 border placeholder-primary-brown-500"
            value={content}
            placeholder="Lorem ipsum dolor sit amet..."
            {...register("content", {
              required: {
                value: true,
                message: "Please enter post content",
              },
            })}
            onChange={(e) => setContent(e.target.value)}
            rows={20}
            cols={50}
          ></textarea>
          <ReactMarkdown
            className="outline-none markdown max-w-[100%] px-5 shadow-lg rounded-lg w-full bg-primary-millet-100 text-primary-brown border-primary-millet-200 border placeholder-primary-brown-500 resize-none text-pretty	whitespace-normal overflow-scroll"
            remarkPlugins={[remarkGfm]}
          >
            {content || "Markdown preview"}
          </ReactMarkdown>
        </div>
        {errors.content && (
          <span className="error-message">{errors.content.message}</span>
        )}
        <button
          disabled={disabled}
          type="submit"
          className={`p-[16px] w-full border border-primary-brown bg-primary-brown text-primary-wheat-100 font-bold text-lg rounded-full hover:bg-primary-wheat-100 hover:text-primary-brown transition-all duration-500 flex-1`}
        >
          Submit
        </button>
      </form>
      <div className="flex justify-center align-center items-start max-sm:mx-[30px]">
        {alertInfo.display ? (
          <div
            className="transition-all text-center font-bold text-primary-brown mt-8 w-[550px] max-md:max-w-[450px] max-sm:w-[90vw] text-[20px]"
            role="alert"
          >
            {alertInfo.message}
          </div>
        ) : (
          <div className="text-center font-bold text-primary-brown mt-8 w-[550px] max-md:max-w-[450px] max-sm:w-[90vw] text-[20px]">
            Awaiting Submission
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdateFormBlog;
