import { MobxLitElement } from '@adobe/lit-mobx';
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('cb-panel-edit')
export class PanelEdit extends MobxLitElement {
  render() {
    return html`<div>Edit</div>`;
  }
}
