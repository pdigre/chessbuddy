import React, { useEffect, useCallback, useState } from 'react';
import * as rules from '../data/rules';
import { Bot } from '../data/bots';
import { San, locate } from '../data/openings';
import { useGlobalState, usePersistentState } from '../data/state';
import { getPlayers, helper, Human, playerInit } from '../data/players';
import Chessboard from 'chessboardjsx';
import { MessageBoxProps } from './MessageBox';

const pgnStyle: React.CSSProperties = {
  background: 'radial-gradient(circle, #fffc00 36%, transparent 40%)',
  borderRadius: '50%',
};
const helpStyle: React.CSSProperties = {
  background: 'radial-gradient(circle, #00ff4c 36%, transparent 30%)',
  borderRadius: '70%',
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
  addMove: (fen: string, san: string) => void;
};

export const Board: React.FC<BoardProps> = ({ setMessage, addMove }) => {
  const [isPlaying, setPlaying] = useGlobalState('playing');
  const [fen, setFen] = useGlobalState('fen');
  const [history, setHistory] = useGlobalState('history');
  const [white, setWhite] = useGlobalState('white');
  const [black, setBlack] = useGlobalState('black');
  const [rotation, setRotation] = useGlobalState('rotation');
  const [help, setHelp] = useState([] as string[]);
  const [playerdata, setPlayerdata] = usePersistentState('playerdata', playerInit);
  const players = () => getPlayers(() => playerdata as string);

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
                const [newFen, action] = move;
                setMessage({});
                addMove(newFen, action.san);
                setHelp([]);
              }
            },
          });
        } else {
          addMove(newFen, action.san);
          setHelp([]);
        }
      }
    },
    [isPlaying]
  );

  const isComplete = rules.isGameOver(fen);
  const isWhiteTurn = rules.isWhiteTurn(fen);
  const next = isWhiteTurn ? white : black;
  const player = players().find(p => p.name == next);

  if (isPlaying && isComplete) {
    setPlaying(false);
  }

  const r90 = rotation % 2 == 1;
  const r180 = rotation > 1;

  const onDragStart = ({ sourceSquare: from }: Pick<BoardMove, 'sourceSquare'>) => {
    if (player instanceof Human) {
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
    const isWhiteTurn = rules.isWhiteTurn(fen);
    const next = isWhiteTurn ? white : black;
    const player = players().find(p => p.name == next);
    if (player instanceof Bot) {
      player.runBot(fen, ({ from, to }) => {
        doMove(fen, from, to, false);
      });
    }
    if (player instanceof Human) {
      if (!help.length) {
        helper.runBot(fen, ({ from, to }) => {
          setHelp([from, to]);
        });
      }
    }
    return () => {
      //
    };
  }, [isPlaying, fen, white, black, doMove, players]);

  const showMarkers = () => {
    const markers = {};
    const san: San | undefined = locate(history);
    if (san) {
      const pgns = rules.findInfoMarkers(
        san.children.map(x => x.san),
        fen
      );
      pgns.forEach(x => Object.assign(markers, { [r90 ? rules.rightSquare2(x) : x]: pgnStyle }));
    }
    help.forEach(x => Object.assign(markers, { [r90 ? rules.rightSquare2(x) : x]: helpStyle }));
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
