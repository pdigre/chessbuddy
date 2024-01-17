import { action } from 'mobx';
import { GETSET, Item, Storage } from './model.ts';

export class Render implements Item, Storage<Render> {

  constructor(    public darkTheme: boolean,
                  public rotation: number,
                  public showCP: boolean,
  ) {}

  bool: (v: any) => boolean = v => 'true' == v || v == true;
  properties: Map<string, GETSET<any>> = new Map([
    ['darkTheme', [() => this.darkTheme, v => (this.darkTheme = this.bool(v))]],
    ['rotation', [() => this.rotation, v => (this.rotation = v)]],
    ['showCP', [() => this.showCP, v => (this.showCP = this.bool(v))]],
  ]);
  getProp = (name: string) => this.properties.get(name)![0]();
  setProp = action((name: string, v: any) => this.properties.get(name)![1](v));

  name = () => 'render';
  load = (obj:Render) => {
    Object.assign(this, obj ?? new Render(window.matchMedia('(prefers-color-scheme: dark)').matches, 0, true));
  };
  save = () => ({
      darkTheme: this.darkTheme,
      rotation: this.rotation,
      showCP: this.showCP,
    } as Render);
}


