import { ConfigService } from './config.service';
import { UtilService } from '../resources/library';
import { AnalyzerService } from './analyzer.service';
import { BluetoothService } from './bluetooth.service';
import { BotService } from './bot.service';
import { RulesService } from './rules.service';
import { ConnectService } from './connect.service';
import { DashboardService } from './dashboard.service';
import { HistoryService } from './history.service';
import { MessageService } from './message.service';
import { MediaService } from './media.service';
import { OpeningsService } from './openings.service';
import { PlayService } from './play.service';
import { StorageService } from './storage.service';
import { RenderingService } from './rendering.service';
import { ClockService } from './clock.service';
import { EditService } from './edit.service';

export const messageService = new MessageService();
export const storageService = new StorageService();
export const utilService = new UtilService();
export const configService = new ConfigService();
export const mediaService = new MediaService();
export const rulesService = new RulesService();
export const openingsService = new OpeningsService();
export const connectService = new ConnectService();
export const historyService = new HistoryService();
export const dashboardService = new DashboardService();
export const botService = new BotService();
export const playService = new PlayService();
export const editService = new EditService();
export const analyzerService = new AnalyzerService();
export const renderingService = new RenderingService();
export const bluetoothService = new BluetoothService();
export const clockService = new ClockService();
