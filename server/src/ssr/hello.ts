import { type GoogleUserInfo } from '../googleAuth.ts';
import { readData } from '../datastore.ts';

export default async function helloPage(req: Request, user: GoogleUserInfo) {
  const userData = await readData(user.email);
  return {
    title: 'Hello World',
    body: `
        <h1>Hello from Bun!</h1>
        <p>This is a server-side rendered page.</p>
        <h2>Welcome ${user.email}</h2>
        
        <div id="data-tree"></div>
        
        <script src="https://cdn.jsdelivr.net/npm/renderjson@1.4.0/renderjson.min.js"></script>
        <script>
          const data = ${JSON.stringify(userData)};
          renderjson.set_show_to_level(2);
          document.getElementById('data-tree').appendChild(renderjson(data));
        </script>
        <style>
            .renderjson a { text-decoration: none; }
            .renderjson .disclosure { color: crimson; font-size: 150%; }
        </style>
      `,
  };
}
