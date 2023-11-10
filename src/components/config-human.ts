import { MobxLitElement } from '@adobe/lit-mobx';
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ConfigService, ListType } from '../service/config.service';
import { action } from 'mobx';
import { historyService } from '../service/index.service';
import {
  ConfigButton,
  ConfigListButtons,
  ConfigListTable,
  ConfigPopup,
  ConfigSaveButton,
  ConfigText,
} from './config-widgets';
import { ConnectService } from '../service/connect.service';
import { Human } from '../model/human';
import { STYLES } from './css';

@customElement('cb-config-human')
export class ConfigHuman extends MobxLitElement {
  config!: ConfigService;
  connect!: ConnectService;
  render() {
    this.config.setListType = ListType.Human;
    const items = this.config.humans;
    const hasSelect = this.config.cursor >= 0;

    //  const uploadRef = useRef<HTMLInputElement>(null);
    const hasEmail = hasSelect && (items[this.config.cursor] as Human).email;

    const downloadPlayerAction = (event: MouseEvent) => {
      event.preventDefault();
      const name = items[this.config.cursor].name;
      const downtext = historyService.downloadPlayerAction(name);
      const data = new Blob([downtext], { type: 'text/plain' });
      const alink = document.createElement('a');
      alink.href = window.URL.createObjectURL(data);
      alink.download = name + '.txt';
      alink.click();
    };

    const uploadPlayerAction = (event: MouseEvent) => {
      event.preventDefault();
      //    uploadRef.current?.click();
    };

    const connectPlayerAction = (event: MouseEvent) => {
      event.preventDefault();
      this.connect.connectAction(items[this.config.cursor] as Human);
    };
    const props = this.config.boolprops;
    new ConfigListTable();
    new ConfigButton();
    new ConfigListButtons();
    new ConfigPopup();
    new ConfigText();
    new ConfigSaveButton();

    return html` ${STYLES}
      <div class="w-[800px] h-[400px] flex flex-col text-center [&>div]:text-left">
        <cb-config-list-table .config=${this.config}></cb-config-list-table>
        <a className="hidden" download="games.txt"> download it </a>
        <input
          type="file"
          class="hidden"
          multiple=${false}
          accept=".txt,text/plain"
          .onChange=${e => historyService.uploadFilesHistory(e.currentTarget?.files)}
          ref="{uploadRef}"
        />
        <cb-config-list-buttons .config=${this.config}>
          <cb-config-button
            .onClick=${downloadPlayerAction}
            label="Download"
            icon="download"
            .disabled=${!hasSelect}
          ></cb-config-button>
          <cb-config-button
            .onClick=${action(uploadPlayerAction)}
            label="Upload"
            icon="upload"
            .disabled=${!hasSelect}
          ></cb-config-button>
          <cb-config-button
            .onClick=${action(connectPlayerAction)}
            label="Update"
            icon="online_prediction"
            .disabled=${!hasEmail}
          ></cb-config-button>
        </cb-config-list-buttons>
        <cb-config-popup .config=${this.config}>
          <div class="[&>button]:mx-2 [&>div]:mx-2 mt-3">
            <cb-config-text label="Name" id="name"></cb-config-text>
            <cb-config-text label="Email" id="email"></cb-config-text>
            <cb-config-save-button></cb-config-save-button>
          </div>
        </cb-config-popup>
      </div>`;
  }
}
