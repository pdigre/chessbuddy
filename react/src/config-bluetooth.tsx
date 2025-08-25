import React, { MouseEvent } from 'react';
import { ConfigService, ListType } from '../../common/service/config.service';
import { observer } from 'mobx-react';
import { MdBluetoothConnected } from 'react-icons/md';
import { action } from 'mobx';
import { ConfigButton, ConfigSelect, ConfigText } from './config-widgets';
import { ConfigListButtons, ConfigListTable, ConfigPopup } from './config-lists';

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
  const { type, item, hasSelect, show, onSave, onSelect, cursor, items } = config.getListLogic(
    ListType.BT
  );

  const doBtAction = () => doBT();
  return (
    <div className="w-[800px] h-[400px] [&>div]:text-left">
      <ConfigListTable onSelect={onSelect} cursor={cursor} items={items} />
      <ConfigListButtons type={type} />
      <ConfigButton onClick={action(doBtAction)} label="Delete" icon={<MdBluetoothConnected />} />
    </div>
  );
});

const transformContent = {
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
