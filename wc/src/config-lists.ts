import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { configService } from '../../common/service/index.service';
import { ListMode, ListType } from '../../common/service/config.service';
import { property } from 'lit-element/decorators.js';
import { MD_ICONS, TW_CSS } from './css';
import { css, LitElement } from 'lit-element';
import { ListItem } from '../../common/model/model.ts';

export const LIST_CSS = css`
  cb\-config\-list,
  cb\-config\-button {
    // mx-1
    margin-left: 0.25rem;
    margin-right: 0.25rem;
  }
`;

@customElement('cb-config-list')
export class ConfigList extends LitElement {
  @property({
    hasChanged(_newVal: ListItem[], _oldVal: ListItem[]) {
      return true;
    },
  })
  items!: ListItem[];
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
      table {
        background-color: var(--background-color);
        color: var(--text-color);
        border: 1px solid;
      }
      .mark {
        --tw-bg-opacity: 1;
        background-color: rgb(134 239 172 / var(--tw-bg-opacity));
      }
    `,
    TW_CSS,
  ];

  render() {
    return html`
      <table class="w-full m-1 text-left text-xl border-separate p-2" @click=${this.selectHandler}>
        <tbody>
          ${this.items.map(
            (item, iLine) => html`
              <tr id=${iLine.toString()} class="${iLine == this.cursor ? 'mark' : ''}">
                <td>${item.getName()}</td>
                <td>${item.getDescription()}</td>
              </tr>
            `
          )}
        </tbody>
      </table>
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
    const listProps = configService.ListTypes.get(this.type);
    const typeName = listProps?.title;
    const isEdit = configService.isEdit();
    const label = (isEdit ? 'Save ' : 'Add ') + typeName;
    const icon = isEdit ? 'save' : 'add';
    const title = (isEdit ? 'Edit ' : 'Add ') + typeName;
    const onClose = () => configService.setListModeAction(ListMode.None);
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
