import React from 'react';
import { renderingService } from '../service/index.service';
import {
  playService,
  analyzerService,
  messageService,
  mp4service,
  dashboardService,
  historyService,
  configService,
  refreshService,
  openingsService,
} from '../service/index.service';
import { ConfigDialog } from './ConfigDialog';
import { Board } from './Board';
import { PlayerInfoBar } from './PlayerInfoBar';
import { AnalyzerService } from '../service/analyzer.service';
import { AboutDialog } from './AboutDialog';
import packageInfo from '../../package.json';
import { Mp4Dialog } from './Mp4Dialog';
import { MessageDialog } from './MessageDialog';
import { RenderingService } from '../service/rendering.service';
import { observer } from 'mobx-react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { MdRefresh } from 'react-icons/md';
import { MainButtonBar } from './MainButtonBar';
import { MainView } from './MainView';
import { ConfigService } from '../model/config';
import { PlayService } from '../service/play.service';

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

export const CP = observer(
  ({
    analyzer,
    rendering,
    config,
  }: {
    analyzer: AnalyzerService;
    rendering: RenderingService;
    config: ConfigService;
  }) => {
    if (!config.showCP) {
      return <div className="w-6 h-full flex flex-col flex-grow"></div>;
    }
    const cp = analyzer.cp;
    const blackTop = config.rotation > 1;
    const cp2 = isNaN(cp) ? 10000 : Math.abs(cp);
    const whiteLead = cp > 0;
    const txt = `cp ${cp2} ${whiteLead ? 'white' : 'black'}`;
    const h = rendering.height - 150;
    const x = Math.min(h, cp2);
    const s = (h - x) / 2 + 75;
    const isW = whiteLead != blackTop;
    const h1 = (isW ? 0 : x) + s + 'px';
    const h2 = (isW ? x : 0) + s + 'px';
    const coloring = (black: boolean) => (black ? 'bg-black text-white' : 'bg-white text-black');
    return (
      <div className="w-6 h-full flex flex-col flex-grow [&>div]:[writing-mode:vertical-lr] [&>div]:text-center">
        <div className={coloring(!blackTop)} style={{ height: h1 }}>
          {txt}
        </div>
        <div className={coloring(blackTop)} style={{ height: h2 }}>
          {txt}
        </div>
      </div>
    );
  }
);

export const FenInfo = observer(({ play }: { play: PlayService }) => {
  return <p>{openingsService.sanTextLocate(play.log)}</p>;
});

export const ChessBuddy = observer(({ rendering }: { rendering: RenderingService }) => {
  const about = () => messageService.display('About', <AboutDialog />);
  const version = packageInfo.version;
  return (
    <ThemeProvider theme={rendering.darkTheme ? darkTheme : lightTheme}>
      <CssBaseline />
      <div className={rendering.darkTheme ? 'dark' : 'light'}>
        <div className="w-[1024px] h-[748px] bg-green-100 dark:bg-green-900 border-0 flex m-0 p-0 flex-row">
          <CP analyzer={analyzerService} rendering={rendering} config={configService} />
          <div className="flex flex-col flex-grow">
            <PlayerInfoBar isTop={true} play={playService} config={configService} />
            <Board
              analyzer={analyzerService}
              dashboard={dashboardService}
              rendering={rendering}
              config={configService}
              refresh={refreshService}
            />
            <PlayerInfoBar isTop={false} play={playService} config={configService} />
          </div>
          <div className="flex flex-col w-full text-center">
            <h3 className="h-8 text-lg dark:text-white flex flex-row">
              <span onClick={about} className="mx-5 text-xl">
                ChessBuddy {version}
              </span>
              <MdRefresh className="text-lg mx-5" onClick={mp4service.playAll} />
            </h3>
            <MainButtonBar dashboard={dashboardService} history={historyService} />
            <FenInfo play={playService} />
            <MainView dashboard={dashboardService} />
          </div>
          <MessageDialog message={messageService} />
          <Mp4Dialog mp4={mp4service} />
          <ConfigDialog config={configService} />
        </div>
      </div>
    </ThemeProvider>
  );
});

const App: React.FC = () => <ChessBuddy rendering={renderingService} />;
export default App;
