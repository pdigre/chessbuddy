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

export const ConfigButton: React.FC<{
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  label: ReactNode;
  icon: ReactNode;
  disabled?: boolean;
}> = ({ onClick, label, icon, disabled }) => {
  return (
    <Button
      className="flex-grow h-14 text-lg m-2"
      sx={{ backgroundColor: theme.darkTheme ? 'green' : 'darkgreen' }}
      onClick={onClick}
      variant="contained"
      disabled={disabled ?? false}>
      <span className="text-3xl">{icon}</span>
      <span className="text-lg ml-2">{label}</span>
    </Button>
  );
};

export const ConfigText: React.FC<{
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  label: string;
  id: string;
  disabled?: boolean;
}> = ({ onChange, label, id }) => {
  return <TextField label={label} id={id} size="medium" onChange={onChange} />;
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
