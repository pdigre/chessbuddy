import { makeAutoObservable } from 'mobx';

type SET_CALLBACK = (msg: messageType) => void;

export type messageType = {
  name: string;
  title: string;
  msg: string;
  callback?: CALLBACK;
};

export type CALLBACK = (txt: string) => void;

export class MessageService {
  public resultHolder: SET_CALLBACK = (msg: messageType) => {
    alert('undefined ' + msg);
  };

  show = false;
  title?: string;

  constructor() {
    makeAutoObservable(this);
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