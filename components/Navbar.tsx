"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { buttonAnimation } from "@/utils/animations";

import CustomButton from "./CustomButton";

const Navbar = () => {
  const handleScroll = () => {
    const nextSection = document.getElementById("products");

    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <header className="w-full absolute z-10">
      <nav className="max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4">
        <Link href="/" className="flex justify-center items-center">
          <Image
            src="/logo.png"
            alt="Pure Mille Logo"
            width={150}
            height={18}
            className="object-contain"
          />
        </Link>
        <motion.div
          className="flex flex-row gap-7"
          initial="initial"
          animate="animate"
          variants={buttonAnimation}
        >
          <Link href="/contact" className="flex justify-center items-center">
            Contact Us
          </Link>
          <Link href="/recipes" className="flex justify-center items-center">
            Millet Recipes
          </Link>
          <Link href="/blog" className="flex justify-center items-center">
            Why Pure Mille
          </Link>
          <CustomButton
            title="Our Catalogue"
            btnType="button"
            containerStyles="text-primary-brown rounded-full  bg-primary-millet-200 min-w-[130px] cursor-pointer"
            handleClick={handleScroll}
          />
        </motion.div>
      </nav>
    </header>
  );
};

export default Navbar;
