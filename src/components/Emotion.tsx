import { emotioner, EmotionType } from './EmotionBox';

const winner_urls: EmotionType[] = [
  { src: '/mp4/win1.mp4', width: 640, height: 360, length: 22 },
  { src: '/mp4/win2.mp4', width: 360, height: 360, length: 30 },
  { src: '/mp4/win3.mp4', width: 700, height: 360, length: 11 },
  { src: '/mp4/win4.mp4', width: 540, height: 360, length: 3 },
];
const correct_urls: EmotionType[] = [
  { src: '/mp4/yes1.mp4', width: 700, height: 270, length: 1 },
  { src: '/mp4/yes2.mp4', width: 700, height: 358, length: 1 },
  { src: '/mp4/yes3.mp4', width: 640, height: 360, length: 2 },
  { src: '/mp4/yes4.mp4', width: 360, height: 360, length: 8 },
  { src: '/mp4/yes5.mp4', width: 480, height: 360, length: 4 },
];
const mistake_urls: EmotionType[] = [
  { src: '/mp4/no1.mp4', width: 360, height: 360, length: 13 },
  { src: '/mp4/no2.mp4', width: 638, height: 266, length: 1 },
  { src: '/mp4/no3.mp4', width: 638, height: 266, length: 1 },
  { src: '/mp4/no4.mp4', width: 640, height: 360, length: 5 },
];

const playEmotion = (emo: EmotionType, title: string) => {
  window.setTimeout(() => emotioner.clear(), (emo.length ?? 10) * 1000 + 1000);
  emotioner.display(title, emo);
};

const emotion = (title: string, emos: EmotionType[]) => {
  playEmotion(emos[Math.floor(Math.random() * emos.length)], title);
};

export const winner = (): void => emotion('Winner', winner_urls);
export const correct = (): void => emotion('Stockfish would do the same', correct_urls);
export const mistake = (): void => emotion('Mistake', mistake_urls);

let prev = 0;

export const playall = (): void => {
  prev++;
  const all_urls = [...winner_urls, ...correct_urls, ...mistake_urls];
  if (prev == all_urls.length) prev = 0;
  const emo = all_urls[prev];
  playEmotion(emo, 'Url:' + emo.src);
};
