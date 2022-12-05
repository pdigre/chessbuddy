export interface Storable {
  toString: () => string;
}

export class Storage {
  storeList = (name: string, items: Storable[]) => {
    localStorage.setItem(name, items.map(x => x.toString()).join('\n'));
  };
  restoreList = <T>(name: string, init: string, create: (x: string[]) => T) => {
    const data = localStorage.getItem(name);
    return (data && !data.includes('undefined') ? data : init)
      .replace(/\r/, '')
      .split('\n')
      .filter(line => line?.split(':')?.length > 2)
      .map(line => create(line.split(':')));
  };

  storeLines = (name: string, lines: string[]) => {
    localStorage.setItem(name, lines.join('\n') ?? []);
  };
  restoreLines = (name: string, init: string[]) =>
    localStorage.getItem(name)?.replace(/\r/, '').split('\n') ?? init;

  storeObject = <T>(name: string, obj: T) => {
    localStorage.setItem(name, JSON.stringify(obj));
  };
  restoreObject = <T>(name: string, init: T) => {
    const data = localStorage.getItem(name);
    return data ? (JSON.parse(data) as T) : init;
  };
}

export const storage = new Storage();
