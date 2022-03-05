import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export type SelectorProps = {
  label: string;
  choices: string[];
  selected: { name?: string | undefined; value: unknown } | undefined;
  setSelected: (name: string) => void;
};

export const ConfigSelector: React.FC<SelectorProps> = ({
  label: label,
  choices: choices,
  selected: selected,
  setSelected: setSelected,
}) => {
  const handleChange = (
    event: SelectChangeEvent<{ name?: string | undefined; value: unknown }>
  ) => {
    setSelected(event.target.value as string);
  };

  return (
    <FormControl variant="filled">
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
