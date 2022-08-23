import { Variants } from "framer-motion";

export const shiftIn: Variants = {
  hidden: {
    opacity: 0,
    x: "50vw",
  },
  visible: {
    opacity: 1,

    x: 0,
    transition: {
      duration: 1.5,
      type: "spring",
    },
  },
  exit: {
    opacity: 0,
    x: "-50vw",
    transition: {
      duration: 1,
      ease: "easeInOut",
    },
  },
};

export const popUp: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.3,
    translateY: "-2rem",
  },
  visible: {
    opacity: 1,
    scale: 1,
    height: "3rem",
    translateY: 0,
    transition: {
      duration: 0.65,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    scale: 0.3,
    height: 0,
    marginTop: "-4px",

    transition: {
      duration: 0.65,
      ease: "easeOut",
    },
  },
};
