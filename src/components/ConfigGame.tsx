import React, { useState } from 'react';
import { config } from '../logic/config';
import * as rules from '../logic/rules';
import { ConfigButton, ConfigSelect } from './ConfigWidgets';
import { Clear, ExitToApp, PlayArrow } from '@mui/icons-material';
import { game, gameState } from '../logic/game';
import { observer } from 'mobx-react';
import { Players } from '../logic/players';
import { message } from '../logic/message';
import { Clock, Clocks, ClockType } from '../logic/clock';

export const ConfigGame = observer(({ players, clock }: { players: Players; clock: Clock }) => {
  const [white, setWhite] = useState(game.white);
  const [black, setBlack] = useState(game.black);
  const playerNames = Array.from(players.players.map(x => x.name));
  game.setPlayers(white, black);

  const resetGame = () => {
    game.reset();
  };

  const playAction = () => {
    config.showTab = -1;
    gameState.isPlaying = true;
    gameState.run();
  };

  const recordScore: (ok: string) => void = yes => {
    if (yes.startsWith('White')) {
      game.playMove('1-0');
    } else if (yes.startsWith('Black')) {
      game.playMove('0-1');
    } else if (yes == 'Draw') {
      game.playMove('1/2-1/2');
    }
    message.clear();
  };

  const endAction = () => {
    const winner = rules.whoWon(game.log);
    if (winner) {
      message.display(
        'Game has ended',
        <div>{winner != 'Draw' ? winner + ' won this game' : 'The game was a draw'}</div>
      );
    } else {
      const white = 'White - ' + game.white;
      const black = 'Black - ' + game.black;
      message.display('End game', 'Who won?', [white, 'Draw', black], recordScore);
    }
  };

  return (
    <div className="flex flex-col text-center w-[650px] h-[400px] [&>div]:text-left">
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
        choices={Clocks.map(x => x.name)}
        selected={{ name: clock.clockType.name, value: clock.clockType.name }}
        setSelected={name => {
          clock.clockType = Clocks.find(x => x.name == name) as ClockType;
        }}
      />
      <div>&nbsp;</div>
      <div>
        <ConfigButton onClick={playAction}>
          Play
          <PlayArrow />
        </ConfigButton>
        &nbsp;
        {game.isComplete ? (
          ''
        ) : (
          <ConfigButton onClick={endAction}>
            End game
            <ExitToApp />
          </ConfigButton>
        )}
        &nbsp;
        <ConfigButton onClick={resetGame}>
          Reset
          <Clear />
        </ConfigButton>
      </div>
    </div>
  );
});
