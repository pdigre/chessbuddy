import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { action, runInAction } from 'mobx';
import { ConfigService } from '../../common/service/config.service';
import { TW_CSS, MD_ICONS } from './css';
import { css } from 'lit-element';

@customElement('cb-config-dialog')
export class ConfigDialog extends MobxLitElement {
  config!: ConfigService;

  static styles = [
    css`
      md\-dialog {
        min-width: 800px;
        min-height: 600px;
      }
      md\-tabs {
        min-height: 90px;
        max-width: 760px;
        overflow: clip;
      }
      md\-primary-tab {
        min-height: 90px;
      }
      .icon {
        font-size: 30px;
      }
      .label {
        line-height: 20px;
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

    const choose = (event: MouseEvent) => {
      event.preventDefault();
      const target = event?.target as HTMLElement;
      if (target) {
        const num = target.id;
        runInAction(() => {
          this.config.switchTab(+num);
        });
        const daddy = (target.parentNode as HTMLElement).parentNode;
        daddy?.childNodes.forEach(child => {
          const slot = child.firstChild as HTMLSlotElement;
          if (slot?.name == num) {
            const assigned = slot.assignedElements();
            assigned.forEach(tab => {
              // @ts-ignore
              tab.requestUpdate();
            });
          }
        });
      }
    };

    const tab = (num: number, icon: string, title: string) => {
      return html` ${MD_ICONS}
        <md-primary-tab id=${num} @click=${choose} .active=${num === this.config.showTab}>
          <md-icon slot="icon"><span class="icon material-symbols-outlined">${icon}</span></md-icon
          ><span class="label">${title}</span></md-primary-tab
        >`;
    };

    const i = this.config.showTab;
    let j = 0;
    const show = () => (i == j++ ? '' : 'hidden');

    let onClose = action(this.config.closeConfigAction);
    return html`
      <md-dialog class="main" aria-labelledby="simple-dialog-title" open @close=${onClose}>
        <form slot="content" id="form-id" method="dialog">
          <md-tabs class="text-lg text-center" aria-label="Content to view">
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
