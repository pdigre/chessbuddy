import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ChessBoardElement } from 'chessboard-element';
import {
  rulesService as rules,
  playService,
  renderingService,
} from '../../common/service/index.service';
import { RefreshService } from '../../common/service/refresh.service';
import { ConfigService } from '../../common/service/config.service';
import { EditService } from '../../common/service/edit.service';
import { RenderingService } from '../../common/service/rendering.service';
import { FEN } from '../../common/model/fen';
import { AnalyzerService } from '../../common/service/analyzer.service';
import { MobxLitElement } from '@adobe/lit-mobx';
import { property } from 'lit-element/decorators.js';
import { action, observable } from 'mobx';
import { Square } from 'chess.js';

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
    const { r90, r180 } = rules.splitRotation(this.config.rotation);

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
          [r90 ? rules.rightSquare(x) : x]: {
            background: 'radial-gradient(circle, #fffc00 36%, transparent 40%)',
            borderRadius: '50%',
          },
        })
      );
      playService.markHints((x, i) =>
        Object.assign(markers, {
          [r90 ? rules.rightSquare(x) : x]:
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
          [r90 ? rules.rightSquare(x) : x]: {
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

    new ChessBoardElement(); // Must instantiate otherwise do not render
    const startPos = r90 ? rules.leftFen(fen) : fen;
    const rotation = !r180 ? 'white' : 'black';
    console.log(rotation + ':' + startPos);
    const side = (isWhite: boolean) => (isWhite ? 'rgb(240, 217, 181)' : 'rgb(181, 136, 99)');
    const dropHandler = (e: CustomEvent<ChessBoardEvent>) => {
      const from = e.detail.source as Square;
      const to = e.detail.target as Square;
      const isOk = playService.onPieceDropAction(from, to);
      if (!isOk) {
        e.preventDefault();
        e.detail.setAction('snapback');
      }
    };

    const clickHandler = (e: MouseEvent) => {
      playService.onSquareClickAction(this.xy2square(e.offsetX, e.offsetY));
    };

    const dragStartHandler = (e: MouseEvent) => {
      const s = this.xy2square(e.offsetX, e.offsetY);
      console.log('click ' + s);
      playService.onSquareClickAction(s as Square);
    };

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
        draggable-pieces
        position=${startPos}
        orientation=${rotation}
        style="width: ${renderingService.boardWidth}px"
        @drag-start=${action(dragStartHandler)}
        @drop=${action(dropHandler)}
        @click=${action(clickHandler)}
        customSquareStyles=${showMarkers()}
      ></chess-board>
    `;
  }
}