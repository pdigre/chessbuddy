import React, { ChangeEvent, MouseEvent, ReactElement } from 'react';
import { Box, Dialog, Tab, Tabs, Typography } from '@mui/material';
import { ConfigGame } from './ConfigGame';
import { ConfigHuman } from './ConfigHuman';
import { ConfigDisplay } from './ConfigDisplay';
import { ConfigBot } from './ConfigBot';
import { server } from '../../services/integration/server';
import { observer } from 'mobx-react';
import { Config } from '../../model/config';
import { refreshtimer } from '../../services/control/refreshtimer';
import { theme } from '../../services/control/theme';
import { FaChess, FaClock, FaRobot } from 'react-icons/fa';
import { MdMonitor, MdPeople } from 'react-icons/md';
import { ConfigClock } from './ConfigClock';
import { game } from '../../services/game/game';

export const ConfigDialog = observer(({ config }: { config: Config }) => {
  const TabPanel = (props: { children: ReactElement; index: number }) => {
    const { children, index } = props;
    return (
      <div
        role="tabpanel"
        hidden={config.showTab !== index}
        id={`nav-tabpanel-${index}`}
        aria-labelledby={`nav-tab-${index}`}
        className="dark:bg-green-900 dark:text-white">
        {config.showTab === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  };

  // eslint-disable-next-line
  const handleChange = (event: ChangeEvent<{}>, newValue: number) => {
    config.showTab = newValue as number;
  };

  const handleClose = () => {
    config.showTab = -1;
    refreshtimer.startRefreshTimer();
  };

  const prevent = (event: MouseEvent<HTMLAnchorElement>) => event.preventDefault();

  return (
    <Dialog
      aria-labelledby="simple-dialog-title"
      open={config.showTab >= 0}
      onClose={handleClose}
      maxWidth="xl"
      className={'text-center text-xl'}>
      <Tabs
        value={config.showTab}
        onChange={handleChange}
        aria-label="Settings"
        variant="fullWidth">
        <Tab
          component="a"
          onClick={prevent}
          label={<div className="text-xl">Game</div>}
          icon={<FaChess className="text-3xl" />}
          iconPosition="start"
          id="nav-tab-0"
        />
        <Tab
          component="a"
          onClick={prevent}
          label={<div className="text-xl">Display</div>}
          icon={<MdMonitor className="text-3xl" />}
          iconPosition="start"
          id="nav-tab-1"
        />
        <Tab
          component="a"
          onClick={prevent}
          label={<div className="text-xl">Humans</div>}
          icon={<MdPeople className="text-3xl" />}
          iconPosition="start"
          id="nav-tab-2"
        />
        <Tab
          component="a"
          onClick={prevent}
          label={<div className="text-xl">Bots</div>}
          icon={<FaRobot className="text-3xl" />}
          iconPosition="start"
          id="nav-tab-3"
        />
        <Tab
          component="a"
          onClick={prevent}
          label={<div className="text-xl">Clocks</div>}
          icon={<FaClock className="text-3xl" />}
          iconPosition="start"
          id="nav-tab-3"
        />
      </Tabs>
      <TabPanel index={0}>
        <ConfigGame game={game} config={config} />
      </TabPanel>
      <TabPanel index={1}>
        <ConfigDisplay config={config} theme={theme} />
      </TabPanel>
      <TabPanel index={2}>
        <ConfigHuman config={config} server={server} />
      </TabPanel>
      <TabPanel index={3}>
        <ConfigBot config={config} />
      </TabPanel>
      <TabPanel index={4}>
        <ConfigClock config={config} />
      </TabPanel>
    </Dialog>
  );
});
