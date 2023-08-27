import React, { useEffect, useRef, useState } from "react";

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
}

const CheckBox = ({ name, status, onChange }: CheckBoxProps) => {
  const [checked, setChecked] = useState(status === TaskStatus.DONE);

  const onChangeHandler = () => {
    setChecked((prev) => !prev);
    onChange();
  };

  return (
    <StyledLabel htmlFor={name} onClick={onChangeHandler}>
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
