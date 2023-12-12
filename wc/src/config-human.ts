import { MobxLitElement } from '@adobe/lit-mobx';
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ConfigService, ListMode, ListType } from '../../common/service/config.service';
import { action } from 'mobx';
import { historyService } from '../../common/service/index.service';
import { ConnectService } from '../../common/service/connect.service';
import { Human } from '../../common/model/human';
import { css } from 'lit-element';
import { TW_CSS } from './css.ts';

@customElement('cb-config-human')
export class ConfigHuman extends MobxLitElement {
  config!: ConfigService;
  connect!: ConnectService;

  static styles = [css``, TW_CSS];

  render() {
    const type = ListType.Human;
    const items = this.config.humans;
    const hasSelect = this.config.cursor >= 0;
    const show = this.config.listMode !== ListMode.None;

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

    const uploadPlayerAction = action((event: Event) => {
      event.preventDefault();
      //    uploadRef.current?.click();
    });

    const connectPlayerAction = action((event: Event) => {
      event.preventDefault();
      this.connect.connectAction(items[this.config.cursor] as Human);
    });

    const addHandler = action(() => this.config.setListMode(ListMode.Add));
    const editHandler = action(() => this.config.setListMode(ListMode.Edit));
    const deleteHandler = action(() => this.config.deleteItem());

    const onUpload = action((e: MouseEvent) => {
      // @ts-ignore
      historyService.uploadFilesHistory(e.currentTarget?.files);
    });

    const item = this.config.getItemByType(type);

    const onSave = action(() => this.config.saveItem(item, items));

    const onSelect = action((i: string) => this.config.setCursor(i));

    return html`
      <table class="w-full">
        <tr>
          <td>
            <cb-table-list
              .onSelect=${onSelect}
              .cursor=${this.config.cursor}
              .items=${items}
            ></cb-table-list>
          </td>
        </tr>
        <tr>
          <td>
            <a className="hidden" download="games.txt"> download it </a>
            <input
              type="file"
              class="hidden"
              multiple=${false}
              accept=".txt,text/plain"
              .onChange=${onUpload}
              ref="{uploadRef}"
            />
          </td>
        </tr>
        <tr>
          <td>
            <cb-config-button .onClick=${addHandler} label="Add" icon="add"></cb-config-button>
            <cb-config-button
              .onClick=${editHandler}
              label="Edit"
              icon="edit"
              .disabled=${!hasSelect}
            ></cb-config-button>
            <cb-config-button
              .onClick=${deleteHandler}
              label="Delete"
              icon="delete"
              .disabled=${!hasSelect}
            ></cb-config-button>
          </td>
        </tr>
        <tr>
          <td>
            <cb-config-button
              .onClick=${downloadPlayerAction}
              label="Download"
              icon="download"
              .disabled=${!hasSelect}
            ></cb-config-button>
            <cb-config-button
              .onClick=${uploadPlayerAction}
              label="Upload"
              icon="upload"
              .disabled=${!hasSelect}
            ></cb-config-button>
            <cb-config-button
              .onClick=${connectPlayerAction}
              label="Update"
              icon="online_prediction"
              .disabled=${!hasEmail}
            ></cb-config-button>
          </td>
        </tr>
      </table>
      <cb-config-popup2 .show=${show} .type=${type} .onSave=${onSave}>
        <div class="[&>button]:mx-2 [&>div]:mx-2 mt-3">
          <cb-config-text2 .item=${item} label="Name" id="name"></cb-config-text2>
          <cb-config-text2 .item=${item} label="Email" id="email"></cb-config-text2>
        </div>
      </cb-config-popup2>
    `;
  }
}
