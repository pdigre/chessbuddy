import React, { ChangeEvent, useState } from 'react';
import { Players } from '../../controller/game/player_human';
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

export const AddPlayerDialog = observer(({ players }: { players: Players }) => {
  const handleClick = () => (players.addHuman = false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const changeName = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setName(e.target.value as string);
  const changeEmail = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setEmail(e.target.value as string);

  const doAddPlayer = () => {
    if (name.length) {
      players.addPlayer(`Human:${name}:${email}`);
      players.save();
      players.addHuman = false;
    } else {
      message.display('Add Human', 'Need to enter a name');
    }
  };

  return (
    <Dialog
      aria-labelledby="message"
      onClose={handleClick}
      className="text-center text-lg"
      open={players.addHuman}>
      <DialogTitle id="message">Add Human Player</DialogTitle>
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
