import { makeAutoObservable } from 'mobx';

export class RenderingService {
  darkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
  iPad = navigator.userAgent.includes('(iPad;');
  boardWidth = 680;
  height = 748;

  constructor() {
    makeAutoObservable(this);
  }
}
