import { MobxLitElement } from '@adobe/lit-mobx';
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { action } from 'mobx';
import { STYLES } from './css';

@customElement('cb-grid')
export class GridWidget extends MobxLitElement {
  onClickAction!: (e: Event) => void;
  //  scroll!: boolean;

  render() {
    //    const endRef = useRef<HTMLTableRowElement>(null);
    //    const scrollRef = useRef<HTMLDivElement>(null);
    //    if (this.scroll) endRef.current?.scrollIntoView();

    let fingerStart = 0;
    let scrollStart = 0;
    let scrollMove = 0;
    const onTouchStartAction = (event: TouchEvent) => {
      fingerStart = event.touches[0].pageY;
      scrollStart = scrollMove;
      event.preventDefault();
    };
    const onTouchMoveAction = (event: TouchEvent) => {
      const fingerMove = fingerStart - event.touches[0].pageY;
      scrollMove = scrollStart + fingerMove;
      //      scrollRef.current?.scroll({ top: scrollMove });
      event.preventDefault();
    };
    return html`
      ${STYLES}
      <style>
        md-outlined-select {
          min-width: 200px;
        }
      </style>
      <div class="m-0 p-0 w-full overflow-auto" ref="{scrollRef}">
        <table
          class="m-0 table-fixed w-full"
          onTouchStart=${action(onTouchStartAction)}
          onTouchMove=${action(onTouchMoveAction)}
          @click=${action(this.onClickAction)}
        >
          <tbody>
            <slot></slot>
            <tr ref="{endRef}" />
          </tbody>
        </table>
      </div>
    `;
  }
}
