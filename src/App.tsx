import React from "react";
import { ThemeProvider } from "styled-components";

import TasksSection from "./components/Tasks/TaskSection/TasksSection";
import GlobalStyle from "../styles/globalStyles";
import theme from "../styles/theme";
import { TasksContextProvider } from "./context/TasksContext";
import { initialTasksState } from "./context/tasksReducer";

function App() {
  return (
    <TasksContextProvider {...initialTasksState}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <TasksSection />
      </ThemeProvider>
    </TasksContextProvider>
  );
}

export default App;
