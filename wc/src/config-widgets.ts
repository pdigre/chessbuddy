import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { property } from 'lit-element/decorators.js';
import { MD_ICONS, TW_CSS } from './css';
import { css, LitElement } from 'lit-element';
import { getProp, setProp } from '../../common/model/model.ts';
import { action } from 'mobx';

@customElement('cb-config-button')
export class ConfigButton extends LitElement {
  onClick!: (event: Event) => void;
  @property({ attribute: true })
  label!: string;
  @property({ attribute: true })
  icon?: string;
  @property({ attribute: true })
  disabled?: boolean;
  @property({ attribute: true })
  type?: string;

  static styles = [
    css`
      .button {
        height: 60px;
        margin: 2px;
        --md-outlined-button-container-shape: 20px;
        --md-outlined-button-label-text-font: system-ui;
        --md-filled-button-container-shape: 20px;
        --md-filled-button-label-text-font: system-ui;
        --md-filled-tonal-button-container-shape: 20px;
        --md-filled-tonal-button-label-text-font: system-ui;
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
    if (this.type == 'filled') {
      return html`
        ${MD_ICONS}
        <md-filled-button
          class="button flex-grow text-lg"
          @click=${this.onClick}
          .disabled=${this.disabled ?? false}>
          <span class="icon material-symbols-outlined">${this.icon}</span>
          <span class="label">${this.label}</span>
        </md-filled-button>
      `;
    }
    if (this.type == 'tonal') {
      return html`
        ${MD_ICONS}
        <md-filled-tonal-button
          class="button flex-grow text-lg"
          @click=${this.onClick}
          .disabled=${this.disabled ?? false}>
          <span class="icon material-symbols-outlined">${this.icon}</span>
          <span class="label">${this.label}</span>
        </md-filled-tonal-button>
      `;
    }
    return html`
      ${MD_ICONS}
      <md-outlined-button
        class="button flex-grow text-lg"
        @click=${this.onClick}
        .disabled=${this.disabled ?? false}>
        <span class="icon material-symbols-outlined">${this.icon}</span>
        <span class="label">${this.label}</span>
      </md-outlined-button>
    `;
  }
}

@customElement('cb-config-text')
export class ConfigText extends LitElement {
  @property({
    hasChanged(newVal: object, oldVal: object) {
      return JSON.stringify(newVal) !== JSON.stringify(oldVal);
    },
  })
  item!: object;
  @property({ attribute: true })
  label!: string;
  @property({ attribute: true })
  id!: string;
  render() {
    const value = getProp(this.item, this.id);
    const onChange = (e: MouseEvent) =>
      setProp(this.item, this.id, (e.target as HTMLInputElement).value);

    return html`
      <md-outlined-text-field
        label=${this.label}
        name=${this.id}
        @change=${onChange}
        value=${value}></md-outlined-text-field>
    `;
  }
}

@customElement('cb-config-boolean')
export class ConfigBoolean extends LitElement {
  @property({
    hasChanged(newVal: object, oldVal: object) {
      return JSON.stringify(newVal) !== JSON.stringify(oldVal);
    },
  })
  item!: object;
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
    const checked = getProp(this.item, this.id);
    const onChange = (e: Event) =>
      setProp(this.item, this.id, String((e.target as HTMLInputElement).checked));
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
    hasChanged(newVal: object, oldVal: object) {
      return JSON.stringify(newVal) !== JSON.stringify(oldVal);
    },
  })
  item!: object;
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
    const value = getProp(this.item, this.id);
    const onSelect = action((event: MouseEvent) => {
      setProp(this.item, this.id, (event.target as HTMLInputElement).value);
    });
    return html`
      <md-outlined-select label=${this.label}>
        <md-select-option></md-select-option>
        ${this.choices.map(
          name =>
            html` <md-select-option
              .selected=${name === value}
              value=${name}
              @request-selection=${onSelect}>
              <div slot="headline">${name}</div>
            </md-select-option>`
        )}
      </md-outlined-select>
    `;
  }
}
