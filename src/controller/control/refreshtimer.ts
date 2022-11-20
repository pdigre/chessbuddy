import { makeAutoObservable } from 'mobx';

export class RefreshTimer {
  showBlank = false;

  constructor() {
    makeAutoObservable(this);
  }

  private refreshTimer: TimerHandler = () => {
    this.showBlank = false;
  };

  startRefreshTimer: VoidFunction = () => {
    this.showBlank = true;
    window.setTimeout(this.refreshTimer, 100);
  };
}

export const refreshtimer = new RefreshTimer();
