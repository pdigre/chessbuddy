import { makeAutoObservable } from 'mobx';

export class Config {
  rotation = 0;
  markLog = -1;
  markHist = -1;
  showConfig = false;
  showHints = true;
  showFacts = true;
  showHist = false;

  constructor() {
    makeAutoObservable(this);
  }

  getUsed = () => {
    //
  };
}

export const config = new Config();
