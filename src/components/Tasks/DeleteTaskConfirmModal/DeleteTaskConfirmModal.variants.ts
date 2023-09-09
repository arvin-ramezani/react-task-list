import { Variants } from "framer-motion";

export const deleteTaskConfirmModalVariants: Variants = {
  hidden: { opacity: 0, x: "40%", scale: 0 },
  show: {
    opacity: 1,
    x: 0,
    scale: 1.05,
    transition: { duration: 0.3, type: "spring", bounce: 0.3 },
  },
  exit: { opacity: 0, x: "20%", scale: 0.4 },
};

export const deleteTaskBtnVariants: Variants = {
  initial: { opacity: 0, scale: 1 },
  animate: { opacity: 1 },
  hover: { scale: 1.1 },
  tap: { scale: 0.5 },
};
