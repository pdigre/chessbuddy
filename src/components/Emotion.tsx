import React from 'react';
import { emotioner, EmotionType } from './EmotionBox';

const winner_urls: EmotionType[] = [
  { src: '/mp4/win1.mp4' },
  { src: '/mp4/win2.mp4' },
  { src: '/mp4/win3.mp4' },
  { src: '/mp4/win4.mp4' },
];
const correct_urls: EmotionType[] = [
  { src: '/mp4/yes1.mp4' },
  { src: '/mp4/yes2.mp4' },
  { src: '/mp4/yes3.mp4' },
  { src: '/mp4/yes4.mp4' },
  { src: '/mp4/yes5.mp4' },
];
const mistake_urls: EmotionType[] = [
  { src: '/mp4/no1.mp4' },
  { src: '/mp4/no2.mp4' },
  { src: '/mp4/no3.mp4' },
  { src: '/mp4/no4.mp4' },
];

const all_urls = [...winner_urls, ...correct_urls, ...mistake_urls];
let prev = 0;

export const winner = (): void => emotion('Winner', winner_urls, 100);
export const correct = (): void => emotion('Stockfish would do the same', correct_urls, 2);
export const mistake = (): void => emotion('Mistake', mistake_urls, 6);
export const playall = (): void => {
  prev++;
  if (prev == all_urls.length) prev = 0;
  window.setTimeout(() => emotioner.clear(), 9000);
  emotioner.display('Url:' + all_urls[prev].src, all_urls[prev]);
};

const emotion = (title: string, html: EmotionType[], time: number) => {
  window.setTimeout(() => emotioner.clear(), time * 1000);
  emotioner.display(title, html[Math.floor(Math.random() * html.length)]);
};
