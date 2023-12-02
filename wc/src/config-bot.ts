import { MobxLitElement } from '@adobe/lit-mobx';
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ConfigService, ListMode, ListType } from '../../common/service/config.service';
import {
  ConfigButton,
  ConfigPopup,
  ConfigSaveButton,
  ConfigSelect,
  ConfigText,
  TableList,
} from './config-widgets';
import { ConnectService } from '../../common/service/connect.service';
import { STYLES } from './css';
import { Engines } from '../../common/model/bot';
import { action } from 'mobx';

@customElement('cb-config-bot')
export class ConfigBot extends MobxLitElement {
  config!: ConfigService;
  connect!: ConnectService;
  render() {
    this.config.setListType = ListType.Bot;
    const items = this.config.bots;
    const engines = Array.from(Engines.map(x => x.name));

    new TableList();
    new ConfigButton();
    new ConfigPopup();
    new ConfigSelect();
    new ConfigText();
    new ConfigSaveButton();

    const hasSelect = this.config.cursor >= 0;
    const addHandler = action(() => (this.config.setListMode = ListMode.Add));
    const editHandler = action(() => (this.config.setListMode = ListMode.Edit));
    const deleteHandler = action(() => this.config.deleteItem());
    return html`
      ${STYLES}
      <style>
        .div {
          width: 800px;
          height: 400px;
          cb-table-list, cb-config-button { // mx-1
            margin-left: 0.25rem;
            margin-right: 0.25rem;
            background-color: greenyellow;
          }
        }
        mx-2 { // mx-2
            margin-left: 0.5rem;
            margin-right: 0.5rem;
          }
      </style>
      <div class="div">
        <cb-table-list
          class="text-left"
          .onSelect=${(i: string) => this.config.setCursor(i)}
          .cursor=${this.config.cursor}
          .items=${items}
        ></cb-table-list>
        <div>
          <cb-config-button
            class="mx-1"
            .onClick=${addHandler}
            label="Add"
            icon="add"
          ></cb-config-button>
          <cb-config-button
            class="mx-1"
            .onClick=${editHandler}
            label="Edit"
            icon="edit"
            .disabled=${!hasSelect}
          ></cb-config-button>
          <cb-config-button
            class="mx-1"
            .onClick=${deleteHandler}
            label="Delete"
            icon="delete"
            .disabled=${!hasSelect}
          ></cb-config-button>
        </div>
        <cb-config-popup .config=${this.config}>
          <div class="popup [&>button]:mx-2 [&>div]:mx-2 mt-3">
            <cb-config-text label="Name" id="name"></cb-config-text>
            <cb-config-select
              label="Chess Engine"
              .choices=${engines}
              id="engine"
            ></cb-config-select>
            <br />
            <cb-config-text label="Skill level" id="skill"></cb-config-text>
            <br />
            <cb-config-text label="Time (sec)" id="time"></cb-config-text>
            <br />
            <cb-config-text label="Depth (..not time)" id="depth"></cb-config-text>
            <cb-config-save></cb-config-save>
          </div>
        </cb-config-popup>
      </div>
    `;
  }
}
