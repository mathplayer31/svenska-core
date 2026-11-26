import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { createHash } from 'node:crypto'
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join, relative, sep } from 'node:path'

/** Writes dist/sw.js (issue #12): scripts/sw.js template + list of build files to preload */
function serviceWorker(): Plugin {
  return {
    name: 'svenska-service-worker',
    apply: 'build',
    closeBundle() {
      const dist = join(import.meta.dirname, 'dist')
      const files = readdirSync(dist, { recursive: true, withFileTypes: true })
        .filter((f) => f.isFile())
        .map((f) => relative(dist, join(f.parentPath, f.name)).split(sep).join('/'))
        .filter((f) => f !== 'sw.js')
        .sort()
      // Version = content fingerprint: the cache only changes if a file changes
      const version = (list: string[]) => {
        const h = createHash('sha256')
        for (const f of list) h.update(f).update(readFileSync(join(dist, f)))
        return h.digest('hex').slice(0, 12)
      }
      const audio = files.filter((f) => f.startsWith('audio/'))
      const shell = files.filter((f) => !f.startsWith('audio/'))
      const url = (f: string) => (f === 'index.html' ? '/' : '/' + f.split('/').map(encodeURIComponent).join('/'))
      const head = [
        `const SHELL = ${JSON.stringify(shell.map(url))};`,
        `const AUDIO = ${JSON.stringify(audio.map(url))};`,
        `const SHELL_V = '${version(shell)}';`,
        `const AUDIO_V = '${version(audio)}';`,
      ].join('\n')
      writeFileSync(join(dist, 'sw.js'), head + '\n' + readFileSync(join(import.meta.dirname, 'scripts/sw.js'), 'utf8'))
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), serviceWorker()],
  server: {
    watch: {
      // Generated folders (Android build, web build, MP3, Supabase): each build writes thousands of files,
      // and watching them caused bursts of reloads and a memory leak in the dev server.
      ignored: ['**/android/**', '**/dist/**', '**/public/audio/**', '**/supabase/**'],
    },
  },
})
