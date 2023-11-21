import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { MdTabs } from '@material/web/tabs/tabs.js';
import { MdPrimaryTab } from '@material/web/tabs/primary-tab.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { action, runInAction } from 'mobx';
import { ConfigService } from '../service/config.service';
import { MdDialog } from '@material/web/dialog/dialog';
import { STYLES } from './css';

@customElement('cb-config-dialog')
export class ConfigDialog extends MobxLitElement {
  config!: ConfigService;

  render() {
    console.log('config ' + this.config.showConfig);
    if (!this.config.showConfig) {
      return '';
    }

    new MdDialog();
    new MdTabs();
    new MdPrimaryTab();

    const choose = (event: MouseEvent) => {
      event.preventDefault();
      const target = event?.target;
      if (target) {
        const num = event?.target?.id;
        runInAction(() => {
          this.config.switchTab(+num);
        });
        const daddy = target.parentNode.parentNode;
        daddy.childNodes.forEach(child => {
          const slot = child.firstChild;
          if (slot?.name == num) {
            const assigned = slot.assignedElements();
            assigned.forEach(tab => {
              tab.requestUpdate();
            });
          }
        });
      }
    };

    const tab = (num: number, icon: string, title: string) => {
      return html`<md-primary-tab
        class="text-3xl"
        id=${num}
        @click=${choose}
        .active=${num === this.config.showTab}
      >
        <span class="text-lg material-symbols-outlined">${icon}</span>${title}</md-primary-tab
      >`;
    };

    const i = this.config.showTab;
    let j = 0;
    const show = () => (i == j++ ? '' : 'hidden');

    return html`
      ${STYLES}
      <style>
        .main {
          width: 1100px;
          height: 600px;
        }
        .hidden {
          display: none;
        }
      </style>
      <md-dialog
        class="main"
        aria-labelledby="simple-dialog-title"
        open
        @close=${action(this.config.closeConfigAction)}
        maxWidth="xl"
      >
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
