# SECC Pro

**Sistema Experto de Cunitas y Carpitas**

Sprint 6 — v0.6.1-alpha corregido

## Estado

Fase 1 completada: base PWA funcional.

## Qué incluye este entregable

- Flujo completo: Inicio → Diario → Hora → Mercado → Gestión → Resultado.
- Pantalla **Resultado** con `VerdictEngine`.
- Cálculo de confianza SECC.
- Explicación automática del veredicto.
- Guardado local de análisis.
- Pantalla **Historial** local.
- Pantalla **Instalar PWA** con instrucciones para iPhone y Android.
- Manifest PWA mejorado.
- Service Worker mejorado.
- Íconos para pantalla de inicio.
- Guía `PWA_INSTALL_GUIDE.md`.

## Cómo ejecutarlo

```bash
npm install
npm run dev
```

## Cómo probar la versión PWA

```bash
npm run build
npm run preview -- --host 0.0.0.0
```

Luego abre la URL desde el celular en la misma red.

## Importante

Para instalarla como PWA en uso real, debe servirse desde HTTPS. Puedes publicarla en Vercel, Netlify, Cloudflare Pages o GitHub Pages.

## Próxima fase

Fase 2: pulido visual avanzado, validación profunda de reglas, exportación del resultado y mejoras de historial/journal.


## Corrección v0.6.1

Esta versión corrige errores de TypeScript detectados al ejecutar `npm run build`:
- Props de Home.
- Ícono no importado.
- Propiedad inexistente en Hourly.
- Build validado correctamente.
