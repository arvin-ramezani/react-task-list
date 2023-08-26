import React from "react";

import {
  CustomCheckBox,
  StyledCheckBox,
  StyledLabel,
} from "../../../styles/ui/CheckBox.styled";
import { TaskStatus } from "../../../utils/types/tasks.types";

interface CheckBoxProps {
  name: string;
  status: TaskStatus;
}

const CheckBox = ({ name, status }: CheckBoxProps) => {
  return (
    <StyledLabel htmlFor={name}>
      <StyledCheckBox type="checkbox" id={name} name={name} />

      <CustomCheckBox status={status} />
    </StyledLabel>
  );
};

export default CheckBox;
