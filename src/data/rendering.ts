import { makeAutoObservable } from 'mobx';

/*
 * Render
 */
export class Rendering {
  iPad = navigator.userAgent.includes('(iPad;');
  boardWidth = 600;
  height = 656;

  constructor() {
    makeAutoObservable(this);
  }
}

export const rendering = new Rendering();
