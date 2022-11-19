import React from 'react';
import { game, gameState } from '../../controller/game/game';
import { config } from '../../controller/config/config';
import { FenInfo } from './FenInfo';
import { CP } from './CP';
import { ConfigDialog } from '../config/ConfigDialog';
import { Board } from './Board';
import { PlayerInfoBar } from './PlayerInfoBar';
import { helper } from '../../controller/game/helper';
import { AboutDialog } from '../dialogs/AboutDialog';
import { rendering } from '../../controller/control/rendering';
import { refreshtimer } from '../../controller/control/refreshtimer';
import packageInfo from '../../../package.json';
import { message } from '../../controller/control/message';
import { mp4, playAll } from '../../controller/config/mp4';
import { Mp4Dialog } from '../dialogs/Mp4Dialog';
import { MessageDialog } from '../dialogs/MessageDialog';
import { Theme } from '../../controller/control/theme';
import { observer } from 'mobx-react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { MdRefresh } from 'react-icons/md';
import { MainButtonBar } from '../control/MainButtonBar';
import { MainView } from '../control/MainView';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
  components: {
    MuiTab: {
      styleOverrides: {
        root: {
          backgroundColor: 'lightgreen',
          '&$selected': {
            backgroundColor: 'blue',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: 'green',
        },
      },
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  components: {
    MuiTab: {
      styleOverrides: {
        root: {
          backgroundColor: 'darkgreen',
          '&$selected': {
            backgroundColor: 'blue',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: 'darkgreen',
        },
      },
    },
  },
});

export const ChessBuddy = observer(({ theme }: { theme: Theme }) => {
  const about = () => message.display('About', <AboutDialog />);
  const version = packageInfo.version;
  return (
    <ThemeProvider theme={theme.darkTheme ? darkTheme : lightTheme}>
      <CssBaseline />
      <div className={theme.darkTheme ? 'dark' : 'light'}>
        <div className="w-[1024px] h-[748px] bg-green-100 dark:bg-green-900 border-0 flex m-0 p-0 flex-row">
          <CP helper={helper} rendering={rendering} config={config} />
          <div className="flex flex-col flex-grow">
            <PlayerInfoBar isTop={true} game={game} config={config} />
            <Board
              helper={helper}
              gameState={gameState}
              rendering={rendering}
              config={config}
              refreshTimer={refreshtimer}
            />
            <PlayerInfoBar isTop={false} game={game} config={config} />
          </div>
          <div className="flex flex-col w-full text-center">
            <h3 className="h-8 text-lg dark:text-white flex flex-row">
              <span onClick={about} className="mx-5 text-xl">
                ChessBuddy {version}
              </span>
              <MdRefresh className="text-lg mx-5" onClick={playAll} />
            </h3>
            <MainButtonBar gameState={gameState} config={config} />
            <FenInfo game={game} />
            <MainView config={config} />
          </div>
          <MessageDialog message={message} />
          <Mp4Dialog mp4={mp4} />
          <ConfigDialog config={config} />
        </div>
      </div>
    </ThemeProvider>
  );
});
