import { MobxLitElement } from '@adobe/lit-mobx';
import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { MediaService } from '../../common/service/media.service';
import { css } from 'lit-element';
import { TW_CSS } from './css.ts';

@customElement('cb-dialog-mp4')
export class Mp4Dialog extends MobxLitElement {
  @property({ attribute: false })
  public mp4!: MediaService;

  static styles = [
    css`
      md\-dialog {
        min-width: 800px;
        min-height: 600px;
        --md-dialog-container-color: var(--background-color);
      }
    `,
    TW_CSS,
  ];
  render() {
    const { width, src, title, onClose, open } = this.mp4.getDialogControls();
    const source = document.querySelector('#cb-video') as HTMLSourceElement;
    if (source) {
      source.setAttribute('src', src);
      const video = source?.parentNode as HTMLVideoElement;
      if (video) {
        const modal = video.parentNode?.parentNode as HTMLElement;
        const classList = modal.classList;
        if (open) {
          modal.onclick = onClose;
          (video.previousElementSibling as HTMLElement).innerText = title ?? '';
          classList.add('show');
          video.setAttribute('width', width + 'px');
          video.load();
          video.play().finally(() => {});
        } else {
          classList.remove('show');
        }
      }
    }
    return html``;
  }
}
