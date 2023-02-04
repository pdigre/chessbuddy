import React from 'react';
import { DashboardService } from '../service/dashboard.service';
import { observer } from 'mobx-react';
import { historyService, playService } from '../service/index.service';
import { MainHistoryView as MainHistoryView } from './MainHistoryView';
import { MainLogView as MainLogView } from './MainLogView';
import { MainEditView as MainEditView } from './MainEditView';

export const MainView = observer(({ dashboard }: { dashboard: DashboardService }) => {
  return dashboard.showEdit ? (
    <MainEditView dashboard={dashboard} />
  ) : dashboard.showHist ? (
    <MainHistoryView history={historyService} />
  ) : (
    <MainLogView play={playService} history={historyService} />
  );
});
