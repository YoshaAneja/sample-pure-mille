"use client";

import React from "react";
import Image from "next/image";
import CustomButton from "./CustomButton";
import { motion } from "framer-motion";
import {
  riseWithFade,
  staggerChildren,
  videoAnimation,
  wordAnimation,
} from "@/utils/animations";
const Hero = () => {
  const handleScroll = () => {};

  return (
    <>
      <motion.div className="hero" initial="initial" animate="animate">
        <div className="flex flex-1 pt-36 padding-x flex-col md:flex-row justify-between md:gap-5">
          <div>
            <motion.div className="hero__title mt-10" variants={riseWithFade}>
              Pure Mille
            </motion.div>
            <CustomButton
              title="Explore our Catalogue"
              containerStyles="bg-primary-brown text-white rounded-full mt-4"
              handleClick={handleScroll}
            />
          </div>
          <div className="leading-[150%] max-w-[380px] min-w-[250px] hero__subtitle md:self-end">
            {/* a pure millet company dedicated to sustainable nutrition */}
            <AnimatedWords title="harvesting health, sowing sustainability." />
            <AnimatedWords title=" a pure millet company dedicated to you." />
          </div>
        </div>
      </motion.div>
      <div className="max-h-[60vh] object-contain static overflow-hidden justify-center">
        <motion.video
          loop
          autoPlay
          muted
          playsInline
          className="sm:px-14 py-16 px-6"
          initial="initial"
          animate="animate"
          variants={videoAnimation}
        >
          <source src="/pure mille sample video.mp4" type="video/mp4" />
          Your browser does not support the video.
        </motion.video>
      </div>
    </>
  );
};

type AnimatedWordsProps = {
  title: string;
};
const AnimatedWords: React.FC<AnimatedWordsProps> = ({ title }) => {
  return (
    <motion.span variants={staggerChildren}>
      {title.split(" ").map((word, index) => (
        <div key={index} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block overflow-hidden"
            variants={wordAnimation}
          >
            {word + "\u00A0"}
          </motion.span>
        </div>
      ))}
    </motion.span>
  );
};

export default Hero;
