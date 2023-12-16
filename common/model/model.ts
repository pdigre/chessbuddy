export interface GETSET2<T> {
  get: () => T;
  set: (key: T) => void;
}
export type GETSET<T> = [() => T, (key: T) => void];

export interface Item {
  label: string;
  properties: Map<string, GETSET<any>>;
  getName: () => string;
  getDescription: () => string;
  validate: () => string;
}
