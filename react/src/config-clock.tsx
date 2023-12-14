import React from 'react';
import { observer } from 'mobx-react';
import { ConfigService, ListType } from '../../common/service/config.service';
import { ConfigListButtons, ConfigListTable, ConfigPopup } from './config-lists';
import { ConfigText } from './config-widgets';

export const ConfigClock = observer(({ config }: { config: ConfigService }) => {
  const { item } = config.getListLogic(ListType.Clock);
  return (
    <div className="w-[800px] h-[400px] flex flex-col text-center [&>div]:text-left">
      <ConfigListTable config={config} />
      <ConfigListButtons config={config} />
      <ConfigPopup config={config}>
        <p>(from move)+(plus minutes)/(seconds each move) comma separated</p>
        <div className="[&>button]:mx-2 [&>div]:mx-2 mt-3">
          <ConfigText item={item} label="Clock name" id="name" />
          <ConfigText item={item} label="Timings" id="time" />
        </div>
      </ConfigPopup>
    </div>
  );
});
