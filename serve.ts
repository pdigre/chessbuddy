console.log("WC - http://localhost:3003/index.html");
let assets="./react/build/assets/";
Bun.serve({
  port: 3003,
  async fetch(req) {
    const url = req.url;
    let tgt = "./react/build/index.html";
    const route=(match:string, replace:string, memoize?:string) => {
      if(url.includes(match)) {
        const n=url.indexOf(match);
        tgt=replace+url.substring(n+match.length);
        if(memoize) {
          assets=memoize;
        }
      }
    }
    route("/index.html","./react/build/index.html","./react/build/assets/");
    route("/wc.html","./wc/dist/index.html", "./wc/dist/assets/");
    route("/assets/",assets);
    route("/png/","./public/png/");
    route("/mp3/","./public/mp3/");
    route("/mp4/","./public/mp4/");
    route("/bots/","./public/bots/");
    route("/manifest.json","./public/manifest.json");
    console.log(url + " =>" + tgt);
    const file = Bun.file(tgt);
    return new Response(file);
  },
  error() {
    return new Response(null, { status: 404 });
  },
});