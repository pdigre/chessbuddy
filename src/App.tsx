import React, { useState, useEffect, useCallback } from 'react';
import * as rules from './data/rules';
import { Bot } from './data/bots';
import { San, locate, sanText } from './data/openings';
import { useGlobalState, usePersistentState } from './data/state';
import { setTimeFunc, toHHMMSS } from './data/library';
import { getPlayers, Human, playerInit } from './data/players';
import { ThemeProvider, unstable_createMuiStrictModeTheme } from '@material-ui/core/styles';
import styles from './styles.module.scss';
import Chessboard from 'chessboardjsx';
import { History } from './components/History';
import { Panel } from './components/Panel';
import { Config } from './components/Config';
import { MessageBox, MessageBoxProps } from './components/MessageBox';

const theme = unstable_createMuiStrictModeTheme();
const pgnStyle: React.CSSProperties = {
  background: 'radial-gradient(circle, #fffc00 36%, transparent 40%)',
  borderRadius: '50%',
};

type BoardMove = {
  sourceSquare: rules.Square;
  targetSquare: rules.Square;
};

const App: React.FC = () => {
  const [isPlaying, setPlaying] = useGlobalState('playing');
  const [fen, setFen] = useGlobalState('fen');
  const [start, setStart] = useGlobalState('start');
  const [history, setHistory] = useGlobalState('history');
  const [markHistory, setMarkHistory] = useGlobalState('markHistory');
  const [white, setWhite] = useGlobalState('white');
  const [black, setBlack] = useGlobalState('black');
  const [rotation, setRotation] = useGlobalState('rotation');
  const [wtime, setWtime] = useGlobalState('wtime');
  const [btime, setBtime] = useGlobalState('btime');
  const [message, setMessage] = useState<MessageBoxProps>();
  const [log, setLog] = usePersistentState('log', '');

  const doMove = useCallback(
    (fen: rules.Fen, from: rules.Square, to: rules.Square) => {
      const move = rules.move(fen, from, to);
      if (!move) {
        return;
      }
      if (isPlaying) {
        const [newFen, action] = move;
        setFen(newFen);
        addHistory(action.san);
      }
    },
    [isPlaying]
  );

  const addHistory = (san: string) => {
    setHistory(history => [...history, san]);
  };

  const newGame = () => {
    setHistory([]);
    setStart(new Date());
    setWtime(0);
    setBtime(0);
    setMarkHistory(-1);
    setFen(rules.NEW_GAME);
  };

  const stopstart = () => {
    if (isComplete) newGame();
    if (!isPlaying && markHistory >= 0) {
      setMessage({
        title: 'Undo',
        msg: 'Do you want to revert the game to the marked position?',
        buttons: ['Yes', 'No'],
        response: yes => {
          setMessage({});
          if (yes == 'Yes') {
            setHistory(history.slice(0, markHistory));
          }
          setMarkHistory(-1);
          setPlaying(true);
        },
      });
      return;
    }
    setPlaying(!isPlaying);
  };

  const about = () => {
    setMessage({
      title: 'About',
      msg:
        'This chess program is open source and\n available at github https://github.com/pdigre/chessbuddy',
      buttons: ['Ok'],
      response: reply => {
        setMessage({});
      },
    });
  };

  const isComplete = rules.isGameOver(fen);
  const isWhiteTurn = rules.isWhiteTurn(fen);
  const next = isWhiteTurn ? white : black;
  const [playerdata, setPlayerdata] = usePersistentState('playerdata', playerInit);
  const players = () => getPlayers(() => playerdata as string);
  const player = players().find(p => p.name == next);

  if (isPlaying && isComplete) {
    setPlaying(false);
  }

  const gotoMark = (mark: number) => {
    if (isPlaying) stopstart();
    setFen(rules.replay(history, mark >= 0 ? mark : history.length));
  };

  setTimeFunc(() => {
    if (isPlaying) {
      if (isWhiteTurn) {
        setWtime(wtime + 1);
      } else {
        setBtime(btime + 1);
      }
    }
  });

  const onDragStart = ({ sourceSquare: from }: Pick<BoardMove, 'sourceSquare'>) =>
    isPlaying && rules.isMoveable(fen, from) && player instanceof Human;

  const onMovePiece = ({ sourceSquare: from, targetSquare: to }: BoardMove) =>
    doMove(fen, from, to);

  const r90 = rotation % 2 == 1;
  const r180 = rotation > 1;
  const wtext = `White: ${white} ${toHHMMSS(wtime)} ${
    isComplete && !isWhiteTurn ? ' ** Winner **' : ''
  }`;
  const btext = `Black: ${black} ${toHHMMSS(btime)} ${
    isComplete && isWhiteTurn ? ' ** Winner **' : ''
  }`;

  useEffect(() => {
    if (!isPlaying) {
      return;
    }
    const player = players().find(p => p.name == next && p instanceof Bot);
    if (player instanceof Bot) {
      player.runBot(fen, ({ from, to }) => {
        doMove(fen, from, to);
      });
    }
    return () => {
      //
    };
  }, [isPlaying, fen, white, black, doMove]);

  const markers = {};
  const san: San | undefined = locate(history);
  if (san) {
    const sans = san.children.map(x => x.san);
    rules.findInfoMarkers(sans, fen).forEach(x => {
      Object.assign(markers, { [x]: pgnStyle });
    });
  }

  return (
    <ThemeProvider theme={theme}>
      <div className={styles.App}>
        <MessageBox {...message} />
        <Config
          newGame={newGame}
          stopstart={stopstart}
          setMessage={setMessage}
          players={players()}
        />
        <div className={styles.AppLeft}>
          <p className={r90 ? styles.PlayerRight : styles.Player}>{r180 ? wtext : btext}</p>
          <div className={r90 ? styles.Rotate : ''}>
            <Chessboard
              position={fen}
              allowDrag={onDragStart}
              onDrop={onMovePiece}
              orientation={!r180 ? 'white' : 'black'}
              width={700}
              squareStyles={markers}
            />
          </div>
          <p className={styles.Player}>{r180 ? btext : wtext}</p>
        </div>
        <div className={styles.AppRight}>
          <h3 onClick={about}>♛ Chessbuddy 0.3</h3>
          <Panel stopstart={stopstart} />
          <p>{sanText(san)}</p>
          <History gotoMark={gotoMark} setMessage={setMessage} />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;
