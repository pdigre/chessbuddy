import React, { useState } from 'react';
import { ConfigButton, ConfigSelect } from './ConfigWidgets';
import { MdExitToApp, MdPlayCircle, MdClear, MdEdit } from 'react-icons/md';
import { game } from '../../controller/game/game';
import { observer } from 'mobx-react';
import { PlayerList } from '../../controller/game/playerlist';
import { ClockList, Clock } from '../../controller/config/clocklist';
import { message } from '../../controller/control/message';
import { FaRegHandshake, FaChessKing } from 'react-icons/fa';

export const ConfigGame = observer(
  ({ players, clockList }: { players: PlayerList; clockList: ClockList }) => {
    const [white, setWhite] = useState(game.white);
    const [black, setBlack] = useState(game.black);
    const playerNames = Array.from(players.players.map(x => x.name));
    game.setPlayers(white, black);

    const endAction = () => {
      const winner = game.whoWon();
      if (winner) {
        message.display(
          'Game has ended',
          winner != 'Draw' ? winner + ' won this game' : 'The game was a draw'
        );
      } else {
        const white = game.white.split(' ')[0];
        const black = game.black.split(' ')[0];
        message.display(
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
            selected={{ name: white, value: white }}
            setSelected={setWhite}
          />
          &nbsp;
          <ConfigSelect
            label="Black"
            choices={playerNames}
            selected={{ name: black, value: black }}
            setSelected={setBlack}
          />
        </div>
        <div>&nbsp;</div>
        <ConfigSelect
          label="Timer setting"
          choices={clockList.clocks.map(x => x.name)}
          selected={{ name: clockList.current.name, value: clockList.current.name }}
          setSelected={name => {
            clockList.current = clockList.clocks.find(x => x.name == name) as Clock;
          }}
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
  }
);