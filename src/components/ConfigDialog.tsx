import React, { ChangeEvent, MouseEvent, ReactElement } from 'react';
import { AppBar, Box, Dialog, DialogTitle, Tab, Tabs, Typography } from '@mui/material';
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

export const ConfigDialog = observer(({ config }: { config: Config }) => {
  const TabLink = (props: { label: string; id: string }) => {
    return (
      <Tab
        component="a"
        className={theme.darkTheme ? 'bg-green-900 text-white' : ''}
        onClick={(event: MouseEvent<HTMLAnchorElement>) => event.preventDefault()}
        {...props}
      />
    );
  };

  const TabPanel = (props: { children: ReactElement; index: number }) => {
    const { children, index } = props;
    return (
      <div
        role="tabpanel"
        hidden={config.showTab !== index}
        id={`nav-tabpanel-${index}`}
        aria-labelledby={`nav-tab-${index}`}
        className={theme.darkTheme ? 'bg-green-900 text-white' : ''}>
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

  return (
    <div className={theme.darkTheme ? 'dark' : 'light'}>
      <Dialog
        aria-labelledby="simple-dialog-title"
        open={config.showTab >= 0}
        onClose={handleClose}
        maxWidth="xl"
        className={'text-center text-xl'}>
        <DialogTitle
          id="simple-dialog-title"
          className={theme.darkTheme ? 'bg-green-900 text-white' : ''}>
          Configure
        </DialogTitle>
        <AppBar position="static">
          <Tabs
            className={theme.darkTheme ? 'bg-green-600 text-white' : 'bg-green-300'}
            value={config.showTab}
            onChange={handleChange}
            aria-label="Config tabs">
            <TabLink label="Game" id="nav-tab-0" />
            <TabLink label="Display" id="nav-tab-1" />
            <TabLink label="Humans" id="nav-tab-2" />
            <TabLink label="Bots" id="nav-tab-3" />
          </Tabs>
        </AppBar>
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
    </div>
  );
});
