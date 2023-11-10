import { MobxLitElement } from '@adobe/lit-mobx';
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ConfigService, ListType } from '../service/config.service';
import {
  ConfigButton,
  ConfigListButtons,
  ConfigListTable,
  ConfigPopup,
  ConfigSelect,
  ConfigText,
} from './config-widgets';
import { ConnectService } from '../service/connect.service';
import { STYLES } from './css';
import { Engines } from '../model/bot';

@customElement('cb-config-bot')
export class ConfigBot extends MobxLitElement {
  config!: ConfigService;
  connect!: ConnectService;
  render() {
    this.config.setListType = ListType.Bot;
    const engines = Array.from(Engines.map(x => x.name));
    const props = this.config.boolprops;

    new ConfigListTable();
    new ConfigButton();
    new ConfigListButtons();
    new ConfigPopup();
    new ConfigSelect();
    new ConfigText();

    return html`
      ${STYLES}
      <div class="w-[800px] h-[400px] [&>div]:text-left">
        <cb-config-list-table .config=${this.config}></cb-config-list-table>
        <cb-config-list-buttons .config=${this.config}> </cb-config-list-buttons>
        <cb-config-popup .config=${this.config}>
          <div class="[&>button]:mx-2 [&>div]:mx-2 mt-3">
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
            <div ConfigSaveButton />
          </div>
        </cb-config-popup>
      </div>
    `;
  }
}
