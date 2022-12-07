import React from 'react';
import { playService, gameState } from '../../services/play.service';
import { config } from '../../model/config';
import { FenInfo } from './FenInfo';
import { CP } from './CP';
import { ConfigDialog } from '../config/ConfigDialog';
import { Board } from './Board';
import { PlayerInfoBar } from './PlayerInfoBar';
import { analyzerService } from '../../services/analyzer.service';
import { AboutDialog } from './AboutDialog';
import { rendering } from '../../services/control/rendering';
import { refreshtimer } from '../../services/control/refreshtimer';
import packageInfo from '../../../package.json';
import { messageService } from '../../services/message.service';
import { mp4service } from '../../services/mp4.service';
import { Mp4Dialog } from './Mp4Dialog';
import { MessageDialog } from './MessageDialog';
import { Theme } from '../../services/control/theme';
import { observer } from 'mobx-react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { MdRefresh } from 'react-icons/md';
import { MainButtonBar } from '../panel/MainButtonBar';
import { MainView } from '../panel/MainView';
import { historyService } from '../../services/history.service';

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
  const about = () => messageService.display('About', <AboutDialog />);
  const version = packageInfo.version;
  return (
    <ThemeProvider theme={theme.darkTheme ? darkTheme : lightTheme}>
      <CssBaseline />
      <div className={theme.darkTheme ? 'dark' : 'light'}>
        <div className="w-[1024px] h-[748px] bg-green-100 dark:bg-green-900 border-0 flex m-0 p-0 flex-row">
          <CP helper={analyzerService} rendering={rendering} config={config} />
          <div className="flex flex-col flex-grow">
            <PlayerInfoBar isTop={true} game={playService} config={config} />
            <Board
              helper={analyzerService}
              gameState={gameState}
              rendering={rendering}
              config={config}
              refreshTimer={refreshtimer}
            />
            <PlayerInfoBar isTop={false} game={playService} config={config} />
          </div>
          <div className="flex flex-col w-full text-center">
            <h3 className="h-8 text-lg dark:text-white flex flex-row">
              <span onClick={about} className="mx-5 text-xl">
                ChessBuddy {version}
              </span>
              <MdRefresh className="text-lg mx-5" onClick={mp4service.playAll} />
            </h3>
            <MainButtonBar gameState={gameState} history={historyService} />
            <FenInfo game={playService} />
            <MainView gameState={gameState} />
          </div>
          <MessageDialog message={messageService} />
          <Mp4Dialog mp4={mp4service} />
          <ConfigDialog config={config} />
        </div>
      </div>
    </ThemeProvider>
  );
});
