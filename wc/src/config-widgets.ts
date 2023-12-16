import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { action } from 'mobx';
import { property } from 'lit-element/decorators.js';
import { MD_ICONS, TW_CSS } from './css';
import { css, LitElement } from 'lit-element';
import { Item } from '../../common/model/model.ts';

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

@customElement('cb-config-text')
export class ConfigText extends LitElement {
  @property({
    hasChanged(newVal: Item, oldVal: Item) {
      return JSON.stringify(newVal) !== JSON.stringify(oldVal);
    },
  })
  item!: Item;
  @property({ attribute: true })
  label!: string;
  @property({ attribute: true })
  id!: string;
  render() {
    const prop = this.item?.properties?.get(this.id);
    if (!prop) {
      return html``;
    }
    const [getter, setter] = prop;
    const value = getter();
    const onChange = action((e: MouseEvent) => {
      // @ts-ignore
      setter(e.target.value);
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

@customElement('cb-config-boolean')
export class ConfigBoolean extends LitElement {
  @property({
    hasChanged(newVal: Item, oldVal: Item) {
      return JSON.stringify(newVal) !== JSON.stringify(oldVal);
    },
  })
  item!: Item;
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
    const prop = this.item?.properties?.get(this.id);
    if (!prop) {
      return html``;
    }
    const [getter, setter] = prop;
    const checked = getter();
    const onChange = action((e: Event) => setter(String((e.target as HTMLInputElement).checked)));
    return html`
      <label>
        <md-checkbox touch-target="wrapper" .checked=${!!checked} @change=${onChange}></md-checkbox>
        ${this.label}
      </label>
    `;
  }
}

@customElement('cb-config-select')
export class ConfigSelect extends LitElement {
  @property({
    hasChanged(newVal: Item, oldVal: Item) {
      return JSON.stringify(newVal) !== JSON.stringify(oldVal);
    },
  })
  item!: Item;
  @property({ attribute: true })
  label!: string;
  id!: string;
  choices!: string[];

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
    const prop = this.item?.properties?.get(this.id);
    if (!prop) {
      return html``;
    }
    const [getter, setter] = prop;
    const value = getter();
    const onSelect = action((event: MouseEvent) =>
      setter((event.target as HTMLInputElement).value)
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
