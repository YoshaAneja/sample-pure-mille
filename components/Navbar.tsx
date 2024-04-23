"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { buttonAnimation } from "@/utils/animations";

import CustomButton from "./CustomButton";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const currentPath = usePathname();
  const router = useRouter();
  const handleScroll = () => {
    const nextSection = document.getElementById("products");
    if (currentPath === "/") {
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      router.push("/#products");
    }
  };
  const [menuOpen, setMenuOpen] = useState(false);
  const handleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="w-full absolute z-10 ">
      <nav className="w-full mx-auto flex justify-between items-center md:px-10 lg:px-22 xl:px-24 py-4 px-4">
        <Link href="/" className="flex justify-center items-center">
          <Image
            src="/logo.png"
            alt="Pure Millé Logo"
            width={150}
            height={18}
            className="object-contain"
          />
        </Link>
        <motion.div
          className="flex flex-row gap-7 max-sm:gap-5 items-center"
          initial="initial"
          animate="animate"
          variants={buttonAnimation}
        >
          <div className="flex max-sm:hidden flex-row gap-7">
            <Link
              href="/contact"
              className={
                currentPath === "/contact"
                  ? "flex justify-center items-center border-b  border-primary-brown transition-all text-primary-brown text-center max-[720px]:text-[13px]"
                  : "flex justify-center items-center  hover:text-primary-brown hover:border-b hover:scale-102 hover:border-primary-brown  transition-all text-center max-[720px]:text-[13px]"
              }
            >
              Contact Us
            </Link>
            <Link
              href="/recipes"
              className={
                currentPath === "/recipes"
                  ? "flex justify-center items-center border-b  border-primary-brown transition-all text-primary-brown text-center max-[720px]:text-[13px]"
                  : "flex justify-center items-center  hover:text-primary-brown hover:border-b hover:scale-102 hover:border-primary-brown  transition-all text-center max-[720px]:text-[13px]"
              }
            >
              Our Cookbook
            </Link>
            <Link
              href="/blog"
              className={
                currentPath === "/blog"
                  ? "flex justify-center items-center border-b  border-primary-brown transition-all text-primary-brown text-center max-[720px]:text-[13px]"
                  : "flex justify-center items-center  hover:text-primary-brown hover:border-b hover:scale-102 hover:border-primary-brown  transition-all text-center max-[720px]:text-[13px]"
              }
            >
              Why Pure Millé
            </Link>
          </div>
          <div
            className="sm:hidden cursor-pointer max-[420px]:mr-7 z-10"
            onClick={handleMenu}
          >
            <Image
              src="/menu.svg"
              width={40}
              height={40}
              alt="open menu"
              className={
                menuOpen
                  ? "opacity-0 absolute "
                  : "transition-opacity duration-500"
              }
            />
            <Image
              src="/close.svg"
              width={40}
              height={40}
              alt="open menu"
              className={
                menuOpen
                  ? "transition-opacity duration-500"
                  : "opacity-0 absolute"
              }
            />
          </div>
          <CustomButton
            title="Our Catalogue"
            btnType="button"
            containerStyles="text-primary-brown rounded-full  bg-primary-millet-200 min-w-[130px] cursor-pointer max-[720px]:text-sm max-[420px]:hidden"
            handleClick={handleScroll}
          />
        </motion.div>
        <div
          className={
            menuOpen
              ? "fixed left-0 top-0 w-[50%] sm:hidden h-screen bg-primary-wheat-100 ease-in duration-500 max-[420px]:w-[75%] shadow-2xl z-20"
              : "fixed left-[-100%] top-0 w-[50%] h-screen bg-primary-wheat-100 ease-in duration-500 md:hidden z-20"
          }
        >
          <div className="flex flex-col gap-10 mt-[80px] ml-10">
            <Link href="/contact" className="flex">
              <span
                className={
                  currentPath === "/contact"
                    ? "border-b  border-primary-brown transition-all text-primary-brown"
                    : "hover:text-primary-brown hover:border-b hover:scale-102 hover:border-primary-brown  transition-all"
                }
              >
                Contact Us
              </span>
            </Link>
            <Link href="/recipes" className="flex">
              <span
                className={
                  currentPath === "/recipes"
                    ? "border-b  border-primary-brown transition-all text-primary-brown"
                    : "hover:text-primary-brown hover:border-b hover:scale-102 hover:border-primary-brown  transition-all"
                }
              >
                Millet Recipes
              </span>
            </Link>
            <Link href="/blog" className="flex">
              <span
                className={
                  currentPath === "/blog"
                    ? "border-b border-primary-brown transition-all text-primary-brown"
                    : "transition-all"
                }
              >
                Why Pure Millé
              </span>
            </Link>
            <CustomButton
              title="Our Catalogue"
              btnType="button"
              containerStyles="text-primary-brown  bg-primary-millet-200 cursor-pointer min-[421px]:hidden max-w-fit rounded-full"
              handleClick={handleScroll}
            />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
