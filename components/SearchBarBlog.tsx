"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import Image from "next/image";
import SearchProduct from "./SearchProduct";
import SearchRecipe from "./SearchRecipe";
import SearchBlog from "./SearchBlog";

const SearchButton = ({ otherClasses }: { otherClasses: string }) => (
  <button type="submit" className={`-ml-3 z-10 ${otherClasses}`}>
    <Image
      src="/magnifying-glass.svg"
      alt="magnifying glass"
      width={40}
      height={40}
      className="object-contain"
    />
  </button>
);

const SearchBarBlog = () => {
  const [category, setCategory] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (category === "") {
      return alert("Please fill in the search bar");
    }
    updateSearchParams(category);
  };

  const updateSearchParams = (category: string) => {
    const searchParams = new URLSearchParams(window.location.search);

    if (category) {
      searchParams.set("category", category);
    } else {
      searchParams.delete("category");
    }

    const newPathname = `${
      window.location.pathname
    }?${searchParams.toString()}`;

    router.push(newPathname);
  };

  return (
    <form className="searchbar-blog" onSubmit={handleSearch}>
      <div className="searchbar__item">
        <SearchBlog category={category} setCategory={setCategory} />
        <SearchButton otherClasses="" />
      </div>
    </form>
  );
};

export default SearchBarBlog;
