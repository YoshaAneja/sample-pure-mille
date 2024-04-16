"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import SearchType from "./SearchType";
import Image from "next/image";
import SearchProduct from "./SearchProduct";

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

const SearchBar = () => {
  const [type, setType] = useState("");
  const [product, setProduct] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (type === "" && product === "") {
      return alert("Please fill in the search bar");
    }
    updateSearchParams(type, product);
  };

  const updateSearchParams = (type: string, product: string) => {
    const searchParams = new URLSearchParams(window.location.search);

    if (type) {
      searchParams.set("type", type);
    } else {
      searchParams.delete("type");
    }

    if (product) {
      searchParams.set("product", product);
    } else {
      searchParams.delete("product");
    }

    const newPathname = `${
      window.location.pathname
    }?${searchParams.toString()}`;

    router.push(newPathname);
  };

  return (
    <form className="searchbar" onSubmit={handleSearch}>
      <div className="searchbar__item">
        <SearchType type={type} setType={setType} />
        <SearchButton otherClasses="sm:hidden" />
      </div>
      <div className="fixed searchbar__item">
        <SearchProduct product={product} setProduct={setProduct} />
        <SearchButton otherClasses="sm:hidden" />
      </div>
      <SearchButton otherClasses="max-sm:hidden" />
    </form>
  );
};

export default SearchBar;
