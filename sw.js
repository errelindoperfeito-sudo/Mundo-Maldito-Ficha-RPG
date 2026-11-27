// sw.js
const CACHE_NAME = "mundo-maldito-v2";

const arquivos = [
    "./",
    "./index.html",
    "./manifest.json",
    "./icon-rpg.webp",
    "./src/css/main.css",
    "./src/css/variables.css",
    "./src/css/base.css",
    "./src/css/header.css",
    "./src/css/topo.css",
    "./src/css/tabs.css",
    "./src/css/atributos.css",
    "./src/css/barras.css",
    "./src/css/pericias.css",
    "./src/css/diario.css",
    "./src/css/classes.css",
    "./src/css/modal.css",
    "./src/css/responsivo.css",
    "./src/css/ocupacao.css",
    "./src/css/regras.css",
    "./src/js/main.js",
    "./src/js/config.js",
    "./src/js/state.js",
    "./src/js/dom.js",
    "./src/js/data/ocupacoes.js",
    "./src/js/data/classes.js",
    "./src/js/modules/abas.js",
    "./src/js/modules/atributos.js",
    "./src/js/modules/barras.js",
    "./src/js/modules/foto.js",
    "./src/js/modules/ocupacao.js",
    "./src/js/modules/pericias.js",
    "./src/js/modules/pwa.js",
    "./src/js/modules/status.js",
    "./src/js/modules/storage.js"
];

self.addEventListener("install", event => {
    self.skipWaiting();
    event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(arquivos)));
});

// Remove caches de versões antigas
self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys()
            .then(nomes => Promise.all(nomes.filter(n => n !== CACHE_NAME).map(n => caches.delete(n))))
            .then(() => self.clients.claim())
    );
});

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(response => response || fetch(event.request))
    );
});
