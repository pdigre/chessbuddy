import { makeAutoObservable } from 'mobx';
import { storage } from './storage.service';
import { playService } from './play.service';
import { Game, Games } from '../model/game';

/*
 * History of previous games, should store a maximum locally
 */
export class HistoryService {
  history: string[];
  markHist = -1;

  constructor() {
    makeAutoObservable(this);
    this.history = this.loadHistory();
    Game.oldgames.forEach(x => this.history.push(x));
    const arr = this.history.map(x => Game.create(x)).filter(x => x) as Game[];
    const games = new Games(arr);
    storage.storeObject('games', games);
  }

  storeGame: VoidFunction = () => {
    this.history.push(playService.toString());
    storage.storeLines(HistoryService.storage, this.history);
  };

  importFromServer: (games: string[]) => void = games => {
    const h1 = historyService.history;
    h1.push(...games.filter(x => !h1.includes(x)));
    const h2 = h1.sort((n1, n2) => (n1 > n2 ? 1 : n1 == n2 ? 0 : -1));
    historyService.history = h2;
    historyService.storeGame();
  };

  downloadPlayer: (name: string) => string = name => {
    const txt: string[] = [];
    this.history.forEach(line => {
      const cols = line.split(';');
      if (cols[1] == name || cols[2] == name) {
        const time = new Date(Number.parseInt(cols[0], 36));
        cols[0] = time.toISOString();
        txt.push(cols.join(';'));
      }
    });
    return txt.join('\r\n');
  };

  getFilteredGames: (name: string) => string[] = (name: string) =>
    historyService.history.filter(x => {
      const s = x.split(';');
      return s[1] == name || s[2] == name;
    });

  uploadHistory: (file: File) => void = file => {
    new Promise(function (resolve, reject) {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = function () {
        HistoryService.upload(reader.result as string, historyService.history);
        historyService.storeGame();
      };
      reader.readAsBinaryString(file);
    });
  };

  private static upload: (text: string, history: string[]) => void = (text, history) => {
    const lines = text.replace(/\r/gi, '').split('\n');
    const games = lines.map(x => Game.readGame(x)).filter(x => x) as string[];
    const h1 = history;
    games.forEach(game => {
      const key = game.split(';')[0];
      const find = h1.find(x => x.split(';')[0] == key);
      if (!find) history.push(game);
    });
  };

  private loadHistory() {
    const h1 = storage.restoreLines(HistoryService.storage, []);
    const h2 = h1.map(x => Game.readGame(x)).filter(x => x) as string[];
    h2.sort((n1, n2) => (n1 > n2 ? 1 : n1 == n2 ? 0 : -1));
    return h2;
  }

  public static storage = 'log';
}

export const historyService = new HistoryService();
