import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { TASKS_LIST } from "../../../utils/dummy-data";
import { TaskStatus } from "../../../utils/types/tasks.types";
import { renderTaskItemWithProviders } from "../../helpers/renderUtils";

import "jest-styled-components";

describe("<TaskItem />", () => {
  it("Should show correct task text and checkbox", async () => {
    renderTaskItemWithProviders();

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
    renderTaskItemWithProviders();

    const taskItemName =
      /Start with meditation, exercise & breakfast for a productive day/i;

    const taskItem = screen.getByRole("button", { name: taskItemName }); //TaskItem turns to button role via react-beautiful-dnd

    await user.hover(taskItem);

    expect(screen.getByTestId("delete-icon")).toBeInTheDocument();
  });

  it("Should have checked checkbox and line-through style for 'done' task item", async () => {
    const taskItem = {
      ...TASKS_LIST[0],
      status: TaskStatus.DONE,
    };

    const { getByRole } = renderTaskItemWithProviders(taskItem);

    const checkbox = getByRole("checkbox", { hidden: true });
    const taskText = screen.getByText(/start with meditation/i);

    expect(checkbox).toBeChecked();
    expect(taskText).toHaveStyleRule("text-decoration", "line-through");
  });

  it("Should not have checked checkbox and line-through style for 'todo' task item", async () => {
    renderTaskItemWithProviders();

    const checkbox = screen.getByRole("checkbox", { hidden: true });
    const taskText = screen.getByText(/start with meditation/i);

    expect(checkbox).not.toBeChecked();
    expect(taskText).toHaveStyleRule("text-decoration", "none");
  });

  it("Should show textarea with value of task text, Edit and Cancel buttons with one click on task text", async () => {
    const user = userEvent.setup();
    renderTaskItemWithProviders();

    const taskText = TASKS_LIST[0].text;

    const taskTextEl = screen.getByText(/start with meditation/i);

    await user.click(taskTextEl);

    const textarea = screen.getByRole("textbox");
    const editButton = screen.getByRole("button", { name: "Edit" });
    const cancelEditButton = screen.getByRole("button", { name: "Cancel" });

    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveValue(taskText);
    expect(editButton).toBeInTheDocument();
    expect(cancelEditButton).toBeInTheDocument();
  });

  it("Can show textarea and get the user typed value", async () => {
    const user = userEvent.setup();
    renderTaskItemWithProviders();

    const taskText = TASKS_LIST[0].text;

    const taskTextEl = screen.getByText(taskText);

    await user.click(taskTextEl);

    const editButton = screen.getByRole("button", { name: "Edit" });
    const cancelButton = screen.getByRole("button", { name: "Cancel" });
    const textarea = screen.getByRole("textbox");

    const addedTaskText = "it works";

    await user.click(textarea);
    await user.type(textarea, addedTaskText);

    const editedText = taskText + addedTaskText;
    expect(textarea).toHaveValue(editedText);

    expect(editButton).toBeInTheDocument();

    expect(editButton).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
  });
});
