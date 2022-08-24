export const setToLS = <Type>(name: string, value: Type): void => {
  localStorage.setItem(name, JSON.stringify(value));
}

export const getFromLS = (name: string): null | string => {
  return localStorage.getItem(name);
}