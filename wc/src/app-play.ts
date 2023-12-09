import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { clockService, openingsService } from '../../common/service/index.service.ts';
import { MobxLitElement } from '@adobe/lit-mobx';
import { PlayService } from '../../common/service/play.service.ts';
import { ClockService } from '../../common/service/clock.service.ts';
import { css } from 'lit-element';
import { TW_CSS } from './css.ts';

@customElement('cb-ticker')
export class Ticker extends MobxLitElement {
  clock!: ClockService;
  render() {
    return html`<span>${this.clock.clockText}</span>`;
  }
}

@customElement('cb-playerinfobar')
export class PlayerInfoBar extends MobxLitElement {
  isTop!: boolean;
  play!: PlayService;
  static styles = [
    css`
      p {
        height: 31px;
        padding: 1px 5px 1px 5px;
      }
    `,
    TW_CSS,
  ];
  render() {
    new Ticker();
    const { other, label, showTicker, banner, isTextRight } = this.play.getPlayerInfo(this.isTop);
    return html`
      <p class="text-xl m-0 ${isTextRight ? ' text-right' : ''}">
        ${label} &lt; ${showTicker ? html`<cb-ticker .clock=${clockService} />` : html`${other}`}
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
