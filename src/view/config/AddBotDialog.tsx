import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import React from 'react';
import { Bot, UciEngineDefs } from '../../controller/game/player_bot';
import { EditMode, PlayerList } from '../../controller/game/playerlist';
import { ConfigButton, ConfigSelect, ConfigText } from './ConfigWidgets';
import { observer } from 'mobx-react';
import { message } from '../../controller/control/message';
import { MdAdd, MdSave } from 'react-icons/md';

export const AddBotDialog = observer(({ players }: { players: PlayerList }) => {
  const handleClick = () => (players.addBot = EditMode.None);
  const isEdit = players.addBot === EditMode.Edit;
  const player = players.edited as Bot;

  const savePlayer = () => {
    if (!player.engine) {
      message.display('Add Bot', 'Need to select a chess engine');
      return;
    }
    const nSkill = player.skill;
    if (isNaN(nSkill) || nSkill < 1 || nSkill > 20) {
      message.display('Add Bot', 'Need to enter skill level between 1 and 20');
      return;
    }
    const nDepth = player.depth;
    if (!player.time == !player.depth) {
      message.display('Add Bot', 'Need to enter time or depth, but not both');
      return;
    }
    if (player.depth && (isNaN(nDepth) || nDepth < 6 || nDepth > 30)) {
      message.display('Add Bot', 'Need to enter depth between 6 and 30');
      return;
    }
    const nTime = player.time;
    if (player.time && (isNaN(nTime) || nTime < 1 || nTime > 60)) {
      message.display('Add Bot', 'Need to enter a time between 1 and 60 seconds');
      return;
    }
    players.parsePlayer(`Bot:${player.engine}:${player.skill}:${player.time}:${player.depth}`);
    players.save();
    players.addBot = EditMode.None;
  };
  const engineNames = Array.from(UciEngineDefs.map(x => x.name));

  const toInt: (num: string) => number = (num: string) => {
    const parsed = Number.parseInt(num);
    return isNaN(parsed) ? 0 : parsed;
  };

  const intToTxt: (num: number) => string = (num: number) => {
    return isNaN(num) ? '0' : num.toString();
  };

  return (
    <Dialog
      aria-labelledby="message"
      onClose={handleClick}
      className="text-center text-lg"
      open={players.addBot !== EditMode.None}>
      <DialogTitle id="message">{isEdit ? 'Edit' : 'Add'} Bot Player</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <div className="[&>button]:mx-2 [&>div]:mx-2 mt-3">
            <ConfigSelect
              label="Chess Engine"
              choices={engineNames}
              selected={{ name: 'ConfigSelector', value: player.engine }}
              setSelected={e => (player.engine = e)}
            />
            <br />
            <ConfigText
              label="Skill level"
              id="skill"
              onChange={e => (player.skill = toInt(e.target.value))}
              value={intToTxt(player.skill)}
            />{' '}
            <br />
            <ConfigText
              label="Depth (..not time)"
              id="depth"
              onChange={e => (player.depth = toInt(e.target.value))}
              value={intToTxt(player.depth)}
            />
            <ConfigText
              label="Time (sec)"
              id="time"
              onChange={e => (player.time = toInt(e.target.value))}
              value={intToTxt(player.time)}
            />{' '}
            <br />
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
