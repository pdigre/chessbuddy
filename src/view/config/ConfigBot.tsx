import React, { MouseEvent } from 'react';
import { ConfigButton } from './ConfigWidgets';
import { observer } from 'mobx-react';
import { MdAdd, MdDelete, MdEdit } from 'react-icons/md';
import { AddBotDialog } from './AddBotDialog';
import { Config, EditMode } from '../../model/config';

export const ConfigBot = observer(({ config }: { config: Config }) => {
  const items = config.bots;
  const hasSelect = config.cursor >= 0;

  const doSelect = (event: MouseEvent<HTMLTableSectionElement>) => {
    if (event.target instanceof HTMLTableCellElement) {
      const id = (event.target.parentNode as HTMLTableRowElement).id;
      const num = Number.parseInt(id);
      config.cursor = num == config.cursor ? -1 : num;
    }
  };
  const doDelete = () => {
    items.splice(config.cursor, 1);
    config.cursor = -1;
  };
  const doEdit = () => (config.dialog = EditMode.EditBot);
  const doAdd = () => (config.dialog = EditMode.AddBot);

  return (
    <div className="w-[800px] h-[400px] [&>div]:text-left">
      <table className="w-full text-left text-lg dark:bg-slate-800 border-2 border-separate p-2">
        <tbody onClick={doSelect}>
          {items.map((bot, iLine) => (
            <tr
              key={iLine.toString()}
              id={iLine.toString()}
              className={iLine == config.cursor ? 'bg-green-300' : ''}>
              <td className="dark:text-white">{bot.getName()}</td>
              <td className="dark:text-white">{bot.getDescription()}</td>
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
