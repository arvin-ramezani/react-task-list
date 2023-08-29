import React, {
  ReactElement,
  createContext,
  useCallback,
  useContext,
  useReducer,
} from "react";

import { ITask, TaskStatus } from "../../utils/types/tasks.types";
import { createId } from "../../utils/helpers/createId";

interface IInitialTasksState {
  todoList: ITask[];
  doingList: ITask[];
  doneList: ITask[];
  isDragging: boolean;
}

export const initialTasksState: IInitialTasksState = {
  todoList: [],
  doingList: [],
  doneList: [],
  isDragging: false,
};

enum TasksReducerActionTypes {
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
}

interface IAddAllTasksActionPayload {
  type: TasksReducerActionTypes.ADD_ALL_TASKS;
  payload: ITask[];
}

interface IDoneTaskActionPayload {
  type: TasksReducerActionTypes.DONE_TASK;
  payload: { id: ITask["id"]; currentStatus: TaskStatus };
}

interface IUndoneTaskActionPayload {
  type: TasksReducerActionTypes.UNDONE_TASK;
  payload: { id: ITask["id"] };
}

interface IEditTaskActionPayload {
  type: TasksReducerActionTypes.EDIT_TASK;
  payload: { id: ITask["id"]; text: ITask["text"] };
}

interface IDeleteTaskActionPayload {
  type: TasksReducerActionTypes.DELETE_TASK;
  payload: { id: ITask["id"] };
}

interface IAddTaskActionPayload {
  type: TasksReducerActionTypes.ADD_TASK;
  payload: { status: TaskStatus; text: ITask["text"] };
}

interface IDragDropActionPayload {
  type: TasksReducerActionTypes.DRAG_DROP;
  payload: {
    sourceStatus: TaskStatus;
    sourceIndex: number;
    destinationStatus: TaskStatus;
    destinationIndex: number;
  };
}

interface ISetIsDraggingActionPayload {
  type: TasksReducerActionTypes.SET_IS_DRAGGING;
  payload: { isDragging: boolean };
}

interface IReducerActionWithoutPayload {
  type: TasksReducerActionTypes;
}

type ReducerActionType =
  | IAddAllTasksActionPayload
  | IDoneTaskActionPayload
  | IUndoneTaskActionPayload
  | IEditTaskActionPayload
  | IDeleteTaskActionPayload
  | IAddTaskActionPayload
  | IDragDropActionPayload
  | ISetIsDraggingActionPayload;

const reducer = (
  state: IInitialTasksState,
  { payload, type }: ReducerActionType
): IInitialTasksState => {
  switch (type) {
    case TasksReducerActionTypes.ADD_ALL_TASKS:
      const localStorageData = localStorage.getItem("tasks");

      if (localStorageData) {
        state = JSON.parse(localStorageData);
        return { ...state, ...JSON.parse(localStorageData) };
      }

      state = {
        ...state,
        todoList: payload.filter((t) => t.status === TaskStatus.TODO),
        doingList: payload.filter((t) => t.status === TaskStatus.DOING),
        doneList: payload.filter((t) => t.status === TaskStatus.DONE),
      };

      localStorage.setItem("tasks", JSON.stringify(state));
      return { ...state };

    case TasksReducerActionTypes.DONE_TASK:
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

      localStorage.setItem(
        "tasks",
        JSON.stringify({ todoList, doingList, doneList })
      );
      return { ...state, todoList, doingList, doneList };

    case TasksReducerActionTypes.UNDONE_TASK:
      if (state.isDragging) return state;

      const taskToUndone = state.doneList.find((t) => t.id === payload.id);

      if (!taskToUndone) return state;

      state.doneList = state.doneList.filter((t) => t.id !== taskToUndone.id);

      state.todoList.unshift({ ...taskToUndone, status: TaskStatus.TODO });

      localStorage.setItem("tasks", JSON.stringify(state));

      return { ...state };

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

      localStorage.setItem("tasks", JSON.stringify({ ...state }));

      return { ...state };

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

      localStorage.setItem("tasks", JSON.stringify({ ...state }));

      return { ...state };

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

      localStorage.setItem("tasks", JSON.stringify({ ...state }));

      return { ...state };

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

      localStorage.setItem("tasks", JSON.stringify(state));

      return state;

    case TasksReducerActionTypes.SET_IS_DRAGGING:
      return { ...state, isDragging: payload.isDragging };

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
    (taskToDonePayload: { id: ITask["id"]; currentStatus: TaskStatus }) => {
      dispatch({
        type: TasksReducerActionTypes.DONE_TASK,
        payload: taskToDonePayload,
      });
    },
    []
  );

  const undoneTask = useCallback((taskToUndonePayload: { id: ITask["id"] }) => {
    dispatch({
      type: TasksReducerActionTypes.UNDONE_TASK,
      payload: taskToUndonePayload,
    });
  }, []);

  const editTask = useCallback(
    (editTaskPayload: { id: ITask["id"]; text: ITask["text"] }) => {
      dispatch({
        type: TasksReducerActionTypes.EDIT_TASK,
        payload: editTaskPayload,
      });
    },
    []
  );

  const deleteTask = useCallback((deleteTaskPayload: { id: ITask["id"] }) => {
    dispatch({
      type: TasksReducerActionTypes.DELETE_TASK,
      payload: deleteTaskPayload,
    });
  }, []);

  const addTask = useCallback(
    (addTaskPayload: { text: ITask["text"]; status: TaskStatus }) => {
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
  addAllTasks: (taskList: ITask[]) => void;
  doneTask: (payload: { id: number; currentStatus: TaskStatus }) => void;
  undoneTask: (payload: { id: number }) => void;
  editTask: (payload: { id: number; text: string }) => void;
  deleteTask: (payload: { id: number }) => void;
  addTask: (payload: { text: string; status: TaskStatus }) => void;
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
