import React from "react";

import {
  TasksListHeading,
  TasksListSubHeading,
  TasksListParagraph,
} from "../../../../styles/components/Tasks/TasksSections.styled";
import { StyledTasksListHeader } from "../../../../styles/components/Tasks/TasksSections.styled";

function TaskListHeader() {
  return (
    <StyledTasksListHeader>
      <TasksListHeading>✔️Task List</TasksListHeading>
      <TasksListSubHeading>
        Break your life to simple tasks to get things done!
      </TasksListSubHeading>
      <TasksListParagraph>
        Does not matter how many tasks you done, It’s important to break to
        small tasks and be on progress.
      </TasksListParagraph>
    </StyledTasksListHeader>
  );
}

export default TaskListHeader;
