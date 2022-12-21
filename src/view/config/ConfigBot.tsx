import React, { MouseEvent } from 'react';
import { ConfigButton } from './ConfigWidgets';
import { observer } from 'mobx-react';
import { MdAdd, MdDelete, MdEdit } from 'react-icons/md';
import { AddBotDialog } from './AddBotDialog';
import { Config, ConfigMode } from '../../model/config';

export const ConfigBot = observer(({ config }: { config: Config }) => {
  const items = config.bots;
  const hasSelect = config.cursor >= 0;

  const doSelect = (event: MouseEvent<HTMLTableSectionElement>) => {
    if (event.target instanceof HTMLTableCellElement) {
      config.setCursor((event.target.parentNode as HTMLTableRowElement).id);
    }
  };
  const doAdd = () => config.openDialog(ConfigMode.AddBot);
  const doEdit = () => config.openDialog(ConfigMode.EditBot);
  const doDelete = () => config.deleteItem(items);

  return (
    <div className="w-[800px] h-[400px] [&>div]:text-left">
      <table className="w-full text-left text-lg dark:bg-slate-800 border-2 border-separate p-2">
        <tbody onClick={doSelect}>
          {items.map((item, iLine) => (
            <tr
              key={iLine.toString()}
              id={iLine.toString()}
              className={iLine == config.cursor ? 'bg-green-300' : ''}>
              <td className="dark:text-white">{item.getName()}</td>
              <td className="dark:text-white">{item.getDescription()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <ConfigButton onClick={doAdd} label="Add" icon={<MdAdd />} />
      <ConfigButton onClick={doEdit} label="Edit" icon={<MdEdit />} disabled={!hasSelect} />
      <ConfigButton onClick={doDelete} label="Delete" icon={<MdDelete />} disabled={!hasSelect} />
      <AddBotDialog config={config} />
    </div>
  );
});
