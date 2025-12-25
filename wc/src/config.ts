import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { ConfigService } from '../../common/service/config.service';
import { TW_CSS, MD_ICONS } from './css';
import { css } from 'lit-element';

@customElement('cb-config')
export class Config extends MobxLitElement {
  config!: ConfigService;

  static styles = [
    css`
      .main {
        width: 1100px;
        height: 600px;
      }
      .hidden {
        display: none;
      }
    `,
    TW_CSS,
  ];

  render() {
    console.log('config ' + this.config.showConfig);
    if (!this.config.showConfig) {
      return '';
    }

    const choose = (index: number) => (event: MouseEvent) => {
      event.preventDefault();
      this.config.switchTabAction(index);
    };

    const tab = (num: number, icon: string, title: string) => {
      return html` ${MD_ICONS}
        <md-primary-tab
          class="text-3xl"
          @click=${choose(num)}
          .active=${num === this.config.showTab}>
          <span class="text-lg material-symbols-outlined">${icon}</span>${title}</md-primary-tab
        >`;
    };

    const i = this.config.showTab;
    let j = 0;
    const show = () => (i == j++ ? '' : 'hidden');

    return html`
      <md-dialog
        class="main"
        aria-labelledby="simple-dialog-title"
        open
        @close=${this.config.closeConfigAction}
        maxWidth="xl">
        <form slot="content" id="form-id" method="dialog">
          <md-tabs class="text-lg text-center w-full">
            ${tab(0, 'chess', 'Game')} ${tab(1, 'monitor', 'Display')} ${tab(2, 'people', 'Humans')}
            ${tab(3, 'robot', 'Bots')} ${tab(4, 'av_timer', 'Clocks')}
            ${tab(5, 'bluetooth', 'Bluetooth')}
          </md-tabs>
          <div class=${show()}><slot name="0"></slot></div>
          <div class=${show()}><slot name="1"></slot></div>
          <div class=${show()}><slot name="2"></slot></div>
          <div class=${show()}><slot name="3"></slot></div>
          <div class=${show()}><slot name="4"></slot></div>
          <div class=${show()}><slot name="5"></slot></div>
        </form>
      </md-dialog>
    `;
  }
}
