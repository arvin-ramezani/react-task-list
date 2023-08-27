import React, { useState } from "react";

import {
  CustomCheckBox,
  StyledCheckBox,
  StyledLabel,
} from "../../../styles/ui/CheckBox.styled";
import { TaskStatus } from "../../../utils/types/tasks.types";

interface CheckBoxProps {
  name: string;
  status: TaskStatus;
  onChange: () => void;
  disabled?: boolean;
}

const CheckBox = ({ name, status, onChange, disabled }: CheckBoxProps) => {
  const [checked, setChecked] = useState(status === TaskStatus.DONE);

  const onChangeHandler = () => {
    if (disabled) return;

    setChecked((prev) => !prev);
    onChange();
  };

  return (
    <StyledLabel htmlFor={name} onClick={onChangeHandler} disabled={disabled}>
      <StyledCheckBox
        checked={checked}
        onChange={onChangeHandler}
        type="checkbox"
        id={name}
        name={name}
      />

      <CustomCheckBox status={status} />
    </StyledLabel>
  );
};

export default CheckBox;
