import { makeAutoObservable } from 'mobx';
import { configService } from './index.service';

type Mp4Type = {
  src: string;
  width?: number;
  height?: number;
  length?: number;
};

export class MediaService {
  title?: string;
  msg?: Mp4Type;
  show = false;
  prev = 0;
  sound_move = new Audio('/mp3/move1.mp3');
  sound_click = new Audio('/mp3/click.mp3');
  sound_error = new Audio('/mp3/buzzer.mp3');

  constructor() {
    makeAutoObservable(this);
  }

  soundMove = () => this.sound_move.play().then();
  soundClick = () => this.sound_click.play().then();
  soundError = () => this.sound_error.play().then();

  clear: () => void = () => {
    this.title = undefined;
  };
  display: (title: string, msg: Mp4Type) => void = (title, msg) => {
    this.title = title;
    this.msg = msg;
  };
  playRandom = (enable: boolean, title: string, emos: Mp4Type[]) => {
    if (enable) this.play(emos[Math.floor(Math.random() * emos.length)], title);
  };
  play = (emo: Mp4Type, title: string) => {
    window.setTimeout(() => this.clear(), (emo.length ?? 10) * 1000 + 1000);
    this.display(title, emo);
  };
  playWinner = (): void => this.playRandom(configService.playWinner, 'Winner', this.winner_urls);
  playCorrect = (): void =>
    this.playRandom(configService.playCorrect, 'Stockfish would do the same', this.correct_urls);
  playMistake = (): void =>
    this.playRandom(configService.playMistake, 'Mistake', this.mistake_urls);

  playAll = (): void => {
    this.prev++;
    const all_urls = [...this.winner_urls, ...this.correct_urls, ...this.mistake_urls];
    if (this.prev == all_urls.length) this.prev = 0;
    const emo = all_urls[this.prev];
    this.play(emo, 'Url:' + emo.src);
  };

  winner_urls: Mp4Type[] = [
    { src: '/mp4/win1.mp4', width: 640, height: 360, length: 22 },
    { src: '/mp4/win2.mp4', width: 360, height: 360, length: 30 },
    { src: '/mp4/win3.mp4', width: 700, height: 360, length: 11 },
    { src: '/mp4/win4.mp4', width: 540, height: 360, length: 3 },
  ];
  correct_urls: Mp4Type[] = [
    { src: '/mp4/yes1.mp4', width: 700, height: 270, length: 1 },
    { src: '/mp4/yes2.mp4', width: 700, height: 358, length: 1 },
    { src: '/mp4/yes3.mp4', width: 640, height: 360, length: 2 },
    { src: '/mp4/yes4.mp4', width: 360, height: 360, length: 8 },
    { src: '/mp4/yes5.mp4', width: 480, height: 360, length: 4 },
  ];
  mistake_urls: Mp4Type[] = [
    { src: '/mp4/no1.mp4', width: 360, height: 360, length: 13 },
    { src: '/mp4/no2.mp4', width: 638, height: 266, length: 1 },
    { src: '/mp4/no3.mp4', width: 638, height: 266, length: 1 },
    { src: '/mp4/no4.mp4', width: 640, height: 360, length: 5 },
  ];
}
