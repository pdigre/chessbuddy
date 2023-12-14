import React from 'react';
import { observer } from 'mobx-react';
import { ConfigService, ListType } from '../../common/service/config.service';
import { Engines } from '../../common/model/bot';
import { ConfigListButtons, ConfigListTable, ConfigPopup } from './config-lists';
import { ConfigSelect, ConfigText } from './config-widgets';

export const ConfigBot = observer(({ config }: { config: ConfigService }) => {
  const { item } = config.getListLogic(ListType.Bot);
  const engines = Array.from(Engines.map(x => x.name));
  return (
    <div className="w-[800px] h-[400px] [&>div]:text-left">
      <ConfigListTable config={config} />
      <ConfigListButtons config={config} />
      <ConfigPopup config={config}>
        <div className="[&>button]:mx-2 [&>div]:mx-2 mt-3">
          <ConfigText item={item} label="Name" id="name" />
          <ConfigSelect item={item} label="Chess Engine" choices={engines} id="engine" />
          <br />
          <ConfigText item={item} label="Skill level" id="skill" /> <br />
          <ConfigText item={item} label="Time (sec)" id="time" /> <br />
          <ConfigText item={item} label="Depth (..not time)" id="depth" />
        </div>
      </ConfigPopup>
    </div>
  );
});
