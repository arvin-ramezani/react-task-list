import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import {
  CustomCheckBox,
  MarkIcon,
  StyledCheckBox,
  StyledLabel,
} from "../../../styles/components/ui/CheckBox.styled";
import { TaskStatus } from "../../../utils/types/tasks.types";
import { checkboxMarkVariants, checkboxVariants } from "./Checkbox.variants";

interface CheckBoxProps {
  name: string;
  status: TaskStatus;
  onChange: () => void;
  disabled?: boolean;
  id?: string;
}

const CheckBox = ({ name, status, onChange, disabled, id }: CheckBoxProps) => {
  const [checked, setChecked] = useState(status === TaskStatus.DONE);

  const onChangeHandler = () => {
    if (disabled) return;

    setChecked((prev) => !prev);
    onChange();
  };

  useEffect(() => {
    setChecked(status === TaskStatus.DONE);
  }, [disabled]);

  return (
    <StyledLabel
      htmlFor={name}
      onClick={onChangeHandler}
      disabled={disabled}
      data-cy={`${status}-checkbox-${id}`}
    >
      <StyledCheckBox
        checked={checked}
        onChange={onChangeHandler}
        type="checkbox"
        id={name}
        name={name}
      />

      <CustomCheckBox
        as={motion.span}
        variants={checkboxVariants}
        initial={"initial"}
        animate={"animate"}
        whileHover={"hover"}
        whileTap={"tap"}
        checked={disabled ? false : checked}
        $status={status}
      />
      <AnimatePresence>
        {checked && (
          <MarkIcon
            as={motion.span}
            variants={checkboxMarkVariants}
            initial={"hidden"}
            animate={"show"}
            exit={"hidden"}
            transition={{ type: "spring", bounce: 0.8 }}
            $status={status}
            checked={checked}
          />
        )}
      </AnimatePresence>
    </StyledLabel>
  );
};

export default CheckBox;
