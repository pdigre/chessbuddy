import { makeAutoObservable } from 'mobx';
import { ReactNode } from 'react';
import { ButtonType } from '../view/config/ConfigWidgets';

export class MessageService {
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
    this.response = response ?? (() => this.clear());
  };
}
