import React from 'react';
import { observer } from 'mobx-react';
import { ConfigButton, ConfigText } from './ConfigWidgets';
import { messageService } from '../../services/index.service';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { MdAdd, MdSave } from 'react-icons/md';
import { Clock } from '../../model/clock';
import { Config, ConfigMode } from '../../model/config';

export const AddClockDialog = observer(({ config }: { config: Config }) => {
  const handleClick = () => (config.dialog = ConfigMode.None);
  const isEdit = config.dialog === ConfigMode.EditClock;
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
    config.closeDialog();
  };

  return (
    <Dialog
      aria-labelledby="message"
      onClose={handleClick}
      className="text-center text-lg"
      open={config.dialog === ConfigMode.AddClock || config.dialog === ConfigMode.EditClock}>
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
