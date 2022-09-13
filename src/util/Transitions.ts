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
      duration: 1.5,
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
      duration: 0.55,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    scale: 0.3,
    marginTop: "-40px",
    transition: {
      duration: 0.45,
      ease: "easeOut",
    },
  },
};

export const noPopUp: Variants = {
  hidden: {},
  visible: {
    opacity: 1,
    scale: 1,
    height: "3rem",
    translateY: 0,
  },
  exit: {},
};
