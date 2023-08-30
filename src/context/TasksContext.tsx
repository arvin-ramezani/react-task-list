import React, {
  ReactElement,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";

import { ITask, TaskStatus } from "../../utils/types/tasks.types";
import { initialTasksState, tasksReducer } from "./tasksReducer";
import {
  IAddAllTasksActionPayload,
  IAddTaskActionPayload,
  IDeleteTaskActionPayload,
  IDoneTaskActionPayload,
  IDragDropActionPayload,
  IEditTaskActionPayload,
  IInitialTasksState,
  ISetIsDraggingActionPayload,
  IUndoneTaskActionPayload,
  TasksReducerActionTypes,
} from "../../utils/types/tasksReducer.types";
import { LocalStorageDataName } from "../../utils/types/common.types";
import { getFromLocalStorage } from "../../utils/helpers/localStorage";

const useTasksContext = (initialState: IInitialTasksState) => {
  const [state, dispatch] = useReducer(tasksReducer, initialState);

  const addAllTasks = useCallback(
    (tasksList: IAddAllTasksActionPayload["payload"]) => {
      const localStorageState = getFromLocalStorage(
        LocalStorageDataName.TASKS
      ) as IInitialTasksState;

      if (localStorageState) {
        dispatch({
          type: TasksReducerActionTypes.SET_STATE,
          payload: localStorageState,
        });

        return;
      } else {
        dispatch({
          type: TasksReducerActionTypes.ADD_ALL_TASKS,
          payload: tasksList,
        });

        return;
      }
    },
    []
  );

  const doneTask = useCallback(
    (taskToDonePayload: IDoneTaskActionPayload["payload"]) => {
      dispatch({
        type: TasksReducerActionTypes.DONE_TASK,
        payload: taskToDonePayload,
      });
    },
    []
  );

  const undoneTask = useCallback(
    (taskToUndonePayload: IUndoneTaskActionPayload["payload"]) => {
      dispatch({
        type: TasksReducerActionTypes.UNDONE_TASK,
        payload: taskToUndonePayload,
      });
    },
    []
  );

  const editTask = useCallback(
    (editTaskPayload: IEditTaskActionPayload["payload"]) => {
      dispatch({
        type: TasksReducerActionTypes.EDIT_TASK,
        payload: editTaskPayload,
      });
    },
    []
  );

  const deleteTask = useCallback(
    (deleteTaskPayload: IDeleteTaskActionPayload["payload"]) => {
      dispatch({
        type: TasksReducerActionTypes.DELETE_TASK,
        payload: deleteTaskPayload,
      });
    },
    []
  );

  const addTask = useCallback(
    (addTaskPayload: IAddTaskActionPayload["payload"]) => {
      dispatch({
        type: TasksReducerActionTypes.ADD_TASK,
        payload: addTaskPayload,
      });
    },
    []
  );

  const dragDropHandler = useCallback(
    (dragDropPayload: IDragDropActionPayload["payload"]) => {
      dispatch({
        type: TasksReducerActionTypes.DRAG_DROP,
        payload: dragDropPayload,
      });
    },
    []
  );

  const setIsDragging = useCallback(
    (setIsDraggingPayload: ISetIsDraggingActionPayload["payload"]) => {
      dispatch({
        type: TasksReducerActionTypes.SET_IS_DRAGGING,
        payload: setIsDraggingPayload,
      });
    },
    []
  );

  return {
    state,
    addAllTasks,
    doneTask,
    undoneTask,
    editTask,
    deleteTask,
    addTask,
    dragDropHandler,
    setIsDragging,
  };
};

type UseTasksContextType = ReturnType<typeof useTasksContext>;

const initialContextState: UseTasksContextType = {
  state: initialTasksState,
  addAllTasks: (tasksList: ITask[]) => {},
  doneTask: (payload: { id: number; currentStatus: TaskStatus }) => {},
  undoneTask: (payload: { id: number }) => {},
  editTask: (payload: { id: number; text: string }) => {},
  deleteTask: (payload: { id: number }) => {},
  addTask: (payload: { text: string; status: TaskStatus }) => {},
  dragDropHandler: (payload: IDragDropActionPayload["payload"]) => {},
  setIsDragging: (payload: ISetIsDraggingActionPayload["payload"]) => {},
};

export const TasksContext =
  createContext<UseTasksContextType>(initialContextState);

type ChildrenType = {
  children?: ReactElement | undefined;
};

export const TasksContextProvider = ({
  children,
  ...initialTasksState
}: IInitialTasksState & ChildrenType): ReactElement => {
  return (
    <TasksContext.Provider value={useTasksContext(initialTasksState)}>
      {children}
    </TasksContext.Provider>
  );
};

type useTasksType = {
  todoList: IInitialTasksState["todoList"];
  doingList: IInitialTasksState["doingList"];
  doneList: IInitialTasksState["doneList"];
  isDragging: IInitialTasksState["isDragging"];
  addAllTasks: (taskList: IAddAllTasksActionPayload["payload"]) => void;
  doneTask: (payload: IDoneTaskActionPayload["payload"]) => void;
  undoneTask: (payload: IUndoneTaskActionPayload["payload"]) => void;
  editTask: (payload: IEditTaskActionPayload["payload"]) => void;
  deleteTask: (payload: IDeleteTaskActionPayload["payload"]) => void;
  addTask: (payload: IAddTaskActionPayload["payload"]) => void;
  dragDropHandler: (payload: IDragDropActionPayload["payload"]) => void;
  setIsDragging: (payload: ISetIsDraggingActionPayload["payload"]) => void;
};

export const useTasks = (): useTasksType => {
  const {
    state: { todoList, doingList, doneList, isDragging },
    addAllTasks,
    doneTask,
    undoneTask,
    editTask,
    deleteTask,
    addTask,
    dragDropHandler,
    setIsDragging,
  } = useContext(TasksContext);

  return {
    todoList,
    doingList,
    doneList,
    isDragging,
    addAllTasks,
    doneTask,
    undoneTask,
    editTask,
    deleteTask,
    addTask,
    dragDropHandler,
    setIsDragging,
  };
};
