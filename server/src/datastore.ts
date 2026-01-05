import { type DocumentData, Firestore, type WithFieldValue } from '@google-cloud/firestore';

// Creates a client
const firestore = new Firestore();
const collection = 'chessbuddy';

export async function saveData(email: string, data: WithFieldValue<DocumentData>): Promise<void> {
  const docRef = firestore.collection(collection).doc(email);
  await docRef.set(data);
  console.log(`Saved document ${email} in collection ${collection}: ${JSON.stringify(data)}`);
}
