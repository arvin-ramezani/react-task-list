export enum TaskStatus {
  TODO = "todo",
  DOING = "doing",
  DONE = "done",
}

export interface ITask {
  id: number;
  text: string;
  status: TaskStatus;
}
