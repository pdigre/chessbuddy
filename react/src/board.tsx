import React from 'react';
import { AnalyzerService } from '../../common/service/analyzer.service';
import { Chessboard } from 'react-chessboard';
import { ConfigService } from '../../common/service/config.service';
import { RefreshService } from '../../common/service/refresh.service';
import { observer } from 'mobx-react';
import {
  editService,
  playService,
  rulesService as rules,
} from '../../common/service/index.service';
import { FEN } from '../../common/model/fen';
import { RenderingService } from '../../common/service/rendering.service';
import { EditService } from '../../common/service/edit.service';
import { Square } from '../../common/service/rules.service';

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
    const whiteSquareStyle: Record<string, string> = {
      backgroundColor: 'rgb(240, 217, 181)',
    };
    const blackStyle: Record<string, string> = {
      backgroundColor: 'rgb(181, 136, 99)',
    };

    const { r90, r180, b2sq, sq2b, fen2b } = config.getBoardLogic();

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
          [sq2b(x)]: {
            background: 'radial-gradient(circle, #fffc00 36%, transparent 40%)',
            borderRadius: '50%',
          },
        })
      );
      playService.markHints((x, i) => {
        return Object.assign(markers, {
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
        });
      });
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

    const fen = refresh.showBlank ? FEN.CLEAR_GAME : edit.showEdit ? edit.editFen : playService.fen;
    const onDrop = (boardFrom: Square, boardTo: Square) => {
      if (editService.showEdit) {
        editService.editMove(boardFrom, boardTo);
        return true;
      }
      return playService.pieceMove(b2sq(boardFrom), b2sq(boardTo));
    };
    const onStart = (piece: string, boardFrom: Square): any => {
      return editService.showEdit || playService.pieceStart(b2sq(boardFrom));
    };

    const onClick = (square: Square) => editService.onSquareClick(square);
    const orientation = !r180 ? 'white' : 'black';
    return (
      <Chessboard
        position={fen2b(fen)}
        onPieceDragBegin={onStart}
        onPieceDrop={onDrop}
        onSquareClick={onClick}
        boardOrientation={orientation}
        boardWidth={rendering.boardWidth}
        customSquareStyles={showMarkers()}
        customLightSquareStyle={r90 ? blackStyle : whiteSquareStyle}
        customDarkSquareStyle={r90 ? whiteSquareStyle : blackStyle}
      />
    );
  }
);
