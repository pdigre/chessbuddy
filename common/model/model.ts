export interface ListItem {
  label: string;
  getName: () => string;
  getDescription: () => string;
  validate: () => string;
}

export interface Persist {
  persist: () => { name: string; init: Object };
}

export const getProp = (obj: Object, name: string) => {
  if (!obj) {
    console.log('Get object undefined:' + name);
    return '';
  }
  const prop = Object.entries(obj).find(([key, _value]) => key == name);
  if (!prop?.length) {
    console.log('Get cannot find:' + name);
    return '';
  }
  return prop![1];
};
export const setProp = (obj: Object, name: string, value: any) => {
  if (!obj) {
    console.log('Set object undefined:' + name);
    return '';
  }
  const prop = Object.entries(obj).find(([key, _value]) => key == name);
  if (!prop?.length) {
    console.log('Set cannot find:' + name);
    return '';
  }
  return Object.assign(obj, Object.fromEntries([[name, value]]));
};
