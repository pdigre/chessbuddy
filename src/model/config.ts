import { makeAutoObservable } from 'mobx';
import { Bot } from './bot';
import { Human } from './human';
import { Clock } from './clock';
import { storage } from '../services/storage.service';

export interface ListItem {
  getName: () => string;
  getDescription: () => string;
}

export const enum EditMode {
  None = 1,
  EditHuman,
  AddHuman,
  EditBot,
  AddBot,
  EditClock,
  AddClock,
}

export class Config {
  // Config to store
  humans: Human[];
  bots: Bot[];
  clocks: Clock[];

  // Other game config
  showHist = false;
  showUndo = false;
  showHints = false;
  showCP = true;
  showFacts = true;
  playMistake = false;
  playCorrect = false;
  playWinner = false;

  // Game play config
  rotation = 0;
  markLog = -1;
  markHist = -1;
  showTab = -1;
  undopos = 0;
  editMode = false;
  editSquare = '';
  cursor = -1;
  dialog = EditMode.None;

  constructor() {
    makeAutoObservable(this);
    this.humans = storage.restoreList(Human.storage, Human.init, Human.create);
    this.bots = storage.restoreList(Bot.storage, Bot.init, Bot.create);
    this.clocks = storage.restoreList(Clock.storage, Clock.init, Clock.create);
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
