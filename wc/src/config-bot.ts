import { MobxLitElement } from '@adobe/lit-mobx';
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ConfigService, ListType } from '../../common/service/config.service';
import { ConnectService } from '../../common/service/connect.service';
import { Engines } from '../../common/model/bot';
import { css } from 'lit-element';
import { TW_CSS } from './css.ts';

@customElement('cb-config-bot')
export class ConfigBot extends MobxLitElement {
  config!: ConfigService;
  connect!: ConnectService;

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
    } = this.config.getListLogic(ListType.Bot);
    const engines = Array.from(Engines.map(x => x.name));

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
        <form name="bot" class="popup [&>button]:mx-2 [&>div]:mx-2 mt-3" method="dialog">
          <cb-config-text .item=${item} label="Name" id="name"></cb-config-text>
          <cb-config-select
            .item=${item}
            label="Chess Engine"
            .choices=${engines}
            id="engine"
          ></cb-config-select>
          <br />
          <cb-config-text .item=${item} label="Skill level" id="skill"></cb-config-text>
          <br />
          <cb-config-text .item=${item} label="Time (sec)" id="time"></cb-config-text>
          <br />
          <cb-config-text .item=${item} label="Depth (..not time)" id="depth"></cb-config-text>
        </form>
      </cb-config-popup>
    `;
  }
}
