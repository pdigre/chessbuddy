import React, { ReactNode, MouseEvent, ChangeEvent, useState } from 'react';
import {
  Button,
  TextField,
  InputLabel,
  FormControl,
  FormControlLabel,
  Checkbox,
  NativeSelect,
} from '@mui/material';
import { renderingService } from '../../common/service/index.service';
import { action } from 'mobx';
import { Item } from '../../common/model/model';

export const ConfigButton: React.FC<{
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  label: string;
  icon?: ReactNode;
  disabled?: boolean;
}> = ({ onClick, label, icon, disabled }) => {
  return (
    <Button
      className="flex-grow h-14 text-lg m-2"
      sx={{ backgroundColor: renderingService.darkTheme ? 'green' : 'darkgreen' }}
      onClick={onClick}
      variant="contained"
      disabled={disabled ?? false}
    >
      <span className="text-3xl">{icon}</span>
      <span className="text-lg ml-2">{label}</span>
    </Button>
  );
};

export const ConfigText: React.FC<{
  item: Item;
  label: string;
  id: string;
}> = ({ item, label, id }) => {
  const prop = item?.properties?.get(id);
  if (!prop || !('get' in prop)) {
    return <div></div>;
  }
  const value = prop?.get();
  const onChange = action((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    prop.set(e.target.value)
  );
  return <TextField label={label} id={id} size="medium" onChange={onChange} defaultValue={value} />;
};

export const ConfigBoolean: React.FC<{
  item: Item;
  label: string;
  id: string;
}> = ({ item, label, id }) => {
  const prop = item?.properties?.get(id);
  if (!prop || !('get' in prop)) {
    return <div></div>;
  }
  let value = prop?.get();
  const onChange = action((e: ChangeEvent<HTMLInputElement>) => {
    value = e.target.checked;
    prop?.set(value);
    setV(value);
  });
  const [v, setV] = useState(value);
  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={v}
          onChange={onChange}
          inputProps={{ 'aria-label': 'primary checkbox' }}
        />
      }
      label={label}
    />
  );
};

export const ConfigSelect: React.FC<{
  label: string;
  id: string;
  choices: string[];
  item: Item;
}> = ({ label, id, choices, item }) => {
  const prop = item?.properties?.get(id);
  if (!prop || !('get' in prop)) {
    return <div></div>;
  }
  const onChange = action((e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    prop?.set(value);
    setV(value);
  });
  const value = prop?.get();
  const [v, setV] = useState(value);
  return (
    <FormControl variant="filled">
      <InputLabel variant="standard" htmlFor={label}>
        {label}
      </InputLabel>
      <NativeSelect
        className="min-w-[200px]"
        value={v}
        onChange={onChange}
        inputProps={{
          name: label,
          id: 'for',
        }}
      >
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
