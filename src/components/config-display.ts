import { MobxLitElement } from '@adobe/lit-mobx';
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ConfigService } from '../service/config.service';
import { action } from 'mobx';
import { ConfigBoolean, ConfigButton } from './config-widgets';

@customElement('cb-config-display')
export class ConfigDisplay extends MobxLitElement {
  config!: ConfigService;
  render() {
    const props = this.config.boolprops;
    new ConfigBoolean();
    new ConfigButton();

    return html`
      <style>
        div {
          width: 800px;
          height: 400px;
          text-align: left;
          display: flex;
          flex-direction: column;
        }
      </style>
      <div>
        <cb-config-boolean
          .props=${props}
          id="darkTheme"
          label="Use dark theme"
        ></cb-config-boolean>
        <cb-config-boolean
          .props=${props}
          id="showFacts"
          label="Show openings information"
        ></cb-config-boolean>
        <cb-config-boolean
          .props=${props}
          id="showHints"
          label="Training mode / Stockfish suggestions"
        ></cb-config-boolean>
        <cb-config-boolean
          .props=${props}
          id="showCP"
          label="Show CP - CentiPawns estimate"
        ></cb-config-boolean>
        <cb-config-boolean
          .props=${props}
          id="playCorrect"
          label="Play giphy for correct moves"
        ></cb-config-boolean>
        <cb-config-boolean
          .props=${props}
          id="playMistake"
          label="Play giphy for big mistake"
        ></cb-config-boolean>
        <cb-config-boolean
          .props=${props}
          id="playWinner"
          label="Play giphy when game ends"
        ></cb-config-boolean>
        <cb-config-button
          .onClick=${action(this.config.rotateAction)}
          label="Rotate chessboard"
          icon="rotate_right"
        ></cb-config-button>
      </div>
    `;
  }
}
