import {
  BlogFilterProps,
  BlogPostDetailsProps,
  FilterProps,
  FilterPropsRecipes,
  MilletProps,
  ProductDetailsProps,
  ProductProps,
  RecipeDetailsProps,
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
        millet_type: type,
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
        millet_type: type,
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

export async function addMilletProducts(productDetails: ProductDetailsProps) {
  const {
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
  } = productDetails;

  var secondary_images = [secondaryImage1, secondaryImage2, secondaryImage3];
  var productDataToAdd = JSON.stringify({
    collection: "products",
    database: "sample_millets",
    dataSource: "PureMille",
    document: {
      product_name: productName,
      millet_type: milletType,
      weight: String(weight) + "g",
      price: price,
      gluten_free: glutenFree,
      primary_image_url: primaryImageUrl,
      secondary_images: [secondaryImage1, secondaryImage2, secondaryImage3],
      product_type: productType,
      product_description: productDescription,
    },
  });

  var productOptionsToAdd = {
    method: "POST",
    url: "https://us-east-1.aws.data.mongodb-api.com/app/data-dynni/endpoint/data/v1/action/insertOne",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Request-Headers": "*",
      "api-key":
        "Cc2O1lxuiw2uFFeRXImG8VOYhWv104DWnNf3GJfDijHVg2FSVm5mrwRlD3nXlX9A",
    },
    data: productDataToAdd,
  };
  try {
    await axios.request(productOptionsToAdd);
  } catch (error) {
    console.log(error);
  }
}

export async function addRecipe(recipeDetails: RecipeDetailsProps) {
  const {
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
  } = recipeDetails;
  var secondaryImages = [secondaryImage1, secondaryImage2, secondaryImage3];
  var recipeDataToAdd = JSON.stringify({
    collection: "recipes",
    database: "sample_millets",
    dataSource: "PureMille",
    document: {
      title: title,
      instructions: instructions,
      gluten_free: glutenFree,
      recipe_millet: recipeMillet,
      cooking_time: String(cookingTime) + " minutes",
      primary_image: primaryImageUrl,
      secondary_images: secondaryImages,
      ingredients: ingredients,
    },
  });

  var recipeOptionsToAdd = {
    method: "POST",
    url: "https://us-east-1.aws.data.mongodb-api.com/app/data-dynni/endpoint/data/v1/action/insertOne",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Request-Headers": "*",
      "api-key":
        "Cc2O1lxuiw2uFFeRXImG8VOYhWv104DWnNf3GJfDijHVg2FSVm5mrwRlD3nXlX9A",
    },
    data: recipeDataToAdd,
  };
  try {
    await axios.request(recipeOptionsToAdd);
  } catch (error) {
    console.log(error);
  }
}

export async function addBlogPosts(blogPostDetails: BlogPostDetailsProps) {
  const { title, author, category, content, blogImage } = blogPostDetails;

  var blogPostDataToAdd = JSON.stringify({
    collection: "blogPosts",
    database: "sample_millets",
    dataSource: "PureMille",
    document: {
      title: title,
      author: author,
      category: category,
      content: content,
      blog_image: blogImage,
    },
  });

  var blogPostOptionsToAdd = {
    method: "POST",
    url: "https://us-east-1.aws.data.mongodb-api.com/app/data-dynni/endpoint/data/v1/action/insertOne",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Request-Headers": "*",
      "api-key":
        "Cc2O1lxuiw2uFFeRXImG8VOYhWv104DWnNf3GJfDijHVg2FSVm5mrwRlD3nXlX9A",
    },
    data: blogPostDataToAdd,
  };
  try {
    await axios.request(blogPostOptionsToAdd);
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
      "Content-Type": "plain/text",
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
