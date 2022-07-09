import React from 'react';
import { game, gameHistory, gameState } from './data/game';
import { config } from './data/config';
import { ThemeProvider } from '@material-tailwind/react';
import styles from './styles.module.scss';
import { History } from './components/History';
import { Panel } from './components/Panel';
import { FenInfo } from './components/FenInfo';
import { CP } from './components/CP';
import { ConfigMain } from './components/ConfigMain';
import { Board } from './components/Board';
import { PlayerInfo } from './components/PlayerInfo';
import { MessageBox, messageDialog } from './components/MessageBox';
import { helper } from './data/helper';
import { About } from './components/About';
import { rendering } from './data/rendering';
import { refreshtimer } from './data/refreshtimer';
import { playall } from './components/Emotion';
import { Refresh } from '@mui/icons-material';
import packageInfo from '../package.json';

const App: React.FC = () => {
  const about = () => messageDialog.display('About', <About />);
  const version = packageInfo.version;

  const customTheme = {
    defaultProps: {},
    valid: {},
    styles: {},
  };
  return (
    <ThemeProvider value={customTheme}>
      <div className={styles.App}>
        <CP helper={helper} rendering={rendering} config={config} />
        <div className={styles.AppLeft}>
          <PlayerInfo isTop={true} game={game} config={config} />
          <Board
            helper={helper}
            gameState={gameState}
            rendering={rendering}
            config={config}
            refreshTimer={refreshtimer}
          />
          <PlayerInfo isTop={false} game={game} config={config} />
        </div>
        <div className={styles.AppRight}>
          <h3>
            <span onClick={about}>ChessBuddy {version}</span>
            <Refresh fontSize="small" onClick={playall} />
          </h3>
          <Panel gameState={gameState} config={config} />
          <FenInfo game={game} />
          <History game={game} gameHistory={gameHistory} config={config} />
        </div>
        <MessageBox messageDialog={messageDialog} />
        <ConfigMain config={config} />
      </div>
    </ThemeProvider>
  );
};

export default App;
