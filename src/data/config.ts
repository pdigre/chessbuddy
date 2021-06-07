import { makeAutoObservable } from 'mobx';

export class Config {
  rotation = 0;
  markLog = -1;
  markHist = -1;
  showConfig = false;
  showHints = true;
  showCP = true;
  showFacts = true;
  showHist = false;
  showUndo = false;
  undopos = 0;

  constructor() {
    makeAutoObservable(this);
    this.wakeLocker();
  }

  wakeLocker: VoidFunction = async () => {
    if ('wakeLock' in navigator) {
      // The wake lock sentinel.
      let wakeLock: WakeLockSentinel | undefined = undefined;

      // Function that attempts to request a screen wake lock.
      const requestWakeLock = async () => {
        try {
          wakeLock = await navigator.wakeLock.request('screen');
          if (wakeLock) {
            wakeLock?.addEventListener('release', () => {
              console.log('Screen Wake Lock released:', wakeLock?.released);
            });
            console.log('Screen Wake Lock released:', wakeLock.released);
          }
        } catch (err) {
          console.error(`${err.name}, ${err.message}`);
        }
      };
      const handleVisibilityChange = async () => {
        if (wakeLock !== null && document.visibilityState === 'visible') {
          await requestWakeLock();
        }
      };

      document.addEventListener('visibilitychange', handleVisibilityChange);

      // Request a screen wake lock…
      await requestWakeLock();
    }
  };

  undoTimer: TimerHandler = () => {
    if (this.showUndo) {
      this.undopos = 0; // In the case you're already in a UNDO confirmation box.
    }
    this.showUndo = false;
  };

  startUndoTimer: (pos: number) => void = pos => {
    this.showUndo = true;
    this.undopos = pos;
    window.setTimeout(this.undoTimer, 9000);
  };
}

export const config = new Config();
