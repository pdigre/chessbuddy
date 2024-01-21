import { action, makeObservable, observable } from 'mobx';

/**
 * Start and pause of game, starts the bots if in turn
 * this does not need to be persisted
 */

export class DashboardService {
  showHist = false;
  showUndo = false;
  markLog = -1;
  undoPos = 0;

  constructor() {
    makeObservable(this, {
      showHist: observable,
      showUndo: observable,
      markLog: observable,
      undoPos: observable,
      toggleHistoryAction: action,
      setMarkLogAction: action,
    });
  }

  // ****************************
  // Actions
  // ****************************
  startUndoTimer(pos: number) {
    this.showUndo = true;
    this.undoPos = pos;
    window.setTimeout(action(() => {
        if (this.showUndo) {
          this.undoPos = 0; // In the case you're already in a UNDO confirmation box.
        }
        this.showUndo = false;
    }), 9000);
  }

  setMarkLogAction(n: number) {
    this.markLog = n;
  }

  toggleHistoryAction = () => {
    this.showHist = !this.showHist;
  };
}
