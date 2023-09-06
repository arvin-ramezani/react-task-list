import { initialTasksState } from "../../src/context/tasksReducer";
import {
  getFromLocalStorage,
  saveToLocalStorage,
} from "../../utils/helpers/localStorage";
import { LocalStorageDataName } from "../../utils/types/common.types";

describe("localStorage.ts", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  describe("saveToLocalStorage()", () => {
    it("should save correct data provided as string on localStorage", () => {
      saveToLocalStorage(LocalStorageDataName.TASKS, initialTasksState);

      const savedData = localStorage.getItem(LocalStorageDataName.TASKS);

      const expectedData = JSON.stringify(initialTasksState);

      expect(savedData).toBe(expectedData);
    });

    describe("getFromLocalStorage()", () => {
      it("should correctly get data with provided dataName from localStorage and return parsed Data", () => {
        saveToLocalStorage(LocalStorageDataName.TASKS, initialTasksState);

        const data = getFromLocalStorage(LocalStorageDataName.TASKS);

        expect(JSON.stringify(data)).toBe(JSON.stringify(initialTasksState));
      });
    });
  });
});
