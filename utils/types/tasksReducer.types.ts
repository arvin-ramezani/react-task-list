import { ITask, TaskStatus } from "./tasks.types";

export interface IInitialTasksState {
  todoList: ITask[];
  doingList: ITask[];
  doneList: ITask[];
  waitList: ReducerActionType[];
  isDragging: boolean;
}

export enum TasksReducerActionTypes {
  SET_STATE = "setState",
  ADD_ALL_TASKS = "addAllTasks",
  DONE_TASK = "doneTask",
  UNDONE_TASK = "unDoneTask",
  EDIT_TASK = "editTask",
  DELETE_TASK = "deleteTask",
  ADD_TASK = "addTask",
  SET_TODO_LIST = "setTodoList",
  SET_DOING_LIST = "setDoingList",
  SET_DONE_LIST = "setDoneList",
  DRAG_DROP = "dragDrop",
  SET_IS_DRAGGING = "setIsDragging",
  CLEAR_WAIT_LIST = "clearWaitList",
}

export interface ISetStateActionPayload {
  type: TasksReducerActionTypes.SET_STATE;
  payload: IInitialTasksState;
}

export interface IAddAllTasksActionPayload {
  type: TasksReducerActionTypes.ADD_ALL_TASKS;
  payload:
    | Omit<IInitialTasksState, "isDragging" | "waitList">
    | IInitialTasksState;
}

export interface IDoneTaskActionPayload {
  type: TasksReducerActionTypes.DONE_TASK;
  payload: { id: ITask["id"]; currentStatus: TaskStatus };
}

export interface IUndoneTaskActionPayload {
  type: TasksReducerActionTypes.UNDONE_TASK;
  payload: { id: ITask["id"] };
}

export interface IEditTaskActionPayload {
  type: TasksReducerActionTypes.EDIT_TASK;
  payload: { id: ITask["id"]; text: ITask["text"] };
}

export interface IDeleteTaskActionPayload {
  type: TasksReducerActionTypes.DELETE_TASK;
  payload: { id: ITask["id"] };
}

export interface IAddTaskActionPayload {
  type: TasksReducerActionTypes.ADD_TASK;
  payload: { status: TaskStatus; text: ITask["text"] };
}

export interface IDragDropActionPayload {
  type: TasksReducerActionTypes.DRAG_DROP;
  payload: {
    sourceStatus: TaskStatus;
    sourceIndex: number;
    destinationStatus: TaskStatus;
    destinationIndex: number;
  };
}

export interface ISetIsDraggingActionPayload {
  type: TasksReducerActionTypes.SET_IS_DRAGGING;
  payload: { isDragging: boolean };
}

export interface IClearWaitListActionPayload {
  type: TasksReducerActionTypes.CLEAR_WAIT_LIST;
  payload: IInitialTasksState["waitList"];
}

export type ReducerActionType =
  | ISetStateActionPayload
  | IAddAllTasksActionPayload
  | IDoneTaskActionPayload
  | IUndoneTaskActionPayload
  | IEditTaskActionPayload
  | IDeleteTaskActionPayload
  | IAddTaskActionPayload
  | IDragDropActionPayload
  | ISetIsDraggingActionPayload
  | IClearWaitListActionPayload;
