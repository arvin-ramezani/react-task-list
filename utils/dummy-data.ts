import { ITask, TaskStatus } from "./types/tasks.types";

export const TASKS_LIST: ITask[] = [
  {
    id: 1,
    text: "Start with meditation, exercise & breakfast for a productive day",
    status: TaskStatus.TODO,
  },
  {
    id: 2,
    text: "Read to learn something new every day",
    status: TaskStatus.TODO,
  },
  {
    id: 3,
    text: "Learn something fresh & relevant",
    status: TaskStatus.TODO,
  },
  {
    id: 4,
    text: "Engage & question in meetings",
    status: TaskStatus.DOING,
  },
  {
    id: 5,
    text: "Use time-blocking for effective days",
    status: TaskStatus.DOING,
  },
  {
    id: 6,
    text: "Finished online course - check!",
    status: TaskStatus.DONE,
  },
  {
    id: 7,
    text: "Congratulate yourself for incorporating healthier habits into your lifestyle, like regular exercise or mindful eating",
    status: TaskStatus.DONE,
  },
];
