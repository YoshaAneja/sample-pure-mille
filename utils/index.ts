import {
  BlogFilterProps,
  FilterProps,
  FilterPropsRecipes,
  MilletProps,
  ProductProps,
} from "@/types";

const axios = require("axios");

export async function fetchMilletProducts(filters: FilterProps) {
  const { type, product, gluten_free, price } = filters;
  var productData = {};
  if (price) {
    productData = {
      collection: "products",
      database: "sample_millets",
      dataSource: "PureMille",
      filter: {
        millet_types: type,
        product_type: product,
        gluten_free: gluten_free,
        price: { $lte: Number(price) },
      },
      projection: {},
    };
  } else {
    productData = {
      collection: "products",
      database: "sample_millets",
      dataSource: "PureMille",
      filter: {
        millet_types: type,
        product_type: product,
        gluten_free: gluten_free,
      },
      projection: {},
    };
  }

  const productOptions = {
    method: "POST",
    url: "https://us-east-1.aws.data.mongodb-api.com/app/data-dynni/endpoint/data/v1/action/find",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Request-Headers": "*",
      "api-key":
        "Cc2O1lxuiw2uFFeRXImG8VOYhWv104DWnNf3GJfDijHVg2FSVm5mrwRlD3nXlX9A",
    },
    data: JSON.stringify(productData),
  };
  try {
    const response = await axios.request(productOptions);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchMillets(millet_type: string) {
  var milletData = JSON.stringify({
    collection: "millets",
    database: "sample_millets",
    dataSource: "PureMille",
    projection: {},
    filter: { millet_type: millet_type },
  });
  const milletOptions = {
    method: "POST",
    url: "https://us-east-1.aws.data.mongodb-api.com/app/data-dynni/endpoint/data/v1/action/findOne",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Request-Headers": "*",
      "api-key":
        "Cc2O1lxuiw2uFFeRXImG8VOYhWv104DWnNf3GJfDijHVg2FSVm5mrwRlD3nXlX9A",
    },
    data: milletData,
  };
  try {
    const response = await axios.request(milletOptions);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchRecipes(recipeFilters: FilterPropsRecipes) {
  const { recipe_millet, title, gluten_free } = recipeFilters;
  var recipeData = {};

  recipeData = {
    collection: "recipes",
    database: "sample_millets",
    dataSource: "PureMille",
    filter: {
      recipe_millet: recipe_millet,
      title: title,
      gluten_free: gluten_free,
    },
    projection: {},
  };

  const recipeOptions = {
    method: "POST",
    url: "https://us-east-1.aws.data.mongodb-api.com/app/data-dynni/endpoint/data/v1/action/find",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Request-Headers": "*",
      "api-key":
        "Cc2O1lxuiw2uFFeRXImG8VOYhWv104DWnNf3GJfDijHVg2FSVm5mrwRlD3nXlX9A",
    },
    data: JSON.stringify(recipeData),
  };
  try {
    const response = await axios.request(recipeOptions);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchBlogPosts(blogFilters: BlogFilterProps) {
  const { category } = blogFilters;
  var blogData = {};

  blogData = {
    collection: "blogPosts",
    database: "sample_millets",
    dataSource: "PureMille",
    filter: {
      category: category,
    },
    projection: {},
  };

  const blogOptions = {
    method: "POST",
    url: "https://us-east-1.aws.data.mongodb-api.com/app/data-dynni/endpoint/data/v1/action/find",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Request-Headers": "*",
      "api-key":
        "Cc2O1lxuiw2uFFeRXImG8VOYhWv104DWnNf3GJfDijHVg2FSVm5mrwRlD3nXlX9A",
    },
    data: JSON.stringify(blogData),
  };
  try {
    const response = await axios.request(blogOptions);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

// export async function addProducts() {
//   var productData = {
//     collection: "products",
//     database: "sample_millets",
//     dataSource: "PureMille",
//     document: {
//       product_name: "Millet Cereal #3",
//       millet_types: "Browntop (Korle)",
//       weight: "200g",
//       price: 18,
//       gluten_free: true,
//       primary_image_url: "/placeholder-img5.jpg",
//       secondary_images: ["", "", ""],
//       product_type: "cereal",
//       product_description:
//         "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
//     },
//   };

//   const productOptions = {
//     method: "POST",
//     url: "https://us-east-1.aws.data.mongodb-api.com/app/data-dynni/endpoint/data/v1/action/insertOne",
//     headers: {
//       "Content-Type": "application/json",
//       "Access-Control-Request-Headers": "*",
//       "api-key":
//         "Cc2O1lxuiw2uFFeRXImG8VOYhWv104DWnNf3GJfDijHVg2FSVm5mrwRlD3nXlX9A",
//     },
//     data: JSON.stringify(productData),
//   };
//   try {
//     const response = await axios.request(productOptions);
//     return response.data;
//   } catch (error) {
//     console.log(error);
//   }
// }

export const updateSearchParams = (type: string, value: number) => {
  const searchParams = new URLSearchParams(window.location.search);
  searchParams.set(type, String(value));

  const newPathName = `${window.location.pathname}?${searchParams.toString()}`;

  return newPathName;
};

export const updateSearchParamsRecipe = (type: string, value: string) => {
  const searchParams = new URLSearchParams(window.location.search);
  searchParams.set(type, value);

  const newPathName = `${window.location.pathname}?${searchParams.toString()}`;

  return newPathName;
};


export const updateSearchParamsToggle = (type: string, enabled: boolean) => {
  const searchParams = new URLSearchParams(window.location.search);
  searchParams.set(type, String(enabled));

  const newPathName = `${window.location.pathname}?${searchParams.toString()}`;

  return newPathName;
};
