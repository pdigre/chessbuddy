import React from 'react';
import { editService, renderingService, clockService } from '../service/index.service';
import {
  playService,
  analyzerService,
  messageService,
  mediaService,
  dashboardService,
  historyService,
  configService,
  refreshService,
  openingsService,
} from '../service/index.service';
import { ConfigDialog } from './ConfigDialog';
import { Board } from './Board';
import { AnalyzerService } from '../service/analyzer.service';
import packageInfo from '../../package.json';
import { Mp4Dialog } from './Mp4Dialog';
import { ABOUT, MessageDialog } from './MessageDialog';
import { RenderingService } from '../service/rendering.service';
import { observer } from 'mobx-react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { MdRefresh } from 'react-icons/md';
import { MainButtonBar } from './MainButtonBar';
import { MainView } from './MainView';
import { ConfigService } from '../service/config.service';
import { PlayService } from '../service/play.service';
import { ClockService } from '../service/clock.service';
import { action } from 'mobx';

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

const CP = observer(
  ({ analyzer, config }: { analyzer: AnalyzerService; config: ConfigService }) => {
    if (!config.showCP) {
      return <div className="w-6 h-full flex flex-col flex-grow"></div>;
    }
    const { txt, blackTop, h1, h2 } = analyzer.getCpInfo();
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

const Ticker = observer(({ clock }: { clock: ClockService }) => <span>{clock.clockText}</span>);

const PlayerInfoBar = observer(({ isTop, play }: { isTop: boolean; play: PlayService }) => {
  const { other, label, showTicker, banner, isTextRight } = play.getPlayerInfo(isTop);
  return (
    <p className={'h-[31px] text-xl dark:text-white m-0 p-1' + (isTextRight ? ' text-right' : '')}>
      {label} &lt;
      {showTicker ? <Ticker clock={clockService} /> : other} &gt;
      {banner}
    </p>
  );
});

const FenInfo = observer(({ play }: { play: PlayService }) => {
  return <p>{openingsService.sanTextLocate(play.log)}</p>;
});

export const ChessBuddy = observer(({ rendering }: { rendering: RenderingService }) => {
  const about = () =>
    messageService.display('About', 'This chess program is open source and available at github.');
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
              <span onClick={action(about)} className="mx-5 text-xl">
                ChessBuddy {version}
              </span>
              <MdRefresh className="text-lg mx-5" onClick={action(mediaService.playAllAction)} />
            </h3>
            <MainButtonBar
              edit={editService}
              dashboard={dashboardService}
              history={historyService}
            />
            <FenInfo play={playService} />
            <MainView dashboard={dashboardService} edit={editService} />
          </div>
          <MessageDialog message={messageService} />
          <Mp4Dialog mp4={mediaService} />
          <ConfigDialog config={configService} />
        </div>
      </div>
    </ThemeProvider>
  );
});

const App: React.FC = () => <ChessBuddy rendering={renderingService} />;
export default App;
