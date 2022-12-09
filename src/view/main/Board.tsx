import React, { useCallback } from 'react';
import {
  ChessRulesService,
  chessRulesService as rules,
  Square,
} from '../../services/chessrules.service';
import { AnalyzerService } from '../../services/analyzer.service';
import { Human } from '../../model/human';
import { playService, GameState } from '../../services/play.service';
import { Chessboard } from 'react-chessboard';
import { Config } from '../../model/config';
import { RefreshTimer } from '../../services/control/refreshtimer';
import { Rendering } from '../../services/control/rendering';
import { observer } from 'mobx-react';
import { messageService } from '../../services/message.service';
import { ButtonType } from '../config/ConfigWidgets';
import { FaChessBishop, FaChessKnight, FaChessQueen, FaChessRook } from 'react-icons/fa';
import { mp4service } from '../../services/mp4.service';

export const Board = observer(
  ({
    helper,
    gameState,
    rendering,
    config,
    refreshTimer,
  }: {
    helper: AnalyzerService;
    gameState: GameState;
    rendering: Rendering;
    config: Config;
    refreshTimer: RefreshTimer;
  }) => {
    const sound_click = new Audio('/mp3/click.mp3');
    const sound_move = new Audio('/mp3/move1.mp3');
    const sound_error = new Audio('/mp3/buzzer.mp3');
    const pgnStyle: React.CSSProperties = {
      background: 'radial-gradient(circle, #fffc00 36%, transparent 40%)',
      borderRadius: '50%',
    };
    const editStyle: React.CSSProperties = {
      background: 'radial-gradient(circle, #ff0000 36%, transparent 40%)',
      borderRadius: '50%',
    };
    const helpStyle: React.CSSProperties = {
      background: 'radial-gradient(circle, #00ff4c 36%, transparent 50%)',
      borderRadius: '10%',
    };
    const castlingStyle: React.CSSProperties = {
      background: 'radial-gradient(circle, #505050 36%, transparent 80%)',
      borderRadius: '10%',
    };
    const helpStyle2: React.CSSProperties = {
      background: 'radial-gradient(circle, #00ff4c 36%, transparent 30%)',
      borderRadius: '10%',
    };
    const whiteSquareStyle: React.CSSProperties = {
      backgroundColor: 'rgb(240, 217, 181)',
    };
    const blackSquareStyle: React.CSSProperties = {
      backgroundColor: 'rgb(181, 136, 99)',
    };

    const doMove = useCallback((from: Square, to: Square, isHuman: boolean) => {
      const move = rules.move(playService.fen, from, to);
      if (!move) {
        return;
      }
      if (gameState.isPlaying || isHuman) {
        const action = move[1];
        if (action.promotion && isHuman) {
          const buttons: ButtonType[] = [
            { label: 'Queen', icon: <FaChessQueen /> },
            { label: 'Rook', icon: <FaChessRook /> },
            { label: 'Knight', icon: <FaChessKnight /> },
            { label: 'Bishop', icon: <FaChessBishop /> },
          ];
          messageService.display('Promotion', 'Choose promotion piece', buttons, reply => {
            let promo: 'b' | 'q' | 'n' | 'r' = 'q';
            if (reply == 'Rook') promo = 'r';
            if (reply == 'Knight') promo = 'n';
            if (reply == 'Bishop') promo = 'b';
            const move = rules.move(playService.fen, from, to, promo);
            if (move != null) {
              messageService.clear();
              playService.playMove(move[1].san);
            }
          });
        } else {
          playService.playMove(action.san);
        }
      }
    }, []);

    const r90 = config.rotation % 2 == 1;
    const r180 = config.rotation > 1;

    const onDragStart = (piece: string, from: Square) => {
      if (gameState.editMode) return true;
      const player = playService.nextPlayer();
      if (player instanceof Human && !playService.isComplete) {
        const from2 = r90 ? rules.leftSquare(from) : from;
        const movable = playService.isMoveable(from2);
        if (movable) {
          sound_click.play().then();
        }
        return movable;
      }
      return false;
    };

    const onMovePiece = (from: Square, to: Square) => {
      if (gameState.editMode) {
        playService.editMove(from, to);
        return true;
      }
      if (helper.help.length > 1 && helper.help[0] == to && helper.help[1] == from)
        mp4service.playCorrect();
      gameState.startUndoTimer(playService.log.length);
      const state = playService.log.length;
      doMove(r90 ? rules.leftSquare(from) : from, r90 ? rules.leftSquare(to) : to, true);
      if (state != playService.log.length) {
        sound_move.play().then();
      } else {
        sound_error.play().then();
      }
      return true;
    };

    const showMarkers = () => {
      const markers = {};
      if (gameState.editMode) {
        if (gameState.editSquare != '') {
          Object.assign(markers, { [gameState.editSquare]: editStyle });
        }
      }
      if (config.showFacts) {
        gameState.pgns.forEach(x =>
          Object.assign(markers, { [r90 ? rules.rightSquare(x) : x]: pgnStyle })
        );
      }
      if (config.showHints) {
        helper.help.forEach((x, i) => {
          Object.assign(markers, {
            [r90 ? rules.rightSquare(x) : x]: i > 1 ? helpStyle2 : helpStyle,
          });
        });
      }
      playService.findCastlingMarkers().forEach(x =>
        Object.assign(markers, {
          [r90 ? rules.rightSquare(x) : x]: castlingStyle,
        })
      );
      return markers;
    };
    const fen = refreshTimer.showBlank ? ChessRulesService.CLEAR_GAME : playService.fen;

    const onSquareClick = (square: Square) => {
      if (gameState.editMode) gameState.editSquare = square;
      console.log('hi:' + square);
    };
    return (
      <Chessboard
        position={r90 ? rules.leftFen(fen) : fen}
        onPieceDragBegin={onDragStart}
        onPieceDrop={onMovePiece}
        onSquareClick={onSquareClick}
        boardOrientation={!r180 ? 'white' : 'black'}
        boardWidth={rendering.boardWidth}
        customSquareStyles={showMarkers()}
        customLightSquareStyle={r90 ? blackSquareStyle : whiteSquareStyle}
        customDarkSquareStyle={r90 ? whiteSquareStyle : blackSquareStyle}
      />
    );
  }
);
