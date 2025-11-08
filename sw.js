const CACHE_NAME = 'idolstar-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/style.css',
    '/app.js',
    '/manifest.json'
    // 您還應該添加您的圖標 (icon-192.png 等)
];

// 安裝 Service Worker
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// 攔截網路請求
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // 如果緩存中有匹配的響應，則返回它
                if (response) {
                    return response;
                }
                // 否則，從網路獲取
                return fetch(event.request);
            })
    );
});
