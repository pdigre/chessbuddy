import { MobxLitElement } from '@adobe/lit-mobx';
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { HistoryService } from '../../common/service/history.service';
import { GridWidget } from './main-widgets';
import { STYLES } from './css';

@customElement('cb-panel-hist')
export class PanelHist extends MobxLitElement {
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
