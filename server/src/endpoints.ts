import { verifyGoogleIdToken } from './googleAuth';
import { type RESP, saveData } from './datastore';

export type Handler = (req: Request) => Promise<Response>;

export const handlers: Record<string, Record<string, Handler>> = {
  '/srv/connect': {
    POST: handleConnect,
  },
  '/srv/login': {
    POST: handleLogin,
  },
};

async function handleLogin(req: Request): Promise<Response> {
  try {
    const { token } = await req.json();
    const profile = await verifyGoogleIdToken(token);
    // Set a cookie with the token
    // In a real app, you'd want to create a session or sign your own JWT
    // For simplicity, we'll just store the Google ID token in a cookie
    return new Response('Logged in', {
      status: 200,
      headers: {
        'Set-Cookie': `auth_token=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=3600`,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return new Response('Login failed', { status: 401 });
  }
}

async function handleConnect(req: Request): Promise<Response> {
  const url = new URL(req.url);
  console.log('POST:', url.pathname);
  const forwardedEmail = req.headers.get('x-forwarded-email');
  try {
    const authHeader = req.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response('Missing Bearer token', { status: 401 });
    }
    const token = authHeader.split(' ')[1];
    const profile = await verifyGoogleIdToken(token);
    if (forwardedEmail && forwardedEmail !== profile.email) {
      return new Response('Email mismatch', { status: 403 });
    }
    const data = await req.json();
    console.log('Received POST data:', data);
    const resp: RESP = await saveData(profile.email, data);
    return new Response(JSON.stringify(resp), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: unknown) {
    console.error('Error processing POST request:', error);
    if (error instanceof Error && error.message.includes('Blocked by CORS policy')) {
      return new Response('CORS error', { status: 403 });
    }
    return new Response('Invalid JSON or token', { status: 400 });
  }
}
