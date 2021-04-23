import React from 'react';
import { game, gameState, gameHistory } from './data/game';
import { ThemeProvider, unstable_createMuiStrictModeTheme } from '@material-ui/core/styles';
import styles from './styles.module.scss';
import { History } from './components/History';
import { Panel } from './components/Panel';
import { FenInfo } from './components/FenInfo';
import { CP } from './components/CP';
import { Config } from './components/Config';
import { Board } from './components/Board';
import { PlayerInfo } from './components/PlayerInfo';
import { MessageBox, messager } from './components/MessageBox';
import { helper } from './data/helper';
import { About } from './components/About';
import { rendering } from './data/rendering';

const theme = unstable_createMuiStrictModeTheme();

const App: React.FC = () => {
  const about = () => messager.display('About', <About />);

  return (
    <ThemeProvider theme={theme}>
      <div className={styles.App}>
        <MessageBox messager={messager} />
        <Config />
        <CP helper={helper} rendering={rendering} />
        <div className={styles.AppLeft}>
          <PlayerInfo isTop={true} game={game} />
          <Board helper={helper} gameState={gameState} rendering={rendering} />
          <PlayerInfo isTop={false} game={game} />
        </div>
        <div className={styles.AppRight}>
          <h3 onClick={about}>♛ Chessbuddy 0.7</h3>
          <Panel gameState={gameState} />
          <FenInfo game={game} />
          <History game={game} gameHistory={gameHistory} />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;
