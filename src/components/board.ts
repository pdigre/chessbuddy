import { LitElement, html } from 'lit';
import {customElement, property} from 'lit/decorators.js';
import { ChessBoardElement } from 'chessboard-element';

@customElement('cb-board')
export class Board extends LitElement {
   render() {
    new ChessBoardElement();  // Must instantiate otherwise do not render
    return html`
      <chess-board position="start" style="width: 400px"></chess-board>    
    `;
  }
}


