import React, { ChangeEvent, MouseEvent, ReactChild } from 'react';
import { AppBar, Box, Dialog, DialogTitle, Tab, Tabs, Typography } from '@mui/material';
import styles from '../styles.module.scss';
import { ConfigGame } from './ConfigGame';
import { ConfigHuman } from './ConfigHuman';
import { ConfigDisplay } from './ConfigDisplay';
import { ConfigBot } from './ConfigBot';
import { players } from '../data/players';
import { server } from '../data/server';
import { observer } from 'mobx-react';
import { Config } from '../data/config';
import { refreshtimer } from '../data/refreshtimer';

export const ConfigMain = observer(({ config }: { config: Config }) => {
  type TabProps = {
    children: ReactChild;
    index: number;
    value: number;
  };

  type LinkProps = {
    label: string;
  };

  const TabPanel = (props: TabProps) => {
    const { children, value, index } = props;

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

  const linkProps = (index: number) => {
    return {
      id: `nav-tab-${index}`,
      'aria-controls': `nav-tabpanel-${index}`,
    };
  };

  const LinkTab = (props: LinkProps) => {
    return (
      <Tab
        component="a"
        onClick={(event: MouseEvent<HTMLAnchorElement>) => event.preventDefault()}
        {...props}
      />
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
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="nav tabs example">
          <LinkTab label="Game" {...linkProps(0)} />
          <LinkTab label="Display" {...linkProps(1)} />
          <LinkTab label="Humans" {...linkProps(2)} />
          <LinkTab label="Bots" {...linkProps(3)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <ConfigGame players={players} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ConfigDisplay config={config} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ConfigHuman players={players} server={server} />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <ConfigBot players={players} />
      </TabPanel>
    </Dialog>
  );
});
