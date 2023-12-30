import { Human } from '../model/human';
import {historyService, messageService, renderingService} from './index.service';

export type RESP = { stored: number; games: string[] };

export class ConnectService {
  readonly connectAction: (human: Human) => void = async human => {
    const games1 = historyService.getFilteredGames(human.name);
    const connect = { email: human.email, device: renderingService, games: games1.join('\n') };
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
      .then(resp => this.importFromServerAction(resp as RESP))
      .catch(err => messageService.error('Connect Error', (err as Error).message));
  };

  readonly importFromServerAction: (resp: RESP) => void = resp => {
    const i1 = historyService.history.length;
    historyService.importFromServer(resp.games);
    const i2 = historyService.history.length;
    messageService.error(
      'Connect Success',
      `Stored ${(resp as RESP).stored} games and fetched ${i2 - i1} games` + ''
    );
  };
}
