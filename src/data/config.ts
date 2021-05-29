import { makeAutoObservable } from 'mobx';

export class Config {
  rotation = 0;
  markLog = -1;
  markHist = -1;
  showConfig = false;
  showHints = true;
  showCP = true;
  showFacts = true;
  showHist = false;
  showUndo = false;
  undopos = 0;

  constructor() {
    makeAutoObservable(this);
  }

  getUsed = () => {
    //
  };

  private undoTimer: TimerHandler = () => {
    this.showUndo = false;
    this.undopos = 0;
  };

  startUndoTimer = (pos: number) => {
    this.showUndo = true;
    this.undopos = pos;
    window.setTimeout(this.undoTimer, 6000);
  };
}

export const config = new Config();
