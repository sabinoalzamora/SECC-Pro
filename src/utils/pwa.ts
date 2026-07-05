export function isStandalonePWA() {
  return window.matchMedia('(display-mode: standalone)').matches || (window.navigator as Navigator & { standalone?: boolean }).standalone === true;
}

export function isIOS() {
  return /iphone|ipad|ipod/i.test(window.navigator.userAgent);
}
