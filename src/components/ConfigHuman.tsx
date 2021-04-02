import React, { useState } from 'react';
import { usePersistentState } from '../data/state';
import { addPlayer, delPlayer, Human, toString } from '../data/players';
import { Player } from '../data/player';
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
import { Add, Delete } from '@material-ui/icons';
import type { HANDLE_CHANGE, HANDLE_CLICK } from './reacttypes';

export type ConfigHumanProps = {
  players: Player[];
};

export const ConfigHuman: React.FC<ConfigHumanProps> = ({ players }) => {
  const [name, setName] = useState('');
  const [playerdata, setPlayerdata] = usePersistentState('playerdata', '');
  const addPlayerHandler: HANDLE_CLICK = event => {
    addPlayer(`Human:${name}`);
    setPlayerdata(toString());
  };
  const handleChange: HANDLE_CHANGE = (event, child) => setName(event.target.value as string);

  const [marker, setMarker] = useState(-1);
  const selectHandler: HANDLE_CLICK = event => {
    if (event.target instanceof HTMLTableCellElement) {
      const id = (event.target.parentNode as HTMLTableRowElement).id;
      const num = Number.parseInt(id);
      setMarker(num == marker ? -1 : num);
    }
  };

  const humans = players.filter(x => x instanceof Human);
  const delPlayerHandler: HANDLE_CLICK = event => {
    if (marker >= 0) {
      delPlayer(humans[marker].name);
      setPlayerdata(toString());
    }
  };

  return (
    <div className={styles.Config}>
      <TableContainer className={styles.ConfigTableContainer}>
        <Table size="small" className={styles.ConfigTable}>
          <TableBody onClick={selectHandler}>
            {humans.map((human, iLine) => (
              <TableRow key={iLine} id={iLine} className={iLine == marker ? styles.MarkRow : ''}>
                <TableCell>{human.name}</TableCell>
              </TableRow>
            ))}
            <TableRow />
          </TableBody>
        </Table>
      </TableContainer>

      <TextField label="Player Name" id="name" size="small" onChange={handleChange} />
      <div className={styles.Buttons}>
        <Button className={styles.Button} onClick={addPlayerHandler} aria-label="list" value="Play">
          Add <Add />
        </Button>
        <Button className={styles.Button} onClick={delPlayerHandler} aria-label="list" value="Play">
          Delete <Delete />
        </Button>
      </div>
    </div>
  );
};
