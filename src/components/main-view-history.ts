import { MobxLitElement } from '@adobe/lit-mobx';
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { GameEntry, HistoryService } from '../service/history.service';
import { STYLES } from './css';
import { action } from 'mobx';

@customElement('cb-mainhistoryview')
export class MainHistoryView extends MobxLitElement {
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

  clickHandler = (e: MouseEvent) => {
    e.preventDefault();
    if (e.target.nodeName == 'TD') {
      const id = +e.target.parentNode.id;
      this.history.setMarkHist(id == this.history.markHist ? -1 : id);
      this.requestUpdate();
    }
  };

  render() {
    const rows = this.history.getGames();
    const mark = this.history.markHist;
    return html`
      ${STYLES}
      <style>
        md-outlined-select {
          min-width: 200px;
        }
        .mark {
          --tw-bg-opacity: 1;
          background-color: rgb(134 239 172 / var(--tw-bg-opacity));
        }
        .td {
          padding: 3px;
        }
      </style>
      <div class="m-0 p-0 w-full overflow-auto" ref="{scrollRef}">
        <table
          class="m-0 table-fixed w-full"
          @touch-start=${action(this.onTouchStartAction)}
          @touch-move=${action(this.onTouchMoveAction)}
          @click=${action(this.clickHandler)}
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
      return html`<tr id=${iRow.toString()} class="[&td]:p-[3px]  ${iRow == mark ? ' mark' : ''}">
        <td class="text-center text-lg">${time}</td>
        <td>${c1}</td>
        <td>${c2}</td>
        <td>${win}</td>
      </tr>`;
    });
  }
}
