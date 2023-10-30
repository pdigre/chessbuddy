import { MobxLitElement } from '@adobe/lit-mobx';
import { LitElement, html } from 'lit';
import {customElement} from 'lit/decorators.js';
import { DashboardService } from '../service/dashboard.service';
import { EditService } from '../service/edit.service';
import {
  playService,
  historyService,
} from '../service/index.service';



@customElement('cb-mainview')
export class MainView extends MobxLitElement {
  edit!: EditService;
  dashboard!: DashboardService;

  render() {
    if(this.edit.showEdit){
      new MainEditView();
      return html`<cb-maineditview .edit=${this.edit} />`;
    }
    if(this.dashboard.showHist){
      new MainHistoryView();
      return html`<cb-mainhistoryview .history=${historyService} />`;
    }
    new MainLogView();
    return html`<cb-mainlogview .play=${playService} .history=${historyService} />`;
  }
}

@customElement('cb-maineditview')
export class MainEditView extends LitElement {
   render() {
    return html`<div>Edit </div>`;
  }
}

@customElement('cb-mainhistoryview')
export class MainHistoryView extends LitElement {
   render() {
    return html`<div>History </div>`;
  }
}

@customElement('cb-mainlogview')
export class MainLogView extends LitElement {
   render() {
    return html`<div>Log </div>`;
  }
}


