import { Persist } from './model.ts';

export class Render implements Persist {
  static initial = {
    darkTheme: window.matchMedia('(prefers-color-scheme: dark)').matches,
    rotation: 0,
    showCP: true,
  };
  constructor(
    public darkTheme: boolean,
    public rotation: number,
    public showCP: boolean
  ) {}

  init = () => Render.initial;
  name = () => 'render';
}
