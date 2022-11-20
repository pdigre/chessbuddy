import React, { ChangeEvent, MouseEvent, useEffect, useRef, useState } from 'react';
import { Human, Players } from '../../controller/game/player_human';
import { Server } from '../../controller/integration/server';
import { observer } from 'mobx-react';
import { gameHistory } from '../../controller/game/history';
import { ConfigButton } from './ConfigWidgets';
import { MdAdd, MdDelete, MdDownload, MdOnlinePrediction, MdUpload } from 'react-icons/md';
import { AddPlayerDialog } from './AddPlayerDialog';

export const ConfigHuman = observer(({ players, server }: { players: Players; server: Server }) => {
  const [marker, setMarker] = useState(-1);
  const humans = players.players.filter(x => x instanceof Human);
  const uploadRef = useRef<HTMLInputElement>(null);
  const downloadRef = useRef<HTMLAnchorElement>(null);

  const hasSelect = marker >= 0;
  const hasEmail = hasSelect && (humans[marker] as Human).email;

  const doSelect = (event: MouseEvent<HTMLTableSectionElement>) => {
    if (event.target instanceof HTMLTableCellElement) {
      const id = (event.target.parentNode as HTMLTableRowElement).id;
      const num = Number.parseInt(id);
      setMarker(num == marker ? -1 : num);
    }
  };
  const doDelPlayer = () => {
    if (hasSelect) {
      players.delPlayer(humans[marker].name);
      players.save();
      setMarker(-1);
    }
  };
  const [downloadLink, setDownloadLink] = useState('');
  const downloadPlayer = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const downtext = gameHistory.downloadPlayer(humans[marker].name);
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
      gameHistory.uploadHistory(files[0]);
    }
  };

  const connectPlayer = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    server.connectREST(humans[marker] as Human);
  };
  return (
    <div className="w-[800px] h-[400px] flex flex-col text-center [&>div]:text-left">
      <table className="m-1 text-left text-xl dark:bg-slate-800 border-2 border-separate p-2">
        <tbody onClick={doSelect}>
          {humans.map((human, iLine) => (
            <tr
              key={iLine.toString()}
              id={iLine.toString()}
              className={iLine == marker ? 'bg-green-300 dark:bg-green-700' : ''}>
              <td className="dark:text-white">{human.name}</td>
              <td className="dark:text-white">{(human as Human).email}</td>
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
        <ConfigButton onClick={() => (players.addHuman = true)} label="Add" icon={<MdAdd />} />
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
          onClick={doDelPlayer}
          label="Delete"
          icon={<MdDelete />}
          disabled={!hasSelect}
        />
      </div>
      <AddPlayerDialog players={players} />
    </div>
  );
});
