// Checking for browser compatibility (soft degradation?)
if (navigator.serviceWorker) {
  navigator.serviceWorker.register("../sw.js")
  .then(() => console.log("Service Worker installed"))
  .catch(() => console.log("Service Worker Failed"));
}