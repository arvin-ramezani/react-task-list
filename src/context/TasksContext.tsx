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
  IAddTaskActionPayload,
  IDeleteTaskActionPayload,
  IDoneTaskActionPayload,
  IDragDropActionPayload,
  IEditTaskActionPayload,
  IInitialTasksState,
  ISetIsDraggingActionPayload,
  IUndoneTaskActionPayload,
  ReducerActionType,
  TasksReducerActionTypes,
} from "../../utils/types/tasksReducer.types";
import { LocalStorageDataName } from "../../utils/types/common.types";
import {
  getFromLocalStorage,
  saveToLocalStorage,
} from "../../utils/helpers/localStorage";

const useTasksContext = (initialState: IInitialTasksState) => {
  const [state, dispatch] = useReducer(tasksReducer, initialState);

  useEffect(() => {
    saveToLocalStorage(LocalStorageDataName.TASKS, state);
  }, [state]);

  useEffect(() => {
    if (!state.isDragging && state.waitList.length > 0) {
      clearWaitList(state.waitList);
    }
  }, [state.waitList.length, state.isDragging]);

  const addAllTasks = useCallback((tasksList: ITask[]) => {
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
      const todoList = tasksList.filter((t) => t.status === TaskStatus.TODO);

      const doingList = tasksList.filter((t) => t.status === TaskStatus.DOING);

      const doneList = tasksList.filter((t) => t.status === TaskStatus.DONE);

      dispatch({
        type: TasksReducerActionTypes.ADD_ALL_TASKS,
        payload: {
          todoList,
          doingList,
          doneList,
        },
      });

      return;
    }
  }, []);

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

  const clearWaitList = useCallback((waitList: ReducerActionType[]) => {
    waitList.forEach((action, _, currentList) => {
      dispatch(action);
      dispatch({
        type: TasksReducerActionTypes.CLEAR_WAIT_LIST,
        payload: currentList,
      });
    });
  }, []);

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
  addAllTasks: (_: ITask[]) => {},
  doneTask: (_: IDoneTaskActionPayload["payload"]) => {},
  undoneTask: (_: IUndoneTaskActionPayload["payload"]) => {},
  editTask: (_: IEditTaskActionPayload["payload"]) => {},
  deleteTask: (_: IDeleteTaskActionPayload["payload"]) => {},
  addTask: (_: IAddTaskActionPayload["payload"]) => {},
  dragDropHandler: (_: IDragDropActionPayload["payload"]) => {},
  setIsDragging: (_: ISetIsDraggingActionPayload["payload"]) => {},
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
  state: IInitialTasksState;
  todoList: IInitialTasksState["todoList"];
  doingList: IInitialTasksState["doingList"];
  doneList: IInitialTasksState["doneList"];
  isDragging: IInitialTasksState["isDragging"];
  waitList: IInitialTasksState["waitList"];
  addAllTasks: (taskList: ITask[]) => void;
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
    state,
    addAllTasks,
    doneTask,
    undoneTask,
    editTask,
    deleteTask,
    addTask,
    dragDropHandler,
    setIsDragging,
  } = useContext(TasksContext);

  const { todoList, doingList, doneList, isDragging, waitList } = state;

  return {
    state,
    todoList,
    doingList,
    doneList,
    isDragging,
    waitList,
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
