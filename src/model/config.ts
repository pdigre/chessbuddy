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
type ConfigProps = {
  white: string;
  black: string;
  clock: string;
  rotation: number;
  showHints: boolean;
  showCP: boolean;
  showFacts: boolean;
  playMistake: boolean;
  playCorrect: boolean;
  playWinner: boolean;
};

export class Config {
  storage = 'config';
  white: string;
  black: string;
  clock: string;
  // Features config
  rotation: number;
  showHints: boolean;
  showCP: boolean;
  showFacts: boolean;
  playMistake: boolean;
  playCorrect: boolean;
  playWinner: boolean;
  // Config to store
  humans: Human[];
  bots: Bot[];
  clocks: Clock[];

  // Config runtime - no persist
  showTab = -1;
  cursor = -1;
  dialog = EditMode.None;

  constructor() {
    makeAutoObservable(this);
    this.humans = storage.restoreList(Human.storage, Human.init, Human.create);
    this.bots = storage.restoreList(Bot.storage, Bot.init, Bot.create);
    this.clocks = storage.restoreList(Clock.storage, Clock.init, Clock.create);

    const initProps: ConfigProps = {
      white: '',
      black: '',
      clock: '',
      rotation: 0,
      showHints: false,
      showCP: true,
      showFacts: true,
      playMistake: false,
      playCorrect: false,
      playWinner: false,
    };
    const restore = storage.restoreObject(this.storage, initProps);
    this.white = restore.white;
    this.black = restore.black;
    this.clock = restore.clock;
    this.rotation = restore.rotation;
    this.showHints = restore.showHints;
    this.showCP = restore.showCP;
    this.showFacts = restore.showFacts;
    this.playMistake = restore.playMistake;
    this.playCorrect = restore.playCorrect;
    this.playWinner = restore.playWinner;
  }

  store: VoidFunction = () => {
    const props: ConfigProps = {
      white: this.white,
      black: this.black,
      clock: this.clock,
      rotation: this.rotation,
      showHints: this.showHints,
      showCP: this.showCP,
      showFacts: this.showFacts,
      playMistake: this.playMistake,
      playCorrect: this.playCorrect,
      playWinner: this.playWinner,
    };
    storage.storeObject(this.storage, props);
  };
}

export const config = new Config();
