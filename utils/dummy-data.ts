import { ITask, TaskStatus } from "./types/tasks.types";

export const TODO_LIST: ITask[] = [
  {
    text: "Start with meditation, exercise & breakfast for a productive day",
    status: TaskStatus.TODO,
  },
  {
    text: "Read to learn something new every day",
    status: TaskStatus.TODO,
  },
  {
    text: "Learn something fresh & relevant",
    status: TaskStatus.TODO,
  },
  {
    text: "Engage & question in meetings",
    status: TaskStatus.DOING,
  },
  {
    text: "Use time-blocking for effective days",
    status: TaskStatus.DOING,
  },
  {
    text: "Finished online course - check!",
    status: TaskStatus.DONE,
  },
  {
    text: "Congratulate yourself for incorporating healthier habits into your lifestyle, like regular exercise or mindful eating",
    status: TaskStatus.DONE,
  },
];
