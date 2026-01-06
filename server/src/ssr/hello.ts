import { type GoogleUserInfo } from '../googleAuth.ts';
import { readData } from '../datastore.ts';

export default async function helloPage(req: Request, user: GoogleUserInfo) {
  const userData = await readData(user.email);
  return {
    title: 'Hello World',
    body: `
        <h1>Hello from Bun!</h1>
        <p>This is a server-side rendered page.</p>
        <h2>Welcome ${user.email}</h2>
        <pre>${JSON.stringify(userData, null, 2)}</pre>
      `,
  };
}
