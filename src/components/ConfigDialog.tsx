import React, { ChangeEvent, MouseEvent, ReactElement } from 'react';
import { Box, Dialog, DialogTitle, Tab, Tabs, Typography } from '@mui/material';
import { ConfigGame } from './ConfigGame';
import { ConfigHuman } from './ConfigHuman';
import { ConfigDisplay } from './ConfigDisplay';
import { ConfigBot } from './ConfigBot';
import { players } from '../logic/players';
import { server } from '../logic/server';
import { observer } from 'mobx-react';
import { Config } from '../logic/config';
import { refreshtimer } from '../logic/refreshtimer';
import { clock } from '../logic/clock';
import { theme } from '../logic/theme';
import { FaChess, FaRobot } from 'react-icons/fa';
import { MdMonitor, MdPeople } from 'react-icons/md';

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
      <DialogTitle id="simple-dialog-title" className="dark:bg-green-700 dark:text-white">
        Settings
      </DialogTitle>
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
      </Tabs>
      <TabPanel index={0}>
        <ConfigGame players={players} clock={clock} />
      </TabPanel>
      <TabPanel index={1}>
        <ConfigDisplay config={config} theme={theme} />
      </TabPanel>
      <TabPanel index={2}>
        <ConfigHuman players={players} server={server} />
      </TabPanel>
      <TabPanel index={3}>
        <ConfigBot players={players} />
      </TabPanel>
    </Dialog>
  );
});
