import { saveData } from "./src/datastore";

console.log("Chessbuddy - http://localhost:80/index.html");
let assets = "./react/build/assets/";
Bun.serve({
  port: 80,
  async fetch(req: Request): Promise<Response> {
    const url = req.url;

    if (req.method === "POST") {
      const data = await req.json();
      console.log("Received POST data:", data);
      // Save data to Google Cloud Datastore
      await saveData("Task", "sampletask1", data);

      return new Response("POST request received", { status: 200 }) as Response;
    }

    // static routing
    let tgt = "./react/build/index.html";
    const route = (match: string, replace: string, setAssets?: string) => {
      if (url.includes(match)) {
        tgt = replace + url.substring(url.indexOf(match) + match.length);
        if (setAssets) {
          assets = setAssets;
        }
      }
    };
    route("/assets/", assets);
    route("/index.html", "./react/build/index.html", "./react/build/assets/");
    route("/wc.html", "./wc/dist/index.html", "./wc/dist/assets/");
    route("/png/", "./public/png/");
    route("/mp3/", "./public/mp3/");
    route("/mp4/", "./public/mp4/");
    route("/bots/", "./public/bots/");
    route("/manifest.json", "./public/manifest.json");
    console.log(url + " =>" + tgt);
    const file = Bun.file(tgt);
    return new Response(file) as Response;
  },
  error(): Response {
    return new Response(null, { status: 404 }) as Response;
  },
});
