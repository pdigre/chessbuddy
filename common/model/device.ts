import { Storage } from './model.ts';

export class Device implements Storage<Device>{

  // Config to store
  first= Date.now().toString(36);
  userAgent = navigator.userAgent;
  width = window.screen.width;
  height = window.screen.height;
  availWidth = window.screen.availWidth;
  availHeight = window.screen.availHeight;
  innerWidth = window.innerWidth;
  innerHeight = window.innerHeight;

  name = () => 'device';
  save = () => this;
  load = () => {};

}
