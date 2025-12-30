import React from 'react';
import { observer } from 'mobx-react';
import { action } from 'mobx';

// MUI Imports
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Icons
import { MdRefresh } from 'react-icons/md';

// App Services
import {
  editService,
  renderingService,
  playService,
  analyzerService,
  messageService,
  mediaService,
  dashboardService,
  historyService,
  configService,
} from '../../common/service/index.service';
import type { RenderingService } from '../../common/service/rendering.service';

// App Components
import { Mp4dialog } from './mp4dialog';
import { ConfigDialog } from './config-dialog';
import { MessageDialog } from './message-dialog';
import { Board } from './board';
import { CP, FenInfo, PlayerInfoBar } from './app-widgets';
import { PanelButtonbar } from './panel-buttonbar';
import { Panel } from './panel';

// Theming
import { lightTheme, darkTheme } from './theme';

// A new sub-component for the right-hand panel to improve structure.
// It can be moved to its own file for better organization.
const SidePanel = observer(() => {
  const version = messageService.getVersion();

  // Extracting handlers makes the JSX cleaner and preserves the MobX action wrapping.
  const handleAboutClick = action(() => messageService.standard('about'));
  const handlePlayAll = action(mediaService.playAllAction);

  return (
    <div className="flex flex-col w-full text-center">
      <h3 className="h-8 text-lg dark:text-white flex flex-row items-center">
        <span onClick={handleAboutClick} className="mx-5 cursor-pointer text-xl">
          ChessBuddy {version}
        </span>
        <MdRefresh className="mx-5 cursor-pointer text-lg" onClick={handlePlayAll} />
        <a href="wc.html">react</a>
      </h3>
      <PanelButtonbar edit={editService} dashboard={dashboardService} history={historyService} />
      <FenInfo play={playService} />
      <Panel dashboard={dashboardService} edit={editService} />
    </div>
  );
});

export const ChessBuddy = observer(({ rendering }: { rendering: RenderingService }) => {
  const { width, height } = rendering.getSize();
  const style: React.CSSProperties = {
    width: `${width}px`,
    height: `${height}px`,
  };

  return (
    <ThemeProvider theme={rendering.darkTheme ? darkTheme : lightTheme}>
      <CssBaseline />
      <div className={rendering.darkTheme ? 'dark' : 'light'}>
        <div
          className="bg-green-100 dark:bg-green-900 border-0 flex m-0 p-0 flex-row"
          style={style}>
          <CP analyzer={analyzerService} rendering={rendering} />
          <div className="flex flex-col flex-grow">
            <PlayerInfoBar isTop={true} play={playService} />
            <Board edit={editService} rendering={rendering} config={configService} />
            <PlayerInfoBar isTop={false} play={playService} />
          </div>
          <SidePanel />
        </div>
        {/* Dialogs are kept at the top level for proper stacking context */}
        <MessageDialog message={messageService} />
        <Mp4dialog mp4={mediaService} />
        <ConfigDialog config={configService} />
      </div>
    </ThemeProvider>
  );
});

const App: React.FC = () => <ChessBuddy rendering={renderingService} />;
export default App;
