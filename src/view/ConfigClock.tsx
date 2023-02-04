import React from 'react';
import { observer } from 'mobx-react';
import {
  ConfigListButtons,
  ConfigListTable,
  ConfigPopup,
  ConfigSaveButton,
  ConfigText,
} from './ConfigWidgets';
import { ConfigService, ListType } from '../service/config.service';

export const ConfigClock = observer(({ config }: { config: ConfigService }) => {
  config.setListType(ListType.Clock);
  return (
    <div className="w-[800px] h-[400px] flex flex-col text-center [&>div]:text-left">
      <ConfigListTable config={config} />
      <ConfigListButtons config={config} />
      <ConfigPopup config={config}>
        <p>(from move)+(plus minutes)/(seconds each move) comma separated</p>
        <div className="[&>button]:mx-2 [&>div]:mx-2 mt-3">
          <ConfigText label="Clock name" id="name" />
          <ConfigText label="Timings" id="time" />
          <ConfigSaveButton />
        </div>
      </ConfigPopup>
    </div>
  );
});
