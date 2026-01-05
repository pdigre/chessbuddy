import { verifyGoogleIdToken } from './googleAuth';
import { saveData } from './datastore';

export type Handler = (req: Request) => Promise<Response>;

export const handlers: Record<string, Record<string, Handler>> = {
  '/srv/connect': {
    POST: handleConnect,
  },
};

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
    await saveData(profile.email, data);
    return new Response('POST request received', { status: 200 });
  } catch (error: unknown) {
    console.error('Error processing POST request:', error);
    if (error instanceof Error && error.message.includes('Blocked by CORS policy')) {
      return new Response('CORS error', { status: 403 });
    }
    return new Response('Invalid JSON or token', { status: 400 });
  }
}
