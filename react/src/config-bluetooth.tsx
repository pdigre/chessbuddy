import React from 'react';
import { ConfigService, ListType } from '../../common/service/config.service';
import { observer } from 'mobx-react';
import { MdBluetoothConnected, MdDelete } from 'react-icons/md';
import { action } from 'mobx';
import { ConfigButton } from './config-widgets';
import { ConfigListTable } from './config-lists';
import { bluetoothService } from 'service/index.service';

export const ConfigBluetooth = observer(({ config }: { config: ConfigService }) => {
  const { items, cursor, unselect, hasSelect, onSelect, onDelete } = config.getListLogic(
    ListType.BT
  );

  const addBlueTooth = () => {
    bluetoothService.addBT();
    unselect();
  };

  const hardReset = async () => {
    // Force disconnect + small pause + reconnect. Helps recover from macOS/CoreBluetooth getting stuck.
    await bluetoothService.disconnect();
    await new Promise<void>(r => setTimeout(r, 1200));
    await bluetoothService.connect();
  };

  return (
    <div className="w-[800px] h-[400px] [&>div]:text-left">
      <ConfigListTable onSelect={onSelect} cursor={cursor} items={items} />
      <div className="[&>button]:mx-1">
        <ConfigButton
          onClick={action(addBlueTooth)}
          label="Add BT"
          icon={<MdBluetoothConnected />}
        />
        <ConfigButton onClick={onDelete} label="Delete" icon={<MdDelete />} disabled={!hasSelect} />
        <ConfigButton
          onClick={action(bluetoothService.connect)}
          label="Connect"
          icon={<MdBluetoothConnected />}
        />
        <ConfigButton
          onClick={action(hardReset)}
          label="Hard Reset"
          icon={<MdBluetoothConnected />}
          outline={true}
        />
        <ConfigButton
          onClick={action(action(bluetoothService.copyBoard))}
          label="Copy Board"
          icon={<MdBluetoothConnected />}
          outline={true}
        />
      </div>
    </div>
  );
});
