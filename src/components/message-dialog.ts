import { MobxLitElement } from '@adobe/lit-mobx';
import { html } from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {MdDialog} from '@material/web/dialog/dialog';
import {MdTextButton} from '@material/web/button/text-button';
import { MessageService } from '../service/message.service';
import { action } from 'mobx';



@customElement('cb-message-dialog')
export class MessageDialog extends MobxLitElement {
  @property({ attribute: false })
  public message!: MessageService;

  render() {
    if(!this.message.title){
      return '';
    }

    const buttons = this.message.buttons?.map(x => {
      var txt = x.label;
      if(x.icon){
        txt+=`<span class="material-symbols-outlined">${x.icon}</span>`;
      }
      return html`
          <md-text-button
              form="form-id"
              @click=${action((e: MouseEvent) =>
                  this.message.onClose((e.target as HTMLButtonElement).innerHTML)
              )}
          >${txt}</md-text-button>`;
      }).join();

      new MdDialog();
      new MdTextButton();
  
      return html`
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
      <style>
        @font-face {
          font-family: "Material Design Icons";
          src: url("https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined") format("woff");
        }
      </style>
      <md-dialog
      type="alert"
      aria-labelledby="message"
      open
      @close=${action((e: MouseEvent) => this.message.onClose((e.target as HTMLButtonElement).innerHTML))}
      className="text-center text-lg">
    <div slot="headline">${this.message.title}</div>
    <form slot="content" id="form-id" method="dialog">
      ${this.message.msg}
    </form>
    <div slot="actions">${buttons}</div>
  </md-dialog>
`;
  }
}

export type ButtonType = {
  label: string;
  icon?: string;
  onClick?: (event: MouseEvent) => void;
  disabled?: boolean;
};


export const OK_BUTTON: () => ButtonType[] = () => [{ label: 'Ok' }];
export const YESNO_BUTTONS: () => ButtonType[] = () => [
  { label: 'Yes', icon: 'check' },
  { label: 'No', icon: 'cancel' },
];
export const PROMOTE_BUTTONS: () => ButtonType[] = () => [
  { label: 'Queen', icon: 'FaChessQueen' },
  { label: 'Rook', icon: 'FaChessRook' },
  { label: 'Knight', icon: 'FaChessKnight' },
  { label: 'Bishop', icon: 'FaChessBishop' },
];

export const WINNER_BUTTONS: (black: string, white: string) => ButtonType[] = (black, white) => [
  { label: white, icon: 'FaChessKing' },
  { label: 'Draw', icon: 'FaRegHandshake' },
  { label: black, icon: 'FaChessKing'},
];

export const WINNER_HTML = html`
  <div className="text-3xl">
    Who won?
    <img src="/png/win.png" />
  </div>`;

export const ABOUT = html`
  <div>
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
          rel="noopener">
          User Guide / instructions
        </a>
      </li>
    </ul>
  </div>`;


