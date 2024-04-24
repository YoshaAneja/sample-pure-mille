"use client";

import { BlogProps } from "@/types";
import React, { Fragment } from "react";
import Image from "next/image";

import { Dialog, Transition } from "@headlessui/react";
var XMLHttpRequest = require("xhr2");
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface BlogDetailsProps {
  isOpen: boolean;
  closeModal: () => void;
  blogPost: BlogProps;
}

const BlogDetails = ({ isOpen, closeModal, blogPost }: BlogDetailsProps) => {
  const checkImageExists = (url: string) => {
    var http = new XMLHttpRequest();

    http.open("HEAD", url, false);
    http.send();

    return http.status != 404;
  };
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
                    <div className="relative w-full h-60">
                      <Image
                        src={blogPost.blog_image}
                        alt="millets"
                        fill
                        priority
                        className="object-cover rounded-2xl"
                      />
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col gap-2">
                    <h2 className="font-extrabold text-[24px]">
                      {blogPost.title}
                    </h2>
                    <h3>Author: {blogPost.author}</h3>
                    <h3>Tag: {blogPost.category}</h3>
                    <ReactMarkdown
                      className="markdown leading-7"
                      remarkPlugins={[remarkGfm]}
                    >
                      {blogPost.content}
                    </ReactMarkdown>
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

export default BlogDetails;
