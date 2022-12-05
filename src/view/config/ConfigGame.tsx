import React from 'react';
import { ConfigButton, ConfigSelect } from './ConfigWidgets';
import { MdExitToApp, MdPlayCircle, MdClear, MdEdit } from 'react-icons/md';
import { Game } from '../../services/game/game';
import { observer } from 'mobx-react';
import { messageService } from '../../services/message.service';
import { FaRegHandshake, FaChessKing } from 'react-icons/fa';
import { Config } from '../../model/config';

export const ConfigGame = observer(({ game, config }: { game: Game; config: Config }) => {
  const players = [...config.humans, ...config.bots];
  const playerNames = Array.from(players.map(x => x.getName()));

  const endAction = () => {
    const winner = game.whoWon();
    if (winner) {
      messageService.display(
        'Game has ended',
        winner != 'Draw' ? winner + ' won this game' : 'The game was a draw'
      );
    } else {
      const white = game.white.split(' ')[0];
      const black = game.black.split(' ')[0];
      messageService.display(
        'End game',
        <div className="text-3xl">
          Who won?
          <img src="/png/win.png" />
        </div>,
        [
          { label: white, icon: <FaChessKing className="text-white" /> },
          { label: 'Draw', icon: <FaRegHandshake /> },
          { label: black, icon: <FaChessKing className="text-black" /> },
        ],
        game.recordScore
      );
    }
  };

  return (
    <div className="w-[800px] h-[400px] flex flex-col text-center [&>div]:text-left">
      <div>
        <ConfigSelect
          label="White"
          choices={playerNames}
          selected={{ name: game.white, value: game.white }}
          setSelected={value => (game.white = value)}
        />
        &nbsp;
        <ConfigSelect
          label="Black"
          choices={playerNames}
          selected={{ name: game.black, value: game.black }}
          setSelected={value => (game.black = value)}
        />
      </div>
      <div>&nbsp;</div>
      <ConfigSelect
        label="Timer setting"
        choices={config.clocks.map(x => x.name)}
        selected={{ name: game.clock, value: game.clock }}
        setSelected={value => (game.clock = value)}
      />
      <div>&nbsp;</div>
      <div className="[&>button]:mx-2">
        <ConfigButton onClick={game.playAction} label="Play" icon={<MdPlayCircle />} />
        <ConfigButton
          onClick={endAction}
          label="End game"
          icon={<MdExitToApp />}
          disabled={game.isComplete}
        />
        <ConfigButton onClick={game.reset} label="Reset" icon={<MdClear />} />
        <ConfigButton onClick={game.edit} label="Edit" icon={<MdEdit />} />
      </div>
    </div>
  );
});
