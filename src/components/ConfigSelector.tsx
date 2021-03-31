import React from 'react';
import styles from '../styles.module.scss';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import type { HANDLE_CHANGE } from './reacttypes';

export type SelectorProps = {
  label: string;
  choices: string[];
  selected: string;
  setSelected: (name: string) => void;
};

export const ConfigSelector: React.FC<SelectorProps> = ({
  label: label,
  choices: choices,
  selected: selected,
  setSelected: setSelected,
}) => {
  const handleChange: HANDLE_CHANGE = (event, child) => {
    setSelected(event.target.value as string);
  };

  return (
    <FormControl variant="filled" className={styles.BotSelector}>
      <InputLabel htmlFor="for">{label}</InputLabel>
      <Select
        native
        value={selected}
        onChange={handleChange}
        inputProps={{
          name: { label: 'label' },
          id: 'for',
        }}>
        <option aria-label="None" value="" />
        {choices.map(name => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </Select>
    </FormControl>
  );
};
