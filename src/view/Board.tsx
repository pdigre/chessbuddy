import React from 'react';
import { AnalyzerService } from '../service/analyzer.service';
import { DashboardService } from '../service/dashboard.service';
import { Chessboard } from 'react-chessboard';
import { ConfigService } from '../model/config';
import { RefreshService } from '../service/refresh.service';
import { observer } from 'mobx-react';
import { rulesService as rules, playService } from '../service/index.service';
import { FEN } from '../model/fen';
import { RenderingService } from '../service/rendering.service';

export const Board = observer(
  ({
    dashboard: gameState,
    rendering: rendering,
    config,
    refresh: refreshTimer,
  }: {
    analyzer: AnalyzerService;
    dashboard: DashboardService;
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

    const r90 = config.r90();
    const r180 = config.r180();

    const showMarkers = () => {
      const markers = {};
      playService.markEdit(() =>
        Object.assign(markers, {
          [gameState.editSquare]: {
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

    const fen = refreshTimer.showBlank
      ? FEN.CLEAR_GAME
      : gameState.showEdit
      ? gameState.editFen
      : playService.fen;

    return (
      <Chessboard
        position={r90 ? rules.leftFen(fen) : fen}
        onPieceDragBegin={playService.onDragStart}
        onPieceDrop={(from, to) => playService.onPieceDrop(from, to)}
        onSquareClick={playService.onSquareClick}
        boardOrientation={!r180 ? 'white' : 'black'}
        boardWidth={rendering.boardWidth}
        customSquareStyles={showMarkers()}
        customLightSquareStyle={r90 ? blackStyle : whiteSquareStyle}
        customDarkSquareStyle={r90 ? whiteSquareStyle : blackStyle}
      />
    );
  }
);
