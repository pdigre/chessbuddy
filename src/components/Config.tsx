import React, { ReactChild } from 'react';
import { useGlobalState } from '../data/state';
import { DialogTitle, Dialog, AppBar, Tabs, Tab, Typography, Box } from '@material-ui/core';
import styles from '../styles.module.scss';
import { ConfigGame, ConfigGameProps } from './ConfigGame';
import { ConfigHuman } from './ConfigHuman';
import { ConfigDisplay } from './ConfigDisplay';
import { ConfigBot } from './ConfigBot';
import type { HANDLE_CHANGE } from './reacttypes';

export const Config: React.FC<ConfigGameProps> = ({
  newGame,
  stopstart,
  setMessage: setMessage,
  players,
}) => {
  const [showConfig, setShowConfig] = useGlobalState('showConfig');

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
        onClick={(event: React.ChangeEvent) => event.preventDefault()}
        {...props}
      />
    );
  };
  const [value, setValue] = React.useState(0);

  const handleChange: HANDLE_CHANGE = (event, newValue) => setValue(newValue as number);

  return (
    <Dialog
      aria-labelledby="simple-dialog-title"
      open={showConfig}
      onClose={() => setShowConfig(false)}
      maxWidth="xl"
      className={styles.Dialog}>
      <DialogTitle id="simple-dialog-title">Configure</DialogTitle>

      <AppBar position="static">
        <Tabs
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
        <ConfigGame
          newGame={newGame}
          stopstart={stopstart}
          setMessage={setMessage}
          players={players}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ConfigDisplay />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ConfigHuman players={players} />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <ConfigBot players={players} />
      </TabPanel>
    </Dialog>
  );
};
