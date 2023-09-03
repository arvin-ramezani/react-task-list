import { ITask, TaskStatus } from "../tasks.types";
import { IInitialTasksState } from "../tasksReducer.types";

export type GetAddTaskStateType = (
  state: IInitialTasksState,
  payload: { text: string; status: TaskStatus }
) => IInitialTasksState;

export type GetDoneTaskStateType = (
  state: IInitialTasksState,
  id: ITask["id"]
) => IInitialTasksState;

export type GetUndoneTaskStateType = (
  state: IInitialTasksState,
  id: ITask["id"]
) => IInitialTasksState;

export type GetEditTaskStateType = (
  state: IInitialTasksState,
  { id, text }: Omit<ITask, "status">
) => IInitialTasksState;

export type GetDeleteTaskStateType = (
  state: IInitialTasksState,
  id: number
) => IInitialTasksState;

export type GetDragDropStateType = (
  state: IInitialTasksState,
  {
    sourceStatus,
    sourceIndex,
    destinationStatus,
    destinationIndex,
  }: {
    sourceStatus: TaskStatus;
    sourceIndex: number;
    destinationStatus: TaskStatus;
    destinationIndex: number;
  }
) => IInitialTasksState;
