import React, { MouseEvent } from 'react';
import { observer } from 'mobx-react';
import { ConfigButton } from './ConfigWidgets';
import { MdAdd, MdDelete, MdEdit } from 'react-icons/md';
import { AddClockDialog } from './AddClockDialog';
import { Config, ConfigMode } from '../../model/config';

export const ConfigClock = observer(({ config }: { config: Config }) => {
  const items = config.clocks;
  const hasSelect = config.cursor >= 0;

  const doSelect = (event: MouseEvent<HTMLTableSectionElement>) => {
    if (event.target instanceof HTMLTableCellElement) {
      config.setCursor((event.target.parentNode as HTMLTableRowElement).id);
    }
  };
  const doAdd = () => config.openDialog(ConfigMode.AddClock);
  const doEdit = () => config.openDialog(ConfigMode.EditClock);
  const doDelete = () => config.deleteItem(items);

  return (
    <div className="w-[800px] h-[400px] flex flex-col text-center [&>div]:text-left">
      <table className="m-1 text-left text-xl dark:bg-slate-800 border-2 border-separate p-2">
        <tbody onClick={doSelect}>
          {config.clocks.map((item, iLine) => (
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
      <div className="[&>button]:mx-1">
        <ConfigButton onClick={doAdd} label="Add" icon={<MdAdd />} />
        <ConfigButton onClick={doEdit} label="Edit" icon={<MdEdit />} disabled={!hasSelect} />
        <ConfigButton onClick={doDelete} label="Delete" icon={<MdDelete />} disabled={!hasSelect} />
      </div>
      <AddClockDialog config={config} />
    </div>
  );
});
