import { saveData } from "./src/datastore";
import commonPackage from "../common/package.json" with { type: "json" };

console.log(`ChessBuddy version ${commonPackage.version} http://localhost:80/index.html`);

Bun.serve({
  port: 80,
  async fetch(req: Request): Promise<Response> {
    const { pathname } = new URL(req.url);

    // API endpoint for POST requests
    if (req.method === "POST" && pathname === "/connect") {
      console.log("POST:", pathname);
      try {
        const data = await req.json();
        console.log("Received POST data:", data);
        // Save data to Google Cloud Datastore
        await saveData("Tasks", "sampletask1", data);
        return new Response("POST request received", { status: 200 });
      } catch (error) {
        console.error("Error processing POST request:", error);
        return new Response("Invalid JSON", { status: 400 });
      }
    }

    // --- Static File Routing ---

    // Explicitly map the root path to the React app's entry point
    if (pathname === "/" || pathname === "/index.html") {
      const filePath = "../react/dist/index.html";
      const file = Bun.file(filePath);
      console.log(`<OK> ${pathname} => ${filePath}`);
      return new Response(file);
    }

    // Define routes for asset directories
    const staticAssetDirs: Record<string, string> = {
      "/assets/": "../assets/",
      "/png/": "../public/png/",
      "/mp3/": "../public/mp3/",
      "/mp4/": "../public/mp4/",
      "/bots/": "../public/bots/",
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
        return new Response("Not Found", { status: 404 });
      }
    }

    // Define routes for specific files
    const staticFileRoutes: Record<string, string> = {
      "/manifest.json": "../public/manifest.json",
      "/wc.html": "../wc/dist/index.html",
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
    const reactAppEntry = "../react/dist/index.html";
    console.log(`<SPA Fallback> ${pathname} => ${reactAppEntry}`);
    const file = Bun.file(reactAppEntry);

    // We can reasonably assume the main entry point exists, but a check is safest.
    if (await file.exists()) {
      return new Response(file);
    }

    // If we get here, even the main React app entry point is missing.
    console.error(`Critical: React entry point not found at ${reactAppEntry}`);
    return new Response("Application not found", { status: 404 });
  },
  error(error: Error): Response {
    console.error("Server error:", error);
    return new Response("Internal Server Error", { status: 500 });
  },
});