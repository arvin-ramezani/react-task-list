import React from "react";

import { ITask, TaskStatus } from "../../../utils/types/tasks.types";
import { StyledTaskItem, TaskItemText } from "../../../styles/TaskItem.styled";
import CheckBox from "../ui/CheckBox";
import { useTasks } from "./TasksContext";

interface TaskItemProps extends ITask {}

function TaskItem({ text, status, id }: TaskItemProps) {
  const { doneTask, undoneTask } = useTasks();

  const onTaskStatusChange = () => {
    if (status !== TaskStatus.DONE) {
      doneTask({ id, currentStatus: status });
    } else {
      console.log("undoneTask");
      undoneTask({ id });
    }
  };

  return (
    <StyledTaskItem>
      <div>
        <CheckBox
          onChange={onTaskStatusChange}
          name={`tasksItem${id}`}
          status={status}
        />
      </div>
      <TaskItemText status={status}>{text}</TaskItemText>
    </StyledTaskItem>
  );
}

export default TaskItem;
