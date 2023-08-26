import React from "react";

import { ITask } from "../../../utils/types/tasks.types";
import { StyledTaskItem, TaskItemText } from "../../../styles/TaskItem.styled";
import CheckBox from "../ui/CheckBox";

interface TaskItemProps extends ITask {}

function TaskItem({ text, status, id }: TaskItemProps) {
  return (
    <StyledTaskItem>
      <div>
        <CheckBox name={`tasksItem${id}`} status={status} />
      </div>
      <TaskItemText status={status}>{text}</TaskItemText>
    </StyledTaskItem>
  );
}

export default TaskItem;
