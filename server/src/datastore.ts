import { DocumentData, Firestore, WithFieldValue } from '@google-cloud/firestore';

// Creates a client
const firestore = new Firestore();

export async function saveData(
  collection: string,
  docId: string,
  data: WithFieldValue<DocumentData>
): Promise<void> {
  const docRef = firestore.collection(collection).doc(docId);
  await docRef.set(data);
  console.log(`Saved document ${docId} in collection ${collection}: ${JSON.stringify(data)}`);
}
