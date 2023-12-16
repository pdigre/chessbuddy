import { MobxLitElement } from '@adobe/lit-mobx';
import { html } from 'lit';
import {customElement, property} from 'lit/decorators.js';
import { MediaService } from '../../common/service/media.service';
import { css } from 'lit-element';
import { TW_CSS } from './css.ts';

@customElement('cb-dialog-mp4')
export class Mp4Dialog extends MobxLitElement {
  @property({ attribute: false })
  public mp4!: MediaService;

  static styles = [css``, TW_CSS];
  render() {
    const {width,src,title,onClose,open} = this.mp4.getDialogControls();
    return html`
    <md-dialog
      .open=${open}
      @close=${onClose}
      class="text-center text-lg">
      <div slot="headline" id="mp4">${title} - ${src}</div>
      <div slot="content">
        <video id="myVideo" autoPlay muted width="${width}">
          <source src="${src}" type="video/mp4" />
        </video>
      </div>
    </md-dialog>
    `;
  }
}
