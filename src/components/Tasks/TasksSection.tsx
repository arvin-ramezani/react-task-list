import React, { useEffect, useState } from "react";
import { DragDropContext, OnDragEndResponder } from "react-beautiful-dnd";

import TasksList from "./TasksList";
import {
  StyledTasksSection,
  TasksContainer,
} from "../../../styles/Tasks/TasksSections.styled";
import TaskListHeader from "./TaskListHeader";
import { SectionContainer } from "../../../styles/common/SectionContainer";
import { ITask, TaskStatus } from "../../../utils/types/tasks.types";
import { TASKS_LIST } from "../../../utils/dummy-data";
import { useTasks } from "../../context/TasksContext";

function TasksSection() {
  const {
    addAllTasks,
    todoList,
    doingList,
    doneList,
    dragDropHandler,
    setIsDragging,
  } = useTasks();

  const onDragStart = () => setIsDragging({ isDragging: true });

  const onDragEnd: OnDragEndResponder = (result) => {
    const { source, destination } = result;

    if (!destination) return setIsDragging({ isDragging: false });

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return setIsDragging({ isDragging: false });

    const sourceStatus = source.droppableId as TaskStatus;
    const destinationStatus = destination.droppableId as TaskStatus;
    const sourceIndex = source.index;
    const destinationIndex = destination.index;

    dragDropHandler({
      sourceStatus,
      destinationStatus,
      sourceIndex,
      destinationIndex,
    });

    setIsDragging({ isDragging: false });
  };

  useEffect(() => {
    addAllTasks(TASKS_LIST);
  }, []);

  return (
    <StyledTasksSection>
      <SectionContainer>
        <TaskListHeader />

        <TasksContainer>
          <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
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

export default TasksSection;
