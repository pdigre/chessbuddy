import React, { useCallback } from 'react';
import * as rules from '../data/rules';
import { Helper } from '../data/helper';
import { Human } from '../data/players';
import { game, GameState } from '../data/game';
import Chessboard from 'chessboardjsx';
import { Config } from '../data/config';
import { RefreshTimer } from '../data/refreshtimer';
import { messager } from './MessageBox';
import { Rendering } from '../data/rendering';
import { observer } from 'mobx-react';
import { correct } from './Emotion';

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

type BoardMove = {
  sourceSquare: rules.Square;
  targetSquare: rules.Square;
};

export const Board = observer(
  ({
    helper,
    gameState,
    rendering,
    config,
    refreshtimer,
  }: {
    helper: Helper;
    gameState: GameState;
    rendering: Rendering;
    config: Config;
    refreshtimer: RefreshTimer;
  }) => {
    const doMove = useCallback((from: rules.Square, to: rules.Square, isHuman: boolean) => {
      const move = rules.move(game.fen, from, to);
      if (!move) {
        return;
      }
      if (gameState.isPlaying || isHuman) {
        const action = move[1];
        if (action.promotion && isHuman) {
          const buttons = ['Queen', 'Rook', 'Knight', 'Bishop'];
          messager.display('Promotion', 'Choose promotion piece', buttons, reply => {
            let promo: 'b' | 'q' | 'n' | 'r' = 'q';
            if (reply == 'Rook') promo = 'r';
            if (reply == 'Knight') promo = 'n';
            if (reply == 'Bishop') promo = 'b';
            const move = rules.move(game.fen, from, to, promo);
            if (move != null) {
              messager.clear();
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

    const onDragStart = ({ sourceSquare: from }: Pick<BoardMove, 'sourceSquare'>) => {
      const player = game.nextPlayer();
      if (player instanceof Human && !game.isComplete) {
        const from2 = r90 ? rules.leftSquare(from) : from;
        return rules.isMoveable(game.fen, from2);
      }
      return false;
    };

    const onMovePiece = ({ sourceSquare: from, targetSquare: to }: BoardMove) => {
      if (helper.help.length > 1 && helper.help[0] == to && helper.help[1] == from) correct();
      config.startUndoTimer(game.log.length);
      doMove(r90 ? rules.leftSquare(from) : from, r90 ? rules.leftSquare(to) : to, true);
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
    const fen = refreshtimer.showBlank ? rules.CLEAR_GAME : game.fen;
    return (
      <Chessboard
        position={r90 ? rules.leftFen(fen) : fen}
        allowDrag={onDragStart}
        onDrop={onMovePiece}
        orientation={!r180 ? 'white' : 'black'}
        width={rendering.boardWidth}
        squareStyles={showMarkers()}
        lightSquareStyle={r90 ? blackSquareStyle : whiteSquareStyle}
        darkSquareStyle={r90 ? whiteSquareStyle : blackSquareStyle}
      />
    );
  }
);
