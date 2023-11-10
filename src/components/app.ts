import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { Board } from './board.js';
import { MainButtonBar } from './main-button-bar.ts';
import {
  editService,
  renderingService,
  clockService,
  playService,
  analyzerService,
  messageService,
  mediaService,
  dashboardService,
  historyService,
  configService,
  refreshService,
  openingsService,
} from '../service/index.service.ts';
import packageInfo from '../../package.json';
import { MainView } from './main-view.ts';
import { MessageDialog } from './message-dialog.ts';
import { action } from 'mobx';
import { MdTextButton } from '@material/web/button/text-button';
import { ConfigDialog } from './config-dialog.ts';
import { STYLES } from './css.ts';
import { MobxLitElement } from '@adobe/lit-mobx';
import { MediaService } from '../service/media.service.ts';
import { Mp4Dialog } from './mp4dialog.ts';
import { PlayService } from '../service/play.service.ts';
import { AnalyzerService } from '../service/analyzer.service.ts';
import { ConfigService } from '../service/config.service.ts';
import { ClockService } from '../service/clock.service.ts';

@customElement('cb-ticker')
export class Ticker extends MobxLitElement {
  clock!: ClockService;
  render() {
    return html`<span>${this.clock.clockText}</span>`;
  }
}

@customElement('cb-playerinfobar')
export class PlayerInfoBar extends MobxLitElement {
  isTop!: boolean;
  play!: PlayService;
  render() {
    new Ticker();
    const { other, label, showTicker, banner, isTextRight } = this.play.getPlayerInfo(this.isTop);
    return html`
      <p class=${'h-[31px] text-xl dark:text-white m-0 p-1' + (isTextRight ? ' text-right' : '')}>
        ${label} &lt; ${showTicker ? html`<cb-ticker .clock=${clockService} />` : html`${other}`}
        &gt; ${banner}
      </p>
    `;
  }
}

@customElement('cb-feninfo')
export class FenInfo extends MobxLitElement {
  play!: PlayService;
  render() {
    return html`<p>${openingsService.sanTextLocate(this.play.log)}</p>`;
  }
}

@customElement('cb-cp')
export class CP extends MobxLitElement {
  analyzer!: AnalyzerService;
  config!: ConfigService;
  render() {
    const { txt, blackTop, h1, h2 } = this.analyzer.getCpInfo();
    const coloring = (black: boolean) => (black ? 'bg-black text-white' : 'bg-white text-black');
    return html`
      ${STYLES}
      <style>
        .main {
          width: 1.5rem;
        }
        .divs {
          writing-mode: vertical-lr;
          margin-right: 0.5rem;
        }
        .text-white {
          --tw-text-opacity: 1;
          color: rgb(255 255 255 / var(--tw-text-opacity));
        }
        .bg-white {
          --tw-bg-opacity: 1;
          background-color: rgb(255 255 255 / var(--tw-bg-opacity));
        }
        .text-black {
          --tw-text-opacity: 1;
          color: rgb(0 0 0 / var(--tw-text-opacity));
        }
        .bg-black {
          --tw-bg-opacity: 1;
          background-color: rgb(0 0 0 / var(--tw-bg-opacity));
        }
      </style>
      <div class="main h-full flex flex-col flex-grow">
        ${this.config.showCP
          ? html``
          : html`
              <div class="divs text-center ${coloring(!blackTop)}" style="height: ${h1}">
                ${txt}
              </div>
              <div class="divs text-center ${coloring(blackTop)}" style="height: ${h2}">${txt}</div>
            `}
      </div>
    `;
  }
}

@customElement('cb-app')
export class App extends LitElement {
  render() {
    new Board();
    new MainButtonBar();
    new MainView();
    new MessageDialog();
    new MdTextButton();
    new ConfigDialog();
    new Mp4Dialog();
    new CP();
    new PlayerInfoBar();

    const about = () => {
      messageService.display('About', 'This chess program is open source and available at github.');
    };
    return html`
      <style>
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
        .panel {
          height: 2rem;
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
      </style>
      ${STYLES}
      <div class="main flex m-0 p-0 flex-row">
        <cb-cp .analyzer=${analyzerService} .config=${configService}></cb-cp>
        <div class="down flex flex-col flex-grow">
          <cb-playerinfobar .isTop=${true} .play=${playService}></cb-playerinfobar>
          <cb-board
            class="board"
            .analyzer=${analyzerService}
            .edit=${editService}
            .rendering=${renderingService}
            .config=${configService}
            .refresh=${refreshService}
          ></cb-board>
          <cb-playerinfobar .isTop=${false} .play=${playService}></cb-playerinfobar>
        </div>
        <div class="flex flex-col w-full text-center">
          <h3 class="panel text-lg flex flex-row">
            <md-text-button @click=${action(about)} class="mx-5 text-xl">
              ChessBuddy ${packageInfo.version}
            </md-text-button>
            <div
              class="MdRefresh mx-5 text-lg"
              onClick="{action(mediaService.playAllAction)}"
            ></div>
          </h3>
          <cb-mainbuttonbar
            .edit=${editService}
            .dashboard=${dashboardService}
            .history=${historyService}
          ></cb-mainbuttonbar>
          <cb-feninfo .play=${playService}></div>
          <cb-mainview .dashboard=${dashboardService} .edit=${editService}></cb-mainview>
        </div>
        <cb-message-dialog .message=${messageService}></cb-message-dialog>
        <cb-dialog-mp4 .mp4=${mediaService}></cb-dialog-mp4>
      </div>
      <cb-config-dialog class="config" .config=${configService}></cb-config-dialog>
    `;
  }
}
