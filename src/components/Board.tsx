import React, { useCallback } from 'react';
import * as rules from '../logic/rules';
import { Helper } from '../logic/helper';
import { Human } from '../logic/players';
import { game, GameState } from '../logic/game';
import { Chessboard } from 'react-chessboard';
import { Config } from '../logic/config';
import { RefreshTimer } from '../logic/refreshtimer';
import { Rendering } from '../logic/rendering';
import { observer } from 'mobx-react';
import { Square } from 'chess.js';
import { message } from '../logic/message';
import { playCorrect } from '../logic/mp4';
import { ButtonType } from './ConfigWidgets';
import { FaChessBishop, FaChessKnight, FaChessQueen, FaChessRook } from 'react-icons/fa';

const pgnStyle: React.CSSProperties = {
  background: 'radial-gradient(circle, #fffc00 36%, transparent 40%)',
  borderRadius: '50%',
};
const helpStyle: React.CSSProperties = {
  background: 'radial-gradient(circle, #00ff4c 36%, transparent 50%)',
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

const sound_click = new Audio('/mp3/click.mp3');
const sound_move = new Audio('/mp3/move1.mp3');
const sound_error = new Audio('/mp3/buzzer.mp3');

export const Board = observer(
  ({
    helper,
    gameState,
    rendering,
    config,
    refreshTimer,
  }: {
    helper: Helper;
    gameState: GameState;
    rendering: Rendering;
    config: Config;
    refreshTimer: RefreshTimer;
  }) => {
    const doMove = useCallback((from: rules.Square, to: rules.Square, isHuman: boolean) => {
      const move = rules.move(game.fen, from, to);
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
          message.display('Promotion', 'Choose promotion piece', buttons, reply => {
            let promo: 'b' | 'q' | 'n' | 'r' = 'q';
            if (reply == 'Rook') promo = 'r';
            if (reply == 'Knight') promo = 'n';
            if (reply == 'Bishop') promo = 'b';
            const move = rules.move(game.fen, from, to, promo);
            if (move != null) {
              message.clear();
              game.playMove(move[1].san);
            }
          });
        } else {
          game.playMove(action.san);
        }
      }
    }, []);

    const r90 = config.rotation % 2 == 1;
    const r180 = config.rotation > 1;

    const onDragStart = (piece: string, from: Square) => {
      const player = game.nextPlayer();
      if (player instanceof Human && !game.isComplete) {
        const from2 = r90 ? rules.leftSquare(from) : from;
        const movable = rules.isMoveable(game.fen, from2);
        if (movable) sound_click.play().then();
        return movable;
      }
      return false;
    };

    const onMovePiece = (from: Square, to: Square) => {
      if (helper.help.length > 1 && helper.help[0] == to && helper.help[1] == from) playCorrect();
      config.startUndoTimer(game.log.length);
      const state = game.log.length;
      doMove(r90 ? rules.leftSquare(from) : from, r90 ? rules.leftSquare(to) : to, true);
      if (state != game.log.length) {
        sound_move.play().then();
      } else {
        sound_error.play().then();
      }
      return true;
    };

    const showMarkers = () => {
      const markers = {};
      if (config.showFacts) {
        game.pgns.forEach(x =>
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
      return markers;
    };
    const fen = refreshTimer.showBlank ? rules.CLEAR_GAME : game.fen;
    return (
      <Chessboard
        position={r90 ? rules.leftFen(fen) : fen}
        onPieceDragBegin={onDragStart}
        onPieceDrop={onMovePiece}
        boardOrientation={!r180 ? 'white' : 'black'}
        boardWidth={rendering.boardWidth}
        customSquareStyles={showMarkers()}
        customLightSquareStyle={r90 ? blackSquareStyle : whiteSquareStyle}
        customDarkSquareStyle={r90 ? whiteSquareStyle : blackSquareStyle}
      />
    );
  }
);
