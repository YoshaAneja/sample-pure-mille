"use client";

import React from "react";
import Image from "next/image";
import CustomButton from "./CustomButton";
import { motion } from "framer-motion";
import { riseWithFade, videoAnimation } from "@/utils/animations";
const Hero = () => {
  const handleScroll = () => {};

  return (
    <>
      <motion.div className="hero" initial="initial" animate="animate">
        <div className="flex flex-1 pt-36 padding-x flex-col md:flex-row justify-between md:gap-5">
          <div>
            <h1 className="hero__title">PureMille</h1>
            <CustomButton
              title="Explore our Catalogue"
              containerStyles="bg-primary-brown text-white rounded-full mt-4"
              handleClick={handleScroll}
            />
          </div>
          <motion.div
            className="leading-[150%] max-w-[380px] min-w-[250px] hero__subtitle md:self-end"
            variants={riseWithFade}
          >
            a pure millet company dedicated to sustainable nutrition
          </motion.div>
        </div>
      </motion.div>
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
        Your browser does not support the video tag.
      </motion.video>
    </>
  );
};

export default Hero;
