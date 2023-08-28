import React, { useState } from "react";

import { TaskStatus } from "../../../utils/types/tasks.types";
import {
  NewTaskBtn,
  StyledAddTask,
} from "../../../styles/Tasks/AddTask.styled";
import TaskItem from "./TaskItem";

interface AddTaskProps {
  status: TaskStatus;
  absolutePosition: boolean;
}

function AddTask({ status, absolutePosition }: AddTaskProps) {
  const [isAdding, setIsAdding] = useState(false);

  return (
    <StyledAddTask $absolute={absolutePosition ? "true" : "false"}>
      {isAdding && (
        <TaskItem
          key={`newTask${status}`}
          status={status}
          text=""
          id={0}
          addMode
          onExitAddMode={setIsAdding.bind(null, false)}
        />
      )}

      <NewTaskBtn onClick={setIsAdding.bind(null, true)} $status={status}>
        <span>+</span>
        New
      </NewTaskBtn>
    </StyledAddTask>
  );
}

export default AddTask;
