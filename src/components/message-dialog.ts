import { MobxLitElement } from '@adobe/lit-mobx';
import { PropertyValueMap, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { MdDialog } from '@material/web/dialog/dialog';
import { MdTextButton } from '@material/web/button/text-button';
import { MessageService, messageType } from '../service/message.service';
import { action } from 'mobx';
import { STYLES } from './css';
import { TemplateResult } from 'lit-element';
import { SVG_DRAW, SVG_KING } from './svg';
import { configService } from '../service/index.service';

@customElement('cb-message-dialog')
export class MessageDialog extends MobxLitElement {
  @property({ attribute: false })
  public message!: MessageService;
  public title = '';
  public msg = '';
  public buttons: ButtonType[] = [];
  public clicked = '';

  public render(): TemplateResult {
    new MdDialog();
    new MdTextButton();

    return html`
      ${STYLES}
      <md-dialog
        id="message-dialog"
        type="alert"
        aria-labelledby="message"
        .open=${this.message.show}
        class="text-center text-lg"
      >
        <div slot="headline">${this.title}</div>
        <form slot="content" id="form-id" method="dialog">${getMsg(this.msg)}</form>
        <div slot="actions">${this.buttons?.map(x => this.renderButton(x))}</div>
      </md-dialog>
    `;
  }
  private renderButton(x: ButtonType) {
    return html`<md-text-button
      class="${x.name}"
      form="form-id"
      @click=${action(e => {
        this.clicked = e.target.className;
      })}
      >${x.icon ? html`<span class="material-symbols-outlined">${x.icon ?? ''}</span>` : ''}
      ${x.html ?? ''}${x.label}</md-text-button
    >`;
  }
  protected updated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    const dialog = this.shadowRoot!.getElementById('message-dialog') as MdDialog;
    const func = async (msg: messageType) => {
      this.title = msg.title;
      this.msg = msg.msg;
      this.buttons = getButtons(msg.name);
      const THIS = this;
      await dialog.show();
      dialog.requestUpdate();
      return new Promise<string>(function (resolve) {
        dialog.addEventListener('closed', function listener() {
          dialog.removeEventListener('closed', listener);
          resolve(THIS.clicked);
        });
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
        { name: 'n', label: 'No', icon: 'cancel' },
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
