import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
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
} from '../../common/service/index.service.ts';
import { TW_CSS, MD_ICONS } from './css.ts';
import { css } from 'lit-element';
import { wcInit } from './wc-init.ts';

@customElement('cb-app')
export class App extends LitElement {
  static {
    wcInit();
  }
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
        border-width: 0;
        background-color: var(--background-color);
        opacity: 1;
      }
      .header {
        height: 32px;
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
      .link {
        color: var(--link-color);
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
    const size = renderingService.getSize();
    const style = css`
      width: ${size.width}px;
      height: ${size.height}px;
    `;
    return html`
      ${MD_ICONS}
      <div class="main flex m-0 p-0 flex-row" style=${style}>
        <cb-cp .analyzer=${analyzerService} .rendering=${renderingService}></cb-cp>
        <div class="down flex flex-col flex-grow">
          <cb-playerinfobar class="m-0 p-0" .isTop=${true} .play=${playService}></cb-playerinfobar>
          <cb-board
            class="m-0 p-0"
            .edit=${editService}
            .rendering=${renderingService}
            .config=${configService}></cb-board>
          <cb-playerinfobar class="m-0 p-0" .isTop=${false} .play=${playService}></cb-playerinfobar>
        </div>
        <div class="flex flex-col w-full text-center">
          <h3 class="header text-lg flex flex-row m-0 p-0">
            <md-text-button @click=${messageService.aboutAction} class="text-xl">
              <span class="link">ChessBuddy ${messageService.getVersion()}</span>
            </md-text-button>
            <md-text-button @click=${mediaService.playAllAction}>
              <span class="link material-symbols-outlined">refresh</span>
            </md-text-button>
            <a class="link" href="index.html">wc</a>
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
        <cb-config-display slot="1"></cb-config-display>
        <cb-config-human slot="2" .config=${configService}></cb-config-human>
        <cb-config-bot slot="3" .config=${configService}></cb-config-bot>
        <cb-config-clock slot="4" .config=${configService}></cb-config-clock>
        <cb-config-bluetooth slot="5" .config=${configService}></cb-config-bluetooth>
      </cb-config-dialog>
    `;
  }
}
