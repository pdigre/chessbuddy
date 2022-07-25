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
import { MovingSharp } from '@mui/icons-material';

export type EmotionType = {
  width?: '480px';
  height?: '480px';
  src: string;
};

export class Emotioner {
  title?: string;
  msg?: EmotionType;
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
    msg: EmotionType,
    buttons?: string[],
    response?: (button: string) => void
  ) => void = (title, msg, buttons?, response?) => {
    this.title = title;
    this.msg = msg;
    this.buttons = buttons;
    this.response = response ?? (() => emotioner.clear());
  };
}

export const emotioner = new Emotioner();

export const EmotionBox = observer(({ emotioner }: { emotioner: Emotioner }) => {
  const handleClick = (event: MouseEvent) => {
    if (emotioner.response) {
      emotioner.response((event.target as HTMLButtonElement).innerHTML);
    }
  };

  return (
    <Dialog
      aria-labelledby="emotion"
      open={emotioner.title != undefined}
      onClose={handleClick}
      className={styles.Dialog}>
      <DialogTitle id="emotion">{emotioner.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <video
            id="myVideo"
            width={emotioner.msg?.width ?? 480}
            height={emotioner.msg?.height ?? 480}
            autoPlay={true}>
            <source src={emotioner.msg?.src ?? ''} type="video/mp4" />
          </video>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {emotioner.buttons?.map(x => (
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
