import { makeAutoObservable, runInAction } from 'mobx';
import { History, Games } from '../model/history';
import { storageService, playService, historyService } from './index.service';

/*
 * History of previous games, should store a maximum locally
 */
export class HistoryService {
  history: string[];
  markHist = -1;

  constructor() {
    makeAutoObservable(this);
    this.history = this.loadHistory();
    History.oldgames.forEach(x => this.history.push(x));
    const arr = this.history.map(x => History.create(x)).filter(x => x) as History[];
    const games = new Games(arr);
    storageService.storeObject('games', games);
  }

  storeGame: VoidFunction = () => {
    this.history.push(playService.toString());
    storageService.storeLines(HistoryService.storage, this.history);
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
    const games = lines.map(x => History.readHistory(x)).filter(x => x) as string[];
    const h1 = history;
    games.forEach(game => {
      const key = game.split(';')[0];
      const find = h1.find(x => x.split(';')[0] == key);
      if (!find) history.push(game);
    });
  };

  private loadHistory() {
    const h1 = storageService.restoreLines(HistoryService.storage, []);
    const h2 = h1.map(x => History.readHistory(x)).filter(x => x) as string[];
    h2.sort((n1, n2) => (n1 > n2 ? 1 : n1 == n2 ? 0 : -1));
    return h2;
  }

  public static storage = 'log';

  // ****************************
  // Actions
  // ****************************

  setMarkHist(n: number) {
    runInAction(() => {
      this.markHist = n;
    });
  }
}
