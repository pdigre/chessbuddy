import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { Board } from './board.js';
import {
  editService,
  renderingService,
  playService,
  analyzerService,
  messageService,
  mediaService,
  dashboardService,
  historyService,
  configService,
  refreshService,
  connectService,
} from '../../common/service/index.service.ts';
import packageInfo from '../package.json';
import { MessageDialog } from './message-dialog.ts';
import { action } from 'mobx';
import { MdTextButton } from '@material/web/button/text-button';
import { ConfigDialog } from './config-dialog.ts';
import { TW_CSS, MD_ICONS } from './css.ts';
import { Mp4Dialog } from './mp4dialog.ts';
import { ConfigBluetooth } from './config-bluetooth.ts';
import { ConfigBot } from './config-bot.ts';
import { ConfigClock } from './config-clock.ts';
import { ConfigDisplay } from './config-display.ts';
import { ConfigGame } from './config-game.ts';
import { ConfigHuman } from './config-human.ts';
import { Panel } from './panel.ts';
import { PanelLog } from './panel-log.ts';
import { PanelHist } from './panel-hist.ts';
import { PanelEdit } from './panel-edit.ts';
import { CP } from './cp.ts';
import { FenInfo, PlayerInfoBar } from './app-play.ts';
import { css } from 'lit-element';

@customElement('cb-app')
export class App extends LitElement {
  static styles = [
    css`
      :root {
        --md-outlined-button-container-shape: 0px;
        --md-outlined-button-label-text-font: system-ui;
        --md-sys-color-primary: #1d3f3f;
        --md-sys-color-outline: #502121;
      }
      .main {
        width: 1024px;
        height: 748px;
        --tw-bg-opacity: 1;
        background-color: rgb(220 252 231 / var(--tw-bg-opacity));
        :is(.dark .dark:bg-green-900) {
          --tw-bg-opacity: 1;
          background-color: rgb(20 83 45 / var(--tw-bg-opacity));
        }
        border-width: 0px;
      }
      .header {
        height: 32px;
        :is(.dark .dark:text-white) {
          --tw-text-opacity: 1;
          color: rgb(255 255 255 / var(--tw-text-opacity));
        }
      }
      .config {
        width: 900px;
        height: 600px;
      }
      .down {
        display: flex;
        flex-grow: 1;
        flex-direction: column;
      }
      cb\-cp {
        width: 24px;
      }
      cb\-board {
      }
      md\-text\-button {
        height: 32px;
        margin: 0;
        padding: 0;
      }
    `,
    TW_CSS,
  ];

  render() {
    new Board();

    new Panel();
    new PanelLog();
    new PanelHist();
    new PanelEdit();
    new MessageDialog();
    new MdTextButton();
    new ConfigDialog();
    new Mp4Dialog();
    new CP();
    new PlayerInfoBar();
    new FenInfo();
    new ConfigGame();
    new ConfigDisplay();
    new ConfigHuman();
    new ConfigBot();
    new ConfigClock();
    new ConfigBluetooth();

    return html`
      ${MD_ICONS}
      <div class="main flex m-0 p-0 flex-row">
        <cb-cp .analyzer=${analyzerService} .config=${configService}></cb-cp>
        <div class="down flex flex-col flex-grow">
          <cb-playerinfobar class="m-0 p-0" .isTop=${true} .play=${playService}></cb-playerinfobar>
          <cb-board
            class="m-0 p-0"
            .analyzer=${analyzerService}
            .edit=${editService}
            .rendering=${renderingService}
            .config=${configService}
            .refresh=${refreshService}
          ></cb-board>
          <cb-playerinfobar class="m-0 p-0" .isTop=${false} .play=${playService}></cb-playerinfobar>
        </div>
        <div class="flex flex-col w-full text-center">
          <h3 class="header text-lg flex flex-row m-0 p-0">
            <md-text-button
              @click=${action(() => messageService.standard('about'))}
              class="text-xl"
            >
              ChessBuddy ${packageInfo.version}
            </md-text-button>
            <md-text-button @click=${action(mediaService.playAllAction)}>
              <span class="material-symbols-outlined">refresh</span>
            </md-text-button>
          </h3>
          <cb-panel .edit=${editService} .dashboard=${dashboardService} .history=${historyService}>
            <cb-feninfo slot="top" .play=${playService}></cb-feninfo>
            <cb-panel-log slot="log" .play=${playService} .history=${historyService}>
            </cb-panel-log>
            <cb-panel-hist slot="hist" .history=${historyService}> </cb-panel-hist>
            <cb-panel-edit slot="edit" .edit=${editService}> </cb-panel-edit>
          </cb-panel>
        </div>
        <cb-message-dialog .message=${messageService}></cb-message-dialog>
        <cb-dialog-mp4 .mp4=${mediaService}></cb-dialog-mp4>
      </div>
      <cb-config-dialog class="config" .config=${configService}>
        <cb-config-game slot="0" .config=${configService}></cb-config-game>
        <cb-config-display
          slot="1"
          .config=${configService}
          .rendering=${renderingService}
        ></cb-config-display>
        <cb-config-human
          slot="2"
          .config=${configService}
          .connect=${connectService}
        ></cb-config-human>
        <cb-config-bot slot="3" .config=${configService}></cb-config-bot>
        <cb-config-clock slot="4" .config=${configService}></cb-config-clock>
        <cb-config-bluetooth slot="5" .config=${configService}></cb-config-bluetooth>
      </cb-config-dialog>
    `;
  }
}
