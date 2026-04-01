// sw-kill.js — TabFin service worker
// Clears old caching service workers, preserves OneSignal worker

self.addEventListener('install', function(e){
  self.skipWaiting();
});

self.addEventListener('activate', function(e){
  e.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(keys.map(function(k){
        // Only delete TabFin cache keys, NOT OneSignal caches
        if(k.indexOf('onesignal') === -1 && k.indexOf('OneSignal') === -1){
          return caches.delete(k);
        }
      }));
    }).then(function(){
      return self.clients.claim();
    })
  );
});

// NO fetch handler — let browser handle all requests normally
