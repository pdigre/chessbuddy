import { storageService } from '../service/index.service';

/*
 * Utilities
 */
export const toMMSS: (sec_num: number) => string = sec_num => {
  const secs = isNaN(sec_num) ? 0 : sec_num;
  const m = Math.floor(secs / 60);
  const s = secs - m * 60;
  return (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
};

export class UtilService {
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
  toMMSS(sec_num: number) {
    const secs = isNaN(sec_num) ? 0 : sec_num;
    const m = Math.floor(secs / 60);
    const s = secs - m * 60;
    return (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
  }
}
