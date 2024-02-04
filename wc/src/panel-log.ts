import { MobxLitElement } from '@adobe/lit-mobx';
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { dashboardService } from '../../common/service/index.service';
import { HistoryService } from '../../common/service/history.service';
import { PlayService } from '../../common/service/play.service';
import { action } from 'mobx';
import { css } from 'lit-element';
import { TW_CSS } from './css.ts';

@customElement('cb-panel-log')
export class PanelLog extends MobxLitElement {
  play!: PlayService;
  history!: HistoryService;

  fingerStart = 0;
  scrollStart = 0;
  scrollMove = 0;
  onTouchStartAction = (event: TouchEvent) => {
    this.fingerStart = event.touches[0].pageY;
    this.scrollStart = this.scrollMove;
    event.preventDefault();
  };
  onTouchMoveAction = (event: TouchEvent) => {
    const fingerMove = this.fingerStart - event.touches[0].pageY;
    this.scrollMove = this.scrollStart + fingerMove;
    //      scrollRef.current?.scroll({ top: scrollMove });
    event.preventDefault();
  };

  clickAction = action((e: MouseEvent) => {
    let target = e.target as HTMLElement;
    if (target.nodeName == 'TD') {
      const i = +target.id;
      dashboardService.setMarkLogAction(i);
      e.preventDefault();
      this.requestUpdate();
    }
  });

  static styles = [
    css`
      table {
        background-color: var(--background-color);
        color: var(--text-color);
      }
      .mark {
        background-color: rgb(134 239 172);
      }
      .td1 {
        width: 1.25rem;
        padding: 2px;
        span {
          color: rgb(127 29 29);
        }
      }
    `,
    TW_CSS,
  ];

  // dashboardService.markLog == -1
  render() {
    this.history.enterLogCheck();

    const logClickAction = (event: MouseEvent) => {
      event.preventDefault();
      const id = Number.parseInt((event.target as HTMLTableCellElement).id);
      this.play.undoTo(id == dashboardService.markLog ? -1 : id);
    };
    const rows = this.history.getLogRows();
    const mark = dashboardService.markLog;
    return html`
      <div class="m-0 p-0 w-full overflow-auto" ref="{scrollRef}">
        <table
          class="m-0 table-fixed w-full"
          @touch-start=${this.onTouchStartAction}
          @touch-move=${this.onTouchMoveAction}
          @click=${this.clickAction}
        >
          <tbody>
            ${this.renderRows(rows, mark)}
          </tbody>
        </table>
      </div>
    `;
  }
  renderRows(rows: string[][], mark: number) {
    return rows.map(
      (row, iRow) => html`
        <tr>
          <td class="td1 text-lg text-left">
            <span class="text-sm">${iRow}</span>
          </td>
          ${row.map((col, iCol) => {
            const id = iRow * 2 + iCol;
            return html`
              <td id=${id.toString()} class="td text-center text-lg ${id === mark ? 'mark' : ''}">
                ${col}
              </td>
            `;
          })}
        </tr>
      `
    );
  }
}
