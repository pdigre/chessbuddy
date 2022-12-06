import React, { ChangeEvent, MouseEvent, useEffect, useRef, useState } from 'react';
import { Human } from '../../model/human';
import { ConnectService } from '../../services/connect.service';
import { observer } from 'mobx-react';
import { historyService } from '../../services/history.service';
import { ConfigButton } from './ConfigWidgets';
import { MdAdd, MdDelete, MdDownload, MdEdit, MdOnlinePrediction, MdUpload } from 'react-icons/md';
import { AddHumanDialog } from './AddHumanDialog';
import { storage } from '../../services/storage.service';
import { Config, EditMode } from '../../model/config';

export const ConfigHuman = observer(
  ({ config, server }: { config: Config; server: ConnectService }) => {
    const items = config.humans;
    const hasSelect = config.cursor >= 0;

    const uploadRef = useRef<HTMLInputElement>(null);
    const downloadRef = useRef<HTMLAnchorElement>(null);
    const hasEmail = hasSelect && (items[config.cursor] as Human).email;

    const doSelect = (event: MouseEvent<HTMLTableSectionElement>) => {
      if (event.target instanceof HTMLTableCellElement) {
        const id = (event.target.parentNode as HTMLTableRowElement).id;
        const num = Number.parseInt(id);
        config.cursor = num == config.cursor ? -1 : num;
      }
    };
    const doDelete = () => {
      if (hasSelect) {
        items.splice(config.cursor, 1);
        storage.storeList(Human.storage, items);
        config.cursor = -1;
      }
    };
    const doEdit = () => {
      if (hasSelect) {
        config.dialog = EditMode.EditHuman;
      }
    };
    const doAdd = () => {
      config.dialog = EditMode.AddHuman;
    };
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
      server.connectREST(items[config.cursor] as Human);
    };
    return (
      <div className="w-[800px] h-[400px] flex flex-col text-center [&>div]:text-left">
        <table className="m-1 text-left text-xl dark:bg-slate-800 border-2 border-separate p-2">
          <tbody onClick={doSelect}>
            {items.map((item, iLine) => (
              <tr
                key={iLine.toString()}
                id={iLine.toString()}
                className={iLine == config.cursor ? 'bg-green-300 dark:bg-green-700' : ''}>
                <td className="dark:text-white">{item.getName()}</td>
                <td className="dark:text-white">{item.getDescription()}</td>
              </tr>
            ))}
          </tbody>
        </table>
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
        <div className="[&>button]:mx-1">
          <ConfigButton onClick={doAdd} label="Add" icon={<MdAdd />} />
          <ConfigButton onClick={doEdit} label="Edit" icon={<MdEdit />} disabled={!hasSelect} />
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
          <ConfigButton
            onClick={doDelete}
            label="Delete"
            icon={<MdDelete />}
            disabled={!hasSelect}
          />
        </div>
        <AddHumanDialog config={config} />
      </div>
    );
  }
);
