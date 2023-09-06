export const splitTaskTextToMultiLine: (taskText: string) => string[] = (
  taskText: string
) => {
  const textList = taskText.split("\n");

  console.log(textList);

  return taskText.split("\n");
};
