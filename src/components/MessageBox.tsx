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

export type MessageType = (value: React.SetStateAction<MessageBoxProps | undefined>) => void;

export type MessageBoxProps = {
  title?: string;
  msg?: JSX.Element;
  buttons?: string[];
  response?: (button: string) => void;
};

export const MessageBox: React.FC<MessageBoxProps> = ({ title, msg, buttons, response }) => {
  const handleClick: HANDLE_CLICK = event => {
    if (response) {
      response((event.target as HTMLButtonElement).innerHTML);
    }
  };

  return (
    <Dialog
      aria-labelledby="message"
      open={title != undefined}
      onClose={handleClick}
      className={styles.Dialog}>
      <DialogTitle id="message">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{msg}</DialogContentText>
      </DialogContent>
      <DialogActions>
        {buttons?.map(x => (
          <Button key={x} autoFocus onClick={handleClick} color="primary">
            {x}
          </Button>
        ))}
      </DialogActions>
    </Dialog>
  );
};
