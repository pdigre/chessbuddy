import { makeAutoObservable } from 'mobx';

export class UndoRefresh {
  showBlank = false;

  constructor() {
    makeAutoObservable(this);
  }

  private refreshTimer: TimerHandler = () => {
    this.showBlank = false;
  };

  startRefreshTimer = () => {
    this.showBlank = true;
    window.setTimeout(this.refreshTimer, 100);
  };
}

export const undorefresh = new UndoRefresh();
