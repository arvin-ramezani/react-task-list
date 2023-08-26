import React from "react";
import TasksSection from "./components/Tasks/TasksSection";
import GlobalStyle from "../styles/globalStyles";
import { ThemeProvider } from "styled-components";
import theme from "../utils/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <TasksSection />
    </ThemeProvider>
  );
}

export default App;
