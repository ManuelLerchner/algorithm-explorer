import { Variants } from "framer-motion";

export const pageVariant: Variants = {
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
