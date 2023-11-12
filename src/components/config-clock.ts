import { MobxLitElement } from '@adobe/lit-mobx';
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ConfigService, ListType } from '../service/config.service';
import {
  ConfigListButtons,
  ConfigListTable,
  ConfigPopup,
  ConfigSaveButton,
  ConfigText,
} from './config-widgets';
import { STYLES } from './css';

@customElement('cb-config-clock')
export class ConfigClock extends MobxLitElement {
  config!: ConfigService;
  render() {
    this.config.setListType = ListType.Clock;
    const items = this.config.clocks;

    new ConfigListTable();
    new ConfigListButtons();
    new ConfigPopup();
    new ConfigText();
    new ConfigSaveButton();

    return html`
      ${STYLES}
      <div class="w-[800px] h-[400px] flex flex-col text-center [&>div]:text-left">
        <cb-config-list-table
          .onSelect=${(i: string) => this.config.setCursor(i)}
          .cursor=${this.config.cursor}
          .items=${items}
        ></cb-config-list-table>
        <cb-config-list-buttons .config=${this.config}></cb-config-list-buttons>
        <cb-config-popup .config=${this.config}>
          <p>(from move)+(plus minutes)/(seconds each move) comma separated</p>
          <div className="[&>button]:mx-2 [&>div]:mx-2 mt-3">
            <cb-config-text label="Clock name" id="name"></cb-config-text>
            <cb-config-text label="Timings" id="time"></cb-config-text>
            <cb-config-save-button></cb-config-save-button>
          </div>
        </cb-config-popup>
      </div>
    `;
  }
}
