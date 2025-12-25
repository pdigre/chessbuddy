import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { editService, playService, renderingService } from '../../common/service/index.service';
import { ConfigService } from '../../common/service/config.service';
import { EditService } from '../../common/service/edit.service';
import { RenderingService } from '../../common/service/rendering.service';
import { FEN } from '../../common/model/fen';
import { MobxLitElement } from '@adobe/lit-mobx';
import { property } from 'lit-element/decorators.js';
import { observable } from 'mobx';
import { Square } from '../../common/service/rules.service';
import { css } from 'lit-element';

export interface ChessBoardEvent {
  source?: Square;
  target?: Square;
  setAction(a: string): void;
}

@customElement('cb-board')
export class Board extends MobxLitElement {
  edit!: EditService;
  @property({ attribute: false })
  @observable
  rendering!: RenderingService;
  @property({ attribute: false })
  @observable
  config!: ConfigService;

  xy2square(x: number, y: number) {
    const w = renderingService.boardWidth;
    const s = 'abcdefgh'.charAt((x * 8) / w) + '87654321'.charAt((y * 8) / w);
    console.log('click ' + s);
    return s as Square;
  }

  private readonly DARK_MODE = 'dark-mode';

  render() {
    const { r90, r180, b2sq, sq2b, fen2b, onPieceDrop } = this.config.getBoardLogic();

    if (this.rendering.darkTheme) {
      document.body.classList.add(this.DARK_MODE);
    } else {
      document.body.classList.remove('dark-mode');
    }

    const marker = (sq: string, col: string) => `
      ::part(${sq}) {
        background: radial-gradient(${col}, transparent 90%);
        background-color: ${side(((r90 ? 1 : 0) + sq.charCodeAt(0) + sq.charCodeAt(1)) % 2 == 1)}
      }`;

    const showMarkers = () => {
      let markers = ``;
      playService.markEdit(() => {
        markers += marker(this.edit.editSquare, '#ff0000');
      });
      playService.markFacts(x => {
        markers += marker(sq2b(x), '#fffc00');
      });
      playService.markHints((x, i) => {
        markers += marker(sq2b(x), i > 1 ? '#80ff4c' : '#00ff4c');
      });
      playService.markCastling(x => {
        markers += marker(sq2b(x), '#505050');
      });
      return markers;
    };

    const fen = this.rendering.showBlank
      ? FEN.CLEAR_GAME
      : this.edit.showEdit
        ? this.edit.editFen
        : playService.fen;

    const side = (isWhite: boolean) => (isWhite ? 'rgb(240, 217, 181)' : 'rgb(181, 136, 99)');

    const onDrop = (e: CustomEvent<ChessBoardEvent>) => {
      if (!onPieceDrop(e.detail.source as Square, e.detail.target as Square)) {
        e.preventDefault();
        e.detail.setAction('snapback');
      }
    };

    const onStart = (e: MouseEvent) => {
      const boardFrom = this.xy2square(e.offsetX, e.offsetY);
      return editService.showEdit || playService.pieceStartAction(b2sq(boardFrom));
    };
    const h = renderingService.getSize().height - 64;
    const STYLE = css`
      width: ${h}px;
      height: ${h}px;
    `;

    const onClick = (e: MouseEvent) => {
      const square = this.xy2square(e.offsetX, e.offsetY);
      return editService.onSquareClick(square);
    };
    const orientation = !r180 ? 'white' : 'black';
    return html`
      <style>
        chess-board {
          --dark-color: ${side(r90)};
          --light-color : ${side(!r90)};
        }
        ${showMarkers()}
      </style>
      <chess-board
        position=${fen2b(fen)}
        @drag-start=${onStart}
        @drop=${onDrop}
        @click=${onClick}
        orientation=${orientation}
        style=${STYLE}
        draggable-pieces></chess-board>
    `;
  }
}
