import React, { useEffect, useState } from "react";

import TasksList from "./TasksList";
import {
  StyledTasksSection,
  TasksContainer,
} from "../../../styles/TasksSections.styled";
import TaskListHeader from "./TaskListHeader";
import { SectionContainer } from "../../../styles/common/SectionContainer";
import { TaskStatus } from "../../../utils/types/tasks.types";
import { TASKS_LIST } from "../../../utils/dummy-data";
import { useTasks } from "./TasksContext";

function TasksSection() {
  const { addAllTasks, todoList, doingList, doneList } = useTasks();

  useEffect(() => {
    addAllTasks(TASKS_LIST);
  }, []);

  return (
    <StyledTasksSection>
      <SectionContainer>
        <TaskListHeader />

        <TasksContainer>
          <TasksList
            key="tasksListTodo"
            title="Todo"
            status={TaskStatus.TODO}
            tasksList={todoList}
          />
          <TasksList
            key="tasksListDoing"
            title="Doing 💪"
            status={TaskStatus.DOING}
            tasksList={doingList}
          />
          <TasksList
            key="tasksListDone"
            title="Done 🎉"
            status={TaskStatus.DONE}
            tasksList={doneList}
          />
        </TasksContainer>
      </SectionContainer>
    </StyledTasksSection>
  );
}

export default TasksSection;
