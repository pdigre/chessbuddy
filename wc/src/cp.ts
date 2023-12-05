import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { STYLES } from './css.ts';
import { MobxLitElement } from '@adobe/lit-mobx';
import { AnalyzerService } from '../../common/service/analyzer.service.ts';
import { ConfigService } from '../../common/service/config.service.ts';

@customElement('cb-cp')
export class CP extends MobxLitElement {
  analyzer!: AnalyzerService;
  config!: ConfigService;
  render() {
    const { txt, blackTop, h1, h2 } = this.analyzer.getCpInfo();
    const coloring = (black: boolean) => (black ? 'bg-black text-white' : 'bg-white text-black');
    return html`
      ${STYLES}
      <style>
        .main {
          width: 32px;
        }
        .divs {
          writing-mode: vertical-lr;
          margin-right: 0.5rem;
        }
        .text-white {
          --tw-text-opacity: 1;
          color: rgb(255 255 255 / var(--tw-text-opacity));
        }
        .bg-white {
          --tw-bg-opacity: 1;
          background-color: rgb(255 255 255 / var(--tw-bg-opacity));
        }
        .text-black {
          --tw-text-opacity: 1;
          color: rgb(0 0 0 / var(--tw-text-opacity));
        }
        .bg-black {
          --tw-bg-opacity: 1;
          background-color: rgb(0 0 0 / var(--tw-bg-opacity));
        }
      </style>
      <div class="main h-full flex flex-col flex-grow text-lg">
        ${this.config.showCP
          ? html``
          : html`
              <div class="divs text-center ${coloring(!blackTop)}" style="height: ${h1}">
                ${txt}
              </div>
              <div class="divs text-center ${coloring(blackTop)}" style="height: ${h2}">${txt}</div>
            `}
      </div>
    `;
  }
}
