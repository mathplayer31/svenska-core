// PWA service worker (issue #12). Template: vite.config.ts copies it to dist/sw.js
// prepending SHELL, AUDIO (URLs to preload) and their versions SHELL_V, AUDIO_V.
// The app (HTML, JS, CSS, fonts, icons) and the sounds are cached: everything works offline.
// Two separate caches: a deployment replaces the app, and only downloads the sounds again if they changed.
/* global SHELL, AUDIO, SHELL_V, AUDIO_V */
const SHELL_CACHE = `shell-${SHELL_V}`;
const AUDIO_CACHE = `audio-${AUDIO_V}`;

/** Adds to the cache the URLs not there yet, in batches (resumes an interrupted preload) */
async function fill(name, urls) {
  const cache = await caches.open(name);
  const missing = [];
  for (const url of urls) if (!(await cache.match(url))) missing.push(url);
  for (let i = 0; i < missing.length; i += 40) await cache.addAll(missing.slice(i, i + 40));
}

self.addEventListener('install', (e) => {
  e.waitUntil(Promise.all([fill(SHELL_CACHE, SHELL), fill(AUDIO_CACHE, AUDIO)]).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== SHELL_CACHE && k !== AUDIO_CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

/** iOS Safari reads sounds in chunks (Range header) and rejects a full response: a 206 is returned */
async function ranged(request, response) {
  const range = request.headers.get('range');
  if (!range) return response;
  const buf = await response.arrayBuffer();
  const total = buf.byteLength;
  const m = /bytes=(\d*)-(\d*)/.exec(range);
  let start = m && m[1] ? Number(m[1]) : 0;
  let end = m && m[2] ? Number(m[2]) : total - 1;
  if (m && !m[1] && m[2]) {
    start = Math.max(0, total - Number(m[2]));
    end = total - 1;
  }
  end = Math.min(end, total - 1);
  if (start > end) return new Response(null, { status: 416, headers: { 'Content-Range': `bytes */${total}` } });
  return new Response(buf.slice(start, end + 1), {
    status: 206,
    headers: {
      'Content-Type': response.headers.get('Content-Type') || 'audio/mpeg',
      'Content-Range': `bytes ${start}-${end}/${total}`,
      'Content-Length': String(end - start + 1),
      'Accept-Ranges': 'bytes',
    },
  });
}

self.addEventListener('fetch', (e) => {
  const req = e.request;
  const url = new URL(req.url);
  // Account and sync (Supabase) and anything that is not this site: straight to the network
  if (req.method !== 'GET' || url.origin !== self.location.origin) return;

  if (req.mode === 'navigate') {
    // Single-page app: any navigation shows the cached home page ("/": Cloudflare redirects /index.html to /)
    e.respondWith(caches.match('/', { cacheName: SHELL_CACHE }).then((r) => r || fetch(req)));
    return;
  }
  e.respondWith(
    caches.match(url.pathname).then(async (hit) => {
      if (hit) return url.pathname.startsWith('/audio/') ? ranged(req, hit) : hit;
      return fetch(req);
    })
  );
});

// Daily reminder (issue #16): the Supabase send-reminders function sends { title, body }
self.addEventListener('push', (e) => {
  let msg = {};
  try {
    msg = e.data ? e.data.json() : {};
  } catch {
    // unreadable message: default notification
  }
  e.waitUntil(
    self.registration.showNotification(msg.title || 'SvenskaCore', {
      body: msg.body || '',
      icon: '/icons/icon-192.png',
      tag: 'rappel',
    })
  );
});

// Tapping the notification brings the app to the foreground, or opens it
self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  e.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((list) => {
      const win = list.find((c) => 'focus' in c);
      return win ? win.focus() : self.clients.openWindow('/');
    })
  );
});
