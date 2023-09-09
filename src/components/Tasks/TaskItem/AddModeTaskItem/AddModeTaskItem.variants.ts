import { Variants } from "framer-motion";

export const addModeTaskItemVariants: Variants = {
  hidden: { opacity: 0, y: -50 },
  show: { opacity: 1, y: 0 },
  exit: { opacity: 0 },
};

export const AddTaskBtnVariants: Variants = {
  initial: { opacity: 0, x: -10 },
  animate: {
    opacity: 1,
    x: 0,
    scale: 1,
  },
  tap: {
    scale: 0.9,
    transition: { type: "spring", bounce: 0.8 },
  },
  hover: { scale: 1.1 },
};
