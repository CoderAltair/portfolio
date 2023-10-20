'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "9ce78f407a76ff9bee72335dac66e8de",
"assets/AssetManifest.json": "25af466bf5e6877ecc82a3759d7f6cf5",
"assets/assets/1-portrait.png": "2d754b26b83af7095f7cc736438d2de0",
"assets/assets/10-portrait.png": "e06a3666b39a89f7f62eb67ff539dbf2",
"assets/assets/11.webp": "b6233a0e93b64bfd17a7b9bbf121068e",
"assets/assets/12-ai.png": "c0a09a440775e719e4defb98450fbb16",
"assets/assets/12.png": "7a362cf57202a2b4f0d55cfbe7e4aa3a",
"assets/assets/13.png": "7c138b8754e25d032c0245a078253e8e",
"assets/assets/2-portrait.png": "41095feb3c75c545d4e595244813a463",
"assets/assets/22.webp": "c2474fb3c1f5f5173fe6220fef36ce03",
"assets/assets/3-portrait.png": "d48adbe28395ba111ec2f9d855a01ea7",
"assets/assets/33.webp": "c638f413721fe12137ffad401ffa3eef",
"assets/assets/4-portrait.png": "37ce8154690c932b70d494025ff756b4",
"assets/assets/44.png": "13f65edb535e0ff2f0403a1986445465",
"assets/assets/5-portrait.png": "a4ae1872b6b7d31d3e2728b69035d883",
"assets/assets/55.jpg": "bb090c7edd7ac48efa5a41c4be98c419",
"assets/assets/6-portrait.png": "70e97034580bb7386b5819b0db4436cf",
"assets/assets/66.webp": "c664e16169fe8ab9edd4e8ade2d698bb",
"assets/assets/7-portrait.png": "857c53bdde2528fd279ee7a44c18ab74",
"assets/assets/77.webp": "b90375f3479e4e2ab847e9fedc8550c2",
"assets/assets/8-portrait.png": "aa24e326b943f411dbc1a38d5f48f775",
"assets/assets/9-portrait.png": "2723d43bd79407a73f4a78530631202e",
"assets/assets/99.webp": "5e8f493c9dd2c4c4a6aa6f718e5153b9",
"assets/assets/app-store.png": "8c7e36dbc69905129932e87645a975c9",
"assets/assets/bac2.jpg": "93546454e6e4f5d0c2e71a4b7a1cf523",
"assets/assets/download.png": "f0aa9959eadfa183ae193aae537bc7fd",
"assets/assets/fonts/Montserrat.ttf": "e6cb49ef6502d09136c7302d56f4197b",
"assets/assets/github.png": "29a80be91ff5b5a0c9ce641a9252f99b",
"assets/assets/google-play.png": "7603c349df6d4fbc826ccddea72ee60c",
"assets/assets/instagram.png": "50b508f1859aae7bc978f3c610df27c7",
"assets/assets/linkedin.png": "918edd626a0f66ba9aee1633bc0a6ec8",
"assets/assets/mee.pdf": "6d7ad0ed2add35e11cb746ec03f8eeb9",
"assets/assets/portfolio.png": "0f084868835600139575f9191ef807e2",
"assets/assets/telegram.png": "d8d8c6134793c6be698c85f232110be5",
"assets/assets/windows.png": "147269b2410437ad9873f17b9b16ac3e",
"assets/FontManifest.json": "c2db30892d1e95aefe670734a39b82d4",
"assets/fonts/MaterialIcons-Regular.otf": "d17e75a6d19c6ea0cd1ed05597509729",
"assets/NOTICES": "c3c95cad18c8408ccc6e832d8141353f",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "89ed8f4e49bcdfc0b5bfc9b24591e347",
"assets/shaders/ink_sparkle.frag": "f8b80e740d33eb157090be4e995febdf",
"canvaskit/canvaskit.js": "bbf39143dfd758d8d847453b120c8ebb",
"canvaskit/canvaskit.wasm": "42df12e09ecc0d5a4a34a69d7ee44314",
"canvaskit/chromium/canvaskit.js": "96ae916cd2d1b7320fff853ee22aebb0",
"canvaskit/chromium/canvaskit.wasm": "be0e3b33510f5b7b0cc76cc4d3e50048",
"canvaskit/skwasm.js": "95f16c6690f955a45b2317496983dbe9",
"canvaskit/skwasm.wasm": "1a074e8452fe5e0d02b112e22cdcf455",
"canvaskit/skwasm.worker.js": "51253d3321b11ddb8d73fa8aa87d3b15",
"favicon.png": "efd0b5ed33715e21d4fc64c1b4cc929d",
"flutter.js": "6b515e434cea20006b3ef1726d2c8894",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "ea2ea3c25bd622dd76a6ca47f36d5d95",
"/": "ea2ea3c25bd622dd76a6ca47f36d5d95",
"main.dart.js": "3844766cb819f4bf767cde28bee66caa",
"manifest.json": "16f93d8b46d5daece0e23fbdafca83cc",
"version.json": "92b6e0cb47f0842ed969c6949d17dff1"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
