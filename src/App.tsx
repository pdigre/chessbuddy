import React, { useState } from 'react';
import * as rules from './data/rules';
import { locate, sanText } from './data/openings';
import { useGlobalState, usePersistentState } from './data/state';
import { getPlayers, playerInit } from './data/players';
import { ThemeProvider, unstable_createMuiStrictModeTheme } from '@material-ui/core/styles';
import styles from './styles.module.scss';
import { History } from './components/History';
import { Panel } from './components/Panel';
import { Config } from './components/Config';
import { Board } from './components/Board';
import { MessageBox, MessageBoxProps } from './components/MessageBox';

const theme = unstable_createMuiStrictModeTheme();

const App: React.FC = () => {
  const [message, setMessage] = useState<MessageBoxProps>();

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

  // New Game
  const [isPlaying, setPlaying] = useGlobalState('playing');
  const [fen, setFen] = useGlobalState('fen');
  const [history, setHistory] = useGlobalState('history');
  const [markHistory, setMarkHistory] = useGlobalState('markHistory');
  const [start, setStart] = useGlobalState('start');
  const [wtime, setWtime] = useGlobalState('wtime');
  const [btime, setBtime] = useGlobalState('btime');

  const newGame = () => {
    setHistory([]);
    setStart(new Date());
    setWtime(0);
    setBtime(0);
    setMarkHistory(-1);
    setFen(rules.NEW_GAME);
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

  const gotoMark = (mark: number) => {
    if (isPlaying) stopstart();
    setFen(rules.CLEAR_GAME);
    setFen(rules.replay(history, mark >= 0 ? mark : history.length));
  };

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
        <Board setMessage={setMessage} />
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
