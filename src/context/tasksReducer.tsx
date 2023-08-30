import { createId } from "../../utils/helpers/createId";
import { saveToLocalStorage } from "../../utils/helpers/localStorage";
import { LocalStorageDataName } from "../../utils/types/common.types";
import { ITask, TaskStatus } from "../../utils/types/tasks.types";
import {
  IInitialTasksState,
  ReducerActionType,
  TasksReducerActionTypes,
} from "../../utils/types/tasksReducer.types";

export const initialTasksState: IInitialTasksState = {
  todoList: [],
  doingList: [],
  doneList: [],
  isDragging: false,
};

export const tasksReducer = (
  state: IInitialTasksState,
  { payload, type }: ReducerActionType
): IInitialTasksState => {
  switch (type) {
    case TasksReducerActionTypes.SET_STATE:
      console.log("reducer");

      return { ...payload };

    case TasksReducerActionTypes.ADD_ALL_TASKS:
      state = {
        ...state,
        todoList: payload.filter((t) => t.status === TaskStatus.TODO),
        doingList: payload.filter((t) => t.status === TaskStatus.DOING),
        doneList: payload.filter((t) => t.status === TaskStatus.DONE),
      };

      saveToLocalStorage(LocalStorageDataName.TASKS, state);
      return { ...state };

    case TasksReducerActionTypes.DONE_TASK:
      // Todo: Save to waitList
      if (state.isDragging) return state;

      let { todoList, doingList, doneList } = state;

      const taskToDone = [...todoList, ...doingList].find(
        (t) => t.id === payload.id
      );

      if (!taskToDone) return state;

      taskToDone.status = TaskStatus.DONE;

      if (payload.currentStatus === TaskStatus.TODO) {
        todoList = todoList.filter((t) => t.id !== payload.id);
      }

      if (payload.currentStatus === TaskStatus.DOING) {
        doingList = doingList.filter((t) => t.id !== payload.id);
      }

      doneList.unshift(taskToDone);

      state = {
        ...state,
        todoList,
        doingList,
        doneList,
      };

      saveToLocalStorage(LocalStorageDataName.TASKS, state);
      return state;

    case TasksReducerActionTypes.UNDONE_TASK:
      if (state.isDragging) return state;

      const taskToUndone = state.doneList.find((t) => t.id === payload.id);

      if (!taskToUndone) return state;

      state.doneList = state.doneList.filter((t) => t.id !== taskToUndone.id);

      state.todoList.unshift({ ...taskToUndone, status: TaskStatus.TODO });

      saveToLocalStorage(LocalStorageDataName.TASKS, state);
      return state;

    case TasksReducerActionTypes.EDIT_TASK:
      const taskToEdit = [
        ...state.todoList,
        ...state.doneList,
        ...state.doingList,
      ].find((t) => t.id === payload.id);

      if (!taskToEdit) return state;

      taskToEdit.text = payload.text;

      if (taskToEdit.status === TaskStatus.TODO) {
        state.todoList.forEach((t) => {
          t.id === taskToEdit.id ? taskToEdit : t;
        });
      }

      if (taskToEdit.status === TaskStatus.DOING) {
        state.doingList.forEach((t) => {
          t.id === taskToEdit.id ? taskToEdit : t;
        });
      }

      if (taskToEdit.status === TaskStatus.DONE) {
        state.doneList.forEach((t) => {
          t.id === taskToEdit.id ? taskToEdit : t;
        });
      }

      state = { ...state };

      saveToLocalStorage(LocalStorageDataName.TASKS, state);
      return state;

    case TasksReducerActionTypes.DELETE_TASK:
      const taskToDelete = [
        ...state.todoList,
        ...state.doneList,
        ...state.doingList,
      ].find((t) => t.id === payload.id);

      if (!taskToDelete) return state;

      if (taskToDelete.status === TaskStatus.TODO) {
        state.todoList = state.todoList.filter((t) => t.id !== taskToDelete.id);
      }

      if (taskToDelete.status === TaskStatus.DOING) {
        state.doingList = state.doingList.filter(
          (t) => t.id !== taskToDelete.id
        );
      }

      if (taskToDelete.status === TaskStatus.DONE) {
        state.doneList = state.doneList.filter((t) => t.id !== taskToDelete.id);
      }

      state = { ...state };

      saveToLocalStorage(LocalStorageDataName.TASKS, state);
      return state;

    case TasksReducerActionTypes.ADD_TASK:
      const taskToAdd: ITask = {
        id: createId(),
        text: payload.text,
        status: payload.status,
      };

      if (taskToAdd.status === TaskStatus.TODO) {
        state.todoList.push(taskToAdd);
      }

      if (taskToAdd.status === TaskStatus.DOING) {
        state.doingList.push(taskToAdd);
      }

      if (taskToAdd.status === TaskStatus.DONE) {
        state.doneList.push(taskToAdd);
      }

      state = { ...state };

      saveToLocalStorage(LocalStorageDataName.TASKS, state);
      return state;

    case TasksReducerActionTypes.DRAG_DROP:
      const { sourceStatus, sourceIndex, destinationStatus, destinationIndex } =
        payload;

      const listToDrag = state[`${sourceStatus}List`];
      const listToDrop = state[`${destinationStatus}List`];

      const [removedSourceTask] = listToDrag.splice(sourceIndex, 1);

      const taskToDrop = {
        ...removedSourceTask,
        status: destinationStatus,
      };

      listToDrop.splice(destinationIndex, 0, taskToDrop);

      saveToLocalStorage(LocalStorageDataName.TASKS, state);
      return state;

    case TasksReducerActionTypes.SET_IS_DRAGGING:
      state = { ...state, isDragging: payload.isDragging };

      saveToLocalStorage(LocalStorageDataName.TASKS, state);
      return state;

    default:
      throw new Error("Invalid action type!");
  }
};
