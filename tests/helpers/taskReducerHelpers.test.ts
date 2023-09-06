import {
  getAddTaskState,
  getDeleteTaskState,
  getDoneTaskState,
  getDragDropState,
  getEditTaskState,
  getUndoneTaskState,
} from "../../utils/helpers/taskReducerHelpers";
import { TaskStatus } from "../../utils/types/tasks.types";
import { getTestState } from "../testUtils/getTestState";

describe("getDragDropState(state, payload)", () => {
  it("should remove dragged item from previous index and add it into provided index of list and return new state.", () => {
    const testState = getTestState();

    const taskToDrag = testState.todoList.find((t) => t.id === 2); // index 1

    const dragDropEvent = {
      sourceStatus: taskToDrag!.status,
      sourceIndex: 1,
      destinationStatus: TaskStatus.DOING,
      destinationIndex: 1,
    };

    const newState = getDragDropState(testState, dragDropEvent);
    const expectedDroppedTask = { ...taskToDrag, status: TaskStatus.DOING };

    expect(newState.todoList).toHaveLength(2);
    expect(newState.todoList[1]).not.toEqual(expectedDroppedTask);

    expect(newState.doingList).toHaveLength(3);
    expect(newState.doingList[1]).toEqual(expectedDroppedTask);
  });

  it("should replace and change the dragged item inside a list to new index provided - (last item should be dragged dropped to the top of the list", () => {
    const testState = getTestState();

    const dragDropList = testState.todoList;
    const taskToDrag = testState.todoList.find((t) => t.id === 3); //index 2

    const dragDropEvent = {
      sourceStatus: taskToDrag!.status,
      sourceIndex: 2,
      destinationStatus: taskToDrag!.status,
      destinationIndex: 0,
    };

    const newState = getDragDropState(testState, dragDropEvent);

    expect(newState.todoList[0].id).toBe(3);
    expect(newState.todoList[1].id).toBe(1);
    expect(newState.todoList[2].id).toBe(2);
  });
});

describe("getAddTaskState(state, payload)", () => {
  it("should create new task, create id and add it in the end of list", () => {
    const testState = getTestState();

    const newTaskPayload = {
      text: "New Task",
      status: TaskStatus.TODO,
    };

    const newState = getAddTaskState(testState, newTaskPayload);

    expect(newState.todoList).toHaveLength(testState.todoList.length + 1);
    expect(newState.todoList.pop()?.text).toBe(newTaskPayload.text);
  });
});

describe("getDoneTaskState(state, payload)", () => {
  it("should change the state of a given task and put it to the top of Done list and remove it from previous list", () => {
    const testState = getTestState();

    const taskToDone = testState.todoList[0];

    const newState = getDoneTaskState(testState, taskToDone.id);

    const donnedTask = {
      ...taskToDone,
      status: TaskStatus.DONE,
    };

    expect(newState.todoList[0].id).not.toBe(taskToDone.id);
    expect(newState.doneList).toHaveLength(testState.doneList.length + 1);
    expect(newState.doneList[0]).toEqual(donnedTask);
  });
});

describe("getUndoneTaskState(state, payload", () => {
  it("should change the state to Todo and put it to the top of Doing list and remove it from Done list", () => {
    const testState = getTestState();

    const taskToUndone = testState.doneList[0];

    const newState = getUndoneTaskState(testState, taskToUndone.id);

    expect(
      newState.doneList.find((t) => t.id === taskToUndone.id)
    ).toBeUndefined();

    expect(newState.todoList[0]).toEqual({
      ...taskToUndone,
      status: TaskStatus.TODO,
    });
  });
});

describe("getEditTaskState(state, payload", () => {
  it("should edit the text of task", () => {
    const testState = getTestState();

    const taskToEdit = testState.doneList[0];

    const editText = "New Done Task...";

    const newState = getEditTaskState(testState, {
      id: taskToEdit.id,
      text: editText,
    });

    expect(newState.doneList[0]).toEqual({
      ...taskToEdit,
      text: editText,
    });
  });
});

describe("getDeleteTaskState(state, payload)", () => {
  it("should delete a task item by provided id", () => {
    const testState = getTestState();

    const taskToDelete = testState.doingList[0];

    const newState = getDeleteTaskState(testState, taskToDelete.id);

    expect(
      [...newState.todoList, ...newState.doingList, ...newState.doneList].find(
        (t) => t.id === taskToDelete.id
      )
    ).toBeUndefined();

    expect(newState.doingList).toHaveLength(testState.doingList.length - 1);
  });
});
