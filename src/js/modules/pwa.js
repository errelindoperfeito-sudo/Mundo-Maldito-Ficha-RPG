export function registrarServiceWorker() {
    if (!('serviceWorker' in navigator)) return;
    navigator.serviceWorker.register('./sw.js')
        .then(() => console.log('SW registrado'))
        .catch(err => console.error(err));
}
