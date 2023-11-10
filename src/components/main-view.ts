import { MobxLitElement } from '@adobe/lit-mobx';
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { DashboardService } from '../service/dashboard.service';
import { EditService } from '../service/edit.service';
import { playService, historyService, dashboardService } from '../service/index.service';
import { HistoryService } from '../service/history.service';
import { GridWidget } from './main-widgets';
import { PlayService } from '../service/play.service';
import { STYLES } from './css';

@customElement('cb-mainview')
export class MainView extends MobxLitElement {
  edit!: EditService;
  dashboard!: DashboardService;

  render() {
    if (this.edit.showEdit) {
      new MainEditView();
      return html`<cb-maineditview .edit=${this.edit} />`;
    }
    if (this.dashboard.showHist) {
      new MainHistoryView();
      return html`<cb-mainhistoryview .history=${historyService} />`;
    }
    new MainLogView();
    return html`<cb-mainlogview .play=${playService} .history=${historyService} />`;
  }
}

@customElement('cb-maineditview')
export class MainEditView extends MobxLitElement {
  render() {
    return html`<div>Edit</div>`;
  }
}

@customElement('cb-mainhistoryview')
export class MainHistoryView extends MobxLitElement {
  history!: HistoryService;
  render() {
    new GridWidget();
    const historyClick = (event: MouseEvent) => {
      event.preventDefault();
      const id = Number.parseInt(
        ((event.target as HTMLTableCellElement).parentNode as HTMLTableRowElement).id
      );
      this.history.setMarkHist(id == this.history.markHist ? -1 : id);
    };

    return html`
      ${STYLES}
      <cb-grid .onClickAction=${historyClick} .scroll=${this.history.markHist == -1}>
        ${this.history.getGames().map((row, iRow) => {
          const { time, win, c1, c2 } = row;
          const marker = iRow == this.history.markHist ? ' bg-green-300' : '';
          return html`<tr
            key=${iRow.toString()}
            id=${iRow.toString()}
            class="[&td]:p-[3px] [&td]:text-center [&td]:text-lg dark:text-white ${marker}"
          >
            <td>${time}</td>
            <td>${c1}</td>
            <td>${c2}</td>
            <td>${win}</td>
          </tr>`;
        })}
      </cb-grid>
    `;
  }
}

@customElement('cb-mainlogview')
export class MainLogView extends MobxLitElement {
  play!: PlayService;
  history!: HistoryService;
  render() {
    new GridWidget();
    this.history.enterLogCheck();

    const logClickAction = (event: MouseEvent) => {
      event.preventDefault();
      const id = Number.parseInt((event.target as HTMLTableCellElement).id);
      this.play.undoTo(id == dashboardService.markLog ? -1 : id);
    };

    return html`
      ${STYLES}
      <cb-grid .onClickAction=${logClickAction} .scroll=${dashboardService.markLog == -1}>
        ${this.history.getLogRows().map(
          (row, iRow) => html`
            <tr key="{iRow}" class="[&td]:p-[2px] [&td]:text-left [&td]:text-lg dark:text-white">
              <td class="w-5">
                <span class="text-red-900 text-sm dark:text-red-200">{iRow}</span>
              </td>
              ${row.map((col, iCol) => {
                const id = iRow * 2 + iCol;
                const marker = id == dashboardService.markLog ? ' bg-green-300' : '';
                return html`
                  <td
                    id=${id.toString()}
                    key=${id.toString()}
                    class="w-30 p-[2px] text-center text-lg dark:text-white ${marker}"
                  >
                    {col}
                  </td>
                `;
              })}
            </tr>
          `
        )}
      </cb-grid>
    `;
  }
}
