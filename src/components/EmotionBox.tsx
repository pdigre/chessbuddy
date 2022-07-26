import React from 'react';
import styles from '../styles.module.scss';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { makeAutoObservable } from 'mobx';
import { observer } from 'mobx-react';

export type EmotionType = {
  src: string;
  width?: number;
  height?: number;
  length?: number;
};

export class Emotioner {
  title?: string;
  msg?: EmotionType;
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
  ) => void = (title, msg) => {
    this.title = title;
    this.msg = msg;
  };
}

export const emotioner = new Emotioner();

export const EmotionBox = observer(({ emotioner }: { emotioner: Emotioner }) => {
  const width = Math.min(emotioner.msg?.width ?? 480, 500);
  return (
    <Dialog
      aria-labelledby="emotion"
      open={emotioner.title != undefined}
      onClose={emotioner.clear}
      className={styles.Dialog}>
      <DialogTitle id="emotion">{emotioner.title}</DialogTitle>
      <DialogContent>
        <video id="myVideo" autoPlay={true} width={width}>
          <source src={emotioner.msg?.src ?? ''} type="video/mp4" />
        </video>
      </DialogContent>
    </Dialog>
  );
});
