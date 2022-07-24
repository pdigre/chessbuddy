import React, { MouseEvent } from 'react';
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter } from '@material-tailwind/react';
import { makeAutoObservable } from 'mobx';
import { observer } from 'mobx-react';

export class MessageDialog {
  title?: string;
  msg?: JSX.Element;
  buttons?: string[];
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
    msg: JSX.Element | string,
    buttons?: string[],
    response?: (button: string) => void
  ) => void = (title, msg, buttons?, response?) => {
    this.title = title;
    this.msg = (msg instanceof Element ? msg : <div>{msg}</div>) as JSX.Element;
    this.buttons = buttons;
    this.response = response ?? (() => messageDialog.clear());
  };
}

export const messageDialog = new MessageDialog();

export const MessageBox = observer(({ messageDialog }: { messageDialog: MessageDialog }) => {
  const handleClick = (event: MouseEvent) => {
    if (!event) {
      messageDialog.clear();
    }
    if (messageDialog.response) {
      messageDialog.response((event.target as HTMLButtonElement).innerHTML);
    }
  };

  return (
    <Dialog
      aria-labelledby="message"
      open={messageDialog.title != undefined}
      handler={handleClick}
      className="text-center text-lg">
      <DialogHeader id="message">{messageDialog.title}</DialogHeader>
      <DialogBody>{messageDialog.msg}</DialogBody>
      <DialogFooter>
        {messageDialog.buttons?.map(x => (
          <Button key={x} autoFocus onClick={handleClick} variant="filled">
            {x}
          </Button>
        ))}
      </DialogFooter>
    </Dialog>
  );
});
