import React, { ChangeEvent, useState } from 'react';
import { observer } from 'mobx-react';
import { ConfigButton, ConfigText } from './ConfigWidgets';
import { message } from '../../controller/control/message';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { MdAdd } from 'react-icons/md';
import { ClockList } from '../../controller/config/clocklist';

export const AddClockDialog = observer(({ clockList }: { clockList: ClockList }) => {
  const handleClick = () => (clockList.addDialog = false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const changeName = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setName(e.target.value as string);
  const changeEmail = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setEmail(e.target.value as string);

  const doAddPlayer = () => {
    if (name.length) {
      clockList.addClock(`Human:${name}:${email}`);
      clockList.save();
      clockList.addDialog = false;
    } else {
      message.display('Add Human', 'Need to enter a name');
    }
  };

  return (
    <Dialog
      aria-labelledby="message"
      onClose={handleClick}
      className="text-center text-lg"
      open={clockList.addDialog}>
      <DialogTitle id="message">Add Clock</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <div className="[&>button]:mx-2 [&>div]:mx-2 mt-3">
            <ConfigText label="Player Name" id="name" onChange={changeName} />
            <ConfigText label="Player Email" id="email" onChange={changeEmail} />
            <ConfigButton onClick={doAddPlayer} label="Add" icon={<MdAdd />} />
          </div>
        </DialogContentText>
      </DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  );
});
