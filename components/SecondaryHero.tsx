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
import { SecondaryHeroProps } from "@/types";

const SecondaryHero = ({
  title,
  subtitle,
  subtitle2,
  image,
  scrollToID,
  buttonText,
  imageAlt,
}: SecondaryHeroProps) => {
  const handleScroll = () => {
    const nextSection = document.getElementById(`${scrollToID}`);

    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.div className="hero" initial="initial" animate="animate">
        <div className="flex flex-1 pt-32 padding-x flex-col justify-between gap-10 ">
          <div>
            <motion.div className="hero__title mt-10" variants={riseWithFade}>
              {title}
            </motion.div>
            <div className="leading-[150%] lg:max-w-[57vw] min-w-[250px] hero__subtitle md:self-end">
              <AnimatedWords title={subtitle} />
            </div>
            {subtitle2 && (
              <div className="leading-[150%] lg:max-w-[55vw] min-w-[250px] hero__subtitle md:self-end">
                <AnimatedWords title={subtitle2} />
              </div>
            )}
            {buttonText && (
              <CustomButton
                title={buttonText}
                containerStyles="bg-primary-rose text-white rounded-full mt-10"
                handleClick={handleScroll}
              />
            )}
          </div>
          {/* {image && (
            <div className="relative w-[100%] md:h-[600px] flex flex-col">
              <motion.img
                src={`/${image}`}
                // objectFit="cover"
                // className="relative"
                alt={imageAlt}
                variants={videoAnimation}
              />
            </div>
          )} */}
        </div>
      </motion.div>
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

export default SecondaryHero;
