const BASE_PATH = './build';
console.log('React - http://localhost:3000/index.html');
Bun.serve({
  port: 3000,
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
