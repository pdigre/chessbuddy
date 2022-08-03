import React, { useState } from 'react';
import { ConfigButton, ConfigSelect } from './ConfigWidgets';
import { Clear, ExitToApp, PlayArrow } from '@mui/icons-material';
import { game } from '../logic/game';
import { observer } from 'mobx-react';
import { Players } from '../logic/players';
import { Clock, Clocks, ClockType } from '../logic/clock';

export const ConfigGame = observer(({ players, clock }: { players: Players; clock: Clock }) => {
  const [white, setWhite] = useState(game.white);
  const [black, setBlack] = useState(game.black);
  const playerNames = Array.from(players.players.map(x => x.name));
  game.setPlayers(white, black);

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
        <ConfigButton onClick={game.playAction}>
          Play
          <PlayArrow />
        </ConfigButton>
        &nbsp;
        {game.isComplete ? (
          ''
        ) : (
          <ConfigButton onClick={game.endAction}>
            End game
            <ExitToApp />
          </ConfigButton>
        )}
        &nbsp;
        <ConfigButton onClick={game.reset}>
          Reset
          <Clear />
        </ConfigButton>
      </div>
    </div>
  );
});
