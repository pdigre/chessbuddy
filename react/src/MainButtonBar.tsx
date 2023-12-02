import React, { ReactElement } from 'react';
import { Button, ButtonGroup } from '@mui/material';
import { observer } from 'mobx-react';
import { playService, configService } from '../../common/service/index.service';
import { DashboardService } from '../../common/service/dashboard.service';
import {
  MdInput,
  MdOutlineFolderOpen,
  MdOutlineHistory,
  MdPause,
  MdPlayArrow,
  MdSettings,
  MdUndo,
  MdEdit,
} from 'react-icons/md';
import { HistoryService } from '../../common/service/history.service';
import { EditService } from '../../common/service/edit.service';
import { action } from 'mobx';

export const MainButtonBar = observer(
  ({
    dashboard,
    edit,
    history,
  }: {
    dashboard: DashboardService;
    edit: EditService;
    history: HistoryService;
  }) => {
    const isGotoHist = dashboard.showHist && history.markHist >= 0;
    const isHistUndo = !dashboard.showHist && dashboard.markLog >= 0;
    const isPlayUndo = playService.isPlaying && dashboard.showUndo;

    const PanelButton = (props: { children: ReactElement; onClick: () => void }) => (
      <Button
        className="h-14 flex-grow bg-green-700"
        sx={{ backgroundColor: 'darkgreen' }}
        onClick={action(props.onClick)}
        variant="contained">
        {props.children}
      </Button>
    );

    return (
      <ButtonGroup color="primary" aria-label="outlined primary button group" className="w-full">
        <PanelButton onClick={action(playService.playButtonAction)}>
          {isHistUndo || isPlayUndo ? (
            <MdUndo className="text-3xl" />
          ) : playService.isPlaying ? (
            <MdPlayArrow className="text-3xl" />
          ) : (
            <MdPause className="text-3xl" />
          )}
        </PanelButton>
        <PanelButton onClick={action(dashboard.toggleHistoryAction)}>
          {isGotoHist ? (
            <MdInput className="text-3xl" />
          ) : edit.showEdit ? (
            <MdEdit className="text-3xl" />
          ) : dashboard.showHist ? (
            <MdOutlineFolderOpen className="text-3xl" />
          ) : (
            <MdOutlineHistory className="text-3xl" />
          )}
        </PanelButton>
        <PanelButton onClick={action(configService.openConfigAction)}>
          <MdSettings className="text-3xl" />
        </PanelButton>
      </ButtonGroup>
    );
  }
);
