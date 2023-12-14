import { makeAutoObservable } from 'mobx';
import { GETSET, Item } from '../model/model.ts';

export class RenderingService implements Item {
  iPad = navigator.userAgent.includes('(iPad;');
  boardWidth = 680;
  height = 748;

  constructor(public darkTheme: boolean) {
    makeAutoObservable(this);
    this.darkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  label = 'Render';
  properties: Map<string, GETSET<any>> = new Map([
    ['darkTheme', { get: () => this.darkTheme, set: value => (this.darkTheme = value) }],
  ]);
  getName = () => 'render';
  getDescription = () => 'Render';
  validate: () => string = () => '';
  public static init = new RenderingService(false);
}
