import {
  GetAddTaskStateType,
  GetDeleteTaskStateType,
  GetDoneTaskStateType,
  GetDragDropStateType,
  GetEditTaskStateType,
  GetUndoneTaskStateType,
} from "../types/helpers/taskReducerHandler.types";
import { ITask, TaskStatus } from "../types/tasks.types";
import { IInitialTasksState } from "../types/tasksReducer.types";
import { createId } from "./createId";

export const getDragDropState: GetDragDropStateType = (
  state,
  { sourceStatus, sourceIndex, destinationStatus, destinationIndex }
) => {
  const draggedList = [...state[`${sourceStatus}List`]];
  const droppedList = [...state[`${destinationStatus}List`]];

  const [removedSourceTask] = draggedList.splice(sourceIndex, 1);

  if (sourceStatus === destinationStatus) {
    draggedList.splice(destinationIndex, 0, removedSourceTask);

    return {
      ...state,
      [`${sourceStatus}List`]: draggedList,
    };
  } else {
    const taskToDrop = {
      ...removedSourceTask,
      status: destinationStatus,
    };

    droppedList.splice(destinationIndex, 0, taskToDrop);

    let dragDropState: IInitialTasksState;

    return (dragDropState = {
      ...state,
      [`${sourceStatus}List`]: draggedList,
      [`${destinationStatus}List`]: droppedList,
    });
  }
};

export const getAddTaskState: GetAddTaskStateType = (
  state,
  { text, status }
) => {
  const taskToAdd: ITask = {
    id: createId(),
    text,
    status,
  };

  const newState = {
    ...state,
    [`${status}List`]: [...state[`${status}List`], taskToAdd],
  };

  return newState;
};

export const getDoneTaskState: GetDoneTaskStateType = (state, id) => {
  let { todoList, doingList, doneList } = state;

  const taskToDone = [...todoList, ...doingList].find((t) => t.id === id);

  if (!taskToDone) return state;

  const newDoneList = [{ ...taskToDone, status: TaskStatus.DONE }, ...doneList];

  if (taskToDone.status === TaskStatus.TODO) {
    const newTodoList = todoList.filter((t) => t.id !== id);
    return {
      ...state,
      todoList: newTodoList,
      doneList: newDoneList,
    };
  }

  if (taskToDone.status === TaskStatus.DOING) {
    const newDoingList = doingList.filter((t) => t.id !== id);
    return {
      ...state,
      doingList: newDoingList,
      doneList: newDoneList,
    };
  }

  return { ...state };
};

export const getUndoneTaskState: GetUndoneTaskStateType = (
  state,
  taskId: number
) => {
  const taskToUndone = state.doneList.find((t) => t.id === taskId);

  if (!taskToUndone) return { ...state };

  const updatedDoneList = state.doneList.filter(
    (t) => t.id !== taskToUndone.id
  );

  const updatedTodoList = [
    {
      id: taskToUndone.id,
      text: taskToUndone.text,
      status: TaskStatus.TODO,
    },
    ...state.todoList,
  ];

  return { ...state, todoList: updatedTodoList, doneList: updatedDoneList };
};

export const getEditTaskState: GetEditTaskStateType = (state, { id, text }) => {
  const taskToEdit = [
    ...state.todoList,
    ...state.doneList,
    ...state.doingList,
  ].find((t) => t.id === id);

  if (!taskToEdit) return state;

  taskToEdit.text = text;

  if (taskToEdit.status === TaskStatus.TODO) {
    return {
      ...state,
      todoList: state.todoList.map((t) => (t.id === id ? taskToEdit : t)),
    };
  }

  if (taskToEdit.status === TaskStatus.DOING) {
    return {
      ...state,
      doingList: state.doingList.map((t) => (t.id === id ? taskToEdit : t)),
    };
  }

  if (taskToEdit.status === TaskStatus.DONE) {
    return {
      ...state,
      doneList: state.doneList.map((t) => (t.id === id ? taskToEdit : t)),
    };
  }

  return state;
};

export const getDeleteTaskState: GetDeleteTaskStateType = (state, id) => {
  const taskToDelete = [
    ...state.todoList,
    ...state.doneList,
    ...state.doingList,
  ].find((t) => t.id === id);

  if (!taskToDelete) return state;

  const newState = getFilteredState({ state, status: taskToDelete.status, id });

  return { ...newState };
};

function getFilteredState({
  state,
  status,
  id,
}: {
  state: IInitialTasksState;
  status: TaskStatus;
  id: ITask["id"];
}) {
  return {
    ...state,
    [`${status}List`]: state[`${status}List`].filter((t) => t.id !== id),
  };
}
