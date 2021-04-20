import React from 'react';
import styles from '../styles.module.scss';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@material-ui/core';
import type { HANDLE_CLICK } from './reacttypes';
import { makeAutoObservable } from 'mobx';
import { observer } from 'mobx-react';

export class Messager {
  title?: string;
  msg?: JSX.Element;
  buttons?: string[];
  response?: (button: string) => void;
  show = false;
  constructor() {
    makeAutoObservable(this);
  }
  clear() {
    this.title = undefined;
  }
  display(
    title: string,
    msg: JSX.Element | string,
    buttons?: string[],
    response?: (button: string) => void
  ) {
    this.title = title;
    this.msg = (msg instanceof Element ? msg : <div>{msg}</div>) as JSX.Element;
    this.buttons = buttons;
    this.response = response ?? (() => messager.clear());
  }
}
export const messager = new Messager();

export const MessageBox = observer(({ messager }: { messager: Messager }) => {
  const handleClick: HANDLE_CLICK = event => {
    if (messager.response) {
      messager.response((event.target as HTMLButtonElement).innerHTML);
    }
  };

  return (
    <Dialog
      aria-labelledby="message"
      open={messager.title != undefined}
      onClose={handleClick}
      className={styles.Dialog}>
      <DialogTitle id="message">{messager.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{messager.msg}</DialogContentText>
      </DialogContent>
      <DialogActions>
        {messager.buttons?.map(x => (
          <Button key={x} autoFocus onClick={handleClick} color="primary">
            {x}
          </Button>
        ))}
      </DialogActions>
    </Dialog>
  );
});
