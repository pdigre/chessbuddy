import { action, makeObservable, observable } from 'mobx';
import { messageService } from './index.service.ts';
import packageInfo from '../package.json';

type SET_CALLBACK = (msg: messageType) => void;

export type messageType = {
  name: string;
  title: string;
  msg: string;
  callback?: CALLBACK;
};

export type CALLBACK = (txt: string) => void;

export class MessageService {
  public resultHolder: SET_CALLBACK = (_msg: messageType) => {
    //    alert('undefined ' + msg);
  };

  show = false;
  title?: string;

  constructor() {
    makeObservable(this, {
      show: observable,
      display: action,
      aboutAction: action,
      error: action,
    });
  }

  public getVersion() {
    return packageInfo.version;
  }

  initialize(resultHolder: SET_CALLBACK) {
    this.resultHolder = resultHolder;
  }

  display(msg: messageType) {
    this.show = true;
    this.resultHolder(msg);
  }

  standard(name: string, callback?: CALLBACK) {
    this.show = true;
    const msgType = messages.find(m => m.name == name);
    const title = msgType?.title ?? '';
    const msg = msgType?.msg ?? '';
    this.title = title;
    this.resultHolder({ name, title, msg, callback });
  }

  aboutAction = action(() => messageService.standard('about'));

  error(title: string, msg: string) {
    this.display({
      name: 'error',
      title,
      msg,
    });
  }
}

const messages = [
  {
    name: 'about',
    title: 'About',
    msg: 'about',
  },
  {
    name: 'promotion',
    title: 'Promotion',
    msg: 'Choose promotion piece',
  },
  {
    name: 'load',
    title: 'Load game',
    msg: 'You have to end current game to load previous games',
  },
  {
    name: 'undo',
    title: 'Undo',
    msg: 'Do you want to undo last move?',
  },
  {
    name: 'revert',
    title: 'Revert',
    msg: 'Do you want to revert the game to the marked position?',
  },
  {
    name: 'end',
    title: 'End game',
    msg: 'Who won',
  },
];
