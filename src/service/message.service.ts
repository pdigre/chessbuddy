import { makeAutoObservable } from 'mobx';
import { ButtonType } from '../components/message-dialog';

type ASYNC = () => Promise<string>;
export class MessageService {
  title?: string;
  msg?: string;
  buttons?: ButtonType[];
  response?: (button: string) => void;
  show = false;
  private waitResponse: ASYNC = async () => 'message dialiog not connected';

  constructor() {
    makeAutoObservable(this);
  }

  initialize(func: ASYNC) {
    this.waitResponse = func;
  }

  clear() {
    this.title = undefined;
  }

  async display(
    title: string,
    msg: string,
    buttons?: ButtonType[],
    response?: (button: string) => void
  ) {
    this.title = title;
    this.msg = msg;
    this.buttons = buttons;
    this.response = response ?? (() => this.clear());
    this.show = true;
    const ret = await this.waitResponse();
    return ret;
  }

  onClose(html: string) {
    this.response ? this.response(html) : null;
    this.show = false;
  }
}
