import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { clockService, openingsService } from '../../common/service/index.service.ts';
import { MobxLitElement } from '@adobe/lit-mobx';
import { PlayService } from '../../common/service/play.service.ts';
import { ClockService } from '../../common/service/clock.service.ts';
import { STYLES } from './css.ts';
import { property } from 'lit-element/decorators.js';

@customElement('cb-ticker-top')
export class TickerTop extends MobxLitElement {
  clock!: ClockService;
  render() {
    return html`<span>${this.clock.top}</span>`;
  }
}

@customElement('cb-ticker-bottom')
export class TickerBottom extends MobxLitElement {
  clock!: ClockService;
  render() {
    return html`<span>${this.clock.bottom}</span>`;
  }
}

@customElement('cb-playerinfobar')
export class PlayerInfoBar extends MobxLitElement {
  @property({ attribute: true })
  isTop!: string;
  play!: PlayService;
  render() {
    const { label, banner, isTextRight } = this.play.getPlayerInfo(this.isTop == 'true');
    return html`
      ${STYLES}
      <style>
        p {
          height: 31px;
        }
      </style>
      <p class="text-xl m-0 p-1 ${isTextRight ? ' text-right' : ''}">
        ${label} &lt; <slot></slot>
        &gt; ${banner}
      </p>
    `;
  }
}

@customElement('cb-feninfo')
export class FenInfo extends MobxLitElement {
  play!: PlayService;
  render() {
    return html`<p>${openingsService.sanTextLocate(this.play.log)}</p>`;
  }
}
