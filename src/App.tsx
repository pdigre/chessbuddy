import React, { useState } from 'react';
import * as rules from './data/rules';
import { locate, sanText } from './data/openings';
import { useGlobalState } from './data/state';
import { gamerunner } from './data/game';
import { ThemeProvider, unstable_createMuiStrictModeTheme } from '@material-ui/core/styles';
import { Link } from '@material-ui/core';
import styles from './styles.module.scss';
import { History } from './components/History';
import { Panel } from './components/Panel';
import { Config } from './components/Config';
import { Board } from './components/Board';
import { PlayerInfo } from './components/PlayerInfo';
import { MessageBox, MessageBoxProps } from './components/MessageBox';

const theme = unstable_createMuiStrictModeTheme();

const App: React.FC = () => {
  const [message, setMessage] = useState<MessageBoxProps>();

  const [white, setWhite] = useGlobalState('white');
  const [black, setBlack] = useGlobalState('black');
  const [fen, setFen] = useGlobalState('fen');
  const [log, setLog] = useGlobalState('log');

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
  const [markLog, setMarkLog] = useGlobalState('markLog');

  const newGame = () => {
    gamerunner.newGame(white, black);
    setLog([]);
    setMarkLog(-1);
    setFen(rules.NEW_GAME);
  };

  const stopstart = () => {
    if (gamerunner.getGame().isComplete) newGame();
    if (!isPlaying && markLog >= 0) {
      setMessage({
        title: 'Undo',
        msg: <div>Do you want to revert the game to the marked position?</div>,
        buttons: ['Yes', 'No'],
        response: yes => {
          setMessage({});
          if (yes == 'Yes') {
            const h = log.slice(0, markLog + 1);
            setLog(h);
            gamerunner.assignLog(h);
          }
          setMarkLog(-1);
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
    setFen(rules.replay(log, mark >= 0 ? mark : log.length));
  };

  return (
    <ThemeProvider theme={theme}>
      <div className={styles.App}>
        <MessageBox {...message} />
        <Config newGame={newGame} stopstart={stopstart} setMessage={setMessage} />
        <div className={styles.AppLeft}>
          <PlayerInfo isTop={true} />
          <Board setMessage={setMessage} />
          <PlayerInfo isTop={false} />
        </div>
        <div className={styles.AppRight}>
          <h3 onClick={about}>♛ Chessbuddy 0.5</h3>
          <Panel stopstart={stopstart} />
          <p>{sanText(locate(log))}</p>
          <History gotoMark={gotoMark} setMessage={setMessage} />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;
