import React, { MouseEvent, useState } from 'react';
import { Bot } from '../../controller/game/player_bot';
import { Players } from '../../controller/game/player_human';
import { ConfigButton } from './ConfigWidgets';
import { observer } from 'mobx-react';
import { MdAdd, MdDelete } from 'react-icons/md';
import { AddBotDialog } from './AddBotDialog';

export const ConfigBot = observer(({ players }: { players: Players }) => {
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
    <div className="w-[800px] h-[400px] [&>div]:text-left">
      <table className="w-full text-left text-lg dark:bg-slate-800 border-2 border-separate p-2">
        <tbody onClick={selectHandler}>
          {bots.map((bot, iLine) => (
            <tr
              key={iLine.toString()}
              id={iLine.toString()}
              className={iLine == marker ? 'bg-green-300' : ''}>
              <td className="dark:text-white">{bot.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <ConfigButton onClick={() => (players.addBot = true)} label="Add" icon={<MdAdd />} />
      <ConfigButton
        onClick={delPlayerHandler}
        label="Delete"
        icon={<MdDelete />}
        disabled={!hasSelect}
      />
      <AddBotDialog players={players} />
    </div>
  );
});
