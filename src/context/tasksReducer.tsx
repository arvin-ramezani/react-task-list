import { saveToLocalStorage } from "../../utils/helpers/localStorage";
import {
  getAddTaskState,
  getDeleteTaskState,
  getDoneTaskState,
  getDragDropState,
  getEditTaskState,
  getUndoneTaskState,
} from "../../utils/helpers/taskReducerHandlers";
import { LocalStorageDataName } from "../../utils/types/common.types";
import {
  IInitialTasksState,
  ReducerActionType,
  TasksReducerActionTypes,
} from "../../utils/types/tasksReducer.types";

export const initialTasksState: IInitialTasksState = {
  todoList: [],
  doingList: [],
  doneList: [],
  waitList: [],
  isDragging: false,
};

export const tasksReducer = (
  state: IInitialTasksState,
  { payload, type }: ReducerActionType
): IInitialTasksState => {
  switch (type) {
    case TasksReducerActionTypes.SET_STATE:
      return { ...payload };

    case TasksReducerActionTypes.ADD_ALL_TASKS:
      let addAllState: IInitialTasksState;

      addAllState = {
        ...state,
        todoList: payload.todoList,
        doingList: payload.doingList,
        doneList: payload.doneList,
      };

      saveToLocalStorage(LocalStorageDataName.TASKS, addAllState);
      return addAllState;

    case TasksReducerActionTypes.DONE_TASK:
      if (state.isDragging) {
        const newState = {
          ...state,

          waitList: [...state.waitList, { type, payload }],
        };

        return newState;
      }

      const doneState = getDoneTaskState(state, payload.id);

      saveToLocalStorage(LocalStorageDataName.TASKS, {
        ...state,
        ...doneState,
      });

      return { ...state, ...doneState };

    case TasksReducerActionTypes.UNDONE_TASK:
      if (state.isDragging) {
        const undoneState = {
          ...state,

          waitList: [...state.waitList, { type, payload }],
        };

        return undoneState;
      }

      const undoneState = getUndoneTaskState(state, payload.id);

      saveToLocalStorage(LocalStorageDataName.TASKS, undoneState);
      return undoneState;

    case TasksReducerActionTypes.EDIT_TASK:
      const editedState = getEditTaskState(state, payload);

      saveToLocalStorage(LocalStorageDataName.TASKS, editedState);
      return editedState;

    case TasksReducerActionTypes.DELETE_TASK:
      const deleteState = getDeleteTaskState(state, payload.id);

      saveToLocalStorage(LocalStorageDataName.TASKS, deleteState);
      return deleteState;

    case TasksReducerActionTypes.ADD_TASK:
      const addState = getAddTaskState(state, {
        text: payload.text,
        status: payload.status,
      });

      saveToLocalStorage(LocalStorageDataName.TASKS, addState);
      return addState;

    case TasksReducerActionTypes.DRAG_DROP:
      const { sourceStatus, sourceIndex, destinationStatus, destinationIndex } =
        payload;

      const dragDropState = getDragDropState(state, {
        sourceStatus,
        sourceIndex,
        destinationStatus,
        destinationIndex,
      });

      saveToLocalStorage(LocalStorageDataName.TASKS, dragDropState);
      return dragDropState;

    case TasksReducerActionTypes.SET_IS_DRAGGING:
      const idDraggingState = { ...state, isDragging: payload.isDragging };

      saveToLocalStorage(LocalStorageDataName.TASKS, idDraggingState);
      return idDraggingState;

    case TasksReducerActionTypes.CLEAR_WAIT_LIST:
      let clearWaitListState: IInitialTasksState = { ...state };

      if (state.waitList.length >= 0) {
        clearWaitListState = {
          ...state,
          waitList: state.waitList.slice(
            state.waitList.length,
            state.waitList.length + 1
          ),
        };
      }

      saveToLocalStorage(LocalStorageDataName.TASKS, clearWaitListState);
      return clearWaitListState;

    default:
      throw new Error("Invalid action type!");
  }
};
