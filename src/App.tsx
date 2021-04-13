import React, { useState } from 'react';
import { locate, sanText } from './data/openings';
import { game, gameState, gameHistory } from './data/game';
import { ThemeProvider, unstable_createMuiStrictModeTheme } from '@material-ui/core/styles';
import styles from './styles.module.scss';
import { History } from './components/History';
import { Panel } from './components/Panel';
import { Config } from './components/Config';
import { Board } from './components/Board';
import { PlayerInfo } from './components/PlayerInfo';
import { MessageBox, MessageBoxProps } from './components/MessageBox';
import { helper } from './data/helper';
import { About } from './components/About';

const theme = unstable_createMuiStrictModeTheme();

const App: React.FC = () => {
  const [message, setMessage] = useState<MessageBoxProps>();

  const about = () => {
    setMessage({
      title: 'About',
      msg: <About />,
      buttons: [],
      response: reply => {
        setMessage({});
      },
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <div className={styles.App}>
        <MessageBox {...message} />
        <Config setMessage={setMessage} />
        <div className={styles.AppLeft}>
          <PlayerInfo isTop={true} helper={helper} />
          <Board setMessage={setMessage} helper={helper} gameState={gameState} />
          <PlayerInfo isTop={false} helper={helper} />
        </div>
        <div className={styles.AppRight}>
          <h3 onClick={about}>♛ Chessbuddy 0.5</h3>
          <Panel gameState={gameState} setMessage={setMessage} />
          <p>{sanText(locate(game.log))}</p>
          <History setMessage={setMessage} game={game} gameHistory={gameHistory} />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;
