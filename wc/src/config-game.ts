import { MobxLitElement } from '@adobe/lit-mobx';
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { playService } from '../../common/service/index.service';
import { ConfigService } from '../../common/service/config.service';
import { TW_CSS } from './css';
import { css } from 'lit-element';

@customElement('cb-config-game')
export class ConfigGame extends MobxLitElement {
  config!: ConfigService;

  static styles = [
    css`
      cb\-config\-button {
        margin: 0;
        padding: 0;
      }
    `,
    TW_CSS,
  ];

  render() {
    const players = [...this.config.humans, ...this.config.bots];
    console.log(players);
    const playerNames = Array.from(players.map(x => x.getName()));
    console.log(playerNames);
    const item = this.config.game;

    return html`
      <table class="w-full">
        <tr>
          <td>
            <cb-config-select
              label="White"
              id="white"
              .choices=${playerNames}
              .item=${item}
            ></cb-config-select>
          </td>
          <td>
            <cb-config-select
              label="Black"
              id="black"
              .choices=${playerNames}
              .item=${item}
            ></cb-config-select>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <cb-config-select
              class=""
              label="Timer setting"
              id="clock"
              .choices=${this.config.clocks.map(x => x.name)}
              .item=${item}
            ></cb-config-select>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <cb-config-button
              .onClick=${playService.startGameAction}
              label="Play"
              icon="play_circle"
              type="filled"
            ></cb-config-button>
            <cb-config-button
              .onClick=${playService.endGameAction}
              label="End game"
              icon="exit_to_app"
              .disabled=${playService.isComplete}
              type="tonal"
            ></cb-config-button>
            <cb-config-button
              .onClick=${playService.resetGameAction}
              label="Reset"
              icon="clear"
              type="tonal"
            ></cb-config-button>
            <cb-config-button
              .onClick=${playService.editGameAction}
              label="Edit"
              icon="edit"
            ></cb-config-button>
          </td>
        </tr>
      </table>
    `;
  }
}
