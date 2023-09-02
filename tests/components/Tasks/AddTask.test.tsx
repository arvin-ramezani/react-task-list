import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { TASKS_LIST } from "../../../utils/dummy-data";
import { TaskStatus } from "../../../utils/types/tasks.types";
import {
  renderAddTaskWithProviders,
  renderTaskItemWithProviders,
} from "../../helpers/renderUtils";

describe("<AddTask />", () => {
  it("Should show a button to add a task", () => {
    renderAddTaskWithProviders();

    // expect(screen.getByText("New")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /new/i })).toBeInTheDocument();
  });

  it("Should show an input with Cancel and add buttons", async () => {
    const user = userEvent.setup();
    renderAddTaskWithProviders();

    await user.click(screen.getByRole("button", { name: /new/i }));

    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /add/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument();
  });

  it("Can show textarea and get the user typed value", async () => {
    const user = userEvent.setup();
    renderAddTaskWithProviders();

    const newTaskText = "Task Item Text";

    await user.click(screen.getByRole("button", { name: /new/i }));
    await user.type(screen.getByRole("textbox"), newTaskText);

    expect(screen.getByRole("textbox")).toHaveValue(newTaskText);
  });
});
