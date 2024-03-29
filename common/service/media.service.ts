import { action, makeObservable, observable } from 'mobx';
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
  sounds: Map<string, string> = new Map([
    ['move', '/mp3/move1.mp3'],
    ['click', '/mp3/click.mp3'],
    ['error', '/mp3/buzzer.mp3'],
  ]);

  constructor() {
    makeObservable(this, {
      show: observable,
    });
  }

  playSound(name: string) {
    const sound = this.sounds.get(name);
    if (sound) new Audio(sound).play().then();
  }

  soundMove() {
    this.playSound('move');
  }
  soundClick() {
    this.playSound('click');
  }
  soundError() {
    this.playSound('error');
  }

  playRandom(enable: boolean, title: string, emos: Mp4Type[]) {
    if (enable) this.play(emos[Math.floor(Math.random() * emos.length)], title);
  }

  play(emo: Mp4Type, title: string) {
    this.show = true;
    this.title = title;
    this.msg = emo;
    window.setTimeout(this.onClose, Math.max(emo.length ?? 3, 2) * 1000);
  }

  playWinner() {
    this.playRandom(configService.display.playWinner, 'Winner', this.winner_urls);
  }
  playCorrect() {
    this.playRandom(
      configService.display.playCorrect,
      'Stockfish would do the same',
      this.correct_urls
    );
  }
  playMistake() {
    this.playRandom(configService.display.playMistake, 'Mistake', this.mistake_urls);
  }

  onClose = action(() => {
    this.title = '';
    this.show = false;
  });

  readonly playAllAction = action((): void => {
    this.prev++;
    const all_urls = [...this.winner_urls, ...this.correct_urls, ...this.mistake_urls];
    if (this.prev == all_urls.length) this.prev = 0;
    const emo = all_urls[this.prev];
    this.play(emo, 'Url:' + emo.src);
  });

  private winner_urls: Mp4Type[] = [
    { src: '/mp4/win1.mp4', width: 640, height: 360, length: 22 },
    { src: '/mp4/win2.mp4', width: 360, height: 360, length: 30 },
    { src: '/mp4/win3.mp4', width: 700, height: 360, length: 11 },
    { src: '/mp4/win4.mp4', width: 540, height: 360, length: 3 },
  ];
  private correct_urls: Mp4Type[] = [
    { src: '/mp4/yes1.mp4', width: 700, height: 270, length: 1 },
    { src: '/mp4/yes2.mp4', width: 700, height: 358, length: 1 },
    { src: '/mp4/yes3.mp4', width: 640, height: 360, length: 2 },
    { src: '/mp4/yes4.mp4', width: 360, height: 360, length: 8 },
    { src: '/mp4/yes5.mp4', width: 480, height: 360, length: 4 },
  ];
  private mistake_urls: Mp4Type[] = [
    { src: '/mp4/no1.mp4', width: 360, height: 360, length: 13 },
    { src: '/mp4/no2.mp4', width: 638, height: 266, length: 1 },
    { src: '/mp4/no3.mp4', width: 638, height: 266, length: 1 },
    { src: '/mp4/no4.mp4', width: 640, height: 360, length: 5 },
  ];

  getDialogControls() {
    return {
      width: Math.min(this.msg?.width ?? 480, 500),
      src: this.msg?.src ?? '',
      title: this.title,
      onClose: this.onClose,
      open: this.show,
    };
  }
}
