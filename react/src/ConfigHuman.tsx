import React, { MouseEvent, useRef } from 'react';
import { Human } from '../../common/model/human';
import { ConnectService } from '../../common/service/connect.service';
import { observer } from 'mobx-react';
import { historyService } from '../../common/service/index.service';
import {
  ConfigButton,
  ConfigListButtons,
  ConfigListTable,
  ConfigPopup,
  ConfigSaveButton,
  ConfigText,
} from './ConfigWidgets';
import { MdDownload, MdOnlinePrediction, MdUpload } from 'react-icons/md';
import { ConfigService, ListType } from '../../common/service/config.service';
import { action } from 'mobx';

export const ConfigHuman = observer(
  ({ config, connect }: { config: ConfigService; connect: ConnectService }) => {
    config.setListType = ListType.Human;
    const items = config.humans;
    const hasSelect = config.cursor >= 0;

    const uploadRef = useRef<HTMLInputElement>(null);
    const hasEmail = hasSelect && (items[config.cursor] as Human).email;

    const downloadPlayerAction = (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      const name = items[config.cursor].name;
      const downtext = historyService.downloadPlayerAction(name);
      const data = new Blob([downtext], { type: 'text/plain' });
      const alink = document.createElement('a');
      alink.href = window.URL.createObjectURL(data);
      alink.download = name + '.txt';
      alink.click();
    };

    const uploadPlayerAction = (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      uploadRef.current?.click();
    };

    const connectPlayerAction = (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      connect.connectAction(items[config.cursor] as Human);
    };

    return (
      <div className="w-[800px] h-[400px] flex flex-col text-center [&>div]:text-left">
        <ConfigListTable config={config} />
        <a className="hidden" download="games.txt">
          download it
        </a>
        <input
          type="file"
          className="hidden"
          multiple={false}
          accept=".txt,text/plain"
          onChange={e => historyService.uploadFilesHistory(e.currentTarget?.files)}
          ref={uploadRef}
        />
        <ConfigListButtons config={config}>
          <ConfigButton
            onClick={downloadPlayerAction}
            label="Download"
            icon={<MdDownload />}
            disabled={!hasSelect}
          />
          <ConfigButton
            onClick={action(uploadPlayerAction)}
            label="Upload"
            icon={<MdUpload />}
            disabled={!hasSelect}
          />
          <ConfigButton
            onClick={action(connectPlayerAction)}
            label="Update"
            icon={<MdOnlinePrediction />}
            disabled={!hasEmail}
          />
        </ConfigListButtons>
        <ConfigPopup config={config}>
          <div className="[&>button]:mx-2 [&>div]:mx-2 mt-3">
            <ConfigText label="Name" id="name" />
            <ConfigText label="Email" id="email" />
            <ConfigSaveButton />
          </div>
        </ConfigPopup>
      </div>
    );
  }
);
