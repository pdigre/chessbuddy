import { Human } from './players';
import { deviceInfo, gameHistory } from './game';
import { messager } from '../components/MessageBox';
import { makeAutoObservable } from 'mobx';

export type RESP = { stored: number; games: string[] };

export class Server {
  constructor() {
    makeAutoObservable(this);
  }

  connect = async (human: Human) => {
    const name = human.name;
    const h1 = gameHistory.history;
    const games1 = h1.filter(x => {
      const s = x.split(';');
      return s[1] == name || s[2] == name;
    });
    const games_string = games1.join('\n');
    const connect = { email: human.email, device: deviceInfo, games: games_string };
    const url =
      window.document.location.hostname == 'localhost'
        ? 'http://localhost:1234'
        : 'https://chess.digre.com';
    await fetch(url + '/api.php', {
      method: 'POST',
      body: JSON.stringify(connect),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
      .then(resp => {
        return resp.json();
      })
      .then(resp => {
        const games2 = (resp as RESP).games;
        const i1 = h1.length;
        games2.forEach(g => {
          if (!games1.includes(g)) {
            h1.push(g);
          }
        });
        const h2 = h1.sort((n1, n2) => {
          if (n1 > n2) {
            return 1;
          }
          if (n1 < n2) {
            return -1;
          }
          return 0;
        });
        const i2 = h1.length;
        gameHistory.history = h2;
        gameHistory.storeGame();
        messager.display(
          'Connect Success',
          `Stored ${(resp as RESP).stored} games and fetched ${i2 - i1} games` + ''
        );
      })
      .catch(err => {
        messager.display('Connect Error', (err as Error).message);
      });
  };
}
export const server = new Server();
