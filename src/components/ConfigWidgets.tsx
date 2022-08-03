import React, { ChangeEvent, ReactNode, MouseEvent } from 'react';
import {
  Button,
  TextField,
  InputLabel,
  FormControl,
  FormControlLabel,
  Checkbox,
  NativeSelect,
} from '@mui/material';
import { theme } from '../logic/theme';

export const ConfigSelect: React.FC<{
  label: string;
  choices: string[];
  selected: { name?: string | undefined; value: unknown } | undefined;
  setSelected: (name: string) => void;
}> = ({ label, choices, selected, setSelected }) => {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelected(event.target.value as string);
  };
  return (
    <FormControl variant="filled">
      <InputLabel
        variant="standard"
        htmlFor={label}
        sx={{ color: theme.darkTheme ? 'white' : 'black' }}>
        {label}
      </InputLabel>
      <NativeSelect
        className="min-w-[200px]"
        sx={{ color: theme.darkTheme ? 'white' : 'black' }}
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

export const ConfigButton: React.FC<{
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode[];
  disabled?: boolean;
}> = ({ onClick, children, disabled }) => {
  return (
    <Button
      className="flex-grow bg-green-100 h-14"
      sx={{ backgroundColor: theme.darkTheme ? 'green' : 'darkgreen' }}
      onClick={onClick}
      variant="contained"
      disabled={disabled ?? false}>
      {children}
    </Button>
  );
};

export const ConfigText: React.FC<{
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  label: string;
  id: string;
  disabled?: boolean;
}> = ({ onChange, label, id }) => {
  return (
    <TextField
      label={label}
      id={id}
      size="medium"
      onChange={onChange}
      sx={{ input: { color: theme.darkTheme ? 'white' : 'black' } }}
    />
  );
};

export const ConfigCheckbox: React.FC<{
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  label: string;
  checked: boolean;
}> = ({ onChange, label, checked }) => {
  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={checked}
          onChange={onChange}
          inputProps={{ 'aria-label': 'primary checkbox' }}
        />
      }
      label={label}
    />
  );
};
