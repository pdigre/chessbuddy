import React, { useState } from 'react';
import { config } from '../logic/config';
import * as rules from '../logic/rules';
import { ConfigButton, StyledSelector } from './StyledSelector';
import { Clear, ExitToApp, PlayArrow } from '@mui/icons-material';
import { messager } from './MessageBox';
import { game, gameState } from '../logic/game';
import { observer } from 'mobx-react';
import { Players } from '../logic/players';

export const ConfigGame = observer(({ players }: { players: Players }) => {
  const [white, setWhite] = useState(game.white);
  const [black, setBlack] = useState(game.black);
  const playerNames = Array.from(players.players.map(x => x.name));
  game.setPlayers(white, black);

  const resetGame = () => {
    game.reset();
  };

  const playAction = () => {
    config.showConfig = false;
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
    messager.clear();
  };

  const endAction = () => {
    const winner = rules.whoWon(game.log);
    if (winner) {
      messager.display(
        'Game has ended',
        <div>{winner != 'Draw' ? winner + ' won this game' : 'The game was a draw'}</div>
      );
    } else {
      const white = 'White - ' + game.white;
      const black = 'Black - ' + game.black;
      messager.display('End game', 'Who won?', [white, 'Draw', black], recordScore);
    }
  };

  return (
    <div className="flex flex-col text-center w-[650px] h-[400px] [&>div]:text-left">
      <div>
        <StyledSelector
          label="White"
          choices={playerNames}
          selected={{ name: white, value: white }}
          setSelected={setWhite}
        />
        &nbsp;
        <StyledSelector
          label="Black"
          choices={playerNames}
          selected={{ name: black, value: black }}
          setSelected={setBlack}
        />
      </div>
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
