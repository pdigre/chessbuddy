import React from 'react';
import {
  ConfigListButtons,
  ConfigListTable,
  ConfigPopup,
  ConfigSaveButton,
  ConfigSelect,
  ConfigText,
} from './ConfigWidgets';
import { observer } from 'mobx-react';
import { ConfigService, ListType } from '../model/config';
import { Bot } from '../model/bot';
import { Engines } from '../model/engine';

export const ConfigBot = observer(({ config }: { config: ConfigService }) => {
  config.setListType(ListType.Bot);
  const item = config.getItem() as Bot;

  return (
    <div className="w-[800px] h-[400px] [&>div]:text-left">
      <ConfigListTable config={config} />
      <ConfigListButtons config={config} />
      <ConfigPopup config={config}>
        <div className="[&>button]:mx-2 [&>div]:mx-2 mt-3">
          <ConfigText label="Name" id="name" />
          <ConfigSelect
            label="Chess Engine"
            choices={Array.from(Engines.map(x => x.name))}
            selected={{ name: 'ConfigSelector', value: item.engine }}
            setSelected={value => (item.engine = value)}
          />
          <br />
          <ConfigText label="Skill level" id="skill" /> <br />
          <ConfigText label="Time (sec)" id="time" /> <br />
          <ConfigText label="Depth (..not time)" id="depth" />
          <ConfigSaveButton />
        </div>
      </ConfigPopup>
    </div>
  );
});
