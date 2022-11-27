import React, { MouseEvent, useState } from 'react';
import { observer } from 'mobx-react';
import { ConfigButton } from './ConfigWidgets';
import { MdAdd, MdDelete } from 'react-icons/md';
import { ClockList } from '../../controller/config/clocklist';
import { AddClockDialog } from './AddClockDialog';

export const ConfigClock = observer(({ clockList }: { clockList: ClockList }) => {
  const [marker, setMarker] = useState(-1);
  const hasSelect = marker >= 0;

  const doSelect = (event: MouseEvent<HTMLTableSectionElement>) => {
    if (event.target instanceof HTMLTableCellElement) {
      const id = (event.target.parentNode as HTMLTableRowElement).id;
      const num = Number.parseInt(id);
      setMarker(num == marker ? -1 : num);
    }
  };
  const doDelClock = () => {
    if (hasSelect) {
      clockList.delClock(clockList.clocks[marker].name);
      clockList.save();
      setMarker(-1);
    }
  };

  return (
    <div className="w-[800px] h-[400px] flex flex-col text-center [&>div]:text-left">
      <table className="m-1 text-left text-xl dark:bg-slate-800 border-2 border-separate p-2">
        <tbody onClick={doSelect}>
          {clockList.clocks.map((clock, iLine) => (
            <tr
              key={iLine.toString()}
              id={iLine.toString()}
              className={iLine == marker ? 'bg-green-300 dark:bg-green-700' : ''}>
              <td className="dark:text-white">{clock.name}</td>
              <td className="dark:text-white">{clock.printTime()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="[&>button]:mx-1">
        <ConfigButton onClick={() => (clockList.addDialog = true)} label="Add" icon={<MdAdd />} />
        <ConfigButton
          onClick={doDelClock}
          label="Delete"
          icon={<MdDelete />}
          disabled={!hasSelect}
        />
      </div>
      <AddClockDialog clockList={clockList} />
    </div>
  );
});
