const BASE_PATH = "./dist";
console.log("WC - http://localhost:3002/index.html");
Bun.serve({
  port: 3002,
  async fetch(req) {
    const filePath = BASE_PATH + new URL(req.url).pathname;
    const file = Bun.file(filePath);
	console.log(filePath);
    return new Response(file);
  },
  error() {
    return new Response(null, { status: 404 });
  },
});