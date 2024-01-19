import { Persist } from './model.ts';

export class Render implements Persist {
  static initial = {
    darkTheme: window.matchMedia('(prefers-color-scheme: dark)').matches,
    rotation: 0,
    showCP: true,
  };

  constructor(
    public darkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches,
    public rotation = 0,
    public showCP = true,
  ) {}

  init = () => Render.initial;
  name = () => 'render';
}
