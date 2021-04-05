import React, { useState } from 'react';
import * as rules from './data/rules';
import { locate, sanText } from './data/openings';
import { useGlobalState } from './data/state';
import { gamerunner } from './data/game';
import { TimeKeeper } from './data/library';
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
  const [time, setTime] = useState(new Date().getTime());

  TimeKeeper.ticker = () => {
    const time = TimeKeeper.update(isPlaying);
    if (isPlaying) setTime(time);
  };

  const newGame = () => {
    gamerunner.newGame(white, black);
    setHistory([]);
    setMarkHistory(-1);
    setFen(rules.NEW_GAME);
  };

  // StopStart
  const isComplete = rules.isGameOver(fen);

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

  const [wtext, btext] = gamerunner.game.getTitleTexts();
  const lead = `, cp ${Math.abs(cp)} ${cp > 0 ? 'white' : 'black'}`;
  const r180 = rotation > 1;
  return (
    <ThemeProvider theme={theme}>
      <div className={styles.App}>
        <MessageBox {...message} />
        <Config newGame={newGame} stopstart={stopstart} setMessage={setMessage} />
        <div className={styles.AppLeft}>
          <p className={rotation % 2 == 1 ? styles.PlayerRight : styles.Player}>
            {r180 ? wtext : btext}
          </p>
          <Board setMessage={setMessage} />
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
