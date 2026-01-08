import { type GoogleUserInfo } from '../googleAuth.ts';
import { readData } from '../datastore.ts';

export default async function helloPage(req: Request, user: GoogleUserInfo) {
  const userData = await readData(user.email);
  return {
    title: 'Hello World',
    body: `
        <script src='https://cdn.jsdelivr.net/npm/renderjson@1.4.0/renderjson.min.js'></script>
        <h2>Server data for ${user.email}</h2>
        <link rel='stylesheet' href='./display.css'>
        <div id='data-tree'></div>
        <script type='module'>
            import { loadJson } from './display.js';
            loadJson(${JSON.stringify(userData)});
        </script>
      `,
  };
}
