import { MobxLitElement } from '@adobe/lit-mobx';
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { MdCheckbox } from '@material/web/checkbox/checkbox';
import { MdOutlinedButton } from '@material/web/button/outlined-button';
import { MdOutlinedSelect } from '@material/web/select/outlined-select';
import { MdSelectOption } from '@material/web/select/select-option';
import { MdOutlinedTextField } from '@material/web/textfield/outlined-text-field';
import { configService, renderingService } from '../../common/service/index.service';
import { ConfigProp, ConfigService, ListItem, ListMode } from '../../common/service/config.service';
import { action } from 'mobx';
import { property } from 'lit-element/decorators.js';
import { STYLES } from './css';
import { MdDialog } from '@material/web/dialog/dialog';
import { LitElement, TemplateResult } from 'lit-element';

@customElement('cb-config-select')
export class ConfigSelect extends LitElement {
  @property({ attribute: true })
  label!: string;
  @property({ attribute: true })
  id!: string;
  choices!: string[];
  props?: Map<string, ConfigProp<string>>;

  render() {
    new MdOutlinedSelect();
    new MdSelectOption();
    console.log('choices=' + this.choices);
    const prop = (this.props ? this.props : configService.getItem.properties).get(this.id);
    const value = prop?.get();
    const handler = (event: MouseEvent) => {
      prop?.set(event.target?.value);
    };
    return html`
      ${STYLES}
      <style>
        md-outlined-select {
          min-width: 200px;
        }
      </style>
      <label htmlFor="select"> ${this.label} </label>
      <md-outlined-select>
        <md-select-option></md-select-option>
        ${this.choices.map(
          name =>
            html` <md-select-option
              .selected=${name === value}
              value=${name}
              @request-selection=${action(handler)}
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
    hasChanged(newVal: ListItem[], oldVal: ListItem[]) {
      return JSON.stringify(newVal) !== JSON.stringify(oldVal);
    },
  })
  items!: ListItem[];
  onSelect!: (id: string) => void;
  @property({ type: Number })
  cursor!: number;

  selectHandler = (event: Event) => {
    if (event.target?.nodeName === 'TD') {
      this.onSelect(event.target?.parentNode.id);
    }
  };

  render() {
    return html`
      ${STYLES}
      <style>
        .mark {
          --tw-bg-opacity: 1;
          background-color: rgb(134 239 172 / var(--tw-bg-opacity));
        }
      </style>
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

@customElement('cb-config-list-buttons')
export class ConfigListButtons extends MobxLitElement {
  config!: ConfigService;

  render() {
    const hasSelect = this.config.cursor >= 0;
    return html`
      ${STYLES}
      <div className="[&>button]:mx-1">
        <cb-config-button
          .onClick=${action(() => (this.config.setListMode = ListMode.Add))}
          label="Add"
          icon="add"
        ></cb-config-button>
        <cb-config-button
          .onClick=${action(() => (this.config.setListMode = ListMode.Edit))}
          label="Edit"
          icon="edit"
          .disabled=${!hasSelect}
        ></cb-config-button>
        <cb-config-button
          .onClick=${action(this.config.deleteItemAction)}
          label="Delete"
          icon="delete"
          .disabled=${!hasSelect}
        ></cb-config-button>
        <slot></slot>
      </div>
    `;
  }
}

@customElement('cb-config-popup')
export class ConfigPopup extends MobxLitElement {
  config!: ConfigService;

  render() {
    if (this.config.listMode === ListMode.None) {
      return '';
    }
    new MdDialog();
    return html`
      ${STYLES}
      <md-dialog
        aria-labelledby="message"
        @close=${action(configService.closePopupAction)}
        class="text-center text-lg"
        .open=${true}
      >
        <div slot="headline">
          ${configService.isEdit ? 'Edit' : 'Add'} ${configService.getTitleType}
        </div>
        <
        <form slot="content" id="form-id" method="dialog">
          >
          <slot></slot>
        </form>
        <div slot="actions"></div>
      </md-dialog>
    `;
  }
}

@customElement('cb-config-button')
export class ConfigButton extends MobxLitElement {
  onClick!: (event: Event) => void;
  @property({ attribute: true })
  label!: string;
  @property({ attribute: true })
  icon?: string;
  disabled?: boolean;

  render() {
    new MdOutlinedButton();
    return html`
      ${STYLES}
      <style>
        md-outlined-button:root {
          --md-outlined-button-container-shape: 0px;
          --md-outlined-button-label-text-font: system-ui;
          --md-sys-color-primary: #3d1818;
          --md-sys-color-outline: #245541;
        }
        md-outlined-button {
          height: 3.5rem;
          margin: 0.5rem;
        }
      </style>
      <md-outlined-button
        class="flex-grow text-lg"
        @click=${action(this.onClick)}
        .disabled=${this.disabled ?? false}
      >
        <span class="text-3xl material-symbols-outlined">${this.icon}</span>
        <span class="text-lg ml-2">${this.label}</span>
      </md-outlined-button>
    `;
  }
}

@customElement('cb-config-boolean')
export class ConfigBoolean extends MobxLitElement {
  props!: Map<string, ConfigProp<string>>;
  @property({ attribute: true })
  label!: string;
  @property({ attribute: true })
  id!: string;

  render() {
    const prop = this.props.get(this.id);
    let checked = prop?.get();
    new MdCheckbox();
    const handler = (e: Event) => prop?.set(e.target!.checked);
    return html`
      <style>
        .text {
          font-size: 1.125rem;
          line-height: 1.75rem;
          margin-left: 0.5rem;
        }
      </style>
      <label>
        <md-checkbox
          touch-target="wrapper"
          .checked=${!!checked}
          @change=${action(handler)}
        ></md-checkbox>
        ${this.label}
      </label>
    `;
  }
}

@customElement('cb-config-save-button')
export class ConfigSaveButton extends MobxLitElement {
  render() {
    new ConfigButton();
    const handler = () => configService.saveItem(configService.getItem, configService.getItems);
    return html`
      <cb-config-button
        .onClick=${action(handler)}
        label=${configService.isEdit ? 'Save ' : 'Add ' + configService.getTitleType}
        icon=${configService.isEdit ? 'save' : 'add'}
      ></cb-config-button>
    `;
  }
}

@customElement('cb-config-text')
export class ConfigText extends MobxLitElement {
  disabled?: boolean;
  @property({ attribute: true })
  label!: string;
  @property({ attribute: true })
  id!: string;

  render() {
    new MdOutlinedTextField();
    const item = configService.getItem;
    return html`
      <md-outlined-text-field
        label=${this.label}
        size="medium"
        @change=${action(e => item?.properties.get(this.id)?.set(e.target.value))}
        value="${item?.properties.get(this.id)?.get()}"
      ></md-outlined-text-field>
    `;
  }
}
