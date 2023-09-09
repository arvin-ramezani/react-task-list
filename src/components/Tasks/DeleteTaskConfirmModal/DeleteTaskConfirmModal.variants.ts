import { Variants } from "framer-motion";

export const deleteTaskConfirmModalVariants: Variants = {
  hidden: { opacity: 0, x: "-10%", scale: 0.4 },
  show: { opacity: 1, x: 0, scale: 1.1 },
  exit: { opacity: 0, x: "-20%", scale: 0.4 },
};
