"use client";

import React from "react";
import Image from "next/image";
import { CustomButtonProps } from "@/types";
import { motion } from "framer-motion";
import { buttonAnimation } from "@/utils/animations";
const CustomButton = ({
  title,
  btnType,
  containerStyles,
  textStyles,
  rightIcon,
  handleClick,
}: CustomButtonProps) => {
  return (
    <motion.button
      disabled={false}
      type={btnType || "button"}
      className={`custom-btn ${containerStyles}`}
      onClick={handleClick}
      initial="initial"
      animate="animate"
      variants={buttonAnimation}
    >
      <span className={`flex-1 ${textStyles}`}>{title}</span>
      {rightIcon && (
        <div className="relative w-6 h-6">
          <Image
            src={rightIcon}
            alt="right icon"
            fill
            className="object-contain"
          />
        </div>
      )}
    </motion.button>
  );
};

export default CustomButton;
