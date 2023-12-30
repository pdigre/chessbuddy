import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { clockService, openingsService } from '../../common/service/index.service.ts';
import { MobxLitElement } from '@adobe/lit-mobx';
import { PlayService } from '../../common/service/play.service.ts';
import { ClockService } from '../../common/service/clock.service.ts';
import { css } from 'lit-element';
import { TW_CSS } from './css.ts';
import { AnalyzerService } from '../../common/service/analyzer.service.ts';
import { property } from 'lit-element/decorators.js';
import { RenderingService } from '../../common/service/rendering.service.ts';

@customElement('cb-cp')
export class CP extends MobxLitElement {
  @property({ attribute: true })
  analyzer!: AnalyzerService;
  @property({ attribute: true })
  rendering!: RenderingService;
  static styles = [
    css`
      div {
        width: 32px;
      }
      span {
        writing-mode: vertical-lr;
        margin-right: 0.5rem;
      }
      .black {
        color: white;
        background-color: black;
      }
      .white {
        background-color: white;
        color: black;
      }
    `,
    TW_CSS,
  ];
  render() {
    const { txt, blackTop, h1, h2 } = this.analyzer.getCpInfo();
    const coloring = (black: boolean) => (black ? 'black' : 'white');
    return this.rendering.showCP
      ? html`
          <div class="h-full flex flex-col flex-grow text-lg">
            <span class="text-center ${coloring(!blackTop)}" style="height: ${h1}"> ${txt} </span>
            <span class="text-center ${coloring(blackTop)}" style="height: ${h2}">${txt}</span>
          </div>
        `
      : html``;
  }
}

@customElement('cb-feninfo')
export class FenInfo extends MobxLitElement {
  play!: PlayService;
  render() {
    return html`<p>${openingsService.sanTextLocate(this.play.log)}</p>`;
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
    const { other, label, showTicker, banner, isTextRight } = this.play.getPlayerInfo(this.isTop);
    return html`
      <p class="text-xl m-0 ${isTextRight ? ' text-right' : ''}">
        ${label} &lt; ${showTicker ? html`<cb-ticker .clock=${clockService} />` : html`${other}`}
        &gt; ${banner}
      </p>
    `;
  }
}

@customElement('cb-ticker')
export class Ticker extends MobxLitElement {
  clock!: ClockService;
  render() {
    return html`<span>${this.clock.clockText}</span>`;
  }
}
