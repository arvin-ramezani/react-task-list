import React from "react";
import {
  render,
  screen,
  cleanup,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "styled-components";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import TaskItem from "../../../src/components/Tasks/TaskItem/TaskItem";
import { TASKS_LIST } from "../../../utils/dummy-data";
import GlobalStyle from "../../../styles/globalStyles";
import theme from "../../../styles/theme";
import { TasksContextProvider } from "../../../src/context/TasksContext";
import { initialTasksState } from "../../../src/context/tasksReducer";
import { ITask, TaskStatus } from "../../../utils/types/tasks.types";

import "jest-styled-components";

const renderWithProviders = (taskProp: ITask = TASKS_LIST[0]) => {
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

describe("<TaskItem />", () => {
  it("Should show correct task text and checkbox", async () => {
    renderWithProviders();

    const text = TASKS_LIST[0].text;

    const taskItemName =
      /Start with meditation, exercise & breakfast for a productive day/i;

    const taskItem = screen.getAllByRole("button", { name: taskItemName }); //TaskItem turns to button role via react-beautiful-dnd
    const taskText = screen.getByText(text);
    const checkbox = screen.getAllByRole("checkbox", { hidden: true });

    expect(taskItem).toHaveLength(1);
    expect(taskText).toBeInTheDocument();
    expect(checkbox).toHaveLength(1);
  });

  it("Should show close(*) icon button when user hovers,", async () => {
    const user = userEvent.setup();
    renderWithProviders();

    const taskItemName =
      /Start with meditation, exercise & breakfast for a productive day/i;

    const taskItem = screen.getByRole("button", { name: taskItemName }); //TaskItem turns to button role via react-beautiful-dnd

    expect(screen.queryByTestId("delete-icon")).not.toBeInTheDocument();

    await user.hover(taskItem);

    expect(screen.getByTestId("delete-icon")).toBeInTheDocument();
  });

  it("Should have checked checkbox and line-through style for 'done' task item", async () => {
    const taskItem = {
      ...TASKS_LIST[0],
      status: TaskStatus.DONE,
    };

    const { getByRole } = renderWithProviders(taskItem);

    const checkbox = getByRole("checkbox", { hidden: true });
    const taskText = screen.getByText(/start with meditation/i);

    expect(checkbox).toBeChecked();
    expect(taskText).toHaveStyleRule("text-decoration", "line-through");
  });

  it("Should not have checked checkbox and line-through style for 'todo' task item", async () => {
    renderWithProviders();

    const checkbox = screen.getByRole("checkbox", { hidden: true });
    const taskText = screen.getByText(/start with meditation/i);

    expect(checkbox).not.toBeChecked();
    expect(taskText).toHaveStyleRule("text-decoration", "none");
  });

  it("Should show textarea with one click on task text", async () => {
    const user = userEvent.setup();
    renderWithProviders();

    const taskText = TASKS_LIST[0].text;

    const taskTextEl = screen.getByText(/start with meditation/i);

    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();

    await user.click(taskTextEl);

    const textarea = screen.getByRole("textbox");
    const editButton = screen.getByRole("button", { name: "Edit" });
    const cancelEditButton = screen.getByRole("button", { name: "Cancel" });

    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveValue(taskText);
    expect(editButton).toBeInTheDocument();
    expect(cancelEditButton).toBeInTheDocument();
  });

  it("Should correctly edit the task item text", async () => {
    const user = userEvent.setup();
    renderWithProviders();

    const taskText = TASKS_LIST[0].text;

    const taskTextEl = screen.getByText(taskText);

    await user.click(taskTextEl);

    const editButton = screen.getByRole("button", { name: "Edit" });
    const cancelEditButton = screen.getByRole("button", { name: "Cancel" });
    const textarea = screen.getByRole("textbox");

    const addedTaskText = "it works";

    await user.click(textarea);
    await user.type(textarea, addedTaskText);

    const editedText = taskText + addedTaskText;
    expect(textarea).toHaveValue(editedText);

    await user.click(editButton);

    expect(
      screen.queryByRole("button", { name: "Edit" })
    ).not.toBeInTheDocument();

    expect(
      screen.queryByRole("button", { name: "Cancel" })
    ).not.toBeInTheDocument();

    // expect(screen.getByTestId("task text")).toHaveTextContent(editedText);
  });
});
