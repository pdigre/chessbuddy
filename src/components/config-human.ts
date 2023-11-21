import { MobxLitElement } from '@adobe/lit-mobx';
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ConfigService, ListMode, ListType } from '../service/config.service';
import { action } from 'mobx';
import { historyService } from '../service/index.service';
import {
  ConfigButton,
  ConfigListButtons,
  ConfigPopup,
  ConfigSaveButton,
  ConfigText,
  TableList,
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

    const downloadPlayerAction = (event: Event) => {
      event.preventDefault();
      const name = items[this.config.cursor].name;
      const downtext = historyService.downloadPlayerAction(name);
      const data = new Blob([downtext], { type: 'text/plain' });
      const alink = document.createElement('a');
      alink.href = window.URL.createObjectURL(data);
      alink.download = name + '.txt';
      alink.click();
    };

    const uploadPlayerAction = (event: Event) => {
      event.preventDefault();
      //    uploadRef.current?.click();
    };

    const connectPlayerAction = (event: Event) => {
      event.preventDefault();
      this.connect.connectAction(items[this.config.cursor] as Human);
    };

    new TableList();
    new ConfigButton();
    new ConfigListButtons();
    new ConfigPopup();
    new ConfigText();
    new ConfigSaveButton();

    const addHandler = action(() => (this.config.setListMode = ListMode.Add));
    const editHandler = action(() => (this.config.setListMode = ListMode.Edit));
    const deleteHandler = action(() => this.config.deleteItem());
    return html` ${STYLES}
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
      <div class="div flex flex-col text-center [&>div]:text-left">
        <cb-table-list
          .onSelect=${(i: string) => this.config.setCursor(i)}
          .cursor=${this.config.cursor}
          .items=${items}
        ></cb-table-list>
        <a className="hidden" download="games.txt"> download it </a>
        <input
          type="file"
          class="hidden"
          multiple=${false}
          accept=".txt,text/plain"
          .onChange=${e => historyService.uploadFilesHistory(e.currentTarget?.files)}
          ref="{uploadRef}"
        />
        <div class="div">
          <cb-table-list
            class="text-left"
            .onSelect=${(i: string) => this.config.setCursor(i)}
            .cursor=${this.config.cursor}
            .items=${items}
          ></cb-table-list>
          <div>
            <cb-config-button
              style="mx-1"
              .onClick=${addHandler}
              label="Add"
              icon="add"
            ></cb-config-button>
            <cb-config-button
              style="mx-1"
              .onClick=${editHandler}
              label="Edit"
              icon="edit"
              .disabled=${!hasSelect}
            ></cb-config-button>
            <cb-config-button
              style="mx-1"
              .onClick=${deleteHandler}
              label="Delete"
              icon="delete"
              .disabled=${!hasSelect}
            ></cb-config-button>
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
          </div>
          <cb-config-popup .config=${this.config}>
            <div class="[&>button]:mx-2 [&>div]:mx-2 mt-3">
              <cb-config-text label="Name" id="name"></cb-config-text>
              <cb-config-text label="Email" id="email"></cb-config-text>
              <cb-config-save-button></cb-config-save-button>
            </div>
          </cb-config-popup>
        </div>
      </div>`;
  }
}
