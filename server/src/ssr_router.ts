import { readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { getAuthenticatedUser, GOOGLE_CLIENT_ID, type GoogleUserInfo } from './googleAuth.ts';

const handlers = new Map<string, (req: Request) => Promise<Response>>();

export async function initSSR() {
  const dir = join(import.meta.dir, 'ssr');
  try {
    const files = await readdir(dir);
    for (const file of files) {
      if (file.endsWith('.ts')) {
        const name = file.slice(0, -3);
        try {
          const module = await import(join(dir, file));
          if (module.default) {
            // Wrap the default export which returns { title, body }
            // into a handler that returns a Response with rendered HTML
            const pageHandler = async (req: Request, user: GoogleUserInfo) => {
              const content = await module.default(req, user);
              const html = renderTemplate(content.title, content.body, GOOGLE_CLIENT_ID);
              return new Response(html, {
                headers: { 'Content-Type': 'text/html' },
              });
            };
            handlers.set(name, withAuth(pageHandler));
            console.log(`[SSR] Registered /ssr/${name}`);
          } else if (module.handler) {
            handlers.set(name, module.handler);
            console.log(`[SSR] Registered /ssr/${name}`);
          } else {
            console.warn(`[SSR] ${file} does not export 'default' or 'handler'`);
          }
        } catch (e) {
          console.error(`[SSR] Failed to load ${file}`, e);
        }
      }
    }
  } catch (e) {
    console.error(`[SSR] Failed to read directory ${dir}`, e);
  }
}

export function handleSSR(req: Request): Promise<Response> | undefined {
  const url = new URL(req.url);
  const parts = url.pathname.split('/');
  if (parts[1] === 'ssr' && parts[2]) {
    const handler = handlers.get(parts[2].replace(".htm",".ts"));
    if (handler) {
      return handler(req);
    }
  }
  return undefined;
}

// Login page

type AuthenticatedHandler = (req: Request, user: GoogleUserInfo) => Promise<Response>;

function withAuth(handler: AuthenticatedHandler): (req: Request) => Promise<Response> {
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

function renderTemplate(title: string, body: string, clientId?: string): string {
  const googleScript = clientId
    ? `<script src="https://accounts.google.com/gsi/client" async defer></script>
       <script>
         function handleCredentialResponse(response) {
           console.log("Encoded JWT ID token: " + response.credential);
           // Send the token to your backend
           fetch('/srv/login', {
             method: 'POST',
             headers: {
               'Content-Type': 'application/json'
             },
             body: JSON.stringify({ token: response.credential })
           }).then(res => {
               if (res.ok) {
                   window.location.reload();
               } else {
                   console.error("Login failed");
               }
           });
         }
         window.onload = function () {
           if (document.getElementById("buttonDiv")) {
             google.accounts.id.initialize({
               client_id: "${clientId}",
               callback: handleCredentialResponse
             });
             google.accounts.id.renderButton(
               document.getElementById("buttonDiv"),
               { theme: "outline", size: "large" }  // customization attributes
             );
             // google.accounts.id.prompt(); // also display the One Tap dialog
           }
         }
       </script>`
    : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
        body { font-family: sans-serif; padding: 2rem; }
    </style>
    ${googleScript}
</head>
<body>
    ${body}
</body>
</html>`;
}
