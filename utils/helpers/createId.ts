import { LocalStorageDataName } from "../types/common.types";
import { IInitialTasksState } from "../types/tasksReducer.types";
import { getFromLocalStorage } from "./localStorage";

export const createId = () => {
  const storedState = getFromLocalStorage(
    LocalStorageDataName.TASKS
  ) as IInitialTasksState;

  if (!storedState) {
    return getId();
  }

  const { doingList, todoList, doneList } = storedState;

  const currentIdList = [...doingList, ...todoList, ...doneList].map(
    (t) => t.id
  );

  const newId = getId(currentIdList);

  return newId;
};

const getId = (currentIdList?: number[]): number => {
  const id = Math.floor(Math.random() * 10000000000000);

  if (!currentIdList || !currentIdList?.includes(id)) return id;

  return getId(currentIdList);
};
