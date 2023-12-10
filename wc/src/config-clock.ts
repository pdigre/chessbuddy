import { MobxLitElement } from '@adobe/lit-mobx';
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ConfigService, ListMode, ListType } from '../../common/service/config.service';
import { TW_CSS } from './css';
import { action } from 'mobx';
import { css } from 'lit-element';

@customElement('cb-config-clock')
export class ConfigClock extends MobxLitElement {
  config!: ConfigService;

  addHandler = action(() => (this.config.setListMode = ListMode.Add));
  editHandler = action(() => (this.config.setListMode = ListMode.Edit));
  deleteHandler = action(() => this.config.deleteItem());
  selectHandler = action((i: string) => {
    this.config.setCursor(i);
    this.requestUpdate();
  });
  saveHandler = action(() => this.config.saveItem(this.config.getItem(), this.config.getItems()));

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
    this.config.setListType = ListType.Clock;
    const items = this.config.clocks;
    const hasSelect = this.config.cursor >= 0;

    const getTitle = () => ((this.config.isEdit() ? 'Edit ' : 'Add ') + this.config.getTitleType());
    const onClose = action(this.config.closePopupAction);
    const showPopup = this.config.listMode === ListMode.None;

    return html`
      <div class="div flex flex-col text-center [&>div]:text-left">
        <cb-table-list
          class="text-left"
          .onSelect=${this.selectHandler}
          .cursor=${+this.config.cursor}
          .items=${items}
        ></cb-table-list>
        <div>
          <cb-config-button
            class="mx-1"
            .onClick=${this.addHandler}
            label="Add"
            icon="add"
          ></cb-config-button>
          <cb-config-button
            class="mx-1"
            .onClick=${this.editHandler}
            label="Edit"
            icon="edit"
            .disabled=${!hasSelect}
          ></cb-config-button>
          <cb-config-button
            class="mx-1"
            .onClick=${this.deleteHandler}
            label="Delete"
            icon="delete"
            .disabled=${!hasSelect}
          ></cb-config-button>
        </div>
        <cb-config-popup .config=${this.config}>
          <p>(from move)+(plus minutes)/(seconds each move) comma separated</p>
          <div class="[&>button]:mx-2 [&>div]:mx-2 mt-3">
            <cb-config-text label="Clock name" id="name"></cb-config-text>
            <cb-config-text label="Timings" id="time"></cb-config-text>
            <cb-config-button
              .onClick=${this.saveHandler}
              label=${this.config.isEdit() ? 'Save ' : 'Add ' + this.config.getTitleType()}
              icon=${this.config.isEdit() ? 'save' : 'add'}
            ></cb-config-button>
          </div>
        </cb-config-popup>
      </div>
    `;
  }
}
