import React, { ChangeEvent, ReactNode, MouseEvent } from 'react';
import {
  Button,
  TextField,
  InputLabel,
  FormControl,
  FormControlLabel,
  Checkbox,
  NativeSelect,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { MdAdd, MdDelete, MdEdit, MdSave } from 'react-icons/md';
import { observer } from 'mobx-react';

import { ConfigService, ListMode } from '../model/config';
import { configService, renderingService } from '../service/index.service';
import { runInAction } from 'mobx';

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
export type ButtonType = {
  label: string;
  icon?: ReactNode;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
};

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
      disabled={disabled ?? false}>
      <span className="text-3xl">{icon}</span>
      <span className="text-lg ml-2">{label}</span>
    </Button>
  );
};

export const ConfigSaveButton: React.FC = () => {
  return (
    <ConfigButton
      onClick={() => configService.saveItem(configService.getItem(), configService.getItems())}
      label={configService.isEdit() ? 'Save ' : 'Add ' + configService.titleType()}
      icon={configService.isEdit() ? <MdSave /> : <MdAdd />}
    />
  );
};

export const ConfigText: React.FC<{
  label: string;
  id: string;
  disabled?: boolean;
}> = ({ label, id }) => {
  const item = configService.getItem();
  return (
    <TextField
      label={label}
      id={id}
      size="medium"
      onChange={e => runInAction(() => item?.properties.get(id)?.set(e.target.value))}
      defaultValue={item?.properties.get(id)?.get()}
    />
  );
};

export const ConfigBoolean = observer(
  ({ config, label, id }: { config: ConfigService; label: string; id: string }) => {
    const prop = config.boolprops.get(id);
    let checked = prop?.get();
    return (
      <FormControlLabel
        control={
          <Checkbox
            checked={checked}
            onChange={e =>
              runInAction(() => {
                checked = e.target.checked;
                prop?.set(checked);
              })
            }
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        }
        label={label}
      />
    );
  }
);

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

export const ConfigListTable = observer(({ config }: { config: ConfigService }) => {
  const items = config.getItems();
  return (
    <table className="m-1 text-left text-xl dark:bg-slate-800 border-2 border-separate p-2">
      <tbody
        onClick={(event: MouseEvent<HTMLTableSectionElement>) => {
          if (event.target instanceof HTMLTableCellElement) {
            config.setCursor((event.target.parentNode as HTMLTableRowElement).id);
          }
        }}>
        {items.map((item, iLine) => (
          <tr
            key={iLine.toString()}
            id={iLine.toString()}
            className={iLine == config.cursor ? 'bg-green-300 dark:bg-green-700' : ''}>
            <td className="dark:text-white">{item.getName()}</td>
            <td className="dark:text-white">{item.getDescription()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
});

export const ConfigListButtons = observer(
  ({ config, children }: { config: ConfigService; children?: React.ReactNode }) => {
    const hasSelect = config.cursor >= 0;
    return (
      <div className="[&>button]:mx-1">
        <ConfigButton
          onClick={() => config.setListMode(ListMode.Add)}
          label="Add"
          icon={<MdAdd />}
        />
        <ConfigButton
          onClick={() => config.setListMode(ListMode.Edit)}
          label="Edit"
          icon={<MdEdit />}
          disabled={!hasSelect}
        />
        <ConfigButton
          onClick={() => config.deleteItem()}
          label="Delete"
          icon={<MdDelete />}
          disabled={!hasSelect}
        />
        {children}
      </div>
    );
  }
);

export const ConfigPopup = observer(
  ({ config, children }: { config: ConfigService; children?: React.ReactNode }) => {
    return (
      <Dialog
        aria-labelledby="message"
        onClose={configService.closePopup}
        className="text-center text-lg"
        open={config.listMode !== ListMode.None}>
        <DialogTitle id="message">
          {configService.isEdit() ? 'Edit' : 'Add'} {configService.titleType()}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{children}</DialogContentText>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    );
  }
);
