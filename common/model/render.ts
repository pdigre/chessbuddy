import { Persist } from './model.ts';
import { isBrowser } from '../service/index.service.ts';

export class Render implements Persist {
  persist = () => ({
    name: 'render',
    init: new Render(),
  });

  constructor(
    public darkTheme = isBrowser
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
      : false,
    public rotation = 0,
    public showCP = true
  ) {}
}
