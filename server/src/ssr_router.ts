import { readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { withAuth } from './login.ts';
import { renderTemplate } from './template.ts';
import { GOOGLE_CLIENT_ID, type GoogleUserInfo } from './googleAuth.ts';

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
  // /ssr/hello -> ["", "ssr", "hello"]
  if (parts[1] === 'ssr' && parts[2]) {
    const handler = handlers.get(parts[2]);
    if (handler) {
      return handler(req);
    }
  }
  return undefined;
}
