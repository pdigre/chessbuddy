import React, { ChangeEvent } from 'react';
import styles from '../styles.module.scss';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';

export const BotSelector: React.FC<{
  playerName: string;
  availableBots: string[];
  selectedBot: string;
  setSelectedBot: (bot: string) => void;
}> = ({ playerName, availableBots, selectedBot, setSelectedBot }) => {
  const handleChange = (
    event: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>,
    child: React.ReactNode
  ): void => {
    setSelectedBot(event.target.value as string);
  };

  return (
    <FormControl variant="filled" className={styles.BotSelector}>
      <InputLabel htmlFor="playerFor">{playerName}</InputLabel>
      <Select
        native
        value={selectedBot}
        onChange={handleChange}
        inputProps={{
          name: 'player',
          id: 'playerFor',
        }}>
        <option aria-label="None" value="" />
        {availableBots.map(name => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </Select>
    </FormControl>
  );
};
