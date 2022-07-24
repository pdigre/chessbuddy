import { makeAutoObservable } from 'mobx';

/*
 * Render
 */
export class Rendering {
  iPad = navigator.userAgent.includes('(iPad;');
  boardWidth = 720;
  height = 810;

  constructor() {
    makeAutoObservable(this);
  }
}

export const rendering = new Rendering();
