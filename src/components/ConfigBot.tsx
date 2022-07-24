import React, { ChangeEvent, MouseEvent, useState } from 'react';
import { Bot, UCI_ENGINES } from '../data/bots';
import { Players } from '../data/players';
import { Input } from '@material-tailwind/react';
import { Add, Delete } from '@mui/icons-material';
import { ConfigButton, StyledSelector } from './StyledWidgets';
import { observer } from 'mobx-react';
import { messageDialog } from './MessageBox';

export const ConfigBot = observer(({ players }: { players: Players }) => {
  const [engine, setEngine] = React.useState('');
  const [skill, setSkill] = useState('');
  const [depth, setDepth] = useState('');
  const [time, setTime] = useState('');
  const addPlayerHandler = () => {
    if (!engine) {
      messageDialog.display('Add Bot', 'Need to select a chess engine');
      return;
    }
    const nSkill = Number.parseInt(skill);
    if (isNaN(nSkill) || nSkill < 1 || nSkill > 20) {
      messageDialog.display('Add Bot', 'Need to enter skill level between 1 and 20');
      return;
    }
    const nDepth = Number.parseInt(depth);
    if (!time.length == !depth.length) {
      messageDialog.display('Add Bot', 'Need to enter time or depth, but not both');
      return;
    }
    if (depth.length && (isNaN(nDepth) || nDepth < 6 || nDepth > 30)) {
      messageDialog.display('Add Bot', 'Need to enter depth between 6 and 30');
      return;
    }
    const nTime = Number.parseInt(time);
    if (time.length && (isNaN(nTime) || nTime < 1 || nTime > 60)) {
      messageDialog.display('Add Bot', 'Need to enter a time between 1 and 60 seconds');
      return;
    }
    players.addPlayer(`Bot:${engine}:${skill}:${time}:${depth}`);
    players.save();
  };
  const engineNames = Array.from(UCI_ENGINES.map(x => x.name));
  const skillChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setSkill(event.target.value as string);
  const timeChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setTime(event.target.value as string);
  const depthChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setDepth(event.target.value as string);

  const [marker, setMarker] = useState(-1);
  const selectHandler = (event: MouseEvent<HTMLTableSectionElement>) => {
    if (event.target instanceof HTMLTableCellElement) {
      const id = (event.target.parentNode as HTMLTableRowElement).id;
      const num = Number.parseInt(id);
      setMarker(num == marker ? -1 : num);
    }
  };
  const hasSelect = marker >= 0;
  const bots = players.players.filter(x => x instanceof Bot);
  const delPlayerHandler = () => {
    if (marker >= 0) {
      players.delPlayer(bots[marker].name);
      setMarker(-1);
      players.save();
    }
  };

  return (
    <div className="flex flex-col text-center w-px-650 h-px-400 [&>div]:text-left">
      <div className="bg-gray-100 border-2 border-x-green-700 m-1 p-1">
        <div className="m-1">
          <table className="p-1 text-left text-lg">
            <tbody onClick={selectHandler}>
              {bots.map((bot, iLine) => (
                <tr key={iLine.toString()} id={iLine.toString()}>
                  <td className={iLine == marker ? 'bg-green-300' : ''}>{bot.name}</td>
                </tr>
              ))}
              <tr />
            </tbody>
          </table>
        </div>
        <div>
          <ConfigButton onClick={delPlayerHandler} disabled={!hasSelect}>
            Delete <Delete />
          </ConfigButton>
        </div>
      </div>
      <div></div>
      <div>
        <StyledSelector
          label="Chess Engine"
          choices={engineNames}
          selected={{ name: 'ConfigSelector', value: engine }}
          setSelected={setEngine}
        />{' '}
        <Input label="Skill level" id="skill" onChange={skillChange} />
        <Input label="Depth (..not time)" id="depth" onChange={depthChange} />
        <Input label="Time (sec)" id="time" onChange={timeChange} />
        <ConfigButton onClick={addPlayerHandler}>
          Add <Add />
        </ConfigButton>
      </div>
    </div>
  );
});
