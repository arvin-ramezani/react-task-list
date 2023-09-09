import React from "react";
import { motion } from "framer-motion";
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
import {
  tasksLengthVariants,
  tasksLengthWrapperVariants,
} from "./TasksList.variants";

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

            <TasksLength
              variants={tasksLengthWrapperVariants}
              initial={"initial"}
              animate={"animate"}
              $status={status}
            >
              <motion.span
                key={`${status}-list-${tasksList.length}`}
                variants={tasksLengthVariants}
                initial={"initial"}
                animate={"animate"}
              >
                {tasksList.length}{" "}
              </motion.span>
              Tasks
            </TasksLength>
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
