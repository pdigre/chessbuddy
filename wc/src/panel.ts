import { MobxLitElement } from '@adobe/lit-mobx';
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { DashboardService } from '../../common/service/dashboard.service';
import { EditService } from '../../common/service/edit.service';
import { HistoryService } from '../../common/service/history.service';
import { MdPrimaryTab } from '@material/web/tabs/primary-tab';
import { MdTabs } from '@material/web/tabs/tabs';
import { configService, playService } from '../../common/service/index.service';
import { action } from 'mobx';
import { STYLES } from './css';

@customElement('cb-panel')
export class Panel extends MobxLitElement {
  edit!: EditService;
  dashboard!: DashboardService;
  history!: HistoryService;

  render() {
    new MdTabs();
    new MdPrimaryTab();
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
      ${STYLES}
      <style>
        .hidden {
          display: none;
        }
      </style>
      <md-tabs color="primary" aria-label="outlined primary button group" class="w-full">
        <md-primary-tab @click=${action(playService.playButtonAction)}>
          <span class="text-3xl material-symbols-outlined">${button1}</span>
        </md-primary-tab>
        <md-primary-tab @click=${action(this.dashboard.toggleHistoryAction)}>
          <span class="text-3xl material-symbols-outlined">${button2}</span>
        </md-primary-tab>
        <md-primary-tab @click=${action(configService.openConfigAction)}>
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
