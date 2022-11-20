import React, { MouseEvent } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { observer } from 'mobx-react';
import { Message } from '../../controller/control/message';
import { ConfigButton } from '../config/ConfigWidgets';

export const MessageDialog = observer(({ message }: { message: Message }) => {
  const handleClick = (event: MouseEvent) => {
    if (message.response) {
      message.response((event.target as HTMLButtonElement).innerHTML);
    }
  };

  return (
    <Dialog
      aria-labelledby="message"
      open={message.title != undefined}
      onClose={handleClick}
      className="text-center text-lg">
      <DialogTitle id="message">{message.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message.msg}</DialogContentText>
      </DialogContent>
      <DialogActions>
        {message.buttons?.map(x => (
          <ConfigButton key={x.label} onClick={handleClick} label={x.label} icon={x.icon} />
        ))}
      </DialogActions>
    </Dialog>
  );
});
