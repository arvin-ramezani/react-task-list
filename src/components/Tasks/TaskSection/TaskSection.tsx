import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { Variants } from "framer-motion";

import TasksList from "../TaskList/TasksList";
import { TasksContainer } from "../../../../styles/components/Tasks/TasksSections.styled";
import TaskListHeader from "../TaskSectionHeader/TaskSectionHeader";
import { SectionContainer } from "../../../../styles/components/common/SectionContainer";
import { TaskStatus } from "../../../../utils/types/tasks.types";
import TasksSectionLogic from "./TaskSectionLogic";

export const taskListContainerVariants: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 1 },
  },
};

function TaskSection() {
  const { dragEndHandler, dragStartHandler, todoList, doingList, doneList } =
    TasksSectionLogic();

  return (
    <>
      <TaskListHeader />
      <SectionContainer>
        <TasksContainer
          variants={taskListContainerVariants}
          initial={"initial"}
          animate={"animate"}
        >
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
    </>
  );
}

export default TaskSection;
