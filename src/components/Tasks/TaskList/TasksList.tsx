import React from "react";

import { StrictModeDroppable as Droppable } from "../../DragDrop/strictModeDroppable";
import { TaskStatus, ITask } from "../../../../utils/types/tasks.types";
import {
  StyledTasksList,
  TasksLength,
  TasksListHeader,
  TasksListTitle,
} from "../../../../styles/components/Tasks/TasksList.styled";
import TaskItem from "../TaskItem/TaskItem";
import AddTask from "../AddTask/AddTask";

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
          $status={status}
          aria-label={`${status} tasks list`}
          data-cy={`${status}-list`}
        >
          <TasksListHeader>
            <TasksListTitle $status={status}>{title}</TasksListTitle>

            <TasksLength $status={status}>{tasksList.length} Tasks</TasksLength>
          </TasksListHeader>

          {tasksList.map((task, index) => (
            <TaskItem index={index} key={task.id} {...task} addMode={false} />
          ))}

          <AddTask absolutePosition={snapshot.isDraggingOver} status={status} />

          {provided.placeholder}
        </StyledTasksList>
      )}
    </Droppable>
  );
}

export default TasksList;
