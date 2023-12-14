import React from 'react';
import { MdExitToApp, MdPlayCircle, MdClear, MdEdit } from 'react-icons/md';
import { observer } from 'mobx-react';
import { ConfigService } from '../../common/service/config.service';
import { playService } from '../../common/service/index.service';
import { action } from 'mobx';
import { ConfigButton, ConfigSelect } from './config-widgets';

export const ConfigGame = observer(({ config }: { config: ConfigService }) => {
  const players = [...config.humans, ...config.bots];
  const playerNames = Array.from(players.map(x => x.getName()));
  const item = config.game;

  return (
    <div className="w-[800px] h-[400px] flex flex-col text-center [&>div]:text-left">
      <div>
        <ConfigSelect label="White" id="white" choices={playerNames} item={item} />
        &nbsp;
        <ConfigSelect label="Black" choices={playerNames} id="black" item={item} />
      </div>
      <div>&nbsp;</div>
      <ConfigSelect
        label="Timer setting"
        id="clock"
        choices={config.clocks.map(x => x.name)}
        item={item}
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
