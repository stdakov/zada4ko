/* ==========================================================================
   zada4ko.com — service worker
   Caches the app shell so worksheets can still be generated offline.
   Bump CACHE when any asset below changes.
   ========================================================================== */
"use strict";

var CACHE = "zada4ko-v4";

var SHELL = [
  "./",
  "index.html",
  "media/css/base.css",
  "media/css/app.css",
  "media/css/print.css",
  "media/js/confetti.min.js",
  "media/js/core.js",
  "media/js/store.js",
  "media/js/gen/registry.js",
  "media/js/gen/arith.js",
  "media/js/gen/word.js",
  "media/js/gen/measure.js",
  "media/js/gen/advanced.js",
  "media/js/sheet.js",
  "media/js/solve.js",
  "media/js/app.js",
  "site.webmanifest",
  "media/icon/favicon.svg",
  "media/icon/favicon.ico",
  "media/icon/favicon-32x32.png",
  "media/icon/favicon-16x16.png",
  "media/icon/apple-touch-icon.png",
  "media/icon/android-chrome-192x192.png",
  "media/icon/android-chrome-512x512.png"
];

self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(CACHE).then(function (c) {
      // cache files one by one: a single 404 must not abort the whole install
      return Promise.all(SHELL.map(function (url) {
        return c.add(new Request(url, { cache: "reload" })).catch(function () { });
      }));
    }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (k) {
        return k === CACHE ? null : caches.delete(k);
      }));
    }).then(function () { return self.clients.claim(); })
  );
});

/** Store a copy of a good response, without blocking the response itself. */
function keep(req, res) {
  if (res && res.ok) {
    var copy = res.clone();
    caches.open(CACHE).then(function (c) { c.put(req, copy); });
  }
  return res;
}

/** The app's own code, as opposed to icons and other immutable assets. */
function isCode(url) {
  return /\.(?:html|js|css|webmanifest)$/i.test(url.pathname) ||
    url.pathname === "/" || url.pathname.slice(-1) === "/";
}

self.addEventListener("fetch", function (e) {
  var req = e.request;
  if (req.method !== "GET") return;

  var url = new URL(req.url);
  if (url.origin !== self.location.origin) return;   // fonts & analytics: network only

  // Navigations: network first, fall back to the cached shell so deep links
  // still work offline.
  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req).then(function (res) { return keep(req, res); }).catch(function () {
        return caches.match("index.html").then(function (r) { return r || caches.match("./"); });
      })
    );
    return;
  }

  // Code: network first. Serving JS and CSS from the cache first meant a deploy
  // looked like it had done nothing until CACHE was bumped by hand — one
  // forgotten bump and every returning visitor kept running the old app.
  if (isCode(url)) {
    e.respondWith(
      fetch(req).then(function (res) { return keep(req, res); }).catch(function () {
        return caches.match(req);
      })
    );
    return;
  }

  // Icons and other assets: cache first, refreshed in the background.
  e.respondWith(
    caches.match(req).then(function (hit) {
      var net = fetch(req).then(function (res) { return keep(req, res); })
        .catch(function () { return hit; });
      return hit || net;
    })
  );
});
