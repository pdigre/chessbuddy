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
  bool: (v: any) => boolean = v => 'true' == v || v == true;
  properties: Map<string, GETSET<boolean>> = new Map([
    ['darkTheme', [() => this.darkTheme, v => (this.darkTheme = this.bool(v))]],
  ]);
  getName = () => 'render';
  getDescription = () => 'Render';
  validate: () => string = () => '';
  public static init = new RenderingService(false);
}
