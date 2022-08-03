import { Human } from './players';
import { gameHistory } from './history';
import { deviceInfo } from './library';
import { makeAutoObservable } from 'mobx';
import { message } from './message';

export type RESP = { stored: number; games: string[] };

export class Server {
  constructor() {
    makeAutoObservable(this);
  }

  connectREST: (human: Human) => void = async human => {
    const games1 = gameHistory.getFilteredGames(human.name);
    const connect = { email: human.email, device: deviceInfo, games: games1.join('\n') };
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
      .then(resp => resp.json())
      .then(resp => this.importFromServer(resp as RESP))
      .catch(err => message.display('Connect Error', (err as Error).message));
  };

  importFromServer: (resp: RESP) => void = resp => {
    const i1 = gameHistory.history.length;
    gameHistory.importFromServer(resp.games);
    const i2 = gameHistory.history.length;
    message.display(
      'Connect Success',
      `Stored ${(resp as RESP).stored} games and fetched ${i2 - i1} games` + ''
    );
  };
}
export const server = new Server();
