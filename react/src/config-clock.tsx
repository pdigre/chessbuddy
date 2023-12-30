import React from 'react';
import { observer } from 'mobx-react';
import { ConfigService, ListType } from '../../common/service/config.service';
import { ConfigListButtons, ConfigListTable, ConfigPopup } from './config-lists';
import { ConfigText } from './config-widgets';

export const ConfigClock = observer(({ config }: { config: ConfigService }) => {
  const { type, item, hasSelect, show, onSave, onSelect, cursor, items } = config.getListLogic(
    ListType.Clock
  );
  return (
    <div className="w-[800px] h-[400px] flex flex-col text-center [&>div]:text-left">
      <ConfigListTable onSelect={onSelect} cursor={cursor} items={items} />
      <ConfigListButtons type={type} />
      <ConfigPopup show={show} type={type} onSave={onSave}>
        <p>(from move)+(plus minutes)/(seconds each move) comma separated</p>
        <div className="[&>button]:mx-2 [&>div]:mx-2 mt-3">
          <ConfigText item={item} label="Clock name" id="name" />
          <ConfigText item={item} label="Timings" id="time" />
        </div>
      </ConfigPopup>
    </div>
  );
});
