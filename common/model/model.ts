export interface ListItem {
  label: string;
  getName: () => string;
  getDescription: () => string;
  validate: () => string;
}

export interface Persist {
  name: () => string;
  init: () => Object;
}

export const getProp = (obj: Object, name: string) =>
  Object.entries(obj).find(([key, _value]) => key == name)![1];
export const setProp = (obj: Object, name: string, value: any) =>
  Object.assign(obj, Object.fromEntries([[name, value]]));
