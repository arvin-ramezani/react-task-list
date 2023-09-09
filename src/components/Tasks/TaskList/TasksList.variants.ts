import { Variants } from "framer-motion";

export const tasksLengthWrapperVariants: Variants = {
  initial: { opacity: 0.4 },
  animate: { opacity: 1 },
};

export const tasksLengthVariants: Variants = {
  initial: { x: -5, y: 5, scale: 0.4 },
  animate: {
    x: 0,
    y: 0,
    scale: [0, 1.5, 1],
    transition: { duration: 0.3, type: "spring", bounce: 0.3, stiffness: 800 },
  },
};
