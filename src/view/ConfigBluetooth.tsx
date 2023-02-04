import React, { MouseEvent } from 'react';
import { ConfigService, ConfigProp, ListItem } from '../model/config';
import { observer } from 'mobx-react';
import { ConfigButton } from './ConfigWidgets';
import { MdBluetoothConnected } from 'react-icons/md';
import { bluetoothService } from '../service/bluetooth.service';

class BT implements ListItem {
  constructor(public name: string, public description: string) {}
  label = 'BT';
  properties: Map<string, ConfigProp<string>> = new Map([
    ['name', { get: () => this.name, set: value => (this.name = value) }],
  ]);
  validate = () => '';
  getName = () => this.name;
  getDescription = () => this.description;
}

async function getPort() {
  const FILTERS = [{ usbVendorId: 0x0403, usbProductId: 0x6001 }];

  const bt = await navigator.bluetooth.requestDevice({
    acceptAllDevices: true,
  });
  //  alert(bt);
  const ports: SerialPort[] = await navigator.serial.getPorts();
  for (const port of ports) {
    for (const filter of FILTERS) {
      //      if (port.productId === filter.productId && port.vendorId === filter.vendorId) {
      return port;
      //      }
    }
  }

  // do not use `Board.FILTERS` as of now since we do not
  //   know all valid identifiers, also when using a VM etc.
  const filters: SerialPortFilter[] = [];
  return await navigator.serial.requestPort({
    filters: filters,
  });
}

async function doBT() {
  const port = await getPort();
  if (!port) {
    throw new Error('No port available.');
  }
  await port.open({ baudRate: 9600 });
  const board = new Board(port);
  console.log(board);
}

export const ConfigBluetooth = observer(({ config }: { config: ConfigService }) => {
  const items: BT[] = [];
  bluetoothService.btDevices.map(device => new BT(device.id, device.name ?? 'UNKNOWN'));
  const hasSelect = config.cursor >= 0;

  const doSelect = (event: MouseEvent<HTMLTableSectionElement>) => {
    if (event.target instanceof HTMLTableCellElement) {
      config.setCursor((event.target.parentNode as HTMLTableRowElement).id);
    }
  };

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
      <ConfigButton
        onClick={() => {
          doBT();
        }}
        label="Delete"
        icon={<MdBluetoothConnected />}
      />
    </div>
  );
});

const transformContent = {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  start() {}, // required.
  async transform(chunk: any, controller: any) {
    const textencoder = new TextEncoder();
    chunk = await chunk;
    switch (typeof chunk) {
      case 'object':
        // just say the stream is done I guess
        if (chunk === null) {
          controller.terminate();
        } else if (ArrayBuffer.isView(chunk)) {
          controller.enqueue(new Uint8Array(chunk.buffer, chunk.byteOffset, chunk.byteLength));
        } else if (Array.isArray(chunk) && chunk.every(value => typeof value === 'number')) {
          controller.enqueue(new Uint8Array(chunk));
        } else if (typeof chunk.valueOf === 'function' && chunk.valueOf() !== chunk) {
          this.transform(chunk.valueOf(), controller); // hack
        } else if ('toJSON' in chunk) {
          this.transform(JSON.stringify(chunk), controller);
        }
        break;
      case 'symbol':
        controller.error('Cannot send a symbol as a chunk part');
        break;
      case 'undefined':
        controller.error('Cannot send undefined as a chunk part');
        break;
      default:
        controller.enqueue(textencoder.encode(String(chunk)));
        break;
    }
  },
  flush() {
    /* do any destructor work here */
  },
};

class AnyToU8Stream extends TransformStream {
  constructor() {
    super({ ...transformContent });
  }
}
export default class Board {
  #port;
  #writer;
  #msgFieldUpdateTransformer;

  constructor(port: SerialPort) {
    this.#port = port;
    this.#writer = this.#port.writable?.getWriter();
    this.#msgFieldUpdateTransformer = new AnyToU8Stream();
  }
}
