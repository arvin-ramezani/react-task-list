import React from "react";

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

      <AddTask status={status} />
    </StyledTasksList>
  );
}

export default TasksList;
