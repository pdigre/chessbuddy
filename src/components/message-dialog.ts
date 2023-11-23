import { MobxLitElement } from '@adobe/lit-mobx';
import { PropertyValueMap, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { MdDialog } from '@material/web/dialog/dialog';
import { MdTextButton } from '@material/web/button/text-button';
import { MessageService } from '../service/message.service';
import { action } from 'mobx';
import { STYLES } from './css';
import { TemplateResult } from 'lit-element';

@customElement('cb-message-dialog')
export class MessageDialog extends MobxLitElement {
  @property({ attribute: false })
  public message!: MessageService;

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
        @close=${action((e: MouseEvent) =>
          this.message.onClose((e.target as HTMLButtonElement).innerHTML)
        )}
        class="text-center text-lg"
      >
        <div slot="headline">${this.message.title}</div>
        <form slot="content" id="form-id" method="dialog">${this.message.msg}</form>
        <div slot="actions">
          ${this.message.buttons?.map(
            x =>
              html`<md-text-button
                form="form-id"
                @click=${action(e =>
                  this.message.onClose((e.target as HTMLButtonElement).innerHTML)
                )}
                ><span class="material-symbols-outlined">${x.icon}</span>${x.label}</md-text-button
              >`
          )}
        </div>
      </md-dialog>
    `;
  }
  protected updated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    const dialog = this.shadowRoot!.getElementById('message-dialog') as MdDialog;
    const func = async () => {
      await dialog.show();
      return new Promise<string>(function (resolve) {
        dialog.addEventListener('closed', function animationendListener() {
          dialog.removeEventListener('closed', animationendListener);
          resolve('ok');
        });
      });
    };
    this.message.initialize(func);
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
  { label: black, icon: 'FaChessKing' },
];

export const WINNER_HTML = html` <div className="text-3xl">
  Who won?
  <img src="/png/win.png" />
</div>`;

export const ABOUT = html` <div>
  This chess program is open source and available at github.
  <ul>
    <li>
      <a href="https://github.com/pdigre/chessbuddy" target="_blank" rel="noopener">
        Github pdigre/chessbuddy
      </a>
    </li>
    <li>
      <a href="https://github.com/pdigre/chessbuddy/wiki/User-guide" target="_blank" rel="noopener">
        User Guide / instructions
      </a>
    </li>
  </ul>
</div>`;
function observer(target: MessageDialog, propertyKey: 'message'): void {
  throw new Error('Function not implemented.');
}
