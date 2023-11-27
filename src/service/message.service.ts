import { makeAutoObservable } from 'mobx';

type ASYNC = (msg: messageType) => Promise<string>;

export type messageType = {
  name: string;
  title: string;
  msg: string;
};

export class MessageService {
  public resultHolder: ASYNC = async () => 'message dialiog not connected';

  show = false;
  constructor() {
    makeAutoObservable(this);
  }

  initialize(resultHolder: ASYNC) {
    this.resultHolder = resultHolder;
  }

  async display(msg: messageType) {
    return await this.resultHolder(msg);
  }

  async standard(name: string) {
    this.show = true;
    const msgType = messages.find(m => m.name == name);
    const title = msgType?.title ?? '';
    const msg = msgType?.msg ?? '';
    return await this.resultHolder({ name, title, msg });
  }

  async error(title: string, msg: string) {
    await this.display({
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
