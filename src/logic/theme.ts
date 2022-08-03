import { makeAutoObservable } from 'mobx';

export class Theme {
  darkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;

  constructor() {
    makeAutoObservable(this);
  }
}

export const theme = new Theme();
