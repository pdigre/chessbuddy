import { MobxLitElement } from '@adobe/lit-mobx';
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { DashboardService } from '../../common/service/dashboard.service';
import { EditService } from '../../common/service/edit.service';
import { HistoryService } from '../../common/service/history.service';
import { configService, playService } from '../../common/service/index.service';
import { TW_CSS, MD_ICONS } from './css';
import { css } from 'lit-element';

@customElement('cb-panel')
export class Panel extends MobxLitElement {
  edit!: EditService;
  dashboard!: DashboardService;
  history!: HistoryService;

  static styles = [
    css`
      .hidden {
        display: none;
      }
      md\-primary-tab {
        --menu-color: color-mix(in oklch, transparent, var(--menu-fg-color) 95%);
        --_container-color: color-mix(in oklch, transparent, var(--menu-bg-color) 80%);
        --_label-text-color: var(--menu-color);
        --_active-label-text-color: var(--menu-color);
        --_active-hover-label-text-color: var(--menu-color);
        --_hover-label-text-color: var(--menu-color);
      }
    `,
    TW_CSS,
  ];

  render() {
    const isGotoHist = this.dashboard.showHist && this.history.markHist >= 0;
    const isHistUndo = !this.dashboard.showHist && this.dashboard.markLog >= 0;
    const isPlayUndo = playService.isPlaying && this.dashboard.showUndo;
    const button1 =
      isHistUndo || isPlayUndo ? 'undo' : playService.isPlaying ? 'play_arrow' : 'pause';
    const button2 = isGotoHist
      ? this.edit.showEdit
        ? 'input'
        : 'edit'
      : this.dashboard.showHist
        ? 'folder_open'
        : 'history';

    const page = this.edit.showEdit ? 'edit' : this.dashboard.showHist ? 'hist' : 'log';
    const show = (name: string) => (page == name ? '' : 'hidden');
    return html`
      ${MD_ICONS}
      <md-tabs color="primary" aria-label="outlined primary button group" class="w-full">
        <md-primary-tab @click=${playService.playButtonAction}>
          <span class="text-3xl material-symbols-outlined">${button1}</span>
        </md-primary-tab>
        <md-primary-tab @click=${this.dashboard.toggleHistoryAction}>
          <span class="text-3xl material-symbols-outlined">${button2}</span>
        </md-primary-tab>
        <md-primary-tab @click=${configService.openConfigAction}>
          <span class="text-3xl material-symbols-outlined">settings</span>
        </md-primary-tab>
      </md-tabs>
      <div><slot name="top"></slot></div>
      <div class=${show('log')}><slot name="log"></slot></div>
      <div class=${show('hist')}><slot name="hist"></slot></div>
      <div class=${show('edit')}><slot name="edit"></slot></div>
    `;
  }
}
