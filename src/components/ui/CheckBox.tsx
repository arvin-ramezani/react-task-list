import React, { useEffect, useState } from "react";

import {
  CustomCheckBox,
  StyledCheckBox,
  StyledLabel,
} from "../../../styles/ui/CheckBox.styled";
import { TaskStatus } from "../../../utils/types/tasks.types";
import { useTasks } from "../../context/TasksContext";

interface CheckBoxProps {
  name: string;
  status: TaskStatus;
  onChange: () => void;
  disabled?: boolean;
  isDragging: boolean;
}

const CheckBox = ({
  name,
  status,
  onChange,
  disabled,
  isDragging,
}: CheckBoxProps) => {
  const { isDragging: sss } = useTasks();
  const [checked, setChecked] = useState(status === TaskStatus.DONE);

  const onChangeHandler = () => {
    if (disabled) return;

    setChecked((prev) => !prev);
    onChange();
  };

  useEffect(() => {
    setChecked(status === TaskStatus.DONE);
  }, [disabled]);

  useEffect(() => {
    return () => setChecked(status === TaskStatus.DONE);
  }, [sss]);

  return (
    <StyledLabel htmlFor={name} onClick={onChangeHandler} disabled={disabled}>
      <StyledCheckBox
        checked={checked}
        onChange={onChangeHandler}
        type="checkbox"
        id={name}
        name={name}
      />

      <CustomCheckBox checked={disabled ? false : checked} $status={status} />
    </StyledLabel>
  );
};

export default CheckBox;
