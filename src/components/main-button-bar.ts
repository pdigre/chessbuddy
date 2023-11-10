import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { MdTabs } from '@material/web/tabs/tabs.js';
import { MdPrimaryTab } from '@material/web/tabs/primary-tab.js';
import { playService, configService } from '../service/index.service';
import { MobxLitElement } from '@adobe/lit-mobx';
import { action } from 'mobx';
import { HistoryService } from '../service/history.service';
import { DashboardService } from '../service/dashboard.service';
import { EditService } from '../service/edit.service';
import { STYLES } from './css';

@customElement('cb-mainbuttonbar')
export class MainButtonBar extends MobxLitElement {
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

    return html`
      ${STYLES}
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
    `;
  }
}
