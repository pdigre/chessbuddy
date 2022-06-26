import React, { MouseEvent } from 'react';
import styles from '../styles.module.scss';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
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
    this.response = response ?? (() => messager.clear());
  };
}

export const messager = new Messager();

export const MessageBox = observer(({ messager }: { messager: Messager }) => {
  const handleClick = (event: MouseEvent) => {
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
          <Button
            key={x}
            autoFocus
            onClick={handleClick}
            color="primary"
            variant="contained"
            size="large">
            {x}
          </Button>
        ))}
      </DialogActions>
    </Dialog>
  );
});
