import { animate, stagger } from "framer-motion";

export const riseWithFade = {
  initial: {
    y: 100,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      ease: [0.6, 0.01, 0.06, 0.85],
      duration: 1,
    },
  },
};

export const videoAnimation = {
  initial: {
    y: 100,
    opacity: 0,
    scale: 0.85,
  },
  animate: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      ease: [0.6, 0.01, 0.06, 0.95],
      duration: 1.3,
    },
  },
};

export const buttonAnimation = {
  initial: {
    y: 100,
    opacity: 0,
    scale: 0.85,
  },
  animate: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      ease: [0.6, 0.01, 0.06, 0.95],
      duration: 1.3,
    },
  },
};

export const staggerChildren = {
  animate: {
    transition: {
      delayChildren: 0.5,
      staggerChildren: 0.1,
    },
  },
};

export const wordAnimation = {
  initial: {
    y: 100,
  },
  animate: {
    y: 10,
    transition: {
      ease: [0.6, 0.01, 0.06, 0.95],
      duration: 0.7,
    },
  },
};
