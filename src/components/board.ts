import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ChessBoardElement } from 'chessboard-element';
import { rulesService as rules, playService, renderingService } from '../service/index.service';
import { RefreshService } from '../service/refresh.service';
import { ConfigService } from '../service/config.service';
import { EditService } from '../service/edit.service';
import { RenderingService } from '../service/rendering.service';
import { FEN } from '../model/fen';
import { AnalyzerService } from '../service/analyzer.service';
import { MobxLitElement } from '@adobe/lit-mobx';
import { property } from 'lit-element/decorators.js';
import { observable } from 'mobx';

@customElement('cb-board')
export class Board extends MobxLitElement {
  analyzer!: AnalyzerService;
  edit!: EditService;
  rendering!: RenderingService;

  @property({ attribute: false })
    @observable
  config!: ConfigService;
  refresh!: RefreshService;

  render() {
    const r90 = this.config.getR90();
    const r180 = this.config.getR180();

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
        @drag-start=${playService.onDragStartAction}
        @drop=${(from, to) => playService.onPieceDropAction(from, to)}
        onSquareClick=${playService.onSquareClickAction}
        customSquareStyles=${showMarkers()}
      ></chess-board>
    `;
  }
}
