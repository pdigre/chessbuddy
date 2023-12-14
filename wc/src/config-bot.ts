import { MobxLitElement } from '@adobe/lit-mobx';
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ConfigService, ListType } from '../../common/service/config.service';
import { ConnectService } from '../../common/service/connect.service';
import { Engines } from '../../common/model/bot';
import { TW_CSS } from './css.ts';
import { LIST_CSS } from './config-lists.ts';

@customElement('cb-config-bot')
export class ConfigBot extends MobxLitElement {
  config!: ConfigService;
  connect!: ConnectService;

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
    } = this.config.getListLogic(ListType.Bot);
    const engines = Array.from(Engines.map(x => x.name));

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
            <cb-config-button label="Add" icon="add" .onClick=${onAdd}></cb-config-button>
            <cb-config-button
              label="Edit"
              icon="edit"
              .onClick=${onEdit}
              .disabled=${!hasSelect}
            ></cb-config-button>
            <cb-config-button
              label="Delete"
              icon="delete"
              .onClick=${onDelete}
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
            id="engine"
            label="Chess Engine"
            .choices=${engines}
          ></cb-config-select>
          <br />
          <cb-config-text .item=${item} id="skill" label="Skill level"></cb-config-text>
          <br />
          <cb-config-text .item=${item} id="time" label="Time (sec)"></cb-config-text>
          <br />
          <cb-config-text .item=${item} id="depth" label="Depth (..not time)"></cb-config-text>
        </form>
      </cb-config-popup>
    `;
  }
}
