import React, { ChangeEvent, MouseEvent, useEffect, useRef, useState } from 'react';
import { Human, Players } from '../logic/players';
import { Server } from '../logic/server';
import { Add, Delete, GetApp, Language, Publish } from '@mui/icons-material';
import { observer } from 'mobx-react';
import { gameHistory } from '../logic/history';
import { ConfigButton, ConfigText } from './ConfigWidgets';
import { message } from '../logic/message';

export const ConfigHuman = observer(({ players, server }: { players: Players; server: Server }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
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
  const changeName = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setName(e.target.value as string);
  const changeEmail = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setEmail(e.target.value as string);

  const doAddPlayer = () => {
    if (name.length) {
      players.addPlayer(`Human:${name}:${email}`);
      players.save();
    } else {
      message.display('Add Human', 'Need to enter a name');
    }
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
    <div className="flex flex-col text-center w-[650px] h-[400px] [&>div]:text-left">
      <table className="p-3 m-1 text-left text-xl dark:bg-slate-800">
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
      <div className="flex flex-row">
        <ConfigButton onClick={doDelPlayer} disabled={!hasSelect}>
          Delete <Delete />
        </ConfigButton>
        <ConfigButton onClick={downloadPlayer} disabled={!hasSelect}>
          Download <GetApp />
        </ConfigButton>
        <ConfigButton onClick={uploadPlayer} disabled={!hasSelect}>
          Upload <Publish />
        </ConfigButton>
        <ConfigButton onClick={connectPlayer} disabled={!hasEmail}>
          Connect <Language />
        </ConfigButton>
      </div>
      <div className="bg-gray-100 dark:bg-green-900 border-2 border-green-800 dark:border-green-300 m-2 p-5 text-left">
        &nbsp;
        <ConfigText label="Player Name" id="name" onChange={changeName} />
        &nbsp;
        <ConfigText label="Player Email" id="email" onChange={changeEmail} />
        &nbsp;
        <ConfigButton onClick={doAddPlayer}>
          Add <Add />
        </ConfigButton>
      </div>
    </div>
  );
});
