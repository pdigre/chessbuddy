import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import React, { ChangeEvent, useState } from 'react';
import { UCI_ENGINES } from '../../controller/game/player_bot';
import { Players } from '../../controller/game/player_human';
import { ConfigButton, ConfigSelect, ConfigText } from './ConfigWidgets';
import { observer } from 'mobx-react';
import { message } from '../../controller/control/message';
import { MdAdd } from 'react-icons/md';

export const AddBotDialog = observer(({ players }: { players: Players }) => {
  const handleClick = () => (players.addBot = false);

  const [engine, setEngine] = React.useState('');
  const [skill, setSkill] = useState('');
  const [depth, setDepth] = useState('');
  const [time, setTime] = useState('');
  const addPlayerHandler = () => {
    if (!engine) {
      message.display('Add Bot', 'Need to select a chess engine');
      return;
    }
    const nSkill = Number.parseInt(skill);
    if (isNaN(nSkill) || nSkill < 1 || nSkill > 20) {
      message.display('Add Bot', 'Need to enter skill level between 1 and 20');
      return;
    }
    const nDepth = Number.parseInt(depth);
    if (!time.length == !depth.length) {
      message.display('Add Bot', 'Need to enter time or depth, but not both');
      return;
    }
    if (depth.length && (isNaN(nDepth) || nDepth < 6 || nDepth > 30)) {
      message.display('Add Bot', 'Need to enter depth between 6 and 30');
      return;
    }
    const nTime = Number.parseInt(time);
    if (time.length && (isNaN(nTime) || nTime < 1 || nTime > 60)) {
      message.display('Add Bot', 'Need to enter a time between 1 and 60 seconds');
      return;
    }
    players.addPlayer(`Bot:${engine}:${skill}:${time}:${depth}`);
    players.save();
    players.addBot = false;
  };
  const engineNames = Array.from(UCI_ENGINES.map(x => x.name));
  const skillChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setSkill(event.target.value as string);
  const timeChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setTime(event.target.value as string);
  const depthChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setDepth(event.target.value as string);

  return (
    <Dialog
      aria-labelledby="message"
      onClose={handleClick}
      className="text-center text-lg"
      open={players.addBot}>
      <DialogTitle id="message">Add Bot Player</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <div className="[&>button]:mx-2 [&>div]:mx-2 mt-3">
            <ConfigSelect
              label="Chess Engine"
              choices={engineNames}
              selected={{ name: 'ConfigSelector', value: engine }}
              setSelected={setEngine}
            />
            <br />
            <ConfigText label="Skill level" id="skill" onChange={skillChange} /> <br />
            <ConfigText label="Depth (..not time)" id="depth" onChange={depthChange} />
            <ConfigText label="Time (sec)" id="time" onChange={timeChange} /> <br />
            <ConfigButton onClick={addPlayerHandler} label="Add" icon={<MdAdd />} />
          </div>
        </DialogContentText>
      </DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  );
});
