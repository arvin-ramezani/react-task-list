import React, {
  ReactElement,
  createContext,
  useCallback,
  useContext,
  useReducer,
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
  ADD_TASKS = "addTasks",
}

interface IReducerActionWithPayload {
  type: TasksReducerActionTypes.ADD_TASKS;
  payload: ITask[];
}

interface IReducerActionWithoutPayload {
  type: TasksReducerActionTypes;
}

type ReducerAction = IReducerActionWithPayload;

const reducer = (
  state: IInitialTasksState,
  action: ReducerAction
): IInitialTasksState => {
  switch (action.type) {
    case TasksReducerActionTypes.ADD_TASKS:
      const newState: IInitialTasksState = {
        todoList: action.payload.filter((t) => t.status === TaskStatus.TODO),
        doingList: action.payload.filter((t) => t.status === TaskStatus.DOING),
        doneList: action.payload.filter((t) => t.status === TaskStatus.DONE),
      };

      return newState;

    default:
      throw new Error("Invalid action type!");
  }
};

const useTasksContext = (initialState: IInitialTasksState) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addTasks = useCallback((tasksList: ITask[]) => {
    dispatch({ type: TasksReducerActionTypes.ADD_TASKS, payload: tasksList });
  }, []);

  return {
    state,
    addTasks,
  };
};

type UseTasksContextType = ReturnType<typeof useTasksContext>;

const initialContextState: UseTasksContextType = {
  state: initialTasksState,
  addTasks: (tasksList: ITask[]) => {},
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
  addTasks: (taskList: ITask[]) => void;
};

export const useTasks = (): useTasksType => {
  const {
    state: { todoList, doingList, doneList },
    addTasks,
  } = useContext(TasksContext);

  return { todoList, doingList, doneList, addTasks };
};
