import React, { MouseEvent } from 'react';
import { Bot } from '../../controller/game/player_bot';
import { EditMode, PlayerList } from '../../controller/game/playerlist';
import { ConfigButton } from './ConfigWidgets';
import { observer } from 'mobx-react';
import { MdAdd, MdDelete, MdEdit } from 'react-icons/md';
import { AddBotDialog } from './AddBotDialog';

export const ConfigBot = observer(({ players: playerList }: { players: PlayerList }) => {
  const bots = playerList.bots;
  const hasSelect = playerList.cursor >= 0;

  const doSelect = (event: MouseEvent<HTMLTableSectionElement>) => {
    if (event.target instanceof HTMLTableCellElement) {
      const id = (event.target.parentNode as HTMLTableRowElement).id;
      const num = Number.parseInt(id);
      playerList.cursor = num == playerList.cursor ? -1 : num;
    }
  };
  const doDelPlayer = () => {
    if (hasSelect) {
      playerList.bots.splice(playerList.cursor, 1);
      playerList.save();
      playerList.cursor = -1;
    }
  };
  const doEditPlayer = () => {
    if (hasSelect) {
      playerList.dialog = EditMode.EditBot;
      playerList.edited = bots[playerList.cursor];
    }
  };
  const doAddPlayer = () => {
    playerList.dialog = EditMode.AddBot;
    playerList.edited = new Bot('', 0, 0, 0);
  };

  return (
    <div className="w-[800px] h-[400px] [&>div]:text-left">
      <table className="w-full text-left text-lg dark:bg-slate-800 border-2 border-separate p-2">
        <tbody onClick={doSelect}>
          {bots.map((bot, iLine) => (
            <tr
              key={iLine.toString()}
              id={iLine.toString()}
              className={iLine == playerList.cursor ? 'bg-green-300' : ''}>
              <td className="dark:text-white">{bot.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <ConfigButton onClick={doAddPlayer} label="Add" icon={<MdAdd />} />
      <ConfigButton onClick={doEditPlayer} label="Edit" icon={<MdEdit />} disabled={!hasSelect} />
      <ConfigButton
        onClick={doDelPlayer}
        label="Delete"
        icon={<MdDelete />}
        disabled={!hasSelect}
      />
      <AddBotDialog players={playerList} />
    </div>
  );
});
