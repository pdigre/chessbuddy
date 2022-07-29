import React from 'react';
import { game, gameHistory, gameState } from './logic/game';
import { config } from './logic/config';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { History } from './components/History';
import { Panel } from './components/Panel';
import { FenInfo } from './components/FenInfo';
import { CP } from './components/CP';
import { ConfigDialog } from './components/ConfigDialog';
import { Board } from './components/Board';
import { PlayerInfo } from './components/PlayerInfo';
import { helper } from './logic/helper';
import { About } from './components/About';
import { rendering } from './logic/rendering';
import { refreshtimer } from './logic/refreshtimer';
import { Refresh } from '@mui/icons-material';
import packageInfo from '../package.json';
import { themes } from './themes';
import { message } from './logic/message';
import { mp4, playAll } from './logic/mp4';
import { Mp4Dialog } from './components/Mp4Dialog';
import { MessageDialog } from './components/MessageDialog';

const App: React.FC = () => {
  const about = () => message.display('About', <About />);
  const version = packageInfo.version;
  const theme = createTheme(themes[0].theme);
  return (
    <ThemeProvider theme={theme}>
      <div className="w-[1024px] h-[748px] bg-green-100 border-0 flex m-0 p-0 flex-row">
        <CP helper={helper} rendering={rendering} config={config} />
        <div className="flex flex-col flex-grow">
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
        <div className="flex flex-col w-full text-center">
          <h3 className="h-8 text-lg">
            <span onClick={about}>ChessBuddy {version}</span>
            <Refresh fontSize="small" onClick={playAll} />
          </h3>
          <Panel gameState={gameState} config={config} />
          <FenInfo game={game} />
          <History game={game} gameHistory={gameHistory} config={config} />
        </div>
      </div>
      <MessageDialog message={message} />
      <Mp4Dialog mp4={mp4} />
      <ConfigDialog config={config} />
    </ThemeProvider>
  );
};

export default App;
