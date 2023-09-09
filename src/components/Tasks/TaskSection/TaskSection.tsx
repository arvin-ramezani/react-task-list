import React from "react";
import { DragDropContext } from "react-beautiful-dnd";

import TasksList from "../TaskList/TasksList";
import {
  StyledTasksSection,
  TasksContainer,
} from "../../../../styles/components/Tasks/TasksSections.styled";
import TaskListHeader from "../TaskSectionHeader/TaskSectionHeader";
import { SectionContainer } from "../../../../styles/components/common/SectionContainer";
import { TaskStatus } from "../../../../utils/types/tasks.types";
import TasksSectionLogic from "./TaskSectionLogic";

function TaskSection() {
  const { dragEndHandler, dragStartHandler, todoList, doingList, doneList } =
    TasksSectionLogic();

  return (
    <StyledTasksSection>
      <SectionContainer>
        <TaskListHeader />

        <TasksContainer>
          <DragDropContext
            onDragStart={dragStartHandler}
            onDragEnd={dragEndHandler}
          >
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
          </DragDropContext>
        </TasksContainer>
      </SectionContainer>
    </StyledTasksSection>
  );
}

export default TaskSection;
