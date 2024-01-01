import { action, makeObservable, observable } from 'mobx';
import { GETSET, Item } from '../model/model.ts';
import { storageService } from './index.service.ts';

export class RenderingService implements Item {
  static storage = 'render';

  static PWA = {width: 1190, height: 762};
  static CHROME = {width: 1180, height: 740};
  static DEFAULT = RenderingService.PWA;

  iPad = !!navigator.userAgent.match(/(iPad)/);
  boardWidth = 680;
  height = 748;

  showBlank = false;
  darkTheme = false;
  rotation = 1;
  showCP = true;

  constructor() {
    makeObservable(this, {
      showBlank: observable,
      darkTheme: observable,
      rotation: observable,
      showCP: observable,
    });
    const restore = storageService.restoreObject(RenderingService.storage, {}) as {
      darkTheme: boolean;
      rotation: number;
      showCP: boolean;
    };
    this.darkTheme =
      restore?.darkTheme ?? window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.rotation = restore?.rotation ?? 1;
    const size = this.getSize();
    this.height = size.height;
    this.boardWidth = size.height - 68;
  }

  bool: (v: any) => boolean = v => 'true' == v || v == true;
  properties: Map<string, GETSET<any>> = new Map([
    ['darkTheme', [() => this.darkTheme, v => (this.darkTheme = this.bool(v))]],
    ['rotation', [() => this.rotation, v => (this.rotation = v)]],
    ['showCP', [() => this.showCP, v => (this.showCP = this.bool(v))]],
  ]);
  getProp = (name: string) => this.properties.get(name)![0]();
  setProp = action((name: string, v: any) => this.properties.get(name)![1](v));

  rotateAction = action(() => {
    const num = this.rotation;
    this.rotation = (Number.isInteger(num) ? num + 1 : 0) % 4;
  });

  private refreshTimer: TimerHandler = () => {
    this.showBlank = false;
  };

  startRefreshTimer() {
    this.showBlank = true;
    window.setTimeout(this.refreshTimer, 100);
  }

  getDeviceInfo() {
    const dev = {
      first: Date.now().toString(36),
      userAgent: navigator.userAgent,
      width: window.screen.width,
      height: window.screen.height,
      availWidth: window.screen.availWidth,
      availHeight: window.screen.availHeight,
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
    };
    storageService.storeObject('device', dev);
    return dev;
  }

  getSize() {
    if(!navigator.userAgent.match(/(iPad)/)){
      return RenderingService.DEFAULT;  // Use when on laptop
    }
    // On iPad either as PWA with Safari or Chrome which has more controls that takes space
    return !!navigator.userAgent.match(/(Chrome)/) ? RenderingService.CHROME : RenderingService.PWA;
  }

}


