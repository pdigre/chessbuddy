import React, { ChangeEvent, MouseEvent, ReactElement } from 'react';
import { Box, Dialog, Tab, Tabs } from '@mui/material';
import { connectService } from '../../common/service/index.service';
import { observer } from 'mobx-react';
import { ConfigService } from '../../common/service/config.service';
import { FaChess, FaClock, FaConnectdevelop, FaRobot } from 'react-icons/fa';
import { MdMonitor, MdPeople } from 'react-icons/md';
import { ConfigHuman } from './config-human';
import { ConfigClock } from './config-clock';
import { ConfigBluetooth } from './config-bluetooth';
import { ConfigBot } from './config-bot';
import { ConfigDisplay } from './config-display';
import { ConfigGame } from './config-game';

export const ConfigDialog = observer(({ config }: { config: ConfigService }) => {
  const TabPanel = (props: { children: ReactElement; index: number }) => {
    const { children, index } = props;
    return (
      <div
        role="tabpanel"
        hidden={config.showTab !== index}
        id={`nav-tabpanel-${index}`}
        aria-labelledby={`nav-tab-${index}`}
        className="dark:bg-green-900 dark:text-white"
      >
        <Box>{children}</Box>
      </div>
    );
  };

  // eslint-disable-next-line
  const handleChange = (event: ChangeEvent<{}>, newValue: number) =>
    config.switchTabAction(newValue as number);

  const prevent = (event: MouseEvent<HTMLAnchorElement>) => event.preventDefault();

  return (
    <Dialog
      aria-labelledby="simple-dialog-title"
      open={config.showConfig}
      onClose={config.closeConfigAction}
      maxWidth="xl"
      className={'text-center text-xl'}
    >
      <Tabs
        value={config.showTab}
        onChange={handleChange}
        aria-label="Settings"
        variant="fullWidth"
      >
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
          id="nav-tab-4"
        />
        <Tab
          component="a"
          onClick={prevent}
          label={<div className="text-xl">Bluetooth</div>}
          icon={<FaConnectdevelop className="text-3xl" />}
          iconPosition="start"
          id="nav-tab-5"
        />
      </Tabs>
      <TabPanel index={0}>
        <ConfigGame config={config} />
      </TabPanel>
      <TabPanel index={1}>
        <ConfigDisplay config={config} />
      </TabPanel>
      <TabPanel index={2}>
        <ConfigHuman config={config} connect={connectService} />
      </TabPanel>
      <TabPanel index={3}>
        <ConfigBot config={config} />
      </TabPanel>
      <TabPanel index={4}>
        <ConfigClock config={config} />
      </TabPanel>
      <TabPanel index={5}>
        <ConfigBluetooth config={config} />
      </TabPanel>
    </Dialog>
  );
});
