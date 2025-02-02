import { saveData } from "./src/datastore";

console.log("ChessBuddy version 0.0.39 http://localhost:80/index.html");
let module = "../react/dist/";
Bun.serve({
  port: 80,
  async fetch(req: Request): Promise<Response> {
    const url = req.url;

    if (req.method === "POST" && url.includes("/connect")) {
      console.log("POST:", url);
      const data = await req.json();
      console.log("Received POST data:", data);
      // Save data to Google Cloud Datastore
      await saveData("Tasks", "sampletask1", data);

      return new Response("POST request received", { status: 200 }) as Response;
    }

    // static routing
    let tgt = module + url.split("/").pop();
    const route = (match: string, replace: string, setModule?: string) => {
      if (url.includes(match)) {
        tgt = replace + url.substring(url.indexOf(match) + match.length);
        if (setModule) {
          module = setModule;
        }
      }
    };
    route("/assets/", module + "assets/");
    route("/index.html", "../react/dist/index.html", "../react/dist/");
    route("/wc.html", "../wc/dist/index.html", "../wc/dist/");
    route("/png/", "../public/png/");
    route("/mp3/", "../public/mp3/");
    route("/mp4/", "../public/mp4/");
    route("/bots/", "../public/bots/");
    route("/manifest.json", "../public/manifest.json");
    const file = Bun.file(tgt);
    await file.exists().then((exists) => {
      if (exists) {
        console.log("<OK> " + url + " => " + tgt);
      } else {
        console.error("File not found: " + url + " => " + tgt);
      }
    });
    return new Response(file) as Response;
  },
  error(): Response {
    return new Response(null, { status: 404 }) as Response;
  },
});
