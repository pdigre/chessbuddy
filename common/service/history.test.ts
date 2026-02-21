import { describe, expect, test } from '@jest/globals';
import { HistoryService } from './history.service';

describe('HistoryService', () => {
  test('should decode game correctly', () => {
    const service = new HistoryService();
    // Example game string: time;white;black;result;?;moves
    // Using a fake timestamp for testing
    const timestamp = new Date('2023-01-01T12:00:00Z').getTime().toString(36);
    const gameString = `${timestamp};WhitePlayer;BlackPlayer;1-0;?;e4 e5 Nf3 Nc6`;
    
    const decoded = service.decodeGame(gameString);
    
    expect(decoded.c1).toBe('WhitePlayer');
    expect(decoded.c2).toBe('BlackPlayer');
    expect(decoded.moves).toEqual(['e4', 'e5', 'Nf3', 'Nc6']);
    // Win logic depends on rulesService.whoWon, which might return undefined for incomplete games
    // or based on the moves. Here we just check basic parsing.
  });

  test('should filter games by player name', () => {
    const service = new HistoryService();
    const timestamp = new Date().getTime().toString(36);
    service.history = [
      `${timestamp};Alice;Bob;1-0;?;e4`,
      `${timestamp};Charlie;Alice;0-1;?;d4`,
      `${timestamp};Dave;Eve;1/2-1/2;?;c4`
    ];

    const aliceGames = service.getFilteredGames('Alice');
    expect(aliceGames.length).toBe(2);
    expect(aliceGames[0]).toContain('Alice');
    expect(aliceGames[1]).toContain('Alice');
  });
});
