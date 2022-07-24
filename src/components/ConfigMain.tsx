import React, { MouseEvent, ReactElement } from 'react';
import {
  DialogHeader,
  Dialog,
  Tab,
  Tabs,
  Typography,
  TabsHeader,
  TabsBody,
  TabPanel,
  DialogBody,
} from '@material-tailwind/react';
import { ConfigGame } from './ConfigGame';
import { ConfigHuman } from './ConfigHuman';
import { ConfigDisplay } from './ConfigDisplay';
import { ConfigBot } from './ConfigBot';
import { players } from '../data/players';
import { server } from '../data/server';
import { observer } from 'mobx-react';
import { Config } from '../data/config';
import { refreshtimer } from '../data/refreshtimer';
import { DialogTitle } from '@mui/material';

export const ConfigMain = observer(({ config }: { config: Config }) => {
  const TabPage = (props: { children: ReactElement; index: string }) => {
    const { children, index } = props;
    return (
      <TabPanel key={index} value={index}>
        <Typography>{children}</Typography>
      </TabPanel>
    );
  };

  const TabLink = (props: { label: string; index: string }) => {
    return (
      <Tab
        onClick={(event: MouseEvent<HTMLLIElement>) => event.preventDefault()}
        key={props.index}
        value={props.index}>
        {props.label}
      </Tab>
    );
  };

  const handleClose = () => {
    config.showConfig = false;
    refreshtimer.startRefreshTimer();
  };

  return (
    <Dialog
      aria-labelledby="simple-dialog-title"
      size="sm"
      open={config.showConfig}
      className="text-center text-xl bg-slate-200 w-[600px] h-[400px]"
      handler={handleClose}>
      <DialogTitle>Configuration</DialogTitle>
      <DialogHeader id="simple-dialog-title">Configure</DialogHeader>
      <DialogBody>
        <Tabs value="html">
          <TabsHeader>
            <TabLink label="Game" index="0" />
            <TabLink label="Display" index="1" />
            <TabLink label="Humans" index="2" />
            <TabLink label="Bots" index="3" />
          </TabsHeader>
          <TabsBody>
            <TabPage index="0">
              <ConfigGame players={players} />
            </TabPage>
            <TabPage index="1">
              <ConfigDisplay config={config} />
            </TabPage>
            <TabPage index="2">
              <ConfigHuman players={players} server={server} />
            </TabPage>
            <TabPage index="3">
              <ConfigBot players={players} />
            </TabPage>
          </TabsBody>
        </Tabs>
      </DialogBody>
    </Dialog>
  );
});
