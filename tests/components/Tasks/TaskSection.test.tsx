import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

<<<<<<< HEAD
import { renderTaskSectionWithProviders } from "../../testUtils/renderUtils";
=======
import { renderTaskSectionWithProviders } from "../../helpers/renderUtils";
>>>>>>> main
import { TaskStatus } from "../../../utils/types/tasks.types";
import { TASKS_LIST } from "../../../utils/dummy-data";

describe("<TaskSection />", () => {
  it("Should shows correct heading and subheadings", () => {
    const headingText = /task list/i;

    const firstSubHeadingText =
      /Break your life to simple tasks to get things done!/i;

    const secondSubHeadingText =
      /Does not matter how many tasks you done, It’s important to break to small tasks and be on progress./i;

    renderTaskSectionWithProviders();

    expect(
      screen.getByRole("heading", { name: headingText })
    ).toBeInTheDocument();

    expect(screen.getByText(firstSubHeadingText)).toBeInTheDocument();
    expect(screen.getByText(secondSubHeadingText)).toBeInTheDocument();
  });

  it("Should shows <TaskList /> for each Task Status Type", async () => {
    renderTaskSectionWithProviders();

    expect(
      await screen.findByRole("heading", { name: /todo/i })
    ).toBeInTheDocument();
    expect(
      await screen.findByRole("heading", { name: /doing/i })
    ).toBeInTheDocument();
    expect(
      await screen.findByRole("heading", { name: /done/i })
    ).toBeInTheDocument();
  });

  it("Should shows correct task items length in each status and corresponding tasks list", async () => {
    renderTaskSectionWithProviders();

    expect(
      await screen.findByRole("heading", { name: /todo/i })
    ).toBeInTheDocument();
    expect(
      await screen.findByRole("heading", { name: /doing/i })
    ).toBeInTheDocument();
    expect(
      await screen.findByRole("heading", { name: /done/i })
    ).toBeInTheDocument();

    const todoListLength = TASKS_LIST.filter(
      (t) => t.status === TaskStatus.TODO
    ).length;

    const todoList = await screen.findByLabelText(
      `${TaskStatus.TODO} tasks list`
    );

    const doingListLength = TASKS_LIST.filter(
      (t) => t.status === TaskStatus.DOING
    ).length;

    const doingList = await screen.findByLabelText(
      `${TaskStatus.DOING} tasks list`
    );

    const doneListLength = TASKS_LIST.filter(
      (t) => t.status === TaskStatus.DONE
    ).length;

    const doneList = await screen.findByLabelText(
      `${TaskStatus.DONE} tasks list`
    );

    expect(todoList).toBeInTheDocument();
    expect(doingList).toBeInTheDocument();
    expect(doneList).toBeInTheDocument();

    const todoItems = within(todoList).getAllByRole("button", {
      name: /todo/i,
    });

    const doingItems = within(doingList).getAllByRole("button", {
      name: /doing/i,
    });

    const doneItems = within(doneList).getAllByRole("button", {
      name: /done/i,
    });

    expect(todoItems).toHaveLength(todoListLength);
    expect(doingItems).toHaveLength(doingListLength);
    expect(doneItems).toHaveLength(doneListLength);
  });

  it("(Add Todo Task) - Should add new task item with correct status ", async () => {
    const user = userEvent.setup();
    renderTaskSectionWithProviders();

    const newTaskBtn = await within(
      await screen.findByLabelText(`${TaskStatus.TODO} tasks list`)
    ).findByRole("button", { name: /new/i });

    expect(newTaskBtn).toBeInTheDocument();

    await user.click(newTaskBtn);

    const newTaskText = "New Task";
    const textarea = screen.getByRole("textbox", { name: /new/i });
    await user.type(textarea, newTaskText);

    const addBtn = screen.getByRole("button", { name: /add/i });
    await user.click(addBtn);

    expect(await screen.findByText(newTaskText)).toBeInTheDocument();
  });

  it("Users can edit a todo", async () => {
    const user = userEvent.setup();
    renderTaskSectionWithProviders();

    const newTaskBtn = await within(
      await screen.findByLabelText(`${TaskStatus.TODO} tasks list`)
    ).findByRole("button", { name: /new/i });

    await user.click(newTaskBtn);

    const newTaskText = "New Edit Task";
    const textarea = screen.getByRole("textbox", { name: /new/i });
    await user.type(textarea, newTaskText);

    await user.click(screen.getByRole("button", { name: /add/i }));

    const taskText = await screen.findByText(newTaskText);

    await user.click(taskText);

    const editInput = await screen.findByRole("textbox", { name: /edit/i });
    await user.click(editInput);
    await user.clear(editInput);
    await user.type(editInput, "Edit Todo Task");

    const editBtn = screen.getByRole("button", { name: /edit/i });
    await user.click(editBtn);

    expect(await screen.findByText("Edit Todo Task")).toBeInTheDocument();
  });
});
