import { OAuth2Client } from 'google-auth-library';

// Hardcoded for now to match the client-side ID
const GOOGLE_CLIENT_ID =
  process.env.GOOGLE_CLIENT_ID ||
  '210193644238-4kfjtd85p04vu3f8n3vsrmfp2191fia8.apps.googleusercontent.com';

if (!GOOGLE_CLIENT_ID) {
  throw new Error('GOOGLE_CLIENT_ID must be set before verifying Google ID tokens.');
}

const oauthClient = new OAuth2Client();

export interface GoogleUserInfo {
  email: string;
  name?: string;
  subject?: string;
}

export async function verifyGoogleIdToken(idToken: string): Promise<GoogleUserInfo> {
  const ticket = await oauthClient.verifyIdToken({
    idToken,
    audience: GOOGLE_CLIENT_ID,
  });
  const payload = ticket.getPayload();
  if (!payload?.email) {
    throw new Error('Google ID token verification succeeded but payload is missing an email.');
  }
  return {
    email: payload.email,
    name: payload.name,
    subject: payload.sub,
  };
}
