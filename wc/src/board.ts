import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import {
  editService,
  playService,
  renderingService,
  rulesService as rules,
} from '../../common/service/index.service';
import { RefreshService } from '../../common/service/refresh.service';
import { ConfigService } from '../../common/service/config.service';
import { EditService } from '../../common/service/edit.service';
import { RenderingService } from '../../common/service/rendering.service';
import { FEN } from '../../common/model/fen';
import { AnalyzerService } from '../../common/service/analyzer.service';
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
  analyzer!: AnalyzerService;
  edit!: EditService;
  rendering!: RenderingService;

  @property({ attribute: false })
  @observable
  config!: ConfigService;
  refresh!: RefreshService;

  xy2square(x: number, y: number) {
    const w = renderingService.boardWidth;
    const s = 'abcdefgh'.charAt((x * 8) / w) + '87654321'.charAt((y * 8) / w);
    console.log('click ' + s);
    return s as Square;
  }

  render() {
    const { r90, r180, b2sq, sq2b, fen2b } = this.config.getBoardLogic();

    const showMarkers = () => {
      const markers = {};
      playService.markEdit(() =>
        Object.assign(markers, {
          [this.edit.editSquare]: {
            background: 'radial-gradient(circle, #ff0000 36%, transparent 40%)',
            borderRadius: '50%',
          },
        })
      );
      playService.markFacts(x =>
        Object.assign(markers, {
          [sq2b(x)]: {
            background: 'radial-gradient(circle, #fffc00 36%, transparent 40%)',
            borderRadius: '50%',
          },
        })
      );
      playService.markHints((x, i) =>
        Object.assign(markers, {
          [sq2b(x)]:
            i > 1
              ? {
                  background: 'radial-gradient(circle, #00ff4c 36%, transparent 30%)',
                  borderRadius: '10%',
                }
              : {
                  background: 'radial-gradient(circle, #00ff4c 36%, transparent 50%)',
                  borderRadius: '10%',
                },
        })
      );
      playService.markCastling(x =>
        Object.assign(markers, {
          [sq2b(x)]: {
            background: 'radial-gradient(circle, #505050 36%, transparent 80%)',
            borderRadius: '10%',
          },
        })
      );
      return markers;
    };

    const fen = this.refresh.showBlank
      ? FEN.CLEAR_GAME
      : this.edit.showEdit
        ? this.edit.editFen
        : playService.fen;

    const side = (isWhite: boolean) => (isWhite ? 'rgb(240, 217, 181)' : 'rgb(181, 136, 99)');

    const onPieceDropAction = (boardFrom: Square, boardTo: Square) => {
      if (editService.showEdit) {
        editService.editMove(boardFrom, boardTo);
        return true;
      }
      return playService.pieceMove(b2sq(boardFrom), b2sq(boardTo));
    };
    const onDrop = (e: CustomEvent<ChessBoardEvent>) => {
      if (!onPieceDropAction(e.detail.source as Square, e.detail.target as Square)) {
        e.preventDefault();
        e.detail.setAction('snapback');
      }
    };

    const onStart = (e: MouseEvent) => {
      const boardFrom = this.xy2square(e.offsetX, e.offsetY);
      return editService.showEdit || playService.pieceStart(b2sq(boardFrom));
    };

    const STYLE = css`
      width: ${renderingService.boardWidth}px;
      height: ${renderingService.boardWidth}px;
      border-width: 0;
    `;

    const onClick = (e: MouseEvent) => {
      const square = this.xy2square(e.offsetX, e.offsetY);
      return editService.onSquareClick(square);
    };
    const orientation = !r180 ? 'white' : 'black';
    return html`
      <style>
        --light-color {
          backgroundcolor: ${side(r90)};
        }
        --dark-color {
          backgroundcolor: ${side(!r90)};
        }
      </style>
      <chess-board
        position=${fen2b(fen)}
        @drag-start=${onStart}
        @drop=${onDrop}
        @click=${onClick}
        orientation=${orientation}
        style=${STYLE}
        draggable-pieces
        customSquareStyles=${showMarkers()}
      ></chess-board>
    `;
  }
}
