export const splitTaskTextToMultiLine: (taskText: string) => string[] = (
  taskText: string
) => {
  return taskText.split("\n");
};
