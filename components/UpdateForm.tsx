"use client";

import React, { useState } from "react";
import { UpdateButtonProps } from "@/types";
import { useForm } from "react-hook-form";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { products, types } from "@/constants";

interface UpdateFormInputs {
  productName: string;
  milletType: string;
  weight: number;
  price: number;
  glutenFree: string;
  primaryImageUrl: string;
  secondaryImage1: string;
  secondaryImage2: string;
  secondaryImage3: string;
  productType: string;
  productDescription: string;
}

const UpdateForm = ({ handleClick }: UpdateButtonProps) => {
  const [productName, setProductName] = useState("");
  const [milletType, setMilletType] = useState("");
  const [weight, setWeight] = useState(0);
  const [price, setPrice] = useState(0);
  const [glutenFree, setGlutenFree] = useState("");
  const [primaryImageUrl, setPrimaryImageUrl] = useState("");
  const [secondaryImage1, setSecondaryImage1] = useState("");
  const [secondaryImage2, setSecondaryImage2] = useState("");
  const [secondaryImage3, setSecondaryImage3] = useState("");
  const [productType, setProductType] = useState("");
  const [productDescription, setProductDescription] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { errors, isSubmitSuccessful },
  } = useForm<UpdateFormInputs>({
    defaultValues: {
      productName: "",
      milletType: "",
      weight: 0,
      price: 0,
      glutenFree: "",
      primaryImageUrl: "",
      secondaryImage1: "",
      secondaryImage2: "",
      secondaryImage3: "",
      productType: "",
      productDescription: "",
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

  const onSubmit = async (data: UpdateFormInputs) => {
    try {
      // Disable form while processing submission
      setDisabled(true);

      // Define template params
      const templateParams = {
        productName,
        milletType,
        weight,
        price,
        glutenFree,
        primaryImageUrl,
        secondaryImage1,
        secondaryImage2,
        secondaryImage3,
        productType,
        productDescription,
      };

      await handleClick(templateParams);
      // Display success alert
      toggleAlert("Product Added!", "success");
    } catch (e) {
      console.error(e);
      toggleAlert("Uh oh. Something went wrong. Please try again.", "danger");
    } finally {
      // Re-enable form submission
      setDisabled(false);
      // Reset contact form fields after submission
    }
  };
  if (isTimeout && isSubmitSuccessful) {
    reset();
    setProductDescription("");
    setIsTimeout(false);
  }
  return (
    <div className="flex flex-col justify-center my-6 items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-8 p-16 bg-primary-millet-100 shadow-md rounded-lg lg:max-w-[700px] max-w-[700px] max-md:mx-16"
      >
        <div className="-mb-4 text-primary-brown font-bold text-[18px]">
          Product Name
        </div>
        <div>
          <input
            className="p-5 shadow-lg rounded-lg w-full bg-primary-millet-100 text-primary-brown border-primary-millet-200 border placeholder-primary-brown-500"
            type="text"
            placeholder="Product Name"
            {...register("productName", {
              required: {
                value: true,
                message: "Please enter product name",
              },
            })}
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
          {errors.productName && (
            <span className="error-message">{errors.productName.message}</span>
          )}
        </div>
        <div className="-mb-4 text-primary-brown font-bold text-[18px]">
          Millet Type
        </div>
        <div className="flex md:flex-row flex-col justify-between gap-2 flex-1 flex-wrap">
          {types.map((type) => (
            <div className="flex flex-row md:justify-center items-center gap-2 text-primary-brown rounded-lg px-8 md:py-3 py-6 shadow-lg">
              <input
                type="radio"
                id={type}
                {...register("milletType", {
                  required: {
                    value: true,
                    message: "Please select a millet type",
                  },
                })}
                name="milletType"
                value={type}
                onChange={(e) => setMilletType(e.target.value)}
              />
              <label htmlFor={type}>{type}</label>
            </div>
          ))}
        </div>
        {errors.milletType && (
          <span className="error-message">{errors.milletType.message}</span>
        )}
        <div className="-mb-4 text-primary-brown font-bold text-[18px]">
          Weight (g)
        </div>
        <div>
          <input
            className="p-5 shadow-lg rounded-lg w-full bg-primary-millet-100 text-primary-brown border-primary-millet-200 border placeholder-primary-brown-500"
            type="number"
            min="1"
            placeholder="Product Weight"
            {...register("weight", {
              required: {
                value: true,
                message: "Please enter the product's weight",
              },
            })}
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
          />
          {errors.weight && (
            <span className="error-message">{errors.weight.message}</span>
          )}
        </div>
        <div className="-mb-4 text-primary-brown font-bold text-[18px]">
          Price ($)
        </div>
        <div>
          <input
            className="p-5 shadow-lg rounded-lg w-full bg-primary-millet-100 text-primary-brown border-primary-millet-200 border placeholder-primary-brown-500"
            type="number"
            min="1"
            placeholder="Price"
            {...register("price", {
              required: {
                value: true,
                message: "Please enter the product's price",
              },
            })}
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
          {errors.price && (
            <span className="error-message">{errors.price.message}</span>
          )}
        </div>
        <div className="-mb-4 text-primary-brown font-bold text-[18px]">
          Gluten Free
        </div>
        <div className="flex flex-row justify-start gap-2 flex-1">
          <div className="flex flex-row items-center gap-2 text-primary-brown rounded-lg px-8 py-3 shadow-lg">
            <input
              type="radio"
              id="glutenfreetrue"
              {...register("glutenFree", {
                required: {
                  value: true,
                  message:
                    "Please indicate whether product is gluten free or not",
                },
              })}
              name="glutenFree"
              value="true"
              onChange={(e) => setGlutenFree(e.target.value)}
            />
            <label htmlFor="glutenfreetrue">True</label>
          </div>
          <div className="flex flex-row items-center gap-2 text-primary-brown rounded-lg px-8 py-3 shadow-lg">
            <input
              type="radio"
              id="glutenfreefalse"
              {...register("glutenFree", {
                required: {
                  value: true,
                  message:
                    "Please indicate whether product is gluten free or not",
                },
              })}
              name="glutenFree"
              value="false"
              onChange={(e) => setGlutenFree(e.target.value)}
            />
            <label htmlFor="glutenfreefalse">False</label>
          </div>
        </div>
        {errors.glutenFree && (
          <span className="error-message">{errors.glutenFree.message}</span>
        )}
        <div className="-mb-4 text-primary-brown font-bold text-[18px]">
          Images
        </div>
        <div>
          <input
            className="p-5 shadow-lg rounded-lg w-full bg-primary-millet-100 text-primary-brown border-primary-millet-200 border placeholder-primary-brown-500"
            type="text"
            placeholder="Primary Image Url"
            {...register("primaryImageUrl", {
              required: {
                value: true,
                message: "Please enter a primary image",
              },
            })}
            value={primaryImageUrl}
            onChange={(e) => setPrimaryImageUrl(e.target.value)}
          />
          {errors.primaryImageUrl && (
            <span className="error-message">
              {errors.primaryImageUrl.message}
            </span>
          )}
        </div>
        <div>
          <input
            className="p-5 shadow-lg rounded-lg w-full bg-primary-millet-100 text-primary-brown border-primary-millet-200 border placeholder-primary-brown-500"
            type="text"
            placeholder="Secondary Image Url #1"
            value={secondaryImage1}
            onChange={(e) => setSecondaryImage1(e.target.value)}
          />
        </div>
        <div>
          <input
            className="p-5 shadow-lg rounded-lg w-full bg-primary-millet-100 text-primary-brown border-primary-millet-200 border placeholder-primary-brown-500"
            type="text"
            placeholder="Secondary Image Url #2"
            value={secondaryImage2}
            onChange={(e) => setSecondaryImage2(e.target.value)}
          />
        </div>
        <div>
          <input
            className="p-5 shadow-lg rounded-lg w-full bg-primary-millet-100 text-primary-brown border-primary-millet-200 border placeholder-primary-brown-500"
            type="text"
            placeholder="Secondary Image Url #3"
            value={secondaryImage3}
            onChange={(e) => setSecondaryImage3(e.target.value)}
          />
        </div>
        <div className="-mb-4 text-primary-brown font-bold text-[18px]">
          Product Type
        </div>
        <div className="flex sm:flex-row flex-col justify-between gap-2 flex-1 flex-wrap">
          {products.map((product) => (
            <div className="flex flex-row md:justify-center items-center gap-2 text-primary-brown rounded-lg px-8 md:py-3 py-6 shadow-lg">
              <input
                type="radio"
                id={product}
                {...register("productType", {
                  required: {
                    value: true,
                    message: "Please select a product type",
                  },
                })}
                name="productType"
                value={product}
                onChange={(e) => setProductType(e.target.value)}
              />
              <label htmlFor={product}>{product}</label>
            </div>
          ))}
        </div>
        {errors.productType && (
          <span className="error-message">{errors.productType.message}</span>
        )}
        <div className="-mb-4 text-primary-brown font-bold text-[18px]">
          Product Description
        </div>
        <div className="flex flex-col gap-4">
          <textarea
            className="p-5 shadow-lg rounded-lg w-full bg-primary-millet-100 text-primary-brown border-primary-millet-200 border placeholder-primary-brown-500"
            value={productDescription}
            placeholder="Product Description"
            {...register("productDescription", {
              required: {
                value: true,
                message: "Please enter a product description",
              },
            })}
            onChange={(e) => setProductDescription(e.target.value)}
            rows={20}
            cols={50}
          ></textarea>
          <ReactMarkdown
            className="outline-none markdown max-w-[100%] px-5 shadow-lg rounded-lg w-full bg-primary-millet-100 text-primary-brown border-primary-millet-200 border placeholder-primary-brown-500 resize-none text-pretty	whitespace-normal overflow-scroll"
            remarkPlugins={[remarkGfm]}
          >
            {productDescription || "Markdown preview"}
          </ReactMarkdown>
        </div>
        {errors.productDescription && (
          <span className="error-message">
            {errors.productDescription.message}
          </span>
        )}
        <div className="p-5 shadow-lg rounded-lg w-full bg-primary-millet-100 text-primary-brown border-primary-millet-200 border placeholder-primary-brown-500">
          <p className="text-[18px]">Markdown Guide</p>
          <h1># Heading 1</h1>
          <h2>## Heading 2</h2>
          <i>*italics*</i> or <i>_italics_</i>
          <br />
          <b>**bold**</b> or <b>__bold__</b>
          <br />
          <p>- list item or * list item or 1. list item</p>
          <p>![Image title](Image URL)</p>
          <p>[Link title](Link URL)</p>
          <p> &gt; Block Quote</p>
        </div>
        <button
          disabled={disabled}
          type="submit"
          className={`p-[16px] w-full border border-primary-brown bg-primary-brown text-primary-wheat-100 font-bold text-lg rounded-full enabled:hover:bg-primary-wheat-100 enabled:hover:text-primary-brown disabled:bg-primary-wheat-100 disabled:text-primary-brown disabled:opacity-75 transition-all duration-500 flex-1`}
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

export default UpdateForm;
