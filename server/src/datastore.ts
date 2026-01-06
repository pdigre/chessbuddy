import { type DocumentData, Firestore, type WithFieldValue } from '@google-cloud/firestore';
import type { REQU, RESP } from '../../common/service/connect.service';

// Creates a client
const firestore = new Firestore({
  databaseId: 'chessbuddy',
});
const collection = 'chessbuddy';

export async function saveData(email: string, data: WithFieldValue<DocumentData>): Promise<RESP> {
  const req = data as REQU;
  const db = firestore.collection(collection);
  const games = req.games;
  const games_rec = email + '/games';

  // Store general info
  await db.doc(email).set({ device: req.device, humans: req.humans, bots: req.bots });

  // Read any currently stored games
  const doc = await db.doc(games_rec).get();
  let existingGames: any[] = [];
  if (doc.exists) {
    const docData = doc.data();
    if (docData && Array.isArray(docData['games'])) {
      existingGames = docData['games'];
    }
  }

  // Merge games: add new games that are not already in existingGames
  // Assuming 'id' is a unique identifier for games
  const existingIds = new Set(existingGames.map((g: any) => g.id));
  const newGames = games.filter(g => !existingIds.has(g.id));
  const mergedGames = [...existingGames, ...newGames];

  // Store games
  // We store the array of games inside an object, e.g. { games: [...] }
  await db.doc(games_rec).set({ games: mergedGames });

  console.log(
    `Saved document ${email} in collection ${collection}. Merged ${newGames.length} new games. Total: ${mergedGames.length}`
  );
  return { stored: mergedGames.length - existingGames.length, games: mergedGames } as RESP;
}

export async function readData(email: string): Promise<REQU> {
  const db = firestore.collection(collection);
  const games_rec = email + '/games';

  // Read general info
  const docInfo = await db.doc(email).get();
  let info: any = {};
  if (docInfo.exists) {
    info = docInfo.data() || {};
  }

  // Read any currently stored games
  const docGames = await db.doc(games_rec).get();
  let games: any[] = [];
  if (docGames.exists) {
    const docData = docGames.data();
    if (docData && Array.isArray(docData['games'])) {
      games = docData['games'];
    }
  }

  return {
    email: email,
    device: info.device,
    humans: info.humans || [],
    bots: info.bots || [],
    games: games,
  } as REQU;
}
