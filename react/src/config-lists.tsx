import React, { MouseEvent } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { MdAdd, MdDelete, MdEdit, MdSave } from 'react-icons/md';
import { ListMode, ListType } from '../../common/service/config.service';
import { configService } from '../../common/service/index.service';
import { ConfigButton } from './config-widgets';
import { ListItem } from '../../common/model/model';

export const ConfigListTable: React.FC<{
  items: ListItem[];
  onSelect: (id: string) => void;
  cursor: number;
}> = ({ items, onSelect, cursor }) => {
  const onClick = (event: MouseEvent<HTMLTableSectionElement>) => {
    if (event.target instanceof HTMLTableCellElement) {
      onSelect((event.target.parentNode as HTMLTableRowElement).id);
    }
  };
  return (
    <table className="m-1 text-left text-xl dark:bg-slate-800 border-2 border-separate p-2">
      <tbody onClick={onClick}>
        {items.map((item, iLine) => (
          <tr
            key={iLine.toString()}
            id={iLine.toString()}
            className={iLine === cursor ? 'bg-green-300 dark:bg-green-700' : ''}
          >
            <td className="dark:text-white">{item.getName()}</td>
            <td className="dark:text-white">{item.getDescription()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export const ConfigListButtons: React.FC<{
  type: ListType;
  children?: React.ReactNode;
}> = ({ type, children }) => {
  const { hasSelect, onDelete, onAdd, onEdit } = configService.getListLogic(type);
  return (
    <div className="[&>button]:mx-1">
      <ConfigButton onClick={onAdd} label="Add" icon={<MdAdd />} type="filled" />
      <ConfigButton
        onClick={onEdit}
        label="Edit"
        icon={<MdEdit />}
        disabled={!hasSelect}
        type="tonal"
      />
      <ConfigButton
        onClick={onDelete}
        label="Delete"
        icon={<MdDelete />}
        disabled={!hasSelect}
        type="tonal"
      />
      {children}
    </div>
  );
};

export const ConfigPopup: React.FC<{
  type: ListType;
  show: boolean;
  onSave: () => void;
  children?: React.ReactNode;
}> = ({ type, show, onSave, children }) => {
  if (!show) {
    return <div></div>;
  }

  const listProps = configService.ListTypes.get(type);
  const typeName = listProps?.title;
  const isEdit = configService.isEdit();
  const label = (isEdit ? 'Save ' : 'Add ') + typeName;
  const icon = isEdit ? <MdSave /> : <MdAdd />;
  const title = (isEdit ? 'Edit ' : 'Add ') + typeName;
  const onClose = () => {
    configService.setListModeAction(ListMode.None);
  };
  return (
    <Dialog aria-labelledby="message" onClose={onClose} className="text-center text-lg" open>
      <DialogTitle id="message">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{children}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <ConfigButton onClick={onSave} label={label} icon={icon} />
      </DialogActions>
    </Dialog>
  );
};
