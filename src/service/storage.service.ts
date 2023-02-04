import { jsonIgnoreReplacer } from 'json-ignore';

export class StorageService {
  storeLines = (name: string, lines: string[]) => {
    localStorage.setItem(name, lines.join('\n') ?? []);
  };
  restoreLines = (name: string, init: string[]) =>
    localStorage.getItem(name)?.replace(/\r/, '').split('\n') ?? init;

  storeObject = <T>(name: string, obj: T) => {
    localStorage.setItem(name, JSON.stringify(obj, jsonIgnoreReplacer));
  };
  restoreObject = <T>(name: string, init: T) => {
    const data = localStorage.getItem(name);
    return data ? (JSON.parse(data) as T) : init;
  };
}
