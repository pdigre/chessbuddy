import { Datastore } from "@google-cloud/datastore";

// Creates a client
const datastore = new Datastore();

// Define a kind and name for the new entity
const kind = "Task";
const name = "sampletask1";
const taskKey = datastore.key([kind, name]);

// Prepares the new entity
const task = {
  key: taskKey,
  data: {
    description: "Buy milk",
  },
};

// Saves the entity
async function saveTask() {
  await datastore.save(task);
  console.log(`Saved ${task.key.name}: ${task.data.description}`);
}

// saveTask().catch(console.error);

export async function saveData(
  kind: string,
  name: string,
  data: object,
): Promise<void> {
  const taskKey = datastore.key([kind, name]);
  const entity = {
    key: taskKey,
    data,
  };
  await datastore.save(entity);
  console.log(`Saved ${taskKey.name}: ${JSON.stringify(data)}`);
}

/*
Set up authentication:
  Ensure you have a Google Cloud project with Datastore enabled.
  Create a service account and download the JSON key file.
  Set the GOOGLE_APPLICATION_CREDENTIALS environment variable to the path of the JSON key file:
export GOOGLE_APPLICATION_CREDENTIALS="/path/to/your-service-account-file.json"
 */
