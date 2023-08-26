export enum TaskStatus {
  TODO = "todo",
  DOING = "doing",
  DONE = "done",
}

export interface ITask {
  text: string;
  status: TaskStatus;
}
