import { makeObservable, observable } from 'mobx';
import { History, Games } from '../model/history';
import {
  storageService,
  playService,
  historyService,
  rulesService,
  messageService,
} from './index.service';

export type GameEntry = {
  moves: string[];
  time: string;
  win: string;
  c1: string;
  c2: string;
};

/*
 * History of previous games, should store a maximum locally
 */
export class HistoryService {
  history: string[] = [];
  markHist = -1;

  constructor() {
    makeObservable(this, {
      history: observable,
      markHist: observable,
    });
    this.history = this.loadHistory();
    History.oldgames.forEach(x => this.history.push(x));
    const arr = this.history.map(x => History.create(x)).filter(x => x) as History[];
    const games = new Games(arr);
    storageService.storeObject('games', games);
  }

  storeGame() {
    this.history.push(playService.toString());
    storageService.storeLines(HistoryService.storage, this.history);
  }

  importFromServer(games: string[]) {
    const h1 = historyService.history;
    h1.push(...games.filter(x => !h1.includes(x)));
    const h2 = h1.sort((n1, n2) => (n1 > n2 ? 1 : n1 == n2 ? 0 : -1));
    historyService.history = h2;
    historyService.storeGame();
  }

  downloadPlayerAction: (name: string) => string = name => {
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

  getFilteredGames(name: string) {
    return historyService.history.filter(x => {
      const s = x.split(';');
      return s[1] == name || s[2] == name;
    });
  }

  uploadHistory(file: File) {
    return new Promise(function (_resolve, reject) {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = function () {
        HistoryService.upload(reader.result as string, historyService.history);
        historyService.storeGame();
      };
      reader.readAsBinaryString(file);
    });
  }

  uploadFilesHistory(files: FileList | null) {
    if (files && files.length) {
      historyService.uploadHistory(files[0]);
    }
  }

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
    this.markHist = n;
  }

  decodeGame(row: string): GameEntry {
    const cols = row.split(';');
    let time = '?';
    const date = new Date(Number.parseInt(cols[0], 36));
    const t1 = date.getTime();
    const t2 = Date.now();
    try {
      time =
        t2 - t1 < 3600 * 24000 && t1 < t2
          ? date.toTimeString().split(' ')[0]
          : date.toISOString().split('T')[0];
    } catch (error) {
      console.log(error);
    }
    const moves = cols[cols.length - 1].split(' ');
    return {
      moves,
      time,
      win: rulesService.whoWon(moves)?.substring(0, 1) ?? '?',
      c1: cols[1].split(' ')[0],
      c2: cols[2].split(' ')[0],
    };
  }

  getGames() {
    return this.history.filter(x => x.split(';').length > 5).map(x => this.decodeGame(x));
  }

  enterLogCheck() {
    if (historyService.markHist >= 0) {
      if (playService.isComplete || playService.log.length == 0) {
        messageService.standard('load', reply => {
          if (reply == 'Yes') {
            playService.loadGame();
          }
        });
      } else {
        messageService.standard('load');
      }
      historyService.setMarkHist(-1);
    }
  }

  getLogRows() {
    const rows: string[][] = [];
    const log = playService.log;
    for (let i = 0; i < log.length / 2; i++) {
      rows[i] = ['', ''];
    }
    log.forEach((t, i) => {
      const l = Math.floor(i / 2),
        c = i % 2;
      rows[l][c] = t;
    });
    return rows;
  }
}
