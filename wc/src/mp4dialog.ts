import { MobxLitElement } from '@adobe/lit-mobx';
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { STYLES } from './css';
import { MdDialog } from '@material/web/dialog/dialog';
import { action } from 'mobx';
import { MediaService } from '../../common/service/media.service';

@customElement('cb-dialog-mp4')
export class Mp4Dialog extends MobxLitElement {
  mp4!: MediaService;

  render() {
    new MdDialog();
    const width = Math.min(this.mp4.msg?.width ?? 480, 500);

    return html`
      ${STYLES}
    <md-dialog
      aria-labelledby="mp4"
      .open=${this.mp4.title != undefined}
      @close=${action(this.mp4.clear)}
      class="text-center text-lg">
      <div slot="headline"> id="mp4">${this.mp4.title}</div>>
      <form slot="content">
        <video id="myVideo" autoPlay=${true} width=${width}>
          <source src=${this.mp4.msg?.src ?? ''} type="video/mp4" />
        </video>
      </form>
    </Dialog>
    `;
  }
}
