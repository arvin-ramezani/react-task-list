import { initialTasksState } from "../../src/context/tasksReducer";
import { TASKS_LIST } from "../../utils/dummy-data";
import { TaskStatus } from "../../utils/types/tasks.types";
import { IInitialTasksState } from "../../utils/types/tasksReducer.types";

export const getTestState: () => IInitialTasksState = () => {
  //   const testState = {
  //     ...initialTasksState,
  //     todoList: TASKS_LIST.filter((t) => t.status === TaskStatus.TODO),
  //     doingList: TASKS_LIST.filter((t) => t.status === TaskStatus.DOING),
  //     doneList: TASKS_LIST.filter((t) => t.status === TaskStatus.DONE),
  //   };

  return {
    ...initialTasksState,
    todoList: TASKS_LIST.filter((t) => t.status === TaskStatus.TODO),
    doingList: TASKS_LIST.filter((t) => t.status === TaskStatus.DOING),
    doneList: TASKS_LIST.filter((t) => t.status === TaskStatus.DONE),
  };
};
