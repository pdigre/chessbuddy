import React, { useEffect, useCallback } from 'react';
import * as rules from '../data/rules';
import { Bot } from '../data/bots';
import { helper, Helper } from '../data/helper';
import { Human } from '../data/players';
import { useGlobalState } from '../data/state';
import { game, GameState } from '../data/game';
import Chessboard from 'chessboardjsx';
import { messager } from './MessageBox';
import { observer } from 'mobx-react';

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

export type BoardProps = {
  helper: Helper;
  gameState: GameState;
};

export const Board = observer(({ gameState }: BoardProps) => {
  const [rotation, setRotation] = useGlobalState('rotation');

  const doMove = useCallback((from: rules.Square, to: rules.Square, isHuman: boolean) => {
    const move = rules.move(game.fen, from, to);
    if (!move) {
      return;
    }
    if (gameState.isPlaying || isHuman) {
      const [newFen, action] = move;
      if (action.promotion && isHuman) {
        const buttons = ['Queen', 'Rook', 'Knight', 'Bishop'];
        messager.display('Promotion', <div>Choose promotion piece</div>, buttons, reply => {
          let promo: 'b' | 'q' | 'n' | 'r' = 'q';
          if (reply == 'Rook') promo = 'r';
          if (reply == 'Knight') promo = 'n';
          if (reply == 'Bishop') promo = 'b';
          const move = rules.move(game.fen, from, to, promo);
          if (move != null) {
            messager.clear();
            const [newFen, action] = move;
            game.playMove(action.san);
          }
        });
      } else {
        game.playMove(action.san);
      }
    }
  }, []);

  const r90 = rotation % 2 == 1;
  const r180 = rotation > 1;

  const onDragStart = ({ sourceSquare: from }: Pick<BoardMove, 'sourceSquare'>) => {
    const player = game.nextPlayer();
    if (player instanceof Human && !game.isComplete) {
      const from2 = r90 ? rules.leftSquare(from) : from;
      return rules.isMoveable(game.fen, from2);
    }
    return false;
  };

  const onMovePiece = ({ sourceSquare: from, targetSquare: to }: BoardMove) => {
    doMove(r90 ? rules.leftSquare(from) : from, r90 ? rules.leftSquare(to) : to, true);
  };

  const showMarkers = () => {
    const markers = {};
    const g = game;
    g.pgns.forEach(x => Object.assign(markers, { [r90 ? rules.rightSquare(x) : x]: pgnStyle }));
    helper.help.forEach((x, i) => {
      Object.assign(markers, { [r90 ? rules.rightSquare(x) : x]: i > 1 ? helpStyle2 : helpStyle });
    });
    return markers;
  };

  return (
    <Chessboard
      position={r90 ? rules.leftFen(game.fen) : game.fen}
      allowDrag={onDragStart}
      onDrop={onMovePiece}
      orientation={!r180 ? 'white' : 'black'}
      width={600}
      squareStyles={showMarkers()}
      lightSquareStyle={r90 ? blackSquareStyle : whiteSquareStyle}
      darkSquareStyle={r90 ? whiteSquareStyle : blackSquareStyle}
    />
  );
});
