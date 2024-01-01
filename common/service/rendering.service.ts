import { action, makeObservable, observable } from 'mobx';
import { GETSET, Item } from '../model/model.ts';
import { storageService } from './index.service.ts';

export class RenderingService implements Item {
  static storage = 'render';
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
    const PWA = {width: 1280, height: 760};
    const CHROME = {width: 1200, height: 740};

    const isIpad = !!navigator.userAgent.match(/(iPad)/);
    if(!isIpad){
      return PWA;
    }

    const isChrome = !!navigator.userAgent.match(/(Chrome)/);
    return isChrome ? CHROME : PWA;
  }

}


