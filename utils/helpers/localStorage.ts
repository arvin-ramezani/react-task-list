export const saveToLocalStorage = (dataName: string, data: unknown) => {
  localStorage.setItem(dataName, JSON.stringify(data));
};

export const getFromLocalStorage = (dataName: string) => {
  const data = localStorage.getItem(dataName);

  if (data) {
    return JSON.parse(data) as unknown;
  }
};
