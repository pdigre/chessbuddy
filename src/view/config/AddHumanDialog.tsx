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
import { Human } from '../../model/human';
import { Config, ConfigMode } from '../../model/config';

export const AddHumanDialog = observer(({ config }: { config: Config }) => {
  const handleClick = () => (config.dialog = ConfigMode.None);
  const isEdit = config.dialog === ConfigMode.EditHuman;
  const items = config.humans;
  const item = isEdit ? (items[config.cursor] as Human) : new Human('', '');

  const save = () => {
    if (!item.name.length) {
      messageService.display('Add Human', 'Need to enter a name');
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
      open={config.dialog === ConfigMode.AddHuman || config.dialog === ConfigMode.EditHuman}>
      <DialogTitle id="message">{isEdit ? 'Edit' : 'Add'} Human Player</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <div className="[&>button]:mx-2 [&>div]:mx-2 mt-3">
            <ConfigText
              label="Name"
              id="name"
              onChange={e => (item.name = e.target.value as string)}
              value={item.name}
            />
            <ConfigText
              label="Email"
              id="email"
              onChange={e => (item.email = e.target.value as string)}
              value={item.email}
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
