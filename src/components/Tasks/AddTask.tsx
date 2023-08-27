import React, { useState } from "react";

import { TaskStatus } from "../../../utils/types/tasks.types";
import { NewTaskBtn } from "../../../styles/Tasks/AddTask.styled";
import TaskItem from "./TaskItem";

interface AddTaskProps {
  status: TaskStatus;
}

function AddTask({ status }: AddTaskProps) {
  const [isAdding, setIsAdding] = useState(false);

  return (
    <div>
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

      <NewTaskBtn onClick={setIsAdding.bind(null, true)} status={status}>
        <span>+</span>
        New
      </NewTaskBtn>
    </div>
  );
}

export default AddTask;
