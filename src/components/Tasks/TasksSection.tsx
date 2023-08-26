import React, { useState } from "react";

import TasksList from "./TasksList";
import {
  StyledTasksSection,
  TasksContainer,
} from "../../../styles/TasksSections.styled";
import TaskListHeader from "./TaskListHeader";
import { SectionContainer } from "../../../styles/common/SectionContainer";
import { TaskStatus } from "../../../utils/types/tasks.types";
import { TASKS_LIST } from "../../../utils/dummy-data";

function TasksSection() {
  const [tasksList] = useState(
    TASKS_LIST.filter((t) => t.status === TaskStatus.TODO)
  );

  return (
    <StyledTasksSection>
      <SectionContainer>
        <TaskListHeader />

        <TasksContainer>
          <TasksList
            key="tasksListTodo"
            title="Todo"
            status={TaskStatus.TODO}
            tasksList={tasksList}
          />
          <TasksList
            key="tasksListDoing"
            title="Doing 💪"
            status={TaskStatus.DOING}
            tasksList={tasksList}
          />
          <TasksList
            key="tasksListDone"
            title="Done 🎉"
            status={TaskStatus.DONE}
            tasksList={tasksList}
          />
        </TasksContainer>
      </SectionContainer>
    </StyledTasksSection>
  );
}

export default TasksSection;
