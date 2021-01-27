const staticCacheName = 'site-static-v19';
const dynamicCacheName = 'site-dynamic-v19';
const assets = [
	'/',
	'/index.html',
	'/404.html',
	'/pages/fallback.html',
	'/js/autocomplete.js',
	'/js/dropdown.js',
	'/js/modal.js',
	'/js/scripts.js',
	'/js/settings.js',
	'/js/types.js',
	'/js/weatherboost.js',
	'/data/pokedex.json',
	'/data/types.json',
	'/css/styles.css',
	'/img/icons/icon-96x96.png',
];
const typeNames = ['normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'];
for(let type of typeNames) {
	assets.push(`/img/types/${type}.svg`);
}

const weatherNames = ['clear', 'cloudy', 'fog', 'partly_cloudy', 'rainy', 'snow', 'sunny', 'windy'];
for(let weather of weatherNames) {
	assets.push(`/img/weather/${weather}.png`);
}

// cache size limit function
const limitCacheSize = (name, size) => {
	caches.open(name).then(cache => {
		cache.keys().then(keys => {
			if(keys.length > size){
				cache.delete(keys[0]).then(limitCacheSize(name, size));
			}
		});
	});
};

// install event
self.addEventListener('install', evt => {
	//console.log('service worker installed');
	evt.waitUntil(
		caches.open(staticCacheName).then((cache) => {
			console.log('caching shell assets');
			cache.addAll(assets);
		}).then(()=> self.skipWaiting()) // new
	);
});

// activate event
self.addEventListener('activate', evt => {
	//console.log('service worker activated');
	evt.waitUntil(
		caches.keys().then(keys => {
			//console.log(keys);
			return Promise.all(keys
				.filter(key => key !== staticCacheName && key !== dynamicCacheName)
				.map(key => caches.delete(key))
			);
		})
	);
});

// fetch event
self.addEventListener('fetch', evt => {
	//console.log('fetch event', evt);
	evt.respondWith(
		caches.match(evt.request).then(cacheRes => {
			return cacheRes || fetch(evt.request).then(fetchRes => {
				return caches.open(dynamicCacheName).then(cache => {
					if(evt.request.url.indexOf('chrome-extension') != -1) return fetchRes; // new
					cache.put(evt.request.url, fetchRes.clone());
					// check cached items size
					limitCacheSize(dynamicCacheName, 100);
					return fetchRes;
				})
			});
		}).catch(() => {
			if(evt.request.url.indexOf('.html') > -1){
				return caches.match('/pages/fallback.html');
			} 
		})
	);
});