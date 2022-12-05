import React from 'react';
import { observer } from 'mobx-react';
import { ConfigButton, ConfigText } from './ConfigWidgets';
import { messageService } from '../../services/message.service';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { MdAdd, MdSave } from 'react-icons/md';
import { Clock } from '../../model/clock';
import { storage } from '../../services/storage.service';
import { Config, EditMode } from '../../model/config';

export const AddClockDialog = observer(({ config }: { config: Config }) => {
  const handleClick = () => (config.dialog = EditMode.None);
  const isEdit = config.dialog === EditMode.EditClock;
  const items = config.clocks;
  const item = isEdit ? (items[config.cursor] as Clock) : new Clock('', []);

  const save = () => {
    if (item.name.length) {
      if (isEdit) {
        items[config.cursor] = item;
      } else {
        items.push(item);
      }
      storage.storeList(Clock.storage, items);
      config.dialog = EditMode.None;
      config.cursor = -1;
    } else {
      messageService.display('Add Clock', 'Need to enter a name');
    }
  };

  return (
    <Dialog
      aria-labelledby="message"
      onClose={handleClick}
      className="text-center text-lg"
      open={config.dialog === EditMode.AddClock || config.dialog === EditMode.EditClock}>
      <DialogTitle id="message">Add Clock</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <div className="[&>button]:mx-2 [&>div]:mx-2 mt-3">
            <ConfigText
              label="Clock name"
              id="name"
              onChange={e => (item.name = e.target.value as string)}
              value={item.name}
            />
            <ConfigButton
              onClick={save}
              label={isEdit ? 'Save' : 'Add'}
              icon={isEdit ? <MdSave /> : <MdAdd />}
            />
          </div>
        </DialogContentText>
      </DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  );
});
