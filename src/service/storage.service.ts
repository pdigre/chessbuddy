import { jsonIgnoreReplacer } from 'json-ignore';
import { messageService } from './index.service';

export class StorageService {
  storeLines = (name: string, lines: string[]) => {
    return localStorage.setItem(name, lines.join('\n') ?? []);
  };
  restoreLines = (name: string, init: string[]) => {
    try {
      return localStorage.getItem(name)?.replace(/\r/, '').split('\n') ?? init;
    } catch (error) {
      messageService.display('Storage error ' + name, String(error));
      return init;
    }
  };

  storeObject = <T>(name: string, obj: T) => {
    return localStorage.setItem(name, JSON.stringify(obj, jsonIgnoreReplacer));
  };
  restoreObject = <T>(name: string, init: T) => {
    try {
      const data = localStorage.getItem(name);
      return data ? (JSON.parse(data) as T) : init;
    } catch (error) {
      messageService.display('Storage error ' + name, String(error));
      return init;
    }
  };
}
