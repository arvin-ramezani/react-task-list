import React, {
  ReactElement,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { ITask, TaskStatus } from "../../../utils/types/tasks.types";

interface IInitialTasksState {
  todoList: ITask[];
  doingList: ITask[];
  doneList: ITask[];
}

export const initialTasksState: IInitialTasksState = {
  todoList: [],
  doingList: [],
  doneList: [],
};

enum TasksReducerActionTypes {
  ADD_ALL_TASKS = "addAllTasks",
  DONE_TASK = "doneTask",
  UNDONE_TASK = "unDoneTask",
}

interface IAddAllTasksActionPayload {
  type: TasksReducerActionTypes.ADD_ALL_TASKS;
  payload: ITask[];
}

interface IDoneTaskActionPayload {
  type: TasksReducerActionTypes.DONE_TASK;
  payload: { id: ITask["id"]; currentStatus: TaskStatus };
}

interface ITodoTaskActionPayload {
  type: TasksReducerActionTypes.UNDONE_TASK;
  payload: { id: ITask["id"] };
}

interface IReducerActionWithoutPayload {
  type: TasksReducerActionTypes;
}

type ReducerActionType =
  | IAddAllTasksActionPayload
  | IDoneTaskActionPayload
  | ITodoTaskActionPayload;

const reducer = (
  state: IInitialTasksState,
  { payload, type }: ReducerActionType
): IInitialTasksState => {
  switch (type) {
    case TasksReducerActionTypes.ADD_ALL_TASKS:
      const localStorageData = localStorage.getItem("tasks");

      if (localStorageData) {
        state = JSON.parse(localStorageData);

        return state;
      }

      state = {
        todoList: payload.filter((t) => t.status === TaskStatus.TODO),
        doingList: payload.filter((t) => t.status === TaskStatus.DOING),
        doneList: payload.filter((t) => t.status === TaskStatus.DONE),
      };

      localStorage.setItem("tasks", JSON.stringify(state));
      return state;

    case TasksReducerActionTypes.DONE_TASK:
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

      localStorage.setItem(
        "tasks",
        JSON.stringify({ todoList, doingList, doneList })
      );
      return { todoList, doingList, doneList };

    case TasksReducerActionTypes.UNDONE_TASK:
      const taskToUndone = state.doneList.find((t) => t.id === payload.id);

      if (!taskToUndone) return state;

      state.doneList = state.doneList.filter((t) => t.id !== taskToUndone.id);

      state.todoList.unshift({ ...taskToUndone, status: TaskStatus.TODO });

      localStorage.setItem("tasks", JSON.stringify(state));

      return { ...state };

    default:
      throw new Error("Invalid action type!");
  }
};

const useTasksContext = (initialState: IInitialTasksState) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addAllTasks = useCallback((tasksList: ITask[]) => {
    dispatch({
      type: TasksReducerActionTypes.ADD_ALL_TASKS,
      payload: tasksList,
    });
  }, []);

  const doneTask = useCallback(
    (taskToDonePayload: { id: number; currentStatus: TaskStatus }) => {
      setTimeout(() => {
        dispatch({
          type: TasksReducerActionTypes.DONE_TASK,
          payload: taskToDonePayload,
        });
      }, 3000);
    },
    []
  );

  const undoneTask = useCallback((taskToUndonePayload: { id: number }) => {
    setTimeout(() => {
      dispatch({
        type: TasksReducerActionTypes.UNDONE_TASK,
        payload: taskToUndonePayload,
      });
    }, 3000);
  }, []);

  return {
    state,
    addAllTasks,
    doneTask,
    undoneTask,
  };
};

type UseTasksContextType = ReturnType<typeof useTasksContext>;

const initialContextState: UseTasksContextType = {
  state: initialTasksState,
  addAllTasks: (tasksList: ITask[]) => {},
  doneTask: (payload: { id: number; currentStatus: TaskStatus }) => {},
  undoneTask: (payload: { id: number }) => {},
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
  addAllTasks: (taskList: ITask[]) => void;
  doneTask: (payload: { id: number; currentStatus: TaskStatus }) => void;
  undoneTask: (payload: { id: number }) => void;
};

export const useTasks = (): useTasksType => {
  const {
    state: { todoList, doingList, doneList },
    addAllTasks,
    doneTask,
    undoneTask,
  } = useContext(TasksContext);

  return { todoList, doingList, doneList, addAllTasks, doneTask, undoneTask };
};
