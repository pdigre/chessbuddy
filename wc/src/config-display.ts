import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { TW_CSS } from './css.ts';
import { css, LitElement } from 'lit-element';
import { configService, renderingService } from '../../common/service/index.service.ts';

@customElement('cb-config-display')
export class ConfigDisplay extends LitElement {
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
    const display = configService.display;
    const render = renderingService;
    return html`
      <form name="Display" method="dialog">
        <cb-config-boolean
          .item=${render}
          id="darkTheme"
          label="Use dark theme"
        ></cb-config-boolean>
        <cb-config-boolean
          .item=${display}
          id="showFacts"
          label="Show openings information"
        ></cb-config-boolean>
        <cb-config-boolean
          .item=${display}
          id="showHints"
          label="Training mode / Stockfish suggestions"
        ></cb-config-boolean>
        <cb-config-boolean
          .item=${display}
          id="showCP"
          label="Show CP - CentiPawns estimate"
        ></cb-config-boolean>
        <cb-config-boolean
          .item=${display}
          id="playCorrect"
          label="Play giphy for correct moves"
        ></cb-config-boolean>
        <cb-config-boolean
          .item=${display}
          id="playMistake"
          label="Play giphy for big mistake"
        ></cb-config-boolean>
        <cb-config-boolean
          .item=${display}
          id="playWinner"
          label="Play giphy when game ends"
        ></cb-config-boolean>
        <cb-config-button
          .onClick=${render.rotateAction}
          label="Rotate chessboard"
          icon="rotate_right"
        ></cb-config-button>
      </form>
    `;
  }
}
