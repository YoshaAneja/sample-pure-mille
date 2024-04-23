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

export interface UpdateButtonProps {
  handleClick: (product: ProductDetailsProps) => void;
  isDisabled?: boolean;
}

export interface RecipeUpdateButtonProps {
  handleClick: (recipe: RecipeDetailsProps) => void;
  isDisabled?: boolean;
}

export interface BlogUpdateButtonProps {
  handleClick: (blogPost: BlogPostDetailsProps) => void;
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
  instructions: string;
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

export interface RecipeOptionProps {
  title: string;
  value: string;
}

export interface CustomFilterProps {
  title: string;
  options: OptionProps[];
}

export interface CustomFilterRecipesProps {
  title: string;
  options: RecipeOptionProps[];
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

export interface ProductDetailsProps {
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

export interface RecipeDetailsProps {
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

export interface BlogPostDetailsProps {
  title: string;
  author: string;
  category: string;
  content: string;
  blogImage: string;
}
