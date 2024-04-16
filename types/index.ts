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

export interface SearchProductProps {
  product: string;
  setProduct: (product: string) => void;
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

export interface MilletProps {
  millet_type: string;
  millet_description: string;
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

export interface CustomFilterProps {
  title: string;
  options: OptionProps[];
}

export interface ShowMoreProps {
  pageNumber: number;
  isNext: boolean;
}
