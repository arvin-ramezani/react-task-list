import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

<<<<<<< HEAD
import { renderTaskListWithProviders } from "../../testUtils/renderUtils";
=======
import { renderTaskListWithProviders } from "../../helpers/renderUtils";
>>>>>>> main
import { TaskStatus } from "../../../utils/types/tasks.types";
import { TASKS_LIST } from "../../../utils/dummy-data";

describe("<TaskList />", () => {
  it("Should shows heading with with provided 'title' prop", async () => {
    const taskListTitle = "Todo";

    renderTaskListWithProviders({
      title: taskListTitle,
      taskList: [],
      status: TaskStatus.TODO,
    });

    expect(
      await screen.findByRole("heading", {
        name: new RegExp(taskListTitle, "i"),
      })
    ).toBeInTheDocument();
  });

  it("Should shows length of taskList, default is 3 toto task", async () => {
    const taskListTitle = "Todo";
    const todoTaskList = TASKS_LIST.filter((t) => t.status === TaskStatus.TODO); // default length: 3*(todo)

    renderTaskListWithProviders({
      title: taskListTitle,
      taskList: todoTaskList,
      status: TaskStatus.TODO,
    });

    expect(await screen.findByText(/3/i)).toBeInTheDocument();
  });

  it("Should shows provided task items. (Done Tasks)", async () => {
    const taskListTitle = "Done";
    const status = TaskStatus.DONE;

    const doneList = TASKS_LIST.filter((t) => t.status === status);

    renderTaskListWithProviders({
      title: taskListTitle,
      taskList: doneList,
      status,
    });

    const renderedTaskList = await screen.findAllByRole("button", {
      name: /task item/i,
    }); //TaskItem turns to button role via react-beautiful-dnd

    expect(renderedTaskList).toHaveLength(2);
  });

  it("Should shows provided task items. (Doing Tasks)", async () => {
    const taskListTitle = "Doing";
    const status = TaskStatus.DOING;

    const doingList = TASKS_LIST.filter((t) => t.status === status);

    renderTaskListWithProviders({
      title: taskListTitle,
      taskList: doingList,
      status,
    });

    const renderedTaskList = await screen.findAllByRole("button", {
      name: /task item/i,
    }); //TaskItem turns to button role via react-beautiful-dnd

    expect(renderedTaskList).toHaveLength(2);
  });

  it("Should shows 'checkbox' for all task items (Done Tasks)", async () => {
    const taskListTitle = "Done";
    const status = TaskStatus.DONE;

    const doneList = TASKS_LIST.filter((t) => t.status === status);

    renderTaskListWithProviders({
      title: taskListTitle,
      taskList: doneList,
      status,
    });

    const renderedTaskList = await screen.findAllByRole("checkbox", {
      hidden: true,
    }); //TaskItem turns to button role via react-beautiful-dnd

    expect(renderedTaskList).toHaveLength(2);
  });

  it("Should shows 'new task' button for add task items (Doing Tasks)", async () => {
    const taskListTitle = "Doing";
    const status = TaskStatus.DOING;

    const doingList = TASKS_LIST.filter((t) => t.status === status);

    renderTaskListWithProviders({
      title: taskListTitle,
      taskList: doingList,
      status,
    });

    expect(
      await screen.findByRole("button", { name: /new/i })
    ).toBeInTheDocument();
  });

  it("Should shows textarea with empty value and ready to type after clicking 'new' (Doing Tasks)", async () => {
    const user = userEvent.setup();

    const taskListTitle = "Doing";
    const status = TaskStatus.DOING;

    const doingList = TASKS_LIST.filter((t) => t.status === status);

    renderTaskListWithProviders({
      title: taskListTitle,
      taskList: doingList,
      status,
    });

    const addTaskBtn = await screen.findByRole("button", { name: /new/i });

    await user.click(addTaskBtn);

    expect(
      await screen.findByRole("textbox", { name: "newTask" })
    ).toBeInTheDocument();
    expect(await screen.findByRole("textbox", { name: "newTask" })).toHaveValue(
      ""
    );
  });

  it("Should shows empty 'textarea', 'Cancel' and 'Add' buttons after clicking 'new' (Doing Tasks)", async () => {
    const user = userEvent.setup();

    const taskListTitle = "Doing";
    const status = TaskStatus.DOING;

    const doingList = TASKS_LIST.filter((t) => t.status === status);

    renderTaskListWithProviders({
      title: taskListTitle,
      taskList: doingList,
      status,
    });

    const addTaskBtn = await screen.findByRole("button", { name: /new/i });

    await user.click(addTaskBtn);

    expect(
      await screen.findByRole("textbox", { name: "newTask" })
    ).toBeInTheDocument();
    expect(await screen.findByRole("textbox", { name: "newTask" })).toHaveValue(
      ""
    );

    expect(
      await screen.findByRole("button", { name: /cancel/i })
    ).toBeInTheDocument();

    expect(
      await screen.findByRole("button", { name: /add/i })
    ).toBeInTheDocument();
  });

  it("Users can types for adding new Doing Task after open it (Doing Tasks)", async () => {
    const user = userEvent.setup();

    const taskListTitle = "Doing";
    const status = TaskStatus.DOING;

    const doingList = TASKS_LIST.filter((t) => t.status === status);

    renderTaskListWithProviders({
      title: taskListTitle,
      taskList: doingList,
      status,
    });

    const addTaskBtn = await screen.findByRole("button", { name: /new/i });

    await user.click(addTaskBtn);

    const textarea = await screen.findByRole("textbox", { name: "newTask" });
    const newTaskText = "new doing task";

    await user.type(textarea, newTaskText);

    expect(await screen.findByRole("textbox", { name: "newTask" })).toHaveValue(
      newTaskText
    );
  });
});
