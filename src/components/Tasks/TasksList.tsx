import React from "react";

import { TaskStatus, ITask } from "../../../utils/types/tasks.types";
import {
  NewTaskBtn,
  StyledTasksList,
  TasksLength,
  TasksListHeader,
  TasksListTitle,
} from "../../../styles/TasksList.styled";
import TaskItem from "./TaskItem";

interface TasksListProps {
  tasksList: ITask[];
  title: string;
  status: TaskStatus;
}

function TasksList({ tasksList, title, status }: TasksListProps) {
  return (
    <StyledTasksList status={status}>
      <TasksListHeader>
        <TasksListTitle status={status}>{title}</TasksListTitle>

        <TasksLength status={status}>{tasksList.length} Tasks</TasksLength>
      </TasksListHeader>

      <div>
        {tasksList.map((task) => (
          <TaskItem key={task.id} {...task} />
        ))}
      </div>

      <NewTaskBtn status={status}>
        <span>+</span>
        New
      </NewTaskBtn>
    </StyledTasksList>
  );
}

export default TasksList;
