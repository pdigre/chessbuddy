export class BluetoothService {
  constructor() {}
  getDevices = () => doBT();
}

async function doBT() {
  const port = await getPort();
  if (!port) {
    throw new Error('No port available.');
  }
  await port.open({ baudRate: 9600 });
  //    const board = new Board(port);
  //    console.log(board);
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
}
/*

class AnyToU8Stream extends TransformStream {
    constructor() {
        super({...transformContent});
    }
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
*/
