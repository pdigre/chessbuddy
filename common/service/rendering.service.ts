import { action, makeObservable, observable } from 'mobx';
import { storageService } from './index.service.ts';
import { Render } from '../model/render.ts';

export class RenderingService extends Render {

  static PWA = {width: 1190, height: 762};
  static CHROME = {width: 1180, height: 740};
  static DEFAULT = RenderingService.PWA;

  iPad = !!navigator.userAgent.match(/(iPad)/);
  boardWidth = 680;
  height = 748;
  showBlank = false;

  constructor(public darkTheme: boolean,
              public rotation: number,
              public showCP: boolean
              ) {
    super(darkTheme,rotation,showCP);
    makeObservable(this, {
      showBlank: observable,
      darkTheme: observable,
      rotation: observable,
      showCP: observable,
    });
    storageService.load(this);
    const size = this.getSize();
    this.height = size.height;
    this.boardWidth = size.height - 68;
  }

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


