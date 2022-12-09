import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import React from 'react';
import { Bot, UciEngineDefs } from '../../model/bot';
import { ConfigButton, ConfigSelect, ConfigText } from './ConfigWidgets';
import { observer } from 'mobx-react';
import { messageService } from '../../services/message.service';
import { MdAdd, MdSave } from 'react-icons/md';
import { Config, EditMode } from '../../model/config';

export const AddBotDialog = observer(({ config }: { config: Config }) => {
  const handleClick = () => (config.dialog = EditMode.None);
  const isEdit = config.dialog === EditMode.EditBot;
  const items = config.bots;
  const item = isEdit ? (items[config.cursor] as Bot) : new Bot('', UciEngineDefs[0].name, 0, 0, 0);

  const save = () => {
    if (!item.name.length) {
      messageService.display('Add Bot', 'Need to enter a name');
      return;
    }
    if (!item.engine) {
      messageService.display('Add Bot', 'Need to select a chess engine');
      return;
    }
    const nSkill = item.skill;
    if (isNaN(nSkill) || nSkill < 1 || nSkill > 20) {
      messageService.display('Add Bot', 'Need to enter skill level between 1 and 20');
      return;
    }
    const nTime = item.time;
    if (item.time && (isNaN(nTime) || nTime < 1 || nTime > 60)) {
      messageService.display('Add Bot', 'Need to enter a time between 1 and 60 seconds');
      return;
    }
    const nDepth = item.depth;
    if (!item.time == !item.depth) {
      messageService.display('Add Bot', 'Need to enter time or depth, but not both');
      return;
    }
    if (item.depth && (isNaN(nDepth) || nDepth < 6 || nDepth > 30)) {
      messageService.display('Add Bot', 'Need to enter depth between 6 and 30');
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
      open={config.dialog === EditMode.AddBot || config.dialog === EditMode.EditBot}>
      <DialogTitle id="message">{isEdit ? 'Edit' : 'Add'} Bot Player</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <div className="[&>button]:mx-2 [&>div]:mx-2 mt-3">
            <ConfigText
              label="Name"
              id="name"
              onChange={e => (item.name = e.target.value as string)}
              value={item.name}
            />
            <ConfigSelect
              label="Chess Engine"
              choices={engineNames}
              selected={{ name: 'ConfigSelector', value: item.engine }}
              setSelected={value => (item.engine = value)}
            />
            <br />
            <ConfigText
              label="Skill level"
              id="skill"
              onChange={e => (item.skill = toInt(e.target.value))}
              value={intToTxt(item.skill)}
            />{' '}
            <br />
            <ConfigText
              label="Time (sec)"
              id="time"
              onChange={e => (item.time = toInt(e.target.value))}
              value={intToTxt(item.time)}
            />{' '}
            <br />
            <ConfigText
              label="Depth (..not time)"
              id="depth"
              onChange={e => (item.depth = toInt(e.target.value))}
              value={intToTxt(item.depth)}
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
