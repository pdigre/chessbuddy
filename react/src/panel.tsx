import React from 'react';
import { DashboardService } from '../../common/service/dashboard.service';
import { observer } from 'mobx-react';
import { historyService, playService } from '../../common/service/index.service';
import { PanelEdit } from './panel-edit';
import { EditService } from '../../common/service/edit.service';
import { PanelLog } from './panel-log';
import { PanelHist } from './panel-hist';

export const Panel = observer(
  ({ dashboard, edit }: { dashboard: DashboardService; edit: EditService }) => {
    return edit.showEdit ? (
      <PanelEdit edit={edit} />
    ) : dashboard.showHist ? (
      <PanelHist history={historyService} />
    ) : (
      <PanelLog play={playService} history={historyService} />
    );
  }
);
