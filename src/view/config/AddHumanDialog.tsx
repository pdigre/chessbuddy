import React from 'react';
import { EditMode, PlayerList } from '../../controller/game/playerlist';
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
import { MdAdd, MdSave } from 'react-icons/md';
import { Human } from '../../controller/game/player_human';

export const AddHumanDialog = observer(({ players }: { players: PlayerList }) => {
  const handleClick = () => (players.addHuman = EditMode.None);
  const isEdit = players.addHuman === EditMode.Edit;
  const player = players.edited as Human;

  const savePlayer = () => {
    if (player.name.length) {
      if (isEdit) {
        players.humans[players.cursor] = player;
      } else {
        players.players.push(player);
      }
      players.save();
      players.addHuman = EditMode.None;
      players.cursor = -1;
    } else {
      message.display('Add Human', 'Need to enter a name');
    }
  };

  return (
    <Dialog
      aria-labelledby="message"
      onClose={handleClick}
      className="text-center text-lg"
      open={players.addHuman !== EditMode.None}>
      <DialogTitle id="message">{isEdit ? 'Edit' : 'Add'} Human Player</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <div className="[&>button]:mx-2 [&>div]:mx-2 mt-3">
            <ConfigText
              label="Player Name"
              id="name"
              onChange={e => (player.name = e.target.value as string)}
              value={player.name}
            />
            <ConfigText
              label="Player Email"
              id="email"
              onChange={e => (player.email = e.target.value as string)}
              value={player.email}
            />
            <ConfigButton
              onClick={savePlayer}
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
