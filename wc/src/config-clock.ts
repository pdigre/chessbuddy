import { MobxLitElement } from '@adobe/lit-mobx';
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ConfigService, ListType } from '../../common/service/config.service';
import { TW_CSS } from './css';
import { css } from 'lit-element';

@customElement('cb-config-clock')
export class ConfigClock extends MobxLitElement {
  config!: ConfigService;

  static styles = [
    css`
      .div {
        width: 800px;
        height: 400px;
        cb\-table\-list,
        cb\-config\-button {
          // mx-1
          margin-left: 0.25rem;
          margin-right: 0.25rem;
        }
      }
      mx\-2 {
        // mx-2
        margin-left: 0.5rem;
        margin-right: 0.5rem;
      }
    `,
    TW_CSS,
  ];

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
    } = this.config.getListLogic(ListType.Clock);

    return html`
      <table class="w-full">
        <tr>
          <td>
            <cb-table-list .onSelect=${onSelect} .cursor=${cursor} .items=${items}></cb-table-list>
          </td>
        </tr>
        <tr>
          <td>
            <cb-config-button .onClick=${onAdd} label="Add" icon="add"></cb-config-button>
            <cb-config-button
              .onClick=${onEdit}
              label="Edit"
              icon="edit"
              .disabled=${!hasSelect}
            ></cb-config-button>
            <cb-config-button
              .onClick=${onDelete}
              label="Delete"
              icon="delete"
              .disabled=${!hasSelect}
            ></cb-config-button>
          </td>
        </tr>
      </table>
      <cb-config-popup .show=${show} .type=${type} .onSave=${onSave}>
        <p>(from move)+(plus minutes)/(seconds each move) comma separated</p>
        <form name="clock" class="[&>button]:mx-2 [&>div]:mx-2 mt-3" method="dialog">
          <cb-config-text .item=${item} label="Clock name" id="name"></cb-config-text>
          <cb-config-text .item=${item} label="Timings" id="time"></cb-config-text>
        </form>
      </cb-config-popup>
    `;
  }
}
