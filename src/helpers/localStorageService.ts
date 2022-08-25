export const setToLS = <Type>(name: string, value: Type): void => {
  localStorage.setItem(name, JSON.stringify(value));
};

export const getFromLS = <Type>(name: string, initialValue?: Type): null | Type => {
  const item = localStorage.getItem(name);
  if (!item) return item as null;
  if (!item && initialValue !== undefined) return initialValue as Type;
  return JSON.parse(item) as Type;
};
