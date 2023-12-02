import { makeAutoObservable } from 'mobx';

export class RefreshService {
  showBlank = false;

  constructor() {
    makeAutoObservable(this);
  }

  private refreshTimer: TimerHandler = () => {
    this.showBlank = false;
  };

  startRefreshTimer() {
    this.showBlank = true;
    window.setTimeout(this.refreshTimer, 100);
  }
}
