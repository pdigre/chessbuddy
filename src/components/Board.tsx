import React, { useEffect, useCallback, useState } from 'react';
import * as rules from '../data/rules';
import { Bot, helper } from '../data/bots';
import { Human } from '../data/players';
import { useGlobalState } from '../data/state';
import { gamerunner } from '../data/game';
import Chessboard from 'chessboardjsx';
import { MessageBoxProps } from './MessageBox';

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
  setMessage: (value: React.SetStateAction<MessageBoxProps | undefined>) => void;
};

export const Board: React.FC<BoardProps> = ({ setMessage }) => {
  const [isPlaying, setPlaying] = useGlobalState('playing');
  const [fen, setFen] = useGlobalState('fen');
  const [log, setLog] = useGlobalState('log');
  const [rotation, setRotation] = useGlobalState('rotation');
  const [cp, setCp] = useGlobalState('cp');
  const [help, setHelp] = useState([] as string[]);

  const doMove = useCallback(
    (fen: rules.Fen, from: rules.Square, to: rules.Square, isHuman: boolean) => {
      const move = rules.move(fen, from, to);
      if (!move) {
        return;
      }
      if (isPlaying || isHuman) {
        const [newFen, action] = move;
        if (action.promotion && isHuman) {
          const buttons = ['Queen', 'Rook', 'Knight', 'Bishop'];
          setMessage({
            title: 'Promotion',
            msg: <div>Choose promotion piece</div>,
            buttons: buttons,
            response: reply => {
              let promo: 'b' | 'q' | 'n' | 'r' = 'q';
              if (reply == 'Rook') promo = 'r';
              if (reply == 'Knight') promo = 'n';
              if (reply == 'Bishop') promo = 'b';
              const move = rules.move(fen, from, to, promo);
              if (move != null) {
                setMessage({});
                const [newFen, action] = move;
                setFen(newFen);
                setLog(gamerunner.addMove(action.san));
                setHelp([]);
              }
            },
          });
        } else {
          setFen(newFen);
          setLog(gamerunner.addMove(action.san));
          setHelp([]);
        }
      }
    },
    [isPlaying, setFen, setLog, setHelp]
  );

  if (isPlaying && gamerunner.getGame().isComplete) {
    setPlaying(false);
  }

  const r90 = rotation % 2 == 1;
  const r180 = rotation > 1;

  const onDragStart = ({ sourceSquare: from }: Pick<BoardMove, 'sourceSquare'>) => {
    const g = gamerunner.getGame();
    const player = g.nextPlayer();
    if (player instanceof Human && !g.isComplete) {
      const from2 = r90 ? rules.leftSquare(from) : from;
      return rules.isMoveable(fen, from2);
    }
    return false;
  };

  const onMovePiece = ({ sourceSquare: from, targetSquare: to }: BoardMove) => {
    doMove(fen, r90 ? rules.leftSquare(from) : from, r90 ? rules.leftSquare(to) : to, true);
    if (!isPlaying) setPlaying(true);
  };

  useEffect(() => {
    if (!isPlaying) {
      return;
    }
    const g = gamerunner.getGame();
    const player = g.nextPlayer();
    if (player instanceof Bot) {
      player.runBot(g.fen, ({ from, to }) => {
        doMove(g.fen, from, to, false);
      });
    }
    if (player instanceof Human) {
      if (!g.help.length) {
        helper.run(g.fen, ({ moves, cp }) => {
          const squares: Set<string> = new Set();
          moves.forEach(x => squares.add(x));
          g.help = [...squares];
          setHelp(g.help);
          setCp(g.isWhiteTurn ? cp : -cp);
        });
      }
    }
    return () => {
      //
    };
  }, [isPlaying, help, setHelp, doMove]);

  const showMarkers = () => {
    const markers = {};
    const g = gamerunner.getGame();
    g.pgns.forEach(x => Object.assign(markers, { [r90 ? rules.rightSquare2(x) : x]: pgnStyle }));
    g.help.forEach((x, i) =>
      Object.assign(markers, { [r90 ? rules.rightSquare2(x) : x]: i > 1 ? helpStyle2 : helpStyle })
    );
    return markers;
  };

  return (
    <Chessboard
      position={r90 ? rules.leftFen(fen) : fen}
      allowDrag={onDragStart}
      onDrop={onMovePiece}
      orientation={!r180 ? 'white' : 'black'}
      width={700}
      squareStyles={showMarkers()}
      lightSquareStyle={r90 ? blackSquareStyle : whiteSquareStyle}
      darkSquareStyle={r90 ? whiteSquareStyle : blackSquareStyle}
    />
  );
};
