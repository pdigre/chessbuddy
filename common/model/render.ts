import { Persist } from './model.ts';

export class Render implements Persist {
  persist = () => ({
    name: 'render',
    init: new Render(),
  });

  constructor(
    public darkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches,
    public rotation = 0,
    public showCP = true
  ) {}
}
