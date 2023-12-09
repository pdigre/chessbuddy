import { MobxLitElement } from '@adobe/lit-mobx';
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ConfigProp, ConfigService, ListItem } from '../../common/service/config.service';
import { ConfigButton } from './config-widgets';
import { bluetoothService } from '../../common/service/bluetooth.service';
import { action } from 'mobx';
import { Board } from './board';
import { css } from 'lit-element';
import { TW_CSS } from './css.ts';

@customElement('cb-config-bluetooth')
export class ConfigBluetooth extends MobxLitElement {
  config!: ConfigService;

  static styles = [css``, TW_CSS];

  render() {
    const items: BT[] = [];
    bluetoothService.btDevices.map(device => new BT(device.id, device.name ?? 'UNKNOWN'));

    const doSelect = (event: MouseEvent) => {
      if (event.target instanceof HTMLTableCellElement) {
        this.config.setCursor((event.target.parentNode as HTMLTableRowElement).id);
      }
    };

    const doBtAction = () => doBT();

    new ConfigButton();

    return html`
      <div class="w-[800px] h-[400px] [&>div]:text-left">
        <table class="w-full text-left text-lg dark:bg-slate-800 border-2 border-separate p-2">
          <tbody onClick=${action(doSelect)}>
            ${items.map(
              (item, iLine) => html`
                <tr
                  id=${iLine.toString()}
                  class=${iLine == this.config.cursor ? 'bg-green-300' : ''}
                >
                  <td className="dark:text-white">{item.getName()}</td>
                  <td className="dark:text-white">{item.getDescription()}</td>
                </tr>
              `
            )}
          </tbody>
        </table>
        <cb-config-button
          .onClick=${action(doBtAction)}
          label="Delete"
          icon="bluetooth"
        ></cb-config-button>
      </div>
    `;
  }
}

class BT implements ListItem {
  constructor(
    public name: string,
    public description: string
  ) {}
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
