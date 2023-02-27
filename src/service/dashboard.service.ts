import { action, makeAutoObservable } from 'mobx';

/**
 * Start and pause of game, starts the bots if in turn
 * this does not need to be persisted
 */

export class DashboardService {
  showHist = false;
  showUndo = false;
  markLog = -1;
  undopos = 0;

  constructor() {
    makeAutoObservable(this);
  }

  // ****************************
  // Actions
  // ****************************
  startUndoTimer(pos: number) {
    action(() => {
      this.showUndo = true;
      this.undopos = pos;
    });
    window.setTimeout(() => {
      action(() => {
        if (this.showUndo) {
          this.undopos = 0; // In the case you're already in a UNDO confirmation box.
        }
        this.showUndo = false;
      });
    }, 9000);
  }

  setMarkLog(n: number) {
    action(() => {
      this.markLog = n;
    });
  }

  toggleHistoryAction = () => {
    action(() => {
      this.showHist = !this.showHist;
    });
  };
}
