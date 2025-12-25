import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { action } from 'mobx';
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
        --md-dialog-container-color: var(--background-color);
      }
      md\-tabs {
        min-height: 90px;
        max-width: 760px;
        overflow: clip;
      }

      md\-primary-tab {
        --menu-color: color-mix(in oklch, transparent, var(--menu-fg-color) 90%);
        --_container-color: color-mix(in oklch, transparent, var(--menu-bg-color) 80%);
        --_label-text-color: var(--menu-color);
        --_active-label-text-color: var(--menu-color);
        --_active-hover-label-text-color: var(--menu-color);
        --_hover-label-text-color: var(--menu-color);
        min-height: 90px;
      }
      .icon {
        font-size: 30px;
        color: color-mix(in oklch, transparent, var(--menu-fg-color) 90%);
      }
      .label {
        line-height: 20px;
        color: color-mix(in oklch, transparent, var(--menu-fg-color) 90%);
      }
      .hidden {
        display: none;
      }
    `,
    TW_CSS,
  ];

  render() {
    const showConfig = this.config.showConfig;
    console.log('config ' + showConfig);

    const choose = (event: MouseEvent) => {
      event.preventDefault();
      const target = event?.target as HTMLElement;
      if (target) {
        const num = target.id;
        this.config.switchTabAction(+num);
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

    const onClose = action(this.config.closeConfigAction);
    return html`
      <md-dialog
        class="main"
        aria-labelledby="simple-dialog-title"
        .open=${showConfig}
        @close=${onClose}>
        <div slot="content">
          <md-tabs class="text-lg text-center" aria-label="Content to view">
            ${tab(0, 'chess', 'Game')} ${tab(1, 'monitor', 'Display')} ${tab(2, 'people', 'Humans')}
            ${tab(3, 'robot', 'Bots')} ${tab(4, 'av_timer', 'Clocks')}
            ${tab(5, 'bluetooth', 'Bluetooth')}
          </md-tabs>
          <slot name="${this.config.showTab}"></slot>
        </div>
      </md-dialog>
    `;
  }
}
