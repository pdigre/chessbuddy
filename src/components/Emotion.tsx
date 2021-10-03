import React from 'react';
import { messager } from './MessageBox';

const winner_urls = [
  <iframe
    key="w1"
    allow="fullscreen"
    frameBorder="0"
    height="270"
    src="https://giphy.com/embed/jJjb9AUHOiP3nJJMdy/video"
    width="480"
  />,
  <iframe
    key="w2"
    allow="fullscreen"
    frameBorder="0"
    height="480"
    src="https://giphy.com/embed/a42CE9jJY8zYGU51bG/video"
    width="480"
  />,
  <iframe
    key="w3"
    allow="fullscreen"
    frameBorder="0"
    height="270"
    src="https://giphy.com/embed/LSdCB1uizqnZn69Vzv/video"
    width="480"
  />,
  <iframe
    key="w4"
    allow="fullscreen"
    frameBorder="0"
    height="360"
    src="https://giphy.com/embed/lYv10cDlosFnA0toPb/video"
    width="480"
  />,
  <iframe
    key="w5"
    allow="fullscreen"
    frameBorder="0"
    height="360"
    src="https://giphy.com/embed/y68J3KAxOA3NRd85Tw/video"
    width="480"
  />,
];
const correct_urls = [
  <iframe
    key="c1"
    allow="fullscreen"
    frameBorder="0"
    height="203"
    src="https://giphy.com/embed/PFs9HklIZefehcOphI/video"
    width="480"
  />,
  <iframe
    key="c2"
    allow="fullscreen"
    frameBorder="0"
    height="270"
    src="https://giphy.com/embed/W3IjOobmcXX56Ib0nh/video"
    width="480"
  />,
  <iframe
    key="c3"
    allow="fullscreen"
    frameBorder="0"
    height="286"
    src="https://giphy.com/embed/D5xExRTaM0G5k5GdzY/video"
    width="480"
  />,
  <iframe
    key="c4"
    allow="fullscreen"
    frameBorder="0"
    height="480"
    src="https://giphy.com/embed/t34U2oXtwwgIjURdOw/video"
    width="480"
  />,
];
const mistake_urls = [
  <iframe
    key="m1"
    allow="fullscreen"
    frameBorder="0"
    height="270"
    src="https://giphy.com/embed/CJyRX8btFziYLt3WAT/video"
    width="480"
  />,
  <iframe
    key="m2"
    allow="fullscreen"
    frameBorder="0"
    height="480"
    src="https://giphy.com/embed/lkibHaGO1xmJXapEdq/video"
    width="480"
  />,
  <iframe
    key="m3"
    allow="fullscreen"
    frameBorder="0"
    height="200"
    src="https://giphy.com/embed/ZiwaXDesiehu2CTvRN/video"
    width="480"
  />,
  <iframe
    key="m4"
    allow="fullscreen"
    frameBorder="0"
    height="200"
    src="https://giphy.com/embed/BCqsNQRtZZf8QJnK5b/video"
    width="480"
  />,
];
const all_urls = [...winner_urls, ...correct_urls, ...mistake_urls];
let prev = 0;

export const winner = () => emotion('Winner', winner_urls, 100);
export const correct = () => emotion('Stockfish would do the same', correct_urls, 5);
export const mistake = () => emotion('Mistake', winner_urls, 10);
export const playall = () => {
  prev++;
  if (prev == all_urls.length) prev = 0;
  window.setTimeout(() => messager.clear(), 9000);
  messager.display('Url:' + all_urls[prev].key, <div>{all_urls[prev]}</div>);
};

const emotion = (title: string, html: JSX.Element[], time: number) => {
  window.setTimeout(() => messager.clear(), time * 1000);
  messager.display(title, <div>{html[Math.floor(Math.random() * html.length)]}</div>);
};
