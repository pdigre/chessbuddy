import { MobxLitElement } from '@adobe/lit-mobx';
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { playService } from '../service/index.service';
import { action } from 'mobx';
import { ConfigButton, ConfigSelect } from './config-widgets';
import { ConfigService } from '../service/config.service';
import { STYLES } from './css';

@customElement('cb-config-game')
export class ConfigGame extends MobxLitElement {
  config!: ConfigService;

  render() {
    const players = [...this.config.humans, ...this.config.bots];
    console.log(players);
    const playerNames = Array.from(players.map(x => x.getName()));
    console.log(playerNames);
    new ConfigSelect();
    new ConfigButton();

    return html`${STYLES}
      <style>
        .main {
          width: 1000px;
          height: 400px;
        }
        .buttons {
          margin-left: 0.5rem;
          margin-right: 0.5rem;
        }
      </style>
      <div class="main text-left flex flex-col">
        <cb-config-select
          label="White"
          id="white"
          .choices=${playerNames}
          .props=${this.config.properties}
        ></cb-config-select>
        <cb-config-select
          label="Black"
          id="black"
          .choices=${playerNames}
          .props=${this.config.properties}
        ></cb-config-select>
        <cb-config-select
          class=""
          label="Timer setting"
          id="clock"
          .choices=${this.config.clocks.map(x => x.name)}
          .props=${this.config.properties}
        ></cb-config-select>
        <div>&nbsp;</div>
        <div class="buttons">
          <cb-config-button
            .onClick=${action(playService.startGameAction)}
            label="Play"
            icon="play_circle"
          ></cb-config-button>
          <cb-config-button
            .onClick=${action(playService.endGameAction)}
            label="End game"
            icon="exit_to_app"
            .disabled=${playService.isComplete}
          ></cb-config-button>
          <cb-config-button
            .onClick=${action(playService.resetGameAction)}
            label="Reset"
            icon="clear"
          ></cb-config-button>
          <cb-config-button
            .onClick=${action(playService.editGameAction)}
            label="Edit"
            icon="edit"
          ></cb-config-button>
        </div>
      </div> `;
  }
}
