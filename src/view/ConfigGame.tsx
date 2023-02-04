import React from 'react';
import { ConfigButton, ConfigSelect } from './ConfigWidgets';
import { MdExitToApp, MdPlayCircle, MdClear, MdEdit } from 'react-icons/md';
import { observer } from 'mobx-react';
import { ConfigService } from '../service/config.service';
import { playService } from '../service/index.service';

export const ConfigGame = observer(({ config }: { config: ConfigService }) => {
  const players = [...config.humans, ...config.bots];
  const playerNames = Array.from(players.map(x => x.getName()));

  return (
    <div className="w-[800px] h-[400px] flex flex-col text-center [&>div]:text-left">
      <div>
        <ConfigSelect
          label="White"
          choices={playerNames}
          selected={{ name: config.white, value: config.white }}
          setSelected={value => config.setWhite(value)}
        />
        &nbsp;
        <ConfigSelect
          label="Black"
          choices={playerNames}
          selected={{ name: config.black, value: config.black }}
          setSelected={value => config.setBlack(value)}
        />
      </div>
      <div>&nbsp;</div>
      <ConfigSelect
        label="Timer setting"
        choices={config.clocks.map(x => x.name)}
        selected={{ name: config.clock, value: config.clock }}
        setSelected={value => config.setClock(value)}
      />
      <div>&nbsp;</div>
      <div className="[&>button]:mx-2">
        <ConfigButton onClick={playService.startGameAction} label="Play" icon={<MdPlayCircle />} />
        <ConfigButton
          onClick={playService.endGameAction}
          label="End game"
          icon={<MdExitToApp />}
          disabled={playService.isComplete}
        />
        <ConfigButton onClick={playService.resetGameAction} label="Reset" icon={<MdClear />} />
        <ConfigButton onClick={playService.editGameAction} label="Edit" icon={<MdEdit />} />
      </div>
    </div>
  );
});
