import { renderTemplate } from './template';
import { GOOGLE_CLIENT_ID, verifyGoogleIdToken } from './googleAuth';
import { readData } from './datastore';

export async function handleHello(req: Request): Promise<Response> {
  let userData = null;
  let email = '';

  // Check for cookie with token
  const cookieHeader = req.headers.get('Cookie');
  if (cookieHeader) {
    const cookies = Object.fromEntries(cookieHeader.split('; ').map(c => c.split('=')));
    const token = cookies['auth_token'];
    if (token) {
      try {
        const profile = await verifyGoogleIdToken(token);
        email = profile.email;
        userData = await readData(email);
      } catch (e) {
        console.error('Invalid token', e);
      }
    }
  }

  let body = `
        <h1>Hello from Bun!</h1>
        <p>This is a server-side rendered page.</p>
        <div id="buttonDiv"></div>
      `;

  if (userData) {
    body += `<h2>Welcome ${email}</h2>`;
    body += `<pre>${JSON.stringify(userData, null, 2)}</pre>`;
  } else {
    body += `<p>Please sign in to see your data.</p>`;
  }

  const html = renderTemplate('Hello World', body, GOOGLE_CLIENT_ID);
  return new Response(html, {
    headers: { 'Content-Type': 'text/html' },
  });
}
