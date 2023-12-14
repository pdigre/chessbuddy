import React, { MouseEvent, useRef } from 'react';
import { Human } from '../../common/model/human';
import { ConnectService } from '../../common/service/connect.service';
import { observer } from 'mobx-react';
import { historyService } from '../../common/service/index.service';
import { MdDownload, MdOnlinePrediction, MdUpload } from 'react-icons/md';
import { ConfigService, ListType } from '../../common/service/config.service';
import { action } from 'mobx';
import { ConfigListButtons, ConfigListTable, ConfigPopup } from './config-lists';
import { ConfigButton, ConfigText } from './config-widgets';

export const ConfigHuman = observer(
  ({ config, connect }: { config: ConfigService; connect: ConnectService }) => {
    const { item, hasSelect } = config.getListLogic(ListType.Human);

    const uploadRef = useRef<HTMLInputElement>(null);
    const hasEmail = hasSelect && (item as Human).email;

    const downloadPlayerAction = (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      const name = item.getName();
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
      connect.connectAction(item as Human);
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
            <ConfigText item={item} label="Name" id="name" />
            <ConfigText item={item} label="Email" id="email" />
          </div>
        </ConfigPopup>
      </div>
    );
  }
);
