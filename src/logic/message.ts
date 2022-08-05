import { makeAutoObservable } from 'mobx';
import { ReactNode } from 'react';
import { ButtonType } from '../components/ConfigWidgets';

export class Message {
  title?: string;
  msg?: ReactNode;
  buttons?: ButtonType[];
  response?: (button: string) => void;
  show = false;

  constructor() {
    makeAutoObservable(this);
  }

  clear: () => void = () => {
    this.title = undefined;
  };

  display: (
    title: string,
    msg: ReactNode,
    buttons?: ButtonType[],
    response?: (button: string) => void
  ) => void = (title, msg, buttons?, response?) => {
    this.title = title;
    this.msg = msg;
    this.buttons = buttons;
    this.response = response ?? (() => message.clear());
  };
}

export const message = new Message();
