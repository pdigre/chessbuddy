import { handlers } from './src/endpoints';
import commonPackage from '../common/package.json' with { type: 'json' };
import { initSSR, handleSSR } from './src/ssr_router.ts';

const port = parseInt(process.env.PORT || '8080');
console.log(`ChessBuddy version ${commonPackage.version} http://localhost:${port}/index.html`);

// Initialize SSR routes
await initSSR();

Bun.serve({
  port: port,
  async fetch(req: Request): Promise<Response> {
    const { pathname } = new URL(req.url);

    // Health check endpoint for Cloud Run
    if (pathname === '/health') {
      return new Response('OK', { status: 200 });
    }

    // Template-based server side rendered page
    if (pathname.startsWith('/ssr/')) {
      // Try to serve static files from src/ssr, excluding .ts files
      if (!pathname.endsWith('.htm')) {
        const filePath = './src' + pathname;
        const file = Bun.file(filePath);
        if (await file.exists()) {
           console.log(`<OK> ${pathname} => ${filePath}`);
           return new Response(file);
        }
      }

      const response = handleSSR(req);
      if (response) {
        return await response;
      }
      return new Response('Page Not Found', { status: 404 });
    }

    // Server endpoints
    if (pathname.startsWith('/srv/')) {
      return await endpoints(req, pathname);
    }

    // Explicitly map the root path to the React app's entry point
    if (pathname === '/' || pathname === '/index.html') {
      const filePath = '../react/dist/index.html';
      const file = Bun.file(filePath);
      console.log(`<OK> ${pathname} => ${filePath}`);
      return new Response(file);
    }

    // Define routes for asset directories
    const staticAssetDirs: Record<string, string> = {
      '/assets/': '../assets/',
      '/png/': '../public/png/',
      '/mp3/': '../public/mp3/',
      '/mp4/': '../public/mp4/',
      '/bots/': '../public/bots/',
    };

    for (const prefix in staticAssetDirs) {
      if (pathname.startsWith(prefix)) {
        const filePath = staticAssetDirs[prefix] + pathname.substring(prefix.length);
        const file = Bun.file(filePath);
        if (await file.exists()) {
          console.log(`<OK> ${pathname} => ${filePath}`);
          return new Response(file);
        }
        // For assets, it's better to return a 404 if not found
        console.error(`Asset not found: ${pathname} => ${filePath}`);
        return new Response('Not Found', { status: 404 });
      }
    }

    // Define routes for specific files
    const staticFileRoutes: Record<string, string> = {
      '/manifest.json': '../public/manifest.json',
      '/openings.js': '../public/openings.js',
      '/service-worker.js': '../public/service-worker.js',
      '/wc.html': '../wc/dist/index.html',
    };

    if (staticFileRoutes[pathname]) {
      const filePath = staticFileRoutes[pathname];
      const file = Bun.file(filePath);
      if (await file.exists()) {
        console.log(`<OK> ${pathname} => ${filePath}`);
        return new Response(file);
      }
    }

    // --- SPA Fallback ---
    // Default to serving the React app for any other path (e.g., /game/123).
    // This is standard for SPAs to handle client-side routing.
    const reactAppEntry = '../react/dist/index.html';
    console.log(`<SPA Fallback> ${pathname} => ${reactAppEntry}`);
    const file = Bun.file(reactAppEntry);

    // We can reasonably assume the main entry point exists, but a check is safest.
    if (await file.exists()) {
      return new Response(file);
    }

    // If we get here, even the main React app entry point is missing.
    console.error(`Critical: React entry point not found at ${reactAppEntry}`);
    return new Response('Application not found', { status: 404 });
  },
  error(error: Error): Response {
    console.error('Server error:', error);
    return new Response('Internal Server Error', { status: 500 });
  },
});

async function endpoints(req: Request, pathname: string): Promise<Response> {
  const pathHandlers = handlers[pathname];
  if (pathHandlers) {
    const handler = pathHandlers[req.method];
    if (handler) {
      return handler(req);
    }
    return new Response('Method Not Allowed', { status: 405 });
  }
  return new Response('Not Found', { status: 404 });
}
