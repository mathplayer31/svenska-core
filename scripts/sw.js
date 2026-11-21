// Service worker de la PWA (issue #12). Modèle : vite.config.ts le copie dans dist/sw.js
// en ajoutant en tête SHELL, AUDIO (URL à précharger) et leurs versions SHELL_V, AUDIO_V.
// L'app (HTML, JS, CSS, polices, icônes) et les sons sont en cache : tout marche hors ligne.
// Deux caches séparés : un déploiement remplace l'app, et ne retélécharge les sons que s'ils ont changé.
/* global SHELL, AUDIO, SHELL_V, AUDIO_V */
const SHELL_CACHE = `shell-${SHELL_V}`;
const AUDIO_CACHE = `audio-${AUDIO_V}`;

/** Ajoute au cache les URL qui n'y sont pas encore, par lots (reprend un préchargement interrompu) */
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

/** Safari iOS lit les sons par morceaux (en-tête Range) et refuse une réponse complète : on renvoie un 206 */
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
  // Compte et synchro (Supabase) et tout ce qui n'est pas ce site : réseau direct
  if (req.method !== 'GET' || url.origin !== self.location.origin) return;

  if (req.mode === 'navigate') {
    // Application d'une seule page : toute navigation affiche la page d'accueil en cache ("/" : Cloudflare redirige /index.html vers /)
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
