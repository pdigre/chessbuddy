import { type GoogleUserInfo } from '../googleAuth.ts';
import { readData } from '../datastore.ts';

export async function webPage(
  req: Request,
  user: GoogleUserInfo
): Promise<{ title: string; body: string }> {
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
