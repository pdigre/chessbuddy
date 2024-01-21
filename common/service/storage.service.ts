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
    return localStorage.setItem(name, JSON.stringify(obj));
  };

  save = (persist: Persist) => {
    const { name, init } = persist.persist();
    const props = new Map(Object.entries(init));
    Object.entries(persist).forEach(([key, value]) => {
      if (props.has(key)) {
        props.set(key, value);
      }
    });
    localStorage.setItem(name, JSON.stringify(Object.fromEntries(props)));
  };
  load = (persist: Persist) => {
    try {
      const { name, init } = persist.persist();
      const restore = localStorage.getItem(name);
      if (restore) {
        const restored = JSON.parse(restore);
        const props = new Map(Object.entries(init));
        Object.entries(restored).forEach(([key, value]) => {
          if (props.has(key)) {
            props.set(key, value);
          }
        });
        Object.assign(persist, Object.fromEntries(props));
      } else {
        Object.assign(persist, init);
      }
    } catch (error) {
      messageService.error('Storage error ' + name, String(error));
      return null;
    }
  };
}
