import React from "react";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import TaskItem from "../../src/components/Tasks/TaskItem/TaskItem";
import GlobalStyle from "../../styles/globalStyles";
import theme from "../../styles/theme";
import { TasksContextProvider } from "../../src/context/TasksContext";
import { TASKS_LIST } from "../../utils/dummy-data";
import { ITask, TaskStatus } from "../../utils/types/tasks.types";
import { initialTasksState } from "../../src/context/tasksReducer";
import AddTask from "../../src/components/Tasks/AddTask/AddTask";
import TasksList from "../../src/components/Tasks/TaskList/TasksList";
import TasksSection from "../../src/components/Tasks/TaskSection/TasksSection";

export const renderTaskItemWithProviders = (
  taskProp: ITask = TASKS_LIST[0]
) => {
  return render(
    <TasksContextProvider {...initialTasksState}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <DragDropContext onDragEnd={() => {}}>
          <Droppable droppableId="test">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <TaskItem {...taskProp} addMode={false} index={0} />
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </ThemeProvider>
    </TasksContextProvider>
  );
};

export const renderAddTaskWithProviders = (taskProp: ITask = TASKS_LIST[0]) => {
  return render(
    <TasksContextProvider {...initialTasksState}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <DragDropContext onDragEnd={() => {}}>
          <Droppable droppableId="test">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <AddTask status={TaskStatus.TODO} absolutePosition={false} />
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </ThemeProvider>
    </TasksContextProvider>
  );
};

export const renderTaskListWithProviders = ({
  title,
  taskList,
  status,
}: {
  title: string;
  taskList: ITask[];
  status: TaskStatus;
}) => {
  return render(
    <TasksContextProvider {...initialTasksState}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <DragDropContext onDragEnd={() => {}}>
          <TasksList
            key="tasksListTodo"
            title={title}
            status={status}
            tasksList={taskList}
          />
        </DragDropContext>
      </ThemeProvider>
    </TasksContextProvider>
  );
};

export const renderTaskSectionWithProviders = (
  title: string = "Todo",
  taskList: ITask[] = TASKS_LIST,
  status: TaskStatus = TaskStatus.TODO
) => {
  const filteredList = taskList.filter((t) => t.status === status);

  return render(
    <TasksContextProvider {...initialTasksState}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <TasksSection />
      </ThemeProvider>
    </TasksContextProvider>
  );
};
