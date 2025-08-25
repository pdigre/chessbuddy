import React from 'react';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { observer } from 'mobx-react';
import { MediaService } from '../../common/service/media.service';

export const Mp4dialog = observer(({ mp4 }: { mp4: MediaService }) => {
  const { width, src, title, onClose, open } = mp4.getDialogControls();
  return mp4.show ? (
    <Dialog
      aria-labelledby="mp4"
      open
      onClose={onClose}
      onClick={onClose}
      className="text-center text-lg">
      <DialogTitle id="mp4">
        {title} - {src}
      </DialogTitle>
      <DialogContent>
        <video id="myVideo" autoPlay width={width}>
          <source src={src} type="video/mp4" />
        </video>
      </DialogContent>
    </Dialog>
  ) : (
    <div></div>
  );
});
