import { makeAutoObservable } from 'mobx';
import { storage } from '../storage.service';
import { game } from './game';

/*
 * History of previous games, should store a maximum locally
 */
export class GameHistory {
  history: string[];

  constructor() {
    makeAutoObservable(this);
    this.history = this.loadHistory();
  }

  storeGame: VoidFunction = () => {
    this.history.push(game.toString());
    this.history.sort((n1, n2) => (n1 > n2 ? 1 : n1 == n2 ? 0 : -1));
    storage.storeLines(GameHistory.storage, this.history);
  };

  importFromServer: (games: string[]) => void = games => {
    const h1 = gameHistory.history;
    h1.push(...games.filter(x => !h1.includes(x)));
    const h2 = h1.sort((n1, n2) => (n1 > n2 ? 1 : n1 == n2 ? 0 : -1));
    gameHistory.history = h2;
    gameHistory.storeGame();
  };

  readDate: (x: string) => string | undefined = x => {
    if (x == 'NaN') return undefined;
    const min = Date.parse('03/03/2021');
    const max = Date.now();
    let d = Date.parse(x);
    if (isNaN(d) || d < min || d > max) {
      d = Number.parseInt(x) * 1000;
    }
    if (isNaN(d) || d < min || d > max) {
      d = Number.parseInt(x, 36);
    }
    if (isNaN(d) || d < min || d > max) {
      console.log('Unknown date ' + x);
      return undefined;
    }
    return d.toString(36);
  };

  readGame: (x: string) => string | undefined = x => {
    const s = x.split(';');
    const date = this.readDate(s[0]);
    if (!date) return undefined;
    if (s.length == 6) {
      return date + ';' + s[1] + ';' + s[2] + ';' + s[3] + ';' + s[4] + ';' + s[5];
    } else if (s.length == 4) {
      return date + ';' + s[1] + ';' + s[2] + ';0;0;' + s[3];
    } else {
      console.log('Unknown format ' + x);
    }
    return undefined;
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

  uploadHistory: (file: File) => void = file => {
    new Promise(function (resolve, reject) {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = function () {
        gameHistory.upload(reader.result as string);
      };
      reader.readAsBinaryString(file);
    });
  };

  upload: (text: string) => void = text => {
    const lines = text.replace(/\r/gi, '').split('\n');
    const games = lines.map(x => this.readGame(x)).filter(x => x) as string[];
    const h1 = this.history;
    games.forEach(game => {
      const key = game.split(';')[0];
      const find = h1.find(x => x.split(';')[0] == key);
      if (!find) this.history.push(game);
    });
    this.storeGame();
  };

  getFilteredGames: (name: string) => string[] = (name: string) =>
    gameHistory.history.filter(x => {
      const s = x.split(';');
      return s[1] == name || s[2] == name;
    });

  private loadHistory() {
    const h1 = storage.restoreLines(GameHistory.storage, []);
    const h2 = h1.map(x => this.readGame(x)).filter(x => x) as string[];
    h2.sort((n1, n2) => (n1 > n2 ? 1 : n1 == n2 ? 0 : -1));
    return h2;
  }

  public static storage = 'log';
}

export const gameHistory = new GameHistory();
