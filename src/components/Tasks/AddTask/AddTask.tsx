import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";

import { TaskStatus } from "../../../../utils/types/tasks.types";
import {
  NewTaskBtn,
  StyledAddTask,
} from "../../../../styles/components/Tasks/AddTask.styled";
import TaskItem from "../TaskItem/TaskItem";
import { AddTaskBtnVariants } from "./AddTaskVar.variants";

interface AddTaskProps {
  status: TaskStatus;
  absolutePosition: boolean;
}

function AddTask({ status, absolutePosition }: AddTaskProps) {
  const [isAdding, setIsAdding] = useState(false);

  return (
    <StyledAddTask $absolute={absolutePosition ? "true" : "false"}>
      <AnimatePresence>
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
      </AnimatePresence>

      <NewTaskBtn
        variants={AddTaskBtnVariants}
        initial={"initial"}
        animate={"animate"}
        whileHover={"hover"}
        whileTap={"tap"}
        layout
        onClick={setIsAdding.bind(null, true)}
        $status={status}
        aria-label="new task"
      >
        <span>+</span>
        New
      </NewTaskBtn>
    </StyledAddTask>
  );
}

export default AddTask;
