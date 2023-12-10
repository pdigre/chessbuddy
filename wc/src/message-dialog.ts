import { MobxLitElement } from '@adobe/lit-mobx';
import { PropertyValueMap, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { MdDialog } from '@material/web/dialog/dialog';
import { MessageService, messageType } from '../../common/service/message.service';
import { action } from 'mobx';
import { TW_CSS, MD_ICONS } from './css';
import { css, TemplateResult } from 'lit-element';
import { SVG_DRAW, SVG_KING } from './svg';
import { configService } from '../../common/service/index.service';

@customElement('cb-message-dialog')
export class MessageDialog extends MobxLitElement {
  @property({ attribute: false })
  public message!: MessageService;
  public title = '';
  public msg = '';
  public buttons: ButtonType[] = [];
  public clicked = '';

  static styles = [css``, TW_CSS];

  public render(): TemplateResult {
    const onClick = action((e: MouseEvent) => (this.clicked = (e.target as HTMLElement).className));
    return html`
      ${MD_ICONS}
      <md-dialog
        id="message-dialog"
        type="alert"
        aria-labelledby="message"
        .open=${this.message.show}
        class="text-center text-lg"
      >
        <div slot="headline">${this.title}</div>
        <form slot="content" id="form-id" method="dialog">${getMsg(this.msg)}</form>
        <div slot="actions">${this.buttons?.map(x => this.renderButton(x, onClick))}</div>
      </md-dialog>
    `;
  }
  private renderButton(x: ButtonType, onClick: (e: MouseEvent) => void) {
    switch (x.type ?? '') {
      case 'text':
        return html`${x.custom ?? ''}
          <md-text-button class="${x.name}" form="form-id" @click=${onClick}
            >${x.icon ? html`<span class="material-symbols-outlined">${x.icon ?? ''}</span>` : ''}
            ${x.html ?? ''}${x.label}</md-text-button
          >`;
      case 'tonal':
        return html`${x.custom ?? ''}
          <md-filled-tonal-button class="${x.name}" form="form-id" @click=${onClick}
            >${x.icon ? html`<span class="material-symbols-outlined">${x.icon ?? ''}</span>` : ''}
            ${x.html ?? ''}${x.label}</md-filled-tonal-button
          >`;
      case 'outlined':
        return html`${x.custom ?? ''}
          <md-outlined-button class="${x.name}" form="form-id" @click=${onClick}
            >${x.icon ? html`<span class="material-symbols-outlined">${x.icon ?? ''}</span>` : ''}
            ${x.html ?? ''}${x.label}</md-outlined-button
          >`;
      default:
        return html`${x.custom ?? ''}
          <md-filled-button class="${x.name}" form="form-id" @click=${onClick}
            >${x.icon ? html`<span class="material-symbols-outlined">${x.icon ?? ''}</span>` : ''}
            ${x.html ?? ''}${x.label}</md-filled-button
          >`;
    }
  }
  protected updated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    const dialog = this.shadowRoot!.getElementById('message-dialog') as MdDialog;
    const func = (msg: messageType) => {
      this.title = msg.title;
      this.msg = msg.msg;
      this.buttons = getButtons(msg.name);
      const THIS = this;
      dialog.show();
      dialog.requestUpdate();
      dialog.addEventListener('closed', function listener() {
        dialog.removeEventListener('closed', listener);
        if (msg.callback) {
          msg.callback(THIS.clicked);
        }
      });
    };

    this.message.initialize(func);
  }
}

function getButtons(name: string): ButtonType[] {
  switch (name) {
    case 'about':
    case 'load':
      return [{ name: 'ok', label: 'Ok' }];
    case 'undo':
    case 'revert':
      return [
        { name: 'y', label: 'Yes', icon: 'check' },
        { name: 'n', label: 'No', icon: 'cancel', type: 'tonal' },
      ];
    case 'promotion':
      return [
        { name: 'q', label: 'Queen', icon: 'FaChessQueen' },
        { name: 'r', label: 'Rook', icon: 'FaChessRook' },
        { name: 'n', label: 'Knight', icon: 'FaChessKnight' },
        { name: 'b', label: 'Bishop', icon: 'FaChessBishop' },
      ];
    case 'end':
      const white = configService.white.split(' ')[0];
      const black = configService.black.split(' ')[0];
      return [
        {
          name: 'w',
          label: white,
          html: SVG_KING,
          custom: html`<style>
            .w svg {
              color: white;
            }
          </style>`,
        },
        { name: 'draw', label: 'Draw', html: SVG_DRAW },
        {
          name: 'b',
          label: black,
          html: SVG_KING,
          custom: html`<style>
            .b svg {
              color: black;
            }
          </style>`,
        },
      ];
    default:
      return [];
  }
}

type ButtonType = {
  name: string;
  label: string;
  icon?: string;
  html?: TemplateResult;
  custom?: TemplateResult;
  type?: string;
};

function getMsg(name: string) {
  switch (name) {
    case 'about':
      return html` <div>
        This chess program is open source and available at github.
        <ul>
          <li>
            <a href="https://github.com/pdigre/chessbuddy" target="_blank" rel="noopener">
              Github pdigre/chessbuddy
            </a>
          </li>
          <li>
            <a
              href="https://github.com/pdigre/chessbuddy/wiki/User-guide"
              target="_blank"
              rel="noopener"
            >
              User Guide / instructions
            </a>
          </li>
        </ul>
      </div>`;
    case 'end':
      return html` <div className="text-3xl">
        Who won?
        <img src="/png/win.png" />
      </div>`;
    default:
      return html`${name}`;
  }
}
