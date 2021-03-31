import React, { ReactChild } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import styles from '../styles.module.scss';
import { useGlobalState } from '../data/state';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { ConfigGame, ConfigGameProps } from './ConfigGame';
import { ConfigHuman } from './ConfigHuman';
import { ConfigBot } from './ConfigBot';
import type { HANDLE_CHANGE } from './reacttypes';

export const Config: React.FC<ConfigGameProps> = ({ newGame, stopstart, players }) => {
  const [showConfig, setShowConfig] = useGlobalState('showConfig');

  type TabProps = {
    children: ReactChild;
    index: number;
    value: number;
  };

  type LinkProps = {
    label: string;
  };

  function TabPanel(props: TabProps) {
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
  }

  function linkProps(index: number) {
    return {
      id: `nav-tab-${index}`,
      'aria-controls': `nav-tabpanel-${index}`,
    };
  }

  function LinkTab(props: LinkProps) {
    return (
      <Tab
        component="a"
        onClick={(event: React.ChangeEvent) => event.preventDefault()}
        {...props}
      />
    );
  }
  const [value, setValue] = React.useState(0);

  const handleChange: HANDLE_CHANGE = (event, newValue) => setValue(newValue as number);

  return (
    <Dialog
      aria-labelledby="simple-dialog-title"
      open={showConfig}
      onClose={() => setShowConfig(false)}
      className={styles.Dialog}>
      <DialogTitle id="simple-dialog-title">Configure</DialogTitle>

      <AppBar position="static">
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="nav tabs example">
          <LinkTab label="Game" {...linkProps(0)} />
          <LinkTab label="Humans" {...linkProps(1)} />
          <LinkTab label="Bots" {...linkProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <ConfigGame newGame={newGame} stopstart={stopstart} players={players} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ConfigHuman />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ConfigBot />
      </TabPanel>
    </Dialog>
  );
};
