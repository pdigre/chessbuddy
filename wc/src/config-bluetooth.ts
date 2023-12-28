import { MobxLitElement } from '@adobe/lit-mobx';
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ConfigService, ListType } from '../../common/service/config.service';
import { TW_CSS } from './css.ts';
import { LIST_CSS } from './config-lists.ts';
import { bluetoothService } from '../../common/service/index.service.ts';

@customElement('cb-config-bluetooth')
export class ConfigBluetooth extends MobxLitElement {
  config!: ConfigService;

  static styles = [LIST_CSS, TW_CSS];

  render() {
    const { items, cursor, hasSelect, onSelect, onDelete } = this.config.getListLogic(ListType.BT);

    return html`
      <table class="w-full">
        <tr>
          <td>
            <cb-config-list
              .onSelect=${onSelect}
              .cursor=${cursor}
              .items=${items}
            ></cb-config-list>
          </td>
        </tr>
        <tr>
          <td>
            <cb-config-button
              label="Add"
              icon="add"
              .onClick=${bluetoothService.addBT}
              type="filled"
            ></cb-config-button>
            <cb-config-button
              label="Delete"
              icon="delete"
              .onClick=${onDelete}
              .disabled=${!hasSelect}
              type="tonal"
            ></cb-config-button>
            <cb-config-button
              .onClick=${bluetoothService.connect}
              label="Connect"
              icon="bluetooth"
              .disabled=${!hasSelect}
            ></cb-config-button>
          </td>
        </tr>
      </table>
    `;
  }
}
