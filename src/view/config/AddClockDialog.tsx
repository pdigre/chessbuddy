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
import { Config, EditMode } from '../../model/config';

export const AddClockDialog = observer(({ config }: { config: Config }) => {
  const handleClick = () => (config.dialog = EditMode.None);
  const isEdit = config.dialog === EditMode.EditClock;
  const items = config.clocks;
  const item = isEdit ? (items[config.cursor] as Clock) : new Clock('', []);

  const save = () => {
    if (!item.name.length) {
      messageService.display('Add Clock', 'Need to enter a name');
      return;
    }
    if (isEdit) {
      items[config.cursor] = item;
    } else {
      items.push(item);
    }
    config.dialog = EditMode.None;
    config.cursor = -1;
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
          <p>(from move)+(plus minutes)/(seconds each move) comma separated</p>
          <div className="[&>button]:mx-2 [&>div]:mx-2 mt-3">
            <ConfigText
              label="Clock name"
              id="name"
              onChange={e => (item.name = e.target.value as string)}
              value={item.name}
            />
            <ConfigText
              label="Timings"
              id="timings"
              onChange={e => (item.time = Clock.string2time(e.target.value as string))}
              value={item.getDescription()}
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
