"use client";

import { MilletProps, ProductProps } from "@/types";
import React, { Fragment, useState } from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Dialog, Transition } from "@headlessui/react";
var XMLHttpRequest = require("xhr2");

interface ProductDetailsProps {
  isOpen: boolean;
  closeModal: () => void;
  product: ProductProps;
  milletType: MilletProps;
}

const ProductDetails = ({
  isOpen,
  closeModal,
  product,
  milletType,
}: ProductDetailsProps) => {
  const checkImageExists = (url: string) => {
    var http = new XMLHttpRequest();

    http.open("HEAD", url, false);
    http.send();

    return http.status != 404;
  };
  const [activeImage, setActiveImage] = useState(
    String(product.primary_image_url)
  );

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
                  <div className="flex-1 flex flex-col gap-3 ">
                    <div className="relative w-full bg-pattern bg-cover bg-center rounded-lg h-80">
                      <Image
                        src={activeImage || "/.png"}
                        alt="millets"
                        fill
                        priority
                        className="object-contain cursor-pointer"
                        onClick={() => {
                          setActiveImage(product.primary_image_url || "");
                        }}
                      />
                    </div>
                    <div className="flex gap-3">
                      {product.secondary_images?.map((secondaryImage) => {
                        if (checkImageExists(secondaryImage)) {
                          return (
                            <div className="flex-1 relative w-full h-24 bg-primary-millet-100">
                              <Image
                                alt={product.product_name}
                                fill
                                priority
                                className="object-contain cursor-pointer"
                                onClick={() => {
                                  setActiveImage(secondaryImage);
                                }}
                                src={secondaryImage}
                              />
                            </div>
                          );
                        }
                      })}
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col gap-2">
                    <h2 className="font-semibold text-xl capitalize">
                      {product.product_name}
                    </h2>
                    <div className="mt-3 flex flex-wrap gap-4">
                      <div>
                        <h4 className="text-primary-brown capitalize font-bold mb-2">
                          Why Choose {product.product_name}
                        </h4>
                        <p className="text-grey font-[16px]">
                          <ReactMarkdown className="markdown">
                            {product.product_description}
                          </ReactMarkdown>
                        </p>
                      </div>
                      <div>
                        <h4 className="text-primary-brown capitalize font-bold mb-2">
                          Made with: {milletType.millet_type} Millet
                        </h4>
                        <p className="text-grey">
                          {milletType.millet_description}
                        </p>
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

export default ProductDetails;
