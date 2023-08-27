import React from "react";
import { ThemeProvider } from "styled-components";

import TasksSection from "./components/Tasks/TasksSection";
import GlobalStyle from "../styles/globalStyles";
import theme from "../utils/theme";
import {
  TasksContextProvider,
  initialTasksState,
} from "./components/Tasks/TasksContext";

function App() {
  return (
    <TasksContextProvider
      todoList={initialTasksState.todoList}
      doingList={initialTasksState.doingList}
      doneList={initialTasksState.doneList}
    >
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <TasksSection />
      </ThemeProvider>
    </TasksContextProvider>
  );
}

export default App;
