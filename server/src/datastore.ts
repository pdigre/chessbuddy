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

  // Store general info
  await db.doc(email).set({ device: req.device, humans: req.humans, bots: req.bots });

  // Read any currently stored games
  // We need to access the subcollection 'games' and then a document inside it.
  // However, the previous logic seemed to treat 'games' as a document ID suffix.
  // If we want to store games in a separate document under the user's document,
  // we should structure it as collection(collection).doc(email).collection('data').doc('games')
  // OR just store it as a field in the user document if it's not too large.
  // OR use a predictable document ID in the same collection, like "email_games".

  // Based on the error "path does not contain an even number of components",
  // db.doc(games_rec) where games_rec is "email/games" is trying to access
  // collection("chessbuddy").doc("email/games").
  // "chessbuddy" is a collection. "email/games" is 2 segments.
  // So the full path is "chessbuddy/email/games".
  // That is 3 segments: Collection / Document / Collection (or field path?).
  // Firestore paths must alternate Collection/Document/Collection/Document.

  // If we want "games" to be a document inside a subcollection of the user:
  // path: chessbuddy/{email}/user_data/games
  // db.doc(email).collection('user_data').doc('games')

  // Let's try to fix it by using a subcollection.
  const gamesRef = db.doc(email).collection('data').doc('games');

  const doc = await gamesRef.get();
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
  await gamesRef.set({ games: mergedGames });

  console.log(
    `Saved document ${email} in collection ${collection}. Merged ${newGames.length} new games. Total: ${mergedGames.length}`
  );
  return { stored: mergedGames.length - existingGames.length, games: mergedGames } as RESP;
}

export async function readData(email: string): Promise<REQU> {
  const db = firestore.collection(collection);

  // Read general info
  const docInfo = await db.doc(email).get();
  let info: any = {};
  if (docInfo.exists) {
    info = docInfo.data() || {};
  }

  // Read any currently stored games
  const gamesRef = db.doc(email).collection('data').doc('games');
  const docGames = await gamesRef.get();
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
