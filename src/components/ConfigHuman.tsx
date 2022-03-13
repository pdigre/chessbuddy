import React, { ChangeEvent, MouseEvent, useEffect, useRef, useState } from 'react';
import { Human, Players } from '../data/players';
import { Server } from '../data/server';
import styles from '../styles.module.scss';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
} from '@mui/material';
import { Add, Delete, GetApp, Language, Publish } from '@mui/icons-material';
import { observer } from 'mobx-react';
import { gameHistory } from '../data/game';
import { messager } from './MessageBox';

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
      messager.display('Add Human', 'Need to enter a name');
    }
  };

  const uploadChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const files = evt.currentTarget?.files;
    if (files && files.length) {
      const file = files[0];
      new Promise(function (resolve, reject) {
        const reader = new FileReader();
        reader.onerror = reject;
        reader.onload = function () {
          gameHistory.upload(reader.result as string);
        };
        reader.readAsBinaryString(file); // here the file can be read in different way Text, DataUrl, ArrayBuffer
      });
    }
  };
  const connectPlayer = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    server.connectREST(humans[marker] as Human);
  };
  return (
    <div className={styles.Config}>
      <div className={styles.ListSection}>
        <TableContainer className={styles.ConfigTableContainer}>
          <Table size="small" className={styles.ConfigTable}>
            <TableBody onClick={doSelect}>
              {humans.map((human, iLine) => (
                <TableRow
                  key={iLine.toString()}
                  id={iLine.toString()}
                  className={iLine == marker ? styles.MarkRow : ''}>
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
          onChange={uploadChange}
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
      </div>
      <div className={styles.AddSection}>
        <Button className={styles.Button} onClick={doAddPlayer} variant="contained">
          Add <Add />
        </Button>
        &nbsp;
        <TextField label="Player Name" id="name" size="medium" onChange={changeName} />
        &nbsp;
        <TextField label="Player Email" id="email" size="medium" onChange={changeEmail} />
      </div>
    </div>
  );
});
