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
    const {
      type,
      items,
      item,
      cursor,
      hasSelect,
      show,
      onSelect,
      onSave,
      onAdd,
      onEdit,
      onDelete,
    } = this.config.getListLogic(ListType.BT);

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
              .onClick=${onAdd}
              type="filled"
            ></cb-config-button>
            <cb-config-button
              label="Edit"
              icon="edit"
              .onClick=${onEdit}
              .disabled=${!hasSelect}
              type="tonal"
            ></cb-config-button>
            <cb-config-button
              label="Delete"
              icon="delete"
              .onClick=${onDelete}
              .disabled=${!hasSelect}
              type="tonal"
            ></cb-config-button>
          </td>
        </tr>
        <tr>
          <td>
            <cb-config-button
              .onClick=${bluetoothService.getDevices}
              label="Connect"
              icon="connect"
              .disabled=${!hasSelect}
            ></cb-config-button>
          </td>
        </tr>
      </table>
      <cb-config-popup .show=${show} .type=${type} .onSave=${onSave}>
        <form name="bot" class="popup [&>button]:mx-2 [&>div]:mx-2 mt-3" method="dialog">
          <cb-config-text .item=${item} label="Name" id="name"></cb-config-text>
          <cb-config-text .item=${item} label="Description" id="description"></cb-config-text>
        </form>
      </cb-config-popup>
    `;
  }
}
