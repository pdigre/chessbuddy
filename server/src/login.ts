import { getAuthenticatedUser, GOOGLE_CLIENT_ID, type GoogleUserInfo } from './googleAuth.ts';
import { renderTemplate } from './template.ts';

export type AuthenticatedHandler = (req: Request, user: GoogleUserInfo) => Promise<Response>;

export function withAuth(handler: AuthenticatedHandler): (req: Request) => Promise<Response> {
  return async (req: Request): Promise<Response> => {
    const user = await getAuthenticatedUser(req);

    if (!user) {
      const body = `
        <h1>Sign In</h1>
        <p>Please sign in to access this page.</p>
        <div id="buttonDiv"></div>
      `;
      const html = renderTemplate('Sign In', body, GOOGLE_CLIENT_ID);
      return new Response(html, {
        headers: { 'Content-Type': 'text/html' },
      });
    }

    return handler(req, user);
  };
}
