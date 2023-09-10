import React, { useEffect } from "react";
import { ThemeProvider } from "styled-components";

import TaskSection from "./components/Tasks/TaskSection/TaskSection";
import GlobalStyle from "../styles/globalStyles";
import theme from "../styles/theme";
import { TasksContextProvider, useTasks } from "./context/TasksContext";
import { initialTasksState } from "./context/tasksReducer";

function App() {
  const tasksState = useTasks();

  return (
    <TasksContextProvider {...initialTasksState}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <TaskSection />
      </ThemeProvider>
    </TasksContextProvider>
  );
}

export default App;
