import { Board } from './board.js';
import { MessageDialog } from './message-dialog.ts';
import { MdTextButton } from '@material/web/button/text-button';
import { ConfigDialog } from './config-dialog.ts';
import { Mp4Dialog } from './mp4dialog.ts';
import { ConfigBluetooth } from './config-bluetooth.ts';
import { ConfigBot } from './config-bot.ts';
import { ConfigClock } from './config-clock.ts';
import { ConfigDisplay } from './config-display.ts';
import { ConfigGame } from './config-game.ts';
import { ConfigHuman } from './config-human.ts';
import { Panel } from './panel.ts';
import { PanelLog } from './panel-log.ts';
import { PanelHist } from './panel-hist.ts';
import { PanelEdit } from './panel-edit.ts';
import { CP } from './cp.ts';
import { FenInfo, PlayerInfoBar, Ticker } from './app-play.ts';
import {
  ConfigBoolean,
  ConfigButton,
  ConfigListButtons,
  ConfigPopup,
  ConfigSelect,
  ConfigText,
  TableList,
} from './config-widgets.ts';
import { MdDialog } from '@material/web/dialog/dialog';
import { MdOutlinedButton } from '@material/web/button/outlined-button';
import { MdFilledButton } from '@material/web/button/filled-button';
import { MdFilledTonalButton } from '@material/web/button/filled-tonal-button';
import { ChessBoardElement } from 'chessboard-element';
import { MdTabs } from '@material/web/tabs/tabs';
import { MdPrimaryTab } from '@material/web/tabs/primary-tab';
import { MdOutlinedSelect } from '@material/web/select/outlined-select';
import { MdSelectOption } from '@material/web/select/select-option';
import { MdCheckbox } from '@material/web/checkbox/checkbox';
import { MdOutlinedTextField } from '@material/web/textfield/outlined-text-field';

export function wcInit() {
  new Board();
  new CP();
  new PlayerInfoBar();
  new Ticker();
  new FenInfo();

  new Panel();
  new PanelLog();
  new PanelHist();
  new PanelEdit();

  new MessageDialog();
  new ConfigDialog();
  new Mp4Dialog();

  new ConfigGame();
  new ConfigDisplay();
  new ConfigHuman();
  new ConfigBot();
  new ConfigClock();
  new ConfigBluetooth();

  new ConfigButton();
  new ConfigBoolean();
  new ConfigText();
  new ConfigSelect();
  new ConfigPopup();
  new ConfigListButtons();
  new TableList();

  // External components
  new ChessBoardElement(); // Must instantiate otherwise do not render

  new MdDialog();
  new MdTabs();
  new MdPrimaryTab();

  new MdOutlinedTextField();
  new MdCheckbox();
  new MdOutlinedSelect();
  new MdSelectOption();

  new MdTextButton();
  new MdOutlinedButton();
  new MdFilledButton();
  new MdFilledTonalButton();
}
