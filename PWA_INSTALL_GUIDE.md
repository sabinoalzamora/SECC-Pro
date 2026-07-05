# Guía rápida para instalar SECC Pro en el celular

## Durante pruebas locales

1. Instala dependencias:
   ```bash
   npm install
   ```

2. Ejecuta:
   ```bash
   npm run build
   npm run preview -- --host 0.0.0.0
   ```

3. Abre la URL desde el celular si está en la misma red.

## iPhone

1. Abre SECC Pro en Safari.
2. Toca Compartir.
3. Toca “Agregar a pantalla de inicio”.
4. Confirma el nombre SECC Pro.

## Android

1. Abre SECC Pro en Chrome.
2. Abre el menú.
3. Toca “Instalar app” o “Agregar a pantalla principal”.

## Para uso real

La PWA debe estar publicada en un sitio HTTPS. Ejemplos:
- Vercel
- Netlify
- Cloudflare Pages
- GitHub Pages con HTTPS
