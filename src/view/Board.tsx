import React from 'react';
import { AnalyzerService } from '../service/analyzer.service';
import { Chessboard } from 'react-chessboard';
import { ConfigService } from '../service/config.service';
import { RefreshService } from '../service/refresh.service';
import { observer } from 'mobx-react';
import { rulesService as rules, playService } from '../service/index.service';
import { FEN } from '../model/fen';
import { RenderingService } from '../service/rendering.service';
import { EditService } from '../service/edit.service';

export const Board = observer(
  ({
    edit,
    rendering,
    config,
    refresh,
  }: {
    analyzer: AnalyzerService;
    edit: EditService;
    rendering: RenderingService;
    config: ConfigService;
    refresh: RefreshService;
  }) => {
    const whiteSquareStyle: React.CSSProperties = {
      backgroundColor: 'rgb(240, 217, 181)',
    };
    const blackStyle: React.CSSProperties = {
      backgroundColor: 'rgb(181, 136, 99)',
    };

    const r90 = config.getR90;
    const r180 = config.getR180;

    const showMarkers = () => {
      const markers = {};
      playService.markEdit(() =>
        Object.assign(markers, {
          [edit.editSquare]: {
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

    const fen = refresh.showBlank ? FEN.CLEAR_GAME : edit.showEdit ? edit.editFen : playService.fen;

    return (
      <Chessboard
        position={r90 ? rules.leftFen(fen) : fen}
        onPieceDragBegin={playService.onDragStartAction}
        onPieceDrop={(from, to) => playService.onPieceDropAction(from, to)}
        onSquareClick={playService.onSquareClickAction}
        boardOrientation={!r180 ? 'white' : 'black'}
        boardWidth={rendering.boardWidth}
        customSquareStyles={showMarkers()}
        customLightSquareStyle={r90 ? blackStyle : whiteSquareStyle}
        customDarkSquareStyle={r90 ? whiteSquareStyle : blackStyle}
      />
    );
  }
);
