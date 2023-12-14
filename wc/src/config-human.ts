import { MobxLitElement } from '@adobe/lit-mobx';
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ConfigService, ListType } from '../../common/service/config.service';
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
    } = this.config.getListLogic(ListType.Human);

    //  const uploadRef = useRef<HTMLInputElement>(null);
    const hasEmail = hasSelect && (item as Human).email;

    const downloadPlayerAction = (event: Event) => {
      event.preventDefault();
      const name = items[cursor].getName();
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
      this.connect.connectAction(item as Human);
    });
    const onUpload = action((e: MouseEvent) => {
      // @ts-ignore
      historyService.uploadFilesHistory(e.currentTarget?.files);
    });

    return html`
      <table class="w-full">
        <tr>
          <td>
            <cb-table-list .onSelect=${onSelect} .cursor=${cursor} .items=${items}></cb-table-list>
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
      <cb-config-popup .show=${show} .type=${type} .onSave=${onSave}>
        <form name="human" class="[&>button]:mx-2 [&>div]:mx-2 mt-3" method="dialog">
          <cb-config-text .item=${item} label="Name" id="name"></cb-config-text>
          <cb-config-text .item=${item} label="Email" id="email"></cb-config-text>
        </form>
      </cb-config-popup>
    `;
  }
}
