"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import Image from "next/image";
import SearchProduct from "./SearchProduct";
import SearchRecipe from "./SearchRecipe";

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

const SearchBarRecipes = () => {
  const [titleContains, setTitleContains] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (titleContains === "") {
      return alert("Please fill in the search bar");
    }
    updateSearchParams(titleContains);
  };

  const updateSearchParams = (titleContain: string) => {
    const searchParams = new URLSearchParams(window.location.search);

    if (titleContains) {
      searchParams.set("in_recipe", titleContains);
    } else {
      searchParams.delete("in_recipe");
    }

    const newPathname = `${
      window.location.pathname
    }?${searchParams.toString()}`;

    router.push(newPathname);
  };

  return (
    <form className="searchbar" onSubmit={handleSearch}>
      <div className="searchbar__item">
        <SearchRecipe
          titleContains={titleContains}
          setTitleContains={setTitleContains}
        />
        <SearchButton otherClasses="" />
      </div>
    </form>
  );
};

export default SearchBarRecipes;
