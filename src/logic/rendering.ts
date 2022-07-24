import { makeAutoObservable } from 'mobx';

/*
 * Render
 */
export class Rendering {
  iPad = navigator.userAgent.includes('(iPad;');
  boardWidth = 680;
  height = 748;

  constructor() {
    makeAutoObservable(this);
  }
}

export const rendering = new Rendering();
