import React from "react";

import { StrictModeDroppable as Droppable } from "../ui/strictModeDropable";
import { TaskStatus, ITask } from "../../../utils/types/tasks.types";
import {
  StyledTasksList,
  TasksLength,
  TasksListHeader,
  TasksListTitle,
} from "../../../styles/Tasks/TasksList.styled";
import TaskItem from "./TaskItem";
import AddTask from "./AddTask";

interface TasksListProps {
  tasksList: ITask[];
  title: string;
  status: TaskStatus;
}

function TasksList({ tasksList, title, status }: TasksListProps) {
  return (
    <Droppable key={status} droppableId={status}>
      {(provided, snapshot) => (
        <StyledTasksList
          {...provided.droppableProps}
          ref={provided.innerRef}
          status={status}
        >
          <TasksListHeader>
            <TasksListTitle status={status}>{title}</TasksListTitle>

            <TasksLength status={status}>{tasksList.length} Tasks</TasksLength>
          </TasksListHeader>

          {tasksList.map((task, index) => (
            <TaskItem
              index={index}
              key={task.id}
              {...task}
              addMode={false}
              onExitAddMode={() => {}}
            />
          ))}

          <AddTask absolutePosition={snapshot.isDraggingOver} status={status} />

          {provided.placeholder}
        </StyledTasksList>
      )}
    </Droppable>
  );
}

export default TasksList;
