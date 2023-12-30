import { MobxLitElement } from '@adobe/lit-mobx';
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { GameEntry, HistoryService } from '../../common/service/history.service';
import { action } from 'mobx';
import { css } from 'lit-element';
import { TW_CSS } from './css.ts';

@customElement('cb-panel-hist')
export class PanelHist extends MobxLitElement {
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
    e.preventDefault();
    let target = e.target as HTMLElement;
    if (target.nodeName == 'TD') {
      const id = +(target.parentNode as HTMLElement).id;
      this.history.setMarkHist(id == this.history.markHist ? -1 : id);
      this.requestUpdate();
    }
  });

  static styles = [
    css`
      md-outlined-select {
        min-width: 200px;
      }
      .mark {
        --tw-bg-opacity: 1;
        background-color: rgb(134 239 172 / var(--tw-bg-opacity));
      }
      td {
        padding: 3px;
      }
      .table {
        border: 2px solid #ccc;
        width: 100%;
        background-color: var(--background-color);
        color: var(--text-color);
      }
    `,
    TW_CSS,
  ];

  render() {
    const rows = this.history.getGames();
    const mark = this.history.markHist;
    return html`
      <div class="m-0 p-0 w-full overflow-auto" ref="{scrollRef}">
        <table
          class="table m-0 table-fixed w-full"
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
  renderRows(rows: GameEntry[], mark: number) {
    return rows.map((row, iRow) => {
      const { time, win, c1, c2 } = row;
      return html`<tr id=${iRow.toString()} class="${iRow == mark ? ' mark' : ''}">
        <td class="text-center text-lg">${time}</td>
        <td>${c1}</td>
        <td>${c2}</td>
        <td>${win}</td>
      </tr>`;
    });
  }
}
