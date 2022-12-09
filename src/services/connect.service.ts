import { Human } from '../model/human';
import { historyService } from './history.service';
import { deviceInfo } from '../resources/library';
import { makeAutoObservable } from 'mobx';
import { messageService } from './message.service';

export type RESP = { stored: number; games: string[] };

export class ConnectService {
  constructor() {
    makeAutoObservable(this);
  }

  connectREST: (human: Human) => void = async human => {
    const games1 = historyService.getFilteredGames(human.name);
    const connect = { email: human.email, device: deviceInfo, games: games1.join('\n') };
    const url = window.document.location.hostname == 'http://chess.digre.com';
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
      .catch(err => messageService.display('Connect Error', (err as Error).message));
  };

  importFromServer: (resp: RESP) => void = resp => {
    const i1 = historyService.history.length;
    historyService.importFromServer(resp.games);
    const i2 = historyService.history.length;
    messageService.display(
      'Connect Success',
      `Stored ${(resp as RESP).stored} games and fetched ${i2 - i1} games` + ''
    );
  };
}
export const connectService = new ConnectService();
