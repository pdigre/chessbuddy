import { MobxLitElement } from '@adobe/lit-mobx';
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ConfigService } from '../../common/service/config.service';
import { TW_CSS } from './css.ts';
import { css } from 'lit-element';
import { renderingService } from '../../common/service/index.service.ts';

@customElement('cb-config-display')
export class ConfigDisplay extends MobxLitElement {
  config!: ConfigService;
  static styles = [
    css`
      form {
        width: 800px;
        height: 400px;
        text-align: left;
        display: flex;
        flex-direction: column;
      }
    `,
    TW_CSS,
  ];
  render() {
    const item = this.config.display;
    return html`
      <form name="Display" method="dialog">
        <cb-config-boolean
          .item=${renderingService}
          id="darkTheme"
          label="Use dark theme"
        ></cb-config-boolean>
        <cb-config-boolean
          .item=${item}
          id="showFacts"
          label="Show openings information"
        ></cb-config-boolean>
        <cb-config-boolean
          .item=${item}
          id="showHints"
          label="Training mode / Stockfish suggestions"
        ></cb-config-boolean>
        <cb-config-boolean
          .item=${item}
          id="showCP"
          label="Show CP - CentiPawns estimate"
        ></cb-config-boolean>
        <cb-config-boolean
          .item=${item}
          id="playCorrect"
          label="Play giphy for correct moves"
        ></cb-config-boolean>
        <cb-config-boolean
          .item=${item}
          id="playMistake"
          label="Play giphy for big mistake"
        ></cb-config-boolean>
        <cb-config-boolean
          .item=${item}
          id="playWinner"
          label="Play giphy when game ends"
        ></cb-config-boolean>
        <cb-config-button
          .onClick=${this.config.rotateAction}
          label="Rotate chessboard"
          icon="rotate_right"
        ></cb-config-button>
      </form>
    `;
  }
}
