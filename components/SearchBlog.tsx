"use client";

import { SearchBlogProps } from "@/types";
import React, { useState, Fragment } from "react";
import Image from "next/image";
import { Combobox, Transition } from "@headlessui/react";
import { categories } from "@/constants";

const SearchBlog = ({ category, setCategory }: SearchBlogProps) => {
  const [query, setQuery] = useState("");
  const filteredBlogPosts =
    query === ""
      ? categories
      : categories.filter((category) =>
          category
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );
  return (
    <div className="search-type">
      <Combobox value={category} onChange={setCategory}>
        <div className="relative w-full">
          <Combobox.Button className="absolute top-[14px]">
            <Image
              src="/millet-svg.svg"
              width={20}
              height={20}
              className="ml-4"
              alt="millet icon"
            />
          </Combobox.Button>
          <Combobox.Input
            className="search-type__input w-full"
            placeholder="Health"
            displayValue={(type: string) => type}
            onChange={(e) => setQuery(e.target.value)}
          />

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10">
              {filteredBlogPosts.map((blogPost) => (
                <Combobox.Option
                  key={blogPost}
                  className={({ active }) =>
                    `relative search-type__option ${
                      active ? "bg-primary-rose text-white" : "text-gray-900"
                    }`
                  }
                  value={blogPost}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {blogPost}
                      </span>
                      {selected ? (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                            active ? "text-white" : "primary-millet"
                          }`}
                        ></span>
                      ) : null}
                    </>
                  )}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};

export default SearchBlog;
