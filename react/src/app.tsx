/* eslint-disable @typescript-eslint/no-namespace */
import React from 'react';
import { editService, renderingService } from '../../common/service/index.service';
import {
  playService,
  analyzerService,
  messageService,
  mediaService,
  dashboardService,
  historyService,
  configService,
  refreshService,
} from '../../common/service/index.service';
import packageInfo from '../package.json';
import { Mp4dialog } from './mp4dialog';
import { RenderingService } from '../../common/service/rendering.service';
import { observer } from 'mobx-react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { MdRefresh } from 'react-icons/md';
import { PanelButtonbar } from './panel-buttonbar';
import { Panel } from './panel';
import { action } from 'mobx';
import { ConfigDialog } from './config-dialog';
import { MessageDialog } from './message-dialog';
import { Board } from './board';
import { CP, FenInfo, PlayerInfoBar } from './app-widgets';

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
export const ChessBuddy = observer(({ rendering }: { rendering: RenderingService }) => {
  const version = packageInfo.version;
  return (
    <ThemeProvider theme={rendering.darkTheme ? darkTheme : lightTheme}>
      <CssBaseline />
      <div className={rendering.darkTheme ? 'dark' : 'light'}>
        <div className="w-[1024px] h-[748px] bg-green-100 dark:bg-green-900 border-0 flex m-0 p-0 flex-row">
          <CP analyzer={analyzerService} config={configService} />
          <div className="flex flex-col flex-grow">
            <PlayerInfoBar isTop={true} play={playService} />
            <Board
              analyzer={analyzerService}
              edit={editService}
              rendering={rendering}
              config={configService}
              refresh={refreshService}
            />
            <PlayerInfoBar isTop={false} play={playService} />
          </div>
          <div className="flex flex-col w-full text-center">
            <h3 className="h-8 text-lg dark:text-white flex flex-row">
              <span
                onClick={action(() => messageService.standard('about'))}
                className="mx-5 text-xl"
              >
                ChessBuddy {version}
              </span>
              <MdRefresh className="text-lg mx-5" onClick={action(mediaService.playAllAction)} />
              <a href="wc.html">react</a>
            </h3>
            <PanelButtonbar
              edit={editService}
              dashboard={dashboardService}
              history={historyService}
            />
            <FenInfo play={playService} />
            <Panel dashboard={dashboardService} edit={editService} />
          </div>
          <MessageDialog message={messageService} />
          <Mp4dialog mp4={mediaService} />
          <ConfigDialog config={configService} />
        </div>
      </div>
    </ThemeProvider>
  );
});

const App: React.FC = () => <ChessBuddy rendering={renderingService} />;
export default App;
