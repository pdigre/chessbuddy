import React, { ReactNode, MouseEvent } from 'react';
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
import { ConfigProp, ConfigService, ListMode } from '../../common/service/config.service';
import { configService, renderingService } from '../../common/service/index.service';
import { action } from 'mobx';

export const ConfigSelect = observer(
  ({
    label,
    id,
    choices,
    props,
  }: {
    label: string;
    id: string;
    choices: string[];
    props?: Map<string, ConfigProp<string>>;
  }) => {
    const prop = (props ? props : configService.getItem.properties).get(id);
    return (
      <FormControl variant="filled">
        <InputLabel variant="standard" htmlFor={label}>
          {label}
        </InputLabel>
        <NativeSelect
          className="min-w-[200px]"
          value={prop?.get()}
          onChange={action(e => prop?.set(e.target.value))}
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
  }
);

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

export const ConfigSaveButton: React.FC = () => (
  <ConfigButton
    onClick={action(() => configService.saveItem(configService.getItem, configService.getItems))}
    label={configService.isEdit ? 'Save ' : 'Add ' + configService.getTitleType}
    icon={configService.isEdit ? <MdSave /> : <MdAdd />}
  />
);

export const ConfigText: React.FC<{
  label: string;
  id: string;
  disabled?: boolean;
}> = ({ label, id }) => {
  const item = configService.getItem;
  return (
    <TextField
      label={label}
      id={id}
      size="medium"
      onChange={action(e => item?.properties.get(id)?.set(e.target.value))}
      defaultValue={item?.properties.get(id)?.get()}
    />
  );
};

export const ConfigBoolean = observer(
  ({
    props,
    label,
    id,
  }: {
    props: Map<string, ConfigProp<boolean>>;
    label: string;
    id: string;
  }) => {
    const prop = props.get(id);
    let checked = prop?.get();
    return (
      <FormControlLabel
        control={
          <Checkbox
            checked={checked}
            onChange={action(e => {
              checked = e.target.checked;
              prop?.set(checked);
            })}
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        }
        label={label}
      />
    );
  }
);

export const ConfigListTable = observer(({ config }: { config: ConfigService }) => (
  <table className="m-1 text-left text-xl dark:bg-slate-800 border-2 border-separate p-2">
    <tbody
      onClick={action((event: MouseEvent<HTMLTableSectionElement>) => {
        if (event.target instanceof HTMLTableCellElement) {
          config.setCursor((event.target.parentNode as HTMLTableRowElement).id);
        }
      })}>
      {config.getItems.map((item, iLine) => (
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
));

export const ConfigListButtons = observer(
  ({ config, children }: { config: ConfigService; children?: React.ReactNode }) => {
    const hasSelect = config.cursor >= 0;
    return (
      <div className="[&>button]:mx-1">
        <ConfigButton
          onClick={action(() => (config.setListMode = ListMode.Add))}
          label="Add"
          icon={<MdAdd />}
        />
        <ConfigButton
          onClick={action(() => (config.setListMode = ListMode.Edit))}
          label="Edit"
          icon={<MdEdit />}
          disabled={!hasSelect}
        />
        <ConfigButton
          onClick={action(config.deleteItemAction)}
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
  ({ config, children }: { config: ConfigService; children?: React.ReactNode }) =>
    config.listMode === ListMode.None ? (
      <div></div>
    ) : (
      <Dialog
        aria-labelledby="message"
        onClose={action(configService.closePopupAction)}
        className="text-center text-lg"
        open={true}>
        <DialogTitle id="message">
          {configService.isEdit ? 'Edit' : 'Add'} {configService.getTitleType}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{children}</DialogContentText>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    )
);
