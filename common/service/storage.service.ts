import { jsonIgnoreReplacer } from 'json-ignore';
import { messageService } from './index.service';
import { Persist } from '../model/model.ts';

export class StorageService {
  storeLines = (name: string, lines: string[]) => {
    return localStorage.setItem(name, lines.join('\n') ?? []);
  };
  restoreLines = (name: string, init: string[]) => {
    try {
      return localStorage.getItem(name)?.replace(/\r/, '').split('\n') ?? init;
    } catch (error) {
      messageService.error('Storage error ' + name, String(error));
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
      messageService.error('Storage error ' + name, String(error));
      return init;
    }
  };

  save = (persist: Persist) => {
    const defObj = persist.init();
    const props = new Map(Object.entries(defObj));
    Object.entries(persist).forEach(([key, value]) => {
      if (props.has(key)) {
        props.set(key, value);
      }
    });
    localStorage.setItem(persist.name(), JSON.stringify(Object.fromEntries(props)));
  };
  load = (persist: Persist) => {
    try {
      const restore = localStorage.getItem(persist.name());
      const defObj = persist.init();
      if (restore) {
        const restored = JSON.parse(restore);
        const props = new Map(Object.entries(defObj));
        Object.entries(restored).forEach(([key, value]) => {
          if (props.has(key)) {
            props.set(key, value);
          }
        });
        Object.assign(persist, Object.fromEntries(props));
      } else {
        Object.assign(persist, defObj);
      }
    } catch (error) {
      messageService.error('Storage error ' + name, String(error));
      return null;
    }
  };
}
