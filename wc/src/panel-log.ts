import { MobxLitElement } from '@adobe/lit-mobx';
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { dashboardService } from '../../common/service/index.service';
import { HistoryService } from '../../common/service/history.service';
import { GridWidget } from './main-widgets';
import { PlayService } from '../../common/service/play.service';
import { STYLES } from './css';

@customElement('cb-panel-log')
export class PanelLog extends MobxLitElement {
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
