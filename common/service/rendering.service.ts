import { action, makeObservable, observable } from 'mobx';
import { GETSET, Item } from '../model/model.ts';
import { storageService } from './index.service.ts';

export class RenderingService implements Item {
  static storage = 'render';
  iPad = navigator.userAgent.includes('(iPad;');
  boardWidth = 680;
  height = 748;

  showBlank = false;
  darkTheme = false;
  rotation = 1;

  constructor() {
    makeObservable(this, {
      showBlank: observable,
      darkTheme: observable,
      rotation: observable,
    });
    const restore = storageService.restoreObject(RenderingService.storage, {}) as {
      darkTheme: boolean;
      rotation: number;
    };
    this.darkTheme =
      restore?.darkTheme ?? window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.rotation = restore?.rotation ?? 1;
  }

  bool: (v: any) => boolean = v => 'true' == v || v == true;
  properties: Map<string, GETSET<any>> = new Map([
    ['darkTheme', [() => this.darkTheme, v => (this.darkTheme = this.bool(v))]],
    ['rotation', [() => this.rotation, v => (this.rotation = v)]],
  ]);

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
}
