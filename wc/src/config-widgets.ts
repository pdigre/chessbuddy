import { MobxLitElement } from '@adobe/lit-mobx';
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { configService } from '../../common/service/index.service';
import {GETSET, Item, ListMode, ListType} from '../../common/service/config.service';
import { action } from 'mobx';
import { property } from 'lit-element/decorators.js';
import { MD_ICONS, TW_CSS } from './css';
import { css, LitElement } from 'lit-element';

@customElement('cb-config-select')
export class ConfigSelect extends LitElement {
  @property({ attribute: true })
  label!: string;
  @property({ attribute: true })
  id!: string;
  choices!: string[];
  props?: Map<string, GETSET<string>>;

  static styles = [
    css`
      md\-outlined-select {
        min-width: 200px;
        margin: 8px 2px 2px 2px;
      }
    `,
    TW_CSS,
  ];

  render() {
    console.log('choices=' + this.choices);
    const prop = (this.props ? this.props : configService.getItem().properties).get(this.id);
    const value = prop?.get();
    const onSelect = action(
      (event: MouseEvent) => prop?.set((event.target as HTMLInputElement).value)
    );

    return html`
      <md-outlined-select label=${this.label}>
        <md-select-option></md-select-option>
        ${this.choices.map(
          name =>
            html` <md-select-option
              .selected=${name === value}
              value=${name}
              @request-selection=${onSelect}
            >
              <div slot="headline">${name}</div>
            </md-select-option>`
        )}
      </md-outlined-select>
    `;
  }
}

@customElement('cb-table-list')
export class TableList extends LitElement {
  @property({
    hasChanged(newVal: Item[], oldVal: Item[]) {
      return JSON.stringify(newVal) !== JSON.stringify(oldVal);
    },
  })
  items!: Item[];
  onSelect!: (id: string) => void;
  @property({ type: Number })
  cursor!: number;

  selectHandler = (event: Event) => {
    const target = event.target as HTMLElement;
    if (target.nodeName === 'TD') {
      this.onSelect((target.parentNode as HTMLElement).id);
    }
  };

  static styles = [
    css`
      .mark {
        --tw-bg-opacity: 1;
        background-color: rgb(134 239 172 / var(--tw-bg-opacity));
      }
    `,
    TW_CSS,
  ];

  render() {
    return html`
      <table
        class="m-1 text-left text-xl dark:bg-slate-800 border-2 border-separate p-2"
        @click=${this.selectHandler}
      >
        <tbody>
          ${this.items.map(
            (item, iLine) => html`
              <tr id=${iLine.toString()} class="${iLine == this.cursor ? 'mark' : ''}">
                <td class="dark:text-white">${item.getName()}</td>
                <td class="dark:text-white">${item.getDescription()}</td>
              </tr>
            `
          )}
        </tbody>
      </table>
    `;
  }
}

@customElement('cb-config-button')
export class ConfigButton extends LitElement {
  onClick!: (event: Event) => void;
  @property({ attribute: true })
  label!: string;
  @property({ attribute: true })
  icon?: string;
  @property({ attribute: true })
  disabled?: boolean;

  static styles = [
    css`
      md\-outlined-button {
        height: 60px;
        margin: 2px;
        --md-outlined-button-container-shape: 20px;
        --md-outlined-button-label-text-font: system-ui;
        --md-sys-color-primary: #3d1818;
        --md-sys-color-outline: #245541;
      }

      .icon {
        vertical-align: text-bottom;
        line-height: 48px;
        margin: 0;
        padding: 0;
      }

      .label {
        vertical-align: top;
        line-height: 48px;
        margin: 0;
        padding: 0;
      }
    `,
    TW_CSS,
  ];

  render() {
    return html`
      ${MD_ICONS}
      <md-outlined-button
        class="flex-grow text-lg"
        @click=${this.onClick}
        .disabled=${this.disabled ?? false}
      >
        <span class="icon material-symbols-outlined">${this.icon}</span>
        <span class="label">${this.label}</span>
      </md-outlined-button>
    `;
  }
}

@customElement('cb-config-boolean')
export class ConfigBoolean extends MobxLitElement {
  props!: Map<string, GETSET<string>>;
  @property({ attribute: true })
  label!: string;
  @property({ attribute: true })
  id!: string;

  static styles = [
    css`
      label {
        font-size: 20px;
        line-height: 34px;
        margin: 2px 0 0 0;
        vertical-align: text-bottom;
      }
    `,
    TW_CSS,
  ];

  render() {
    const prop = this.props.get(this.id);
    let checked = prop?.get();
    const onChange = action(
      (e: Event) => prop?.set(String((e.target as HTMLInputElement).checked))
    );
    return html`
      <label>
        <md-checkbox touch-target="wrapper" .checked=${!!checked} @change=${onChange}></md-checkbox>
        ${this.label}
      </label>
    `;
  }
}

@customElement('cb-config-popup')
export class ConfigPopup extends LitElement {
  type!: ListType;
  @property({ attribute: true })
  show!: boolean;
  @property({ attribute: true })
  onSave!: () => void;

  static styles = [css``, TW_CSS];
  render() {
    if (!this.show) {
      return html``;
    }
    const typeName = configService.getTitleByType(this.type);
    const isEdit = configService.isEdit();
    const label = (isEdit ? 'Save ' : 'Add ') + typeName;
    const icon = isEdit ? 'save' : 'add';
    const title = (isEdit ? 'Edit ' : 'Add ') + typeName;
    const onClose = action(() => {
      configService.setListMode(ListMode.None);
    });
    return html`
      ${MD_ICONS}
      <md-dialog aria-labelledby="message" @close=${onClose} class="text-center text-lg" open>
        <div slot="headline">${title}</div>
        <form slot="content" id="form-id" method="dialog">
          <slot></slot>
          <cb-config-button .onClick=${this.onSave} label=${label} icon=${icon}></cb-config-button>
        </form>
      </md-dialog>
    `;
  }
}

@customElement('cb-config-text')
export class ConfigText extends LitElement {
  @property({
    hasChanged(newVal: Item, oldVal: Item) {
      return JSON.stringify(newVal) !== JSON.stringify(oldVal);
    },
  })
  item!: Item;
  label!: string;
  id!: string;
  render() {
    const prop = this.item?.properties?.get(this.id);
    if (!prop || !('get' in prop)) {
      return html``;
    }
    const value = prop?.get();
    const onChange = action((e: MouseEvent) => {
      // @ts-ignore
      prop?.set(e.target.value);
    });
    return html`
      <md-outlined-text-field
        label=${this.label}
        name=${this.id}
        @change=${onChange}
        value=${value}
      ></md-outlined-text-field>
    `;
  }
}
