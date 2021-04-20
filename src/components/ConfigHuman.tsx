import React, { ChangeEvent, useState, useRef, useEffect } from 'react';
import { Human, Players } from '../data/players';
import { Server } from '../data/server';
import styles from '../styles.module.scss';
import {
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@material-ui/core';
import { Add, Delete, GetApp, Publish, Language } from '@material-ui/icons';
import type { HANDLE_CHANGE, HANDLE_CLICK } from './reacttypes';
import { observer } from 'mobx-react';
import { gameHistory } from '../data/game';

export const ConfigHuman = observer(({ players, server }: { players: Players; server: Server }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [marker, setMarker] = useState(-1);
  const humans = players.players.filter(x => x instanceof Human);
  const uploadRef = useRef<HTMLInputElement>(null);
  const downloadRef = useRef<HTMLAnchorElement>(null);

  const hasSelect = marker >= 0;
  const hasEmail = hasSelect && (humans[marker] as Human).email;

  const doSelect: HANDLE_CLICK = event => {
    if (event.target instanceof HTMLTableCellElement) {
      const id = (event.target.parentNode as HTMLTableRowElement).id;
      const num = Number.parseInt(id);
      setMarker(num == marker ? -1 : num);
    }
  };
  const doDelPlayer: HANDLE_CLICK = event => {
    if (hasSelect) {
      players.delPlayer(humans[marker].name);
      players.save();
    }
  };
  const [downloadLink, setDownloadLink] = useState('');
  const downloadPlayer: HANDLE_CLICK = event => {
    event.preventDefault();
    const txt: string[] = [];
    const name = humans[marker].name;
    gameHistory.history.forEach(line => {
      const cols = line.split(';');
      if (cols[1] == name || cols[2] == name) {
        const time = new Date(Number.parseInt(cols[0], 36));
        cols[0] = time.toISOString();
        txt.push(cols.join(';'));
      }
    });
    const data = new Blob([txt.join('\r\n')], { type: 'text/plain' });
    setDownloadLink(window.URL.createObjectURL(data));
  };
  useEffect(() => {
    if (downloadLink !== '') {
      downloadRef.current?.click();
      window.URL.revokeObjectURL(downloadLink);
    }
  }, [downloadLink, setDownloadLink]);

  const [uploadLink, setUploadLink] = useState('');

  const uploadPlayer: HANDLE_CLICK = event => {
    event.preventDefault();
    uploadRef.current?.click();
  };
  const changeName: HANDLE_CHANGE = e => setName(e.target.value as string);
  const changeEmail: HANDLE_CHANGE = e => setEmail(e.target.value as string);
  const doAddPlayer: HANDLE_CLICK = event => {
    players.addPlayer(`Human:${name}:${email}`);
    players.save();
  };

  const uploadClick = (evt: ChangeEvent<HTMLInputElement>) => {
    const status: string[] = [];
    const files = evt.currentTarget?.files;
    if (files && files.length) {
      const file = files[0];
      const promise = new Promise(function (resolve, reject) {
        const reader = new FileReader();
        reader.onerror = reject;
        reader.onload = function () {
          resolve(reader.result);
        };
        reader.readAsBinaryString(file); // here the file can be read in different way Text, DataUrl, ArrayBuffer
      });
    }
  };
  const connectPlayer: HANDLE_CLICK = event => {
    event.preventDefault();
    server.connect(humans[marker] as Human);
  };
  return (
    <div className={styles.Config}>
      <TableContainer className={styles.ConfigTableContainer}>
        <Table size="small" className={styles.ConfigTable}>
          <TableBody onClick={doSelect}>
            {humans.map((human, iLine) => (
              <TableRow key={iLine} id={iLine} className={iLine == marker ? styles.MarkRow : ''}>
                <TableCell>{human.name}</TableCell>
                <TableCell>{(human as Human).email}</TableCell>
              </TableRow>
            ))}
            <TableRow />
          </TableBody>
        </Table>
      </TableContainer>
      <a className={styles.Hidden} download="games.txt" href={downloadLink} ref={downloadRef}>
        download it
      </a>
      <input
        type="file"
        className={styles.Hidden}
        multiple={false}
        accept=".txt,text/plain"
        onChange={uploadClick}
        ref={uploadRef}
      />
      <div className={styles.Buttons}>
        <Button
          className={styles.Button}
          onClick={doDelPlayer}
          disabled={!hasSelect}
          variant="contained">
          Delete <Delete />
        </Button>
        <Button
          className={styles.Button}
          onClick={downloadPlayer}
          disabled={!hasSelect}
          variant="contained">
          Download <GetApp />
        </Button>
        <Button
          className={styles.Button}
          onClick={uploadPlayer}
          disabled={!hasSelect}
          variant="contained">
          Upload <Publish />
        </Button>
        <Button
          className={styles.Button}
          onClick={connectPlayer}
          disabled={!hasEmail}
          variant="contained">
          Connect <Language />
        </Button>
      </div>
      <TextField label="Player Name" id="name" size="small" onChange={changeName} />
      <TextField label="Player Email" id="email" size="small" onChange={changeEmail} />
      <div className={styles.Buttons}>
        <Button className={styles.Button} onClick={doAddPlayer} variant="contained">
          Add <Add />
        </Button>
      </div>
    </div>
  );
});
