import { Variants } from "framer-motion";

export const AddTaskBtnVariants: Variants = {
  initial: { opacity: 0, x: -10 },
  animate: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.8 } },
  tap: { scale: 0.9 },
  hover: { scale: 1.1 },
};
