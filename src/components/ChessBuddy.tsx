import React from 'react';
import { game, gameState } from '../logic/game';
import { config } from '../logic/config';
import { History } from './History';
import { Panel } from './Panel';
import { FenInfo } from './FenInfo';
import { CP } from './CP';
import { ConfigDialog } from './ConfigDialog';
import { Board } from './Board';
import { PlayerInfo } from './PlayerInfo';
import { helper } from '../logic/helper';
import { About } from './About';
import { rendering } from '../logic/rendering';
import { refreshtimer } from '../logic/refreshtimer';
import packageInfo from '../../package.json';
import { message } from '../logic/message';
import { mp4, playAll } from '../logic/mp4';
import { Mp4Dialog } from './Mp4Dialog';
import { MessageDialog } from './MessageDialog';
import { gameHistory } from '../logic/history';
import { Theme } from '../logic/theme';
import { observer } from 'mobx-react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { MdRefresh } from 'react-icons/md';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});
const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

export const ChessBuddy = observer(({ theme }: { theme: Theme }) => {
  const about = () => message.display('About', <About />);
  const version = packageInfo.version;
  return (
    <ThemeProvider theme={theme.darkTheme ? darkTheme : lightTheme}>
      <CssBaseline />
      <div className={theme.darkTheme ? 'dark' : 'light'}>
        <div className="w-[1024px] h-[748px] bg-green-100 dark:bg-green-900 border-0 flex m-0 p-0 flex-row">
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
            <h3 className="h-8 text-lg dark:text-white flex flex-row">
              <span onClick={about} className="mx-5 text-xl">
                ChessBuddy {version}
              </span>
              <MdRefresh className="text-lg mx-5" onClick={playAll} />
            </h3>
            <Panel gameState={gameState} config={config} />
            <FenInfo game={game} />
            <History game={game} gameHistory={gameHistory} config={config} />
          </div>
          <MessageDialog message={message} />
          <Mp4Dialog mp4={mp4} />
          <ConfigDialog config={config} />
        </div>
      </div>
    </ThemeProvider>
  );
});
