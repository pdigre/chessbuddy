/*
 * Utilities
 */
export const toMMSS: (sec_num: number) => string = sec_num => {
  const secs = isNaN(sec_num) ? 0 : sec_num;
  const m = Math.floor(secs / 60);
  const s = secs - m * 60;
  return (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
};

const getDeviceInfo = () => {
  const dev1 = localStorage.getItem('device');
  if (dev1) return dev1;
  const dev = {
    first: Date.now().toString(36),
    userAgent: navigator.userAgent,
    width: window.screen.width,
    height: window.screen.height,
    availWidth: window.screen.availWidth,
    availHeight: window.screen.availHeight,
    innerWidth: window.innerWidth,
    innerHeight: window.innerHeight,
  };
  const dev2 = JSON.stringify(dev);
  localStorage.setItem('device', dev2);
  return dev2;
};

export const deviceInfo = getDeviceInfo();
