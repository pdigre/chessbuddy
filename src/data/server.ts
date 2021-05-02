import { Human } from './players';
import { gameHistory } from './game';
import { deviceInfo } from './library';
import { messager } from '../components/MessageBox';
import { makeAutoObservable } from 'mobx';

export type RESP = { stored: number; games: string[] };

export class Server {
  constructor() {
    makeAutoObservable(this);
  }

  connectREST = async (human: Human) => {
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
      .catch(err => messager.display('Connect Error', (err as Error).message));
  };
  importFromServer = (resp: RESP) => {
    const i1 = gameHistory.history.length;
    gameHistory.importFromServer(resp.games);
    const i2 = gameHistory.history.length;
    messager.display(
      'Connect Success',
      `Stored ${(resp as RESP).stored} games and fetched ${i2 - i1} games` + ''
    );
  };
}
export const server = new Server();
