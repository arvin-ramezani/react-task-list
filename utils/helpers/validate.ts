export const validateTaskText: (tasksText: string | undefined) => boolean = (
  taskText
) => {
  return !(!taskText || taskText?.trim() === "");
};
