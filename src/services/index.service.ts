import { Config as ConfigService } from '../model/config';
import { UtilService } from '../resources/library';
import { AnalyzerService } from './analyzer.service';
import { BotService } from './bot.service';
import { ChessRulesService } from './chessrules.service';
import { ConnectService } from './connect.service';
import { DashboardService } from './dashboard.service';
import { HistoryService } from './history.service';
import { MessageService } from './message.service';
import { Mp4Service } from './mp4.service';
import { OpeningsService } from './openings.service';
import { PlayService } from './play.service';
import { Storage as StorageService } from './storage.service';

export const storageService = new StorageService();
export const utilService = new UtilService();
export const configService = new ConfigService();
export const mp4service = new Mp4Service();
export const chessRulesService = new ChessRulesService();
export const openingsService = new OpeningsService();
export const connectService = new ConnectService();
export const messageService = new MessageService();
export const historyService = new HistoryService();
export const gameState = new DashboardService();
export const botService = new BotService();
export const playService = new PlayService();
export const analyzerService = new AnalyzerService();
