import React, { ChangeEvent, MouseEvent, useEffect, useRef, useState } from 'react';
import { Human } from '../model/human';
import { ConnectService } from '../service/connect.service';
import { observer } from 'mobx-react';
import { historyService } from '../service/index.service';
import {
  ConfigButton,
  ConfigListButtons,
  ConfigListTable,
  ConfigPopup,
  ConfigSaveButton,
  ConfigText,
} from './ConfigWidgets';
import { MdDownload, MdOnlinePrediction, MdUpload } from 'react-icons/md';
import { ConfigService, ListType } from '../model/config';

export const ConfigHuman = observer(
  ({ config, connect }: { config: ConfigService; connect: ConnectService }) => {
    config.setListType(ListType.Human);
    const items = config.humans;
    const hasSelect = config.cursor >= 0;

    const uploadRef = useRef<HTMLInputElement>(null);
    const downloadRef = useRef<HTMLAnchorElement>(null);
    const hasEmail = hasSelect && (items[config.cursor] as Human).email;

    const [downloadLink, setDownloadLink] = useState('');
    const downloadPlayer = (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      const downtext = historyService.downloadPlayer(items[config.cursor].name);
      const data = new Blob([downtext], { type: 'text/plain' });
      setDownloadLink(window.URL.createObjectURL(data));
    };
    useEffect(() => {
      if (downloadLink !== '') {
        downloadRef.current?.click();
        window.URL.revokeObjectURL(downloadLink);
      }
    }, [downloadLink, setDownloadLink]);

    const uploadPlayer = (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      uploadRef.current?.click();
    };

    const uploadChange = (evt: ChangeEvent<HTMLInputElement>) => {
      const files = evt.currentTarget?.files;
      if (files && files.length) {
        historyService.uploadHistory(files[0]);
      }
    };

    const connectPlayer = (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      connect.connectREST(items[config.cursor] as Human);
    };
    return (
      <div className="w-[800px] h-[400px] flex flex-col text-center [&>div]:text-left">
        <ConfigListTable config={config} />
        <a className="hidden" download="games.txt" href={downloadLink} ref={downloadRef}>
          download it
        </a>
        <input
          type="file"
          className="hidden"
          multiple={false}
          accept=".txt,text/plain"
          onChange={uploadChange}
          ref={uploadRef}
        />
        <ConfigListButtons config={config}>
          <ConfigButton
            onClick={downloadPlayer}
            label="Download"
            icon={<MdDownload />}
            disabled={!hasSelect}
          />
          <ConfigButton
            onClick={uploadPlayer}
            label="Upload"
            icon={<MdUpload />}
            disabled={!hasSelect}
          />
          <ConfigButton
            onClick={connectPlayer}
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
