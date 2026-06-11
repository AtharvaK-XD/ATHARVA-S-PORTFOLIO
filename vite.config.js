import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    react(),
    {
      name: 'serve-public-html',
      configureServer(server) {
        // This middleware runs BEFORE Vite's SPA history fallback.
        // It intercepts requests to .html files and serves them
        // directly from the public/ directory if they exist.
        server.middlewares.use((req, res, next) => {
          const url = req.url || '';
          // Strip query string for file lookup
          const cleanUrl = url.split('?')[0];

          // Only intercept .html file requests (not the root index.html)
          if (cleanUrl.endsWith('.html') && cleanUrl !== '/' && cleanUrl !== '/index.html') {
            const publicFilePath = path.join(process.cwd(), 'public', cleanUrl);
            if (fs.existsSync(publicFilePath)) {
              const content = fs.readFileSync(publicFilePath, 'utf-8');
              res.setHeader('Content-Type', 'text/html; charset=utf-8');
              res.statusCode = 200;
              res.end(content);
              return;
            }
          }
          next();
        });
      }
    },
    {
      name: 'browser-error-logger',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url && !req.url.includes('@vite') && !req.url.includes('node_modules')) {
            console.log(`[Vite Request] ${req.method} ${req.url}`);
          }
          if (req.url && req.url.startsWith('/browser-error')) {
            const url = new URL(req.url, 'http://127.0.0.1:5000');
            const msg = url.searchParams.get('msg');
            console.log('\n>>> BROWSER DIAGNOSTIC ERROR:', decodeURIComponent(msg), '\n');
            res.statusCode = 200;
            res.end('Logged');
          } else {
            next();
          }
        });
      }
    }
  ],
  server: {
    port: 5000,
    host: '127.0.0.1',
  },
})
