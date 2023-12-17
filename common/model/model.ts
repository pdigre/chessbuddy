export type GETSET<T> = [() => T, (key: T) => void];

export interface Item {
  properties: Map<string, GETSET<any>>;
}
export interface ListItem extends Item {
  label: string;
  getName: () => string;
  getDescription: () => string;
  validate: () => string;
}
