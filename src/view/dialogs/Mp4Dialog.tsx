import React from 'react';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { observer } from 'mobx-react';
import { Mp4 } from '../../controller/config/mp4';

export const Mp4Dialog = observer(({ mp4 }: { mp4: Mp4 }) => {
  const width = Math.min(mp4.msg?.width ?? 480, 500);
  return (
    <Dialog
      aria-labelledby="mp4"
      open={mp4.title != undefined}
      onClose={mp4.clear}
      className="text-center text-lg">
      <DialogTitle id="mp4">{mp4.title}</DialogTitle>
      <DialogContent>
        <video id="myVideo" autoPlay={true} width={width}>
          <source src={mp4.msg?.src ?? ''} type="video/mp4" />
        </video>
      </DialogContent>
    </Dialog>
  );
});
