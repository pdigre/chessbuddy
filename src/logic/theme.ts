import { makeAutoObservable } from 'mobx';

export class Theme {
  darkTheme = false; // window.matchMedia('(prefers-color-scheme: dark)').matches;

  constructor() {
    makeAutoObservable(this);
  }
}

export const theme = new Theme();
