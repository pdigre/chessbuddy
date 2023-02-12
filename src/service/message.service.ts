import { makeAutoObservable, runInAction } from 'mobx';
import { ReactNode } from 'react';
import { ButtonType } from '../view/ConfigWidgets';

export class MessageService {
  title?: string;
  msg?: ReactNode;
  buttons?: ButtonType[];
  response?: (button: string) => void;
  show = false;

  constructor() {
    makeAutoObservable(this);
  }

  clear() {
    this.title = undefined;
  }

  readonly display: (
    title: string,
    msg: ReactNode,
    buttons?: ButtonType[],
    response?: (button: string) => void
  ) => void = (title, msg, buttons?, response?) => {
    this.title = title;
    this.msg = msg;
    this.buttons = buttons;
    this.response = response ?? (() => this.clear());
  };

  onClose(html: string) {
    runInAction(() => (this.response ? this.response(html) : null));
  }
}
