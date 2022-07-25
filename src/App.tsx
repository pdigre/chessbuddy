import React from 'react';
import { game, gameHistory, gameState } from './logic/game';
import { config } from './logic/config';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styles from './styles.module.scss';
import { History } from './components/History';
import { Panel } from './components/Panel';
import { FenInfo } from './components/FenInfo';
import { CP } from './components/CP';
import { ConfigMain } from './components/ConfigMain';
import { Board } from './components/Board';
import { PlayerInfo } from './components/PlayerInfo';
import { MessageBox, messager } from './components/MessageBox';
import { helper } from './logic/helper';
import { About } from './components/About';
import { rendering } from './logic/rendering';
import { refreshtimer } from './logic/refreshtimer';
import { playall } from './components/Emotion';
import { Refresh } from '@mui/icons-material';
import packageInfo from '../package.json';
import { themes } from './themes';
import { EmotionBox, emotioner } from './components/EmotionBox';

const App: React.FC = () => {
  const about = () => messager.display('About', <About />);
  const version = packageInfo.version;
  const theme = createTheme(themes[0].theme);
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
        <MessageBox messager={messager} />
        <EmotionBox emotioner={emotioner} />
        <ConfigMain config={config} />
      </div>
    </ThemeProvider>
  );
};

export default App;
