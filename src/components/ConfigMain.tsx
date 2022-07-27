import React, { ChangeEvent, MouseEvent, ReactElement } from 'react';
import { AppBar, Box, Dialog, DialogTitle, Tab, Tabs, Typography } from '@mui/material';
import styles from '../styles.module.scss';
import { ConfigGame } from './ConfigGame';
import { ConfigHuman } from './ConfigHuman';
import { ConfigDisplay } from './ConfigDisplay';
import { ConfigBot } from './ConfigBot';
import { players } from '../logic/players';
import { server } from '../logic/server';
import { observer } from 'mobx-react';
import { Config } from '../logic/config';
import { refreshtimer } from '../logic/refreshtimer';
import { ConfigTimer } from './ConfigTimer';

export const ConfigMain = observer(({ config }: { config: Config }) => {
  const TabLink = (props: { label: string; id: string }) => {
    return (
      <Tab
        component="a"
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
        hidden={value !== index}
        id={`nav-tabpanel-${index}`}
        aria-labelledby={`nav-tab-${index}`}>
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  };

  const [value, setValue] = React.useState(0);

  // eslint-disable-next-line
  const handleChange = (event: ChangeEvent<{}>, newValue: number) => setValue(newValue as number);

  const handleClose = () => {
    config.showConfig = false;
    refreshtimer.startRefreshTimer();
  };

  return (
    <Dialog
      aria-labelledby="simple-dialog-title"
      open={config.showConfig}
      onClose={handleClose}
      maxWidth="xl"
      className={styles.Dialog}>
      <DialogTitle id="simple-dialog-title">Configure</DialogTitle>
      <AppBar position="static">
        <Tabs
          className={styles.ConfigTabs}
          value={value}
          onChange={handleChange}
          aria-label="Config tabs">
          <TabLink label="Game" id="nav-tab-0" />
          <TabLink label="Display" id="nav-tab-1" />
          <TabLink label="Humans" id="nav-tab-2" />
          <TabLink label="Bots" id="nav-tab-3" />
          <TabLink label="Timer" id="nav-tab-4" />
        </Tabs>
      </AppBar>
      <TabPanel index={0}>
        <ConfigGame players={players} />
      </TabPanel>
      <TabPanel index={1}>
        <ConfigDisplay config={config} />
      </TabPanel>
      <TabPanel index={2}>
        <ConfigHuman players={players} server={server} />
      </TabPanel>
      <TabPanel index={3}>
        <ConfigBot players={players} />
      </TabPanel>
      <TabPanel index={4}>
        <ConfigTimer config={config} />
      </TabPanel>
    </Dialog>
  );
});
