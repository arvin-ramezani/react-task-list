import React from "react";
import { TaskStatus, ITask } from "../../../utils/types/tasks.types";
import { StyledTasksList } from "../../../styles/TasksList.styled";

interface TasksList {
  name: TaskStatus;
  taskList: ITask[];
}

function TasksList() {
  return <StyledTasksList>TaskList</StyledTasksList>;
}

export default TasksList;
