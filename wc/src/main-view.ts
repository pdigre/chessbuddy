import { MobxLitElement } from '@adobe/lit-mobx';
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { DashboardService } from '../../common/service/dashboard.service';
import { EditService } from '../../common/service/edit.service';
import { playService, historyService } from '../../common/service/index.service';
import { MainLogView } from './main-view-log';
import { MainHistoryView } from './main-view-history';
import { MainEditView } from './main-view-edit';
import { STYLES } from './css';
import { autorun } from 'mobx';

@customElement('cb-mainview')
export class MainView extends MobxLitElement {
  edit!: EditService;
  dashboard!: DashboardService;

  render() {
    const i = this.edit.showEdit ? 2 : this.dashboard.showHist ? 1 : 0;
    let j = 0;
    const show = () => (i == j++ ? '' : 'hidden');
    return html`
      <style>
        .hidden {
          display: none;
        }
      </style>
      <div class=${show()}><slot name="0"></slot></div>
      <div class=${show()}><slot name="1"></slot></div>
      <div class=${show()}><slot name="2"></slot></div>
    `;
  }
}
