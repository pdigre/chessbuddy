import { makeAutoObservable } from 'mobx';
import { ButtonType } from '../components/message-dialog';

export class MessageService {
  title?: string;
  msg?: string;
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
    msg: string,
    buttons?: ButtonType[],
    response?: (button: string) => void
  ) => void = (title, msg, buttons?, response?) => {
    this.title = title;
    this.msg = msg;
    this.buttons = buttons;
    this.response = response ?? (() => this.clear());
    this.show = true;
  };

  onClose(html: string) {
    this.response ? this.response(html) : null;
    this.show = false;
  }
}
