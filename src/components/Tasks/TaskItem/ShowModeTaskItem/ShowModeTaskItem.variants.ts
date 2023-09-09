import { Variants } from "framer-motion";

export const textareaVariants: Variants = {
  hidden: { opacity: 0, y: -10 },
  show: { opacity: 1, y: 0 },
};

export const addTaskBtnVariants: Variants = {
  initial: { opacity: 0, x: -10 },
  animate: { opacity: 1, x: 0, scale: 1 },
  tap: { scale: 0.9, transition: { duration: 0.2 } },
  hover: { scale: 1.1 },
};

export const removeTaskBtnVariants: Variants = {
  hidden: { opacity: 0, x: -10, y: "-40%", scale: 0.5 },
  show: (isMobile) => {
    if (isMobile) return { opacity: 1, x: 0, y: "-50%", scale: 1 };

    return { opacity: 1, x: "-50%", y: "50%", scale: 1 };
  },
  tap: { scale: 0.9, transition: { duration: 0.2 } },
  hover: { scale: 1.4 },
};
