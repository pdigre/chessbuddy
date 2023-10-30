import { LitElement, html } from 'lit';
import {customElement} from 'lit/decorators.js';
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

@customElement('cb-app')
export class App extends LitElement {
   render() {
    new Board();
    new MainButtonBar();
    new MainView();
    new MessageDialog();
    new MdTextButton();
    new ConfigDialog();

    const about = () => {
      console.log('about')
      messageService.display('About', 'This chess program is open source and available at github.');
    };
    return html`
    <style> 
    .main {
      width: 1024px;
      height: 748px;
      --tw-bg-opacity: 1;
      background-color: rgb(220 252 231 / var(--tw-bg-opacity));
      :is(.dark .dark\:bg-green-900) {
        --tw-bg-opacity: 1;
        background-color: rgb(20 83 45 / var(--tw-bg-opacity));
      }
      border-width: 0px;
      display: flex;
      flex-direction: row;
      margin: 0px;
      padding: 0px;
    }
    .board {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
    }
    .panel {
      display: flex;
      flex-direction: column;
      width: 100%;
      text-align: center;
    }
    .panel2 {
      display: flex;
      flex-direction: row;
      height: 2rem;
      font-size: 1.125rem;
      line-height: 1.75rem;
      :is(.dark .dark\:text-white) {
        --tw-text-opacity: 1;
        color: rgb(255 255 255 / var(--tw-text-opacity));
      }
    }
    .panel3 {
      margin-left: 1.25rem;
      margin-right: 1.25rem;
      font-size: 1.25rem;
      line-height: 1.75rem;
    }
    .panel4 {
      margin-left: 1.25rem;
      margin-right: 1.25rem;
      font-size: 1.125rem;
      line-height: 1.75rem;
    }
  </style>
    <div class="main">
      <div class="CP" analyzer={analyzerService} config={configService} ></div>
      <div class="board">
        <div class="PlayerInfoBar" isTop={true} play={playService} ></div>
        <cb-board
          analyzer={analyzerService}
          edit={editService}
          rendering={rendering}
          config={configService}
          refresh={refreshService}
          ></cb-board>
          <div class="PlayerInfoBar" isTop={false} play={playService} ></div>
      </div>
      <div class="panel">
        <h3 class="panel2">
          <md-text-button @click=${action(about)} class="panel3">
            ChessBuddy ${packageInfo.version}
          </md-text-button>
          <div class="MdRefresh panel4" onClick={action(mediaService.playAllAction)} ></div>
        </h3>
        <cb-mainbuttonbar
          .edit=${editService}
          .dashboard=${dashboardService}
          .history=${historyService}
          ></cb-mainbuttonbar>
        <div class="FenInfo" play={playService} ></div>
        <cb-mainview .dashboard=${dashboardService} .edit=${editService} ></cb-mainview>
      </div>
      <cb-message-dialog .message=${messageService} ></cb-message-dialog>
      <div class="Mp4Dialog" mp4=${mediaService} ></div>
      <cb-config-dialog .config=${configService} ></cb-config-dialog>
    `;
  }
}

