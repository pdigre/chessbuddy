import React from 'react';
import { ConfigButton, ConfigSelect } from './ConfigWidgets';
import { MdExitToApp, MdPlayCircle, MdClear, MdEdit } from 'react-icons/md';
import { gameState, playService } from '../../services/play.service';
import { observer } from 'mobx-react';
import { messageService } from '../../services/message.service';
import { FaRegHandshake, FaChessKing } from 'react-icons/fa';
import { Config } from '../../model/config';
import { runInAction } from 'mobx';

export const ConfigGame = observer(({ config }: { config: Config }) => {
  const players = [...config.humans, ...config.bots];
  const playerNames = Array.from(players.map(x => x.getName()));

  const endAction = () => {
    const winner = playService.whoWon();
    if (winner) {
      messageService.display(
        'Game has ended',
        winner != 'Draw' ? winner + ' won this game' : 'The game was a draw'
      );
    } else {
      const white = config.white.split(' ')[0];
      const black = config.black.split(' ')[0];
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
        playService.recordScore
      );
    }
  };

  const playAction = () => {
    config.store();
    runInAction(() => {
      config.showConfig = false;
      playService.playAction();
    });
  };

  const editAction = () => {
    config.store();
    runInAction(() => {
      gameState.editMode = true;
      config.showConfig = false;
    });
  };

  return (
    <div className="w-[800px] h-[400px] flex flex-col text-center [&>div]:text-left">
      <div>
        <ConfigSelect
          label="White"
          choices={playerNames}
          selected={{ name: config.white, value: config.white }}
          setSelected={value =>
            runInAction(() => {
              config.white = value;
            })
          }
        />
        &nbsp;
        <ConfigSelect
          label="Black"
          choices={playerNames}
          selected={{ name: config.black, value: config.black }}
          setSelected={value =>
            runInAction(() => {
              config.black = value;
            })
          }
        />
      </div>
      <div>&nbsp;</div>
      <ConfigSelect
        label="Timer setting"
        choices={config.clocks.map(x => x.name)}
        selected={{ name: config.clock, value: config.clock }}
        setSelected={value =>
          runInAction(() => {
            config.clock = value;
          })
        }
      />
      <div>&nbsp;</div>
      <div className="[&>button]:mx-2">
        <ConfigButton onClick={playAction} label="Play" icon={<MdPlayCircle />} />
        <ConfigButton
          onClick={endAction}
          label="End game"
          icon={<MdExitToApp />}
          disabled={playService.isComplete}
        />
        <ConfigButton onClick={playService.reset} label="Reset" icon={<MdClear />} />
        <ConfigButton onClick={editAction} label="Edit" icon={<MdEdit />} />
      </div>
    </div>
  );
});
