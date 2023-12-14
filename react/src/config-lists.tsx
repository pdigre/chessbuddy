import React, { ReactNode, MouseEvent } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { MdAdd, MdDelete, MdEdit, MdSave } from 'react-icons/md';
import { observer } from 'mobx-react';
import { ConfigService, ListMode } from '../../common/service/config.service';
import { configService, renderingService } from '../../common/service/index.service';
import { action } from 'mobx';
import { ConfigButton } from './config-widgets';

export const ConfigListTable = observer(({ config }: { config: ConfigService }) => {
  const { onSelect, items, cursor } = config.getListLogic(config.listType);
  return (
    <table className="m-1 text-left text-xl dark:bg-slate-800 border-2 border-separate p-2">
      <tbody
        onClick={action((event: MouseEvent<HTMLTableSectionElement>) => {
          if (event.target instanceof HTMLTableCellElement) {
            onSelect((event.target.parentNode as HTMLTableRowElement).id);
          }
        })}
      >
        {items.map((item, iLine) => (
          <tr
            key={iLine.toString()}
            id={iLine.toString()}
            className={iLine == cursor ? 'bg-green-300 dark:bg-green-700' : ''}
          >
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
    const { hasSelect, onDelete, onAdd, onEdit } = config.getListLogic(config.listType);
    return (
      <div className="[&>button]:mx-1">
        <ConfigButton onClick={onAdd} label="Add" icon={<MdAdd />} />
        <ConfigButton onClick={onEdit} label="Edit" icon={<MdEdit />} disabled={!hasSelect} />
        <ConfigButton onClick={onDelete} label="Delete" icon={<MdDelete />} disabled={!hasSelect} />
        {children}
      </div>
    );
  }
);

export const ConfigPopup = observer(
  ({ config, children }: { config: ConfigService; children?: React.ReactNode }) => {
    const { show, type, onSave, isEdit } = config.getListLogic(config.listType);
    const listProps = configService.ListTypes.get(type);
    const typeName = listProps?.title;
    const label = (isEdit ? 'Save ' : 'Add ') + typeName;
    const icon = isEdit ? <MdSave /> : <MdAdd />;
    const title = (isEdit ? 'Edit ' : 'Add ') + typeName;
    const onClose = action(() => {
      configService.setListMode(ListMode.None);
    });
    return !show ? (
      <div></div>
    ) : (
      <Dialog
        aria-labelledby="message"
        onClose={onClose}
        className="text-center text-lg"
        open={true}
      >
        <DialogTitle id="message">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{children}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <ConfigButton onClick={onSave} label={label} icon={icon} />
        </DialogActions>
      </Dialog>
    );
  }
);
