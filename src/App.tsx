import React from 'react';
import { game, gameState, gameHistory } from './data/game';
import { config } from './data/config';
import { ThemeProvider, unstable_createMuiStrictModeTheme } from '@material-ui/core/styles';
import styles from './styles.module.scss';
import { History } from './components/History';
import { Panel } from './components/Panel';
import { FenInfo } from './components/FenInfo';
import { CP } from './components/CP';
import { ConfigMain } from './components/ConfigMain';
import { Board } from './components/Board';
import { PlayerInfo } from './components/PlayerInfo';
import { MessageBox, messager } from './components/MessageBox';
import { helper } from './data/helper';
import { About } from './components/About';
import { rendering } from './data/rendering';
import { refreshtimer } from './data/refreshtimer';

const theme = unstable_createMuiStrictModeTheme();

const App: React.FC = () => {
  const about = () => messager.display('About', <About />);

  return (
    <ThemeProvider theme={theme}>
      <div className={styles.App}>
        <CP helper={helper} rendering={rendering} config={config} />
        <div className={styles.AppLeft}>
          <PlayerInfo isTop={true} game={game} config={config} />
          <Board
            helper={helper}
            gameState={gameState}
            rendering={rendering}
            config={config}
            refreshtimer={refreshtimer}
          />
          <PlayerInfo isTop={false} game={game} config={config} />
        </div>
        <div className={styles.AppRight}>
          <h3 onClick={about}>♛ Chessbuddy 0.9</h3>
          <Panel gameState={gameState} config={config} />
          <FenInfo game={game} />
          <History game={game} gameHistory={gameHistory} config={config} />
        </div>
        <MessageBox messager={messager} />
        <ConfigMain config={config} />
      </div>
    </ThemeProvider>
  );
};

export default App;
