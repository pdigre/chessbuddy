import React, { MouseEvent } from 'react';
import { observer } from 'mobx-react';
import { ConfigButton } from './ConfigWidgets';
import { MdAdd, MdDelete, MdEdit } from 'react-icons/md';
import { AddClockDialog } from './AddClockDialog';
import { Config, EditMode } from '../../model/config';
import { runInAction } from 'mobx';

export const ConfigClock = observer(({ config }: { config: Config }) => {
  const items = config.clocks;
  const hasSelect = config.cursor >= 0;

  const doSelect = (event: MouseEvent<HTMLTableSectionElement>) => {
    if (event.target instanceof HTMLTableCellElement) {
      const id = (event.target.parentNode as HTMLTableRowElement).id;
      const num = Number.parseInt(id);
      runInAction(() => {
        config.cursor = num == config.cursor ? -1 : num;
      });
    }
  };
  const doDelete = () => {
    items.splice(config.cursor, 1);
    runInAction(() => {
      config.cursor = -1;
    });
  };
  const doEdit = () =>
    runInAction(() => {
      config.dialog = EditMode.EditBot;
    });
  const doAdd = () =>
    runInAction(() => {
      config.dialog = EditMode.AddBot;
    });

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
