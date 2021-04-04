import React, { useCallback, useState } from 'react';
import * as rules from './data/rules';
import { locate, sanText } from './data/openings';
import { useGlobalState, usePersistentState } from './data/state';
import { getPlayers, playerInit } from './data/players';
import { toMMSS, TimeKeeper } from './data/library';
import { ThemeProvider, unstable_createMuiStrictModeTheme } from '@material-ui/core/styles';
import { Link } from '@material-ui/core';
import styles from './styles.module.scss';
import { History } from './components/History';
import { Panel } from './components/Panel';
import { Config } from './components/Config';
import { Board } from './components/Board';
import { MessageBox, MessageBoxProps } from './components/MessageBox';

const theme = unstable_createMuiStrictModeTheme();

const App: React.FC = () => {
  const [message, setMessage] = useState<MessageBoxProps>();

  const [rotation, setRotation] = useGlobalState('rotation');
  const [white, setWhite] = useGlobalState('white');
  const [black, setBlack] = useGlobalState('black');
  const [fen, setFen] = useGlobalState('fen');
  const [history, setHistory] = useGlobalState('history');
  const [cp, setCp] = useGlobalState('cp');

  const about = () => {
    setMessage({
      title: 'About',
      msg: (
        <div>
          This chess program is open source and available at github.
          <ul>
            <li>
              <Link href="https://github.com/pdigre/chessbuddy" target="_blank" rel="noopener">
                Github pdigre/chessbuddy
              </Link>
            </li>
            <li>
              <Link
                href="https://github.com/pdigre/chessbuddy/wiki/User-guide"
                target="_blank"
                rel="noopener">
                User Guide / instructions
              </Link>
            </li>
          </ul>
        </div>
      ),
      buttons: [],
      response: reply => {
        setMessage({});
      },
    });
  };

  // New Game
  const [isPlaying, setPlaying] = useGlobalState('playing');
  const [markHistory, setMarkHistory] = useGlobalState('markHistory');
  const [timer, setTimer] = useGlobalState('timer');
  const [wtime, setWtime] = useGlobalState('wtime');
  const [btime, setBtime] = useGlobalState('btime');
  const [time, setTime] = useState(new Date().getTime());

  TimeKeeper.ticker = () => {
    const time = TimeKeeper.update(isPlaying);
    if (isPlaying) setTime(time);
  };
  TimeKeeper.white = wtime;
  TimeKeeper.black = btime;

  const newGame = () => {
    setHistory([]);
    setTimer(new Date().getTime());
    setWtime(0);
    setBtime(0);
    setMarkHistory(-1);
    setFen(rules.NEW_GAME);
  };

  const addMove = (newFen: string, san: string) => {
    setFen(newFen);
    setHistory(history => [...history, san]);
    setTimer(new Date().getTime());

    const isWhiteTurn = rules.isWhiteTurn(newFen);
    const diff = TimeKeeper.next(isWhiteTurn);
    if (isWhiteTurn) {
      setBtime(TimeKeeper.black);
    } else {
      setWtime(TimeKeeper.white);
    }
    TimeKeeper.reset();
  };

  // StopStart
  const isComplete = rules.isGameOver(fen);
  const [playerdata, setPlayerdata] = usePersistentState('playerdata', playerInit);
  const players = () => getPlayers(() => playerdata as string);

  const stopstart = () => {
    if (isComplete) newGame();
    if (!isPlaying && markHistory >= 0) {
      setMessage({
        title: 'Undo',
        msg: <div>Do you want to revert the game to the marked position?</div>,
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

  const gotoMark = (mark: number) => {
    if (isPlaying) stopstart();
    setFen(rules.CLEAR_GAME);
    setFen(rules.replay(history, mark >= 0 ? mark : history.length));
  };

  const isWhiteTurn = rules.isWhiteTurn(fen);
  const elapsed = TimeKeeper.getUsed();
  const wtimer = !isComplete && isWhiteTurn ? wtime + elapsed : wtime;
  const wtext = `White: ${white} ${toMMSS(wtimer)} ${
    isComplete && !isWhiteTurn ? ' ** Winner **' : ''
  }`;
  const btimer = !isComplete && !isWhiteTurn ? btime + elapsed : btime;
  const btext = `Black: ${black} ${toMMSS(btimer)} ${
    isComplete && isWhiteTurn ? ' ** Winner **' : ''
  }`;

  const lead = `, cp ${Math.abs(cp)} ${cp > 0 ? 'white' : 'black'}`;

  const r180 = rotation > 1;
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
          <p className={rotation % 2 == 1 ? styles.PlayerRight : styles.Player}>
            {r180 ? wtext : btext}
          </p>
          <Board setMessage={setMessage} addMove={addMove} />
          <p className={styles.Player}>
            {!r180 ? wtext : btext} {lead}
          </p>
        </div>

        <div className={styles.AppRight}>
          <h3 onClick={about}>♛ Chessbuddy 0.4</h3>
          <Panel stopstart={stopstart} />
          <p>{sanText(locate(history))}</p>
          <History gotoMark={gotoMark} setMessage={setMessage} />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;
