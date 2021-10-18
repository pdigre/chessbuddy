import { makeAutoObservable } from 'mobx';

export class Config {
  rotation = 0;
  markLog = -1;
  markHist = -1;
  showConfig = false;
  showHist = false;
  showUndo = false;

  showHints = false;
  showCP = true;
  showFacts = true;
  playMistake = true;
  playCorrect = true;
  playWinner = true;
  undopos = 0;

  constructor() {
    makeAutoObservable(this);
  }

  undoTimer: TimerHandler = () => {
    if (this.showUndo) {
      this.undopos = 0; // In the case you're already in a UNDO confirmation box.
    }
    this.showUndo = false;
  };

  startUndoTimer: (pos: number) => void = pos => {
    this.showUndo = true;
    this.undopos = pos;
    window.setTimeout(this.undoTimer, 9000);
  };
}

export const config = new Config();
