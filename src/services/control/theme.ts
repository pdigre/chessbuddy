import { makeAutoObservable } from 'mobx';

export class Theme {
  darkTheme = false;

  constructor() {
    makeAutoObservable(this);
  }
}

export const theme = new Theme();
