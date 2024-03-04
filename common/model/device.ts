import { Persist } from './model.ts';
import { isBrowser } from '../service/index.service.ts';

const DEFAULT_WIDTH = 1280;
const DEFAULT_HEIGHT = 640;

export class Device implements Persist {
  // Config to store
  first = Date.now().toString(36);
  userAgent = isBrowser ? navigator.userAgent : '';
  width = isBrowser ? window.screen.width : DEFAULT_WIDTH;
  height = isBrowser ? window.screen.height : DEFAULT_HEIGHT;
  availWidth = isBrowser ? window.screen.availWidth : DEFAULT_WIDTH;
  availHeight = isBrowser ? window.screen.availHeight : DEFAULT_HEIGHT;
  innerWidth = isBrowser ? window.innerWidth : DEFAULT_WIDTH;
  innerHeight = isBrowser ? window.innerHeight : DEFAULT_HEIGHT;

  persist = () => ({ name: 'device', init: new Device() });
}
