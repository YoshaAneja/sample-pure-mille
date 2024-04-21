import { MouseEventHandler } from "react";

export interface CustomButtonProps {
  title: string;
  btnType?: "button" | "submit";
  containerStyles?: string;
  textStyles?: string;
  rightIcon?: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
  isDisabled?: boolean;
}

export interface SearchTypeProps {
  type: string;
  setType: (type: string) => void;
}

export interface SearchRecipeProps {
  titleContains: string;
  setTitleContains: (titleContains: string) => void;
}

export interface SearchProductProps {
  product: string;
  setProduct: (product: string) => void;
}

export interface SearchBlogProps {
  category: string;
  setCategory: (category: string) => void;
}

export interface ProductProps {
  product_name: string;
  millet_types: string;
  weight: string;
  gluten_free: string;
  primary_image_url?: string;
  secondary_images?: Array<string>;
  product_description: string;
  product_type: string;
  price: number;
}

export interface RecipeProps {
  title: string;
  gluten_free: string;
  body: string;
  recipe_millet: string;
  ingredients: Array<string>;
  cooking_time: string;
  primary_image: string;
  secondary_images: Array<string>;
}

export interface BlogProps {
  title: string;
  category: string;
  content: string;
  author: string;
  blog_image: string;
}

export interface MilletProps {
  millet_type?: string;
  millet_description?: string;
}

export interface FilterProps {
  type?: string;
  product?: string;
  gluten_free?: string;
  price?: number;
}

export interface OptionProps {
  title: string;
  value: number;
}

export interface OptionRecipesProps {
  title: string;
  value: string;
}

export interface CustomFilterProps {
  title: string;
  options: OptionProps[];
}

export interface CustomFilterRecipesProps {
  title: string;
  options: OptionRecipesProps[];
}

export interface ShowMoreProps {
  pageNumber: number;
  isNext: boolean;
}

export interface SecondaryHeroProps {
  title: string;
  subtitle: string;
  subtitle2?: string;
  image?: string;
  imageAlt?: string;
  scrollToID?: string;
  buttonText?: string;
}

export interface FilterPropsRecipes {
  recipe_millet?: string;
  title?: string;
  gluten_free?: string;
}

export interface BlogFilterProps {
  category?: string;
}
