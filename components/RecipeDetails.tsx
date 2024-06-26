"use client";

import { MilletProps, RecipeProps } from "@/types";
import React, { Fragment, useState } from "react";
import Image from "next/image";

import { Dialog, Transition } from "@headlessui/react";
var XMLHttpRequest = require("xhr2");
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface RecipeDetailsProps {
  isOpen: boolean;
  closeModal: () => void;
  recipe: RecipeProps;
  milletType: MilletProps;
}

const RecipeDetails = ({
  isOpen,
  closeModal,
  recipe,
  milletType,
}: RecipeDetailsProps) => {
  const checkImageExists = (url: string) => {
    var http = new XMLHttpRequest();

    http.open("HEAD", url, false);
    http.send();

    return http.status != 404;
  };

  const [activeImage, setActiveImage] = useState(recipe.primary_image);
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-primary-brown bg-opacity-25" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-500"
                enterFrom="opacity-0 scale-90"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200 scale-100"
                leaveFrom="opacity-100 scale-95"
                leaveTo="opacity-0"
              >
                <Dialog.Panel className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto transform rounded-2xl bg-white p-6 text-left shadow-xl transition-all flex flex-col gap-5">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="absolute top-2 right-2 z-10 w-fit p-2 bg-primary-millet-100 rounded-full"
                  >
                    <Image
                      src="/close.svg"
                      alt="close"
                      width={20}
                      height={20}
                      className="object-contain"
                    />
                  </button>
                  <div className="flex-1 flex flex-col gap-3">
                    <div className="relative w-full h-56 bg-pattern bg-cover bg-center rounded-2xl">
                      <Image
                        src={activeImage || "/.png"}
                        alt="millets"
                        fill
                        priority
                        className="object-cover rounded-2xl"
                        onClick={() => {
                          setActiveImage(recipe.primary_image || "");
                        }}
                      />
                    </div>
                    <div className="flex gap-3">
                      {recipe.secondary_images?.map((secondaryImage) => {
                        if (
                          checkImageExists(secondaryImage) &&
                          secondaryImage !== ""
                        ) {
                          return (
                            <div className="flex-1 relative w-full h-24 bg-primary-millet-100">
                              <Image
                                src={secondaryImage}
                                alt={recipe.title}
                                fill
                                priority
                                className="object-contain"
                                onClick={() => {
                                  setActiveImage(secondaryImage);
                                }}
                              />
                            </div>
                          );
                        }
                      })}
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col gap-4">
                    <h2 className="font-extrabold text-[24px]">
                      {recipe.title}
                    </h2>
                    <h3>Cooking Time: {recipe.cooking_time}</h3>
                    <ReactMarkdown
                      className="markdown leading-7"
                      remarkPlugins={[remarkGfm]}
                    >
                      {recipe.instructions}
                    </ReactMarkdown>
                    <div className="flex flex-wrap gap-4">
                      <div>
                        <h4 className="text-primary-brown font-bold mb-2 text-[20px]">
                          Made with: {milletType.millet_type} Millet
                        </h4>
                        <br />
                        <p>{milletType.millet_description}</p>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default RecipeDetails;
