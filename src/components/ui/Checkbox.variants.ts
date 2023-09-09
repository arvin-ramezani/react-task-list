import { Variants } from "framer-motion";

export const checkboxVariants: Variants = {
  initial: { opacity: 0, scale: 0 },
  animate: { opacity: 1, scale: 1 },
  hover: { scale: 1.1 },
  tap: { scale: 0.7 },
};

export const checkboxMarkVariants: Variants = {
  hidden: { scale: 0, x: "-50%", y: "-50%" },
  show: {
    scale: 1.2,
    x: "-50%",
    y: "-50%",
    rotate: "45deg",
  },
};
