"use client";

import React, { useState } from "react";
import { RecipeUpdateButtonProps, UpdateButtonProps } from "@/types";
import { useForm } from "react-hook-form";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { types } from "@/constants";

interface UpdateRecipesFormInputs {
  title: string;
  instructions: string;
  glutenFree: string;
  recipeMillet: string;
  cookingTime: number;
  primaryImageUrl: string;
  secondaryImage1: string;
  secondaryImage2: string;
  secondaryImage3: string;
  ingredients: Array<string>;
}

const UpdateFormRecipes = ({ handleClick }: RecipeUpdateButtonProps) => {
  const [title, setTitle] = useState("");
  const [instructions, setInstructions] = useState("");
  const [recipeMillet, setRecipeMillet] = useState("");
  const [glutenFree, setGlutenFree] = useState("");
  const [cookingTime, setCookingTime] = useState(0);
  const [primaryImageUrl, setPrimaryImageUrl] = useState("");
  const [secondaryImage1, setSecondaryImage1] = useState("");
  const [secondaryImage2, setSecondaryImage2] = useState("");
  const [secondaryImage3, setSecondaryImage3] = useState("");
  const [ingredients, setIngredients] = useState([""]);

  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { errors, isSubmitSuccessful },
  } = useForm<UpdateRecipesFormInputs>({
    defaultValues: {
      title: "",
      instructions: "",
      glutenFree: "",
      recipeMillet: "",
      cookingTime: 0,
      primaryImageUrl: "",
      secondaryImage1: "",
      secondaryImage2: "",
      secondaryImage3: "",
      ingredients: [],
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

  const onSubmit = async (data: UpdateRecipesFormInputs) => {
    try {
      // Disable form while processing submission
      setDisabled(true);

      // Define template params
      const templateParams = {
        title,
        instructions,
        glutenFree,
        recipeMillet,
        cookingTime,
        primaryImageUrl,
        secondaryImage1,
        secondaryImage2,
        secondaryImage3,
        ingredients,
      };

      await handleClick(templateParams);
      // Display success alert
      toggleAlert("Recipe Added!", "success");
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
    setInstructions("");
    setIsTimeout(false);
  }
  return (
    <div className="flex flex-col justify-center my-6 items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-8 p-16 bg-primary-millet-100 shadow-md rounded-lg lg:max-w-[800px] max-md:mx-16"
      >
        <div className="-mb-4 text-primary-brown font-bold text-[18px]">
          Recipe Name
        </div>
        <div>
          <input
            className="p-5 shadow-lg rounded-lg w-full bg-primary-millet-100 text-primary-brown border-primary-millet-200 border placeholder-primary-brown-500"
            type="text"
            placeholder="Recipe Name"
            {...register("title", {
              required: {
                value: true,
                message: "Please enter the recipe's name",
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
          Millet Type
        </div>
        <div className="flex md:flex-row flex-col justify-between gap-2 flex-1 flex-wrap">
          {types.map((type) => (
            <div className="flex flex-row md:justify-center items-center gap-2 text-primary-brown rounded-lg px-8 md:py-3 py-6 shadow-lg">
              <input
                type="radio"
                id={type}
                {...register("recipeMillet", {
                  required: {
                    value: true,
                    message: "Please select a millet type",
                  },
                })}
                name="recipeMillet"
                value={type}
                onChange={(e) => setRecipeMillet(e.target.value)}
              />
              <label htmlFor={type}>{type}</label>
            </div>
          ))}
        </div>
        {errors.recipeMillet && (
          <span className="error-message">{errors.recipeMillet.message}</span>
        )}
        <div className="-mb-4 text-primary-brown font-bold text-[18px]">
          Cooking Time (minutes)
        </div>
        <div>
          <input
            className="p-5 shadow-lg rounded-lg w-full bg-primary-millet-100 text-primary-brown border-primary-millet-200 border placeholder-primary-brown-500"
            type="number"
            min="1"
            placeholder="Cooking Time"
            {...register("cookingTime", {
              required: {
                value: true,
                message: "Please enter the recipe's cooking time",
              },
            })}
            value={cookingTime}
            onChange={(e) => setCookingTime(Number(e.target.value))}
          />
          {errors.cookingTime && (
            <span className="error-message">{errors.cookingTime.message}</span>
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
          Images:
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
          Ingredients
        </div>
        <div>
          <input
            className="p-5 shadow-lg rounded-lg w-full bg-primary-millet-100 text-primary-brown border-primary-millet-200 border placeholder-primary-brown-500"
            type="text"
            placeholder="Ingredients"
            {...register("ingredients", {
              required: {
                value: true,
                message: "Please enter ingredients",
              },
            })}
            value={ingredients}
            onChange={(e) =>
              setIngredients(
                e.target.value.split(",").map((item: string) => item.trim())
              )
            }
          />
          {errors.ingredients && (
            <span className="error-message">{errors.ingredients.message}</span>
          )}
        </div>
        <div className="-mb-4 text-primary-brown font-bold text-[18px]">
          Recipe Instructions
        </div>
        <div className="flex flex-col gap-4">
          <textarea
            className="p-5 shadow-lg rounded-lg w-full bg-primary-millet-100 text-primary-brown border-primary-millet-200 border placeholder-primary-brown-500"
            value={instructions}
            placeholder="Recipe Instructions"
            {...register("instructions", {
              required: {
                value: true,
                message: "Please enter recipe instructions",
              },
            })}
            onChange={(e) => setInstructions(e.target.value)}
            rows={20}
            cols={50}
          ></textarea>
          <ReactMarkdown
            className="outline-none markdown max-w-[100%] px-5 shadow-lg rounded-lg w-full bg-primary-millet-100 text-primary-brown border-primary-millet-200 border placeholder-primary-brown-500 resize-none text-pretty	whitespace-normal overflow-scroll"
            remarkPlugins={[remarkGfm]}
          >
            {instructions || "Markdown preview"}
          </ReactMarkdown>
        </div>
        {errors.instructions && (
          <span className="error-message">{errors.instructions.message}</span>
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

export default UpdateFormRecipes;
