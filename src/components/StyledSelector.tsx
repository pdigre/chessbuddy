import React, { ChangeEvent, ReactNode, MouseEvent } from 'react';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import { Button } from '@mui/material';

export type SelectorProps = {
  label: string;
  choices: string[];
  selected: { name?: string | undefined; value: unknown } | undefined;
  setSelected: (name: string) => void;
};

export const StyledSelector: React.FC<SelectorProps> = ({
  label: label,
  choices: choices,
  selected: selected,
  setSelected: setSelected,
}) => {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelected(event.target.value as string);
  };
  return (
    <FormControl variant="filled">
      <InputLabel variant="standard" htmlFor={label}>
        {label}
      </InputLabel>
      <NativeSelect
        className="min-w-[200px]"
        value={selected?.value as string}
        onChange={handleChange}
        inputProps={{
          name: label,
          id: 'for',
        }}>
        <option aria-label="None" value="" />
        {choices.map(name => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  );
};

export type ConfigButtonProps = {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode[];
  disabled?: boolean;
};

export const ConfigButton: React.FC<ConfigButtonProps> = ({
  onClick: onClick,
  children: children,
  disabled: disabled,
}) => {
  return (
    <Button
      className="flex-grow bg-green-100 h-14"
      sx={{ backgroundColor: 'darkgreen' }}
      onClick={onClick}
      variant="contained"
      disabled={disabled ?? false}>
      {children}
    </Button>
  );
};
