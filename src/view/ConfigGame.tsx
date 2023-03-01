import React from 'react';
import { ConfigButton, ConfigSelect } from './ConfigWidgets';
import { MdExitToApp, MdPlayCircle, MdClear, MdEdit } from 'react-icons/md';
import { observer } from 'mobx-react';
import { ConfigService } from '../service/config.service';
import { playService } from '../service/index.service';
import { action } from 'mobx';

export const ConfigGame = observer(({ config }: { config: ConfigService }) => {
  const players = [...config.humans, ...config.bots];
  const playerNames = Array.from(players.map(x => x.getName()));

  return (
    <div className="w-[800px] h-[400px] flex flex-col text-center [&>div]:text-left">
      <div>
        <ConfigSelect label="White" id="white" choices={playerNames} props={config.properties} />
        &nbsp;
        <ConfigSelect label="Black" choices={playerNames} id="black" props={config.properties} />
      </div>
      <div>&nbsp;</div>
      <ConfigSelect
        label="Timer setting"
        id="clock"
        choices={config.clocks.map(x => x.name)}
        props={config.properties}
      />
      <div>&nbsp;</div>
      <div className="[&>button]:mx-2">
        <ConfigButton
          onClick={action(playService.startGameAction)}
          label="Play"
          icon={<MdPlayCircle />}
        />
        <ConfigButton
          onClick={action(playService.endGameAction)}
          label="End game"
          icon={<MdExitToApp />}
          disabled={playService.isComplete}
        />
        <ConfigButton
          onClick={action(playService.resetGameAction)}
          label="Reset"
          icon={<MdClear />}
        />
        <ConfigButton onClick={action(playService.editGameAction)} label="Edit" icon={<MdEdit />} />
      </div>
    </div>
  );
});
