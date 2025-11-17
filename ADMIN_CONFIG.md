# Configuración del Admin Panel

## Contraseña del Admin

La contraseña se configura en las **variables de entorno** por seguridad y **NUNCA se expone en el código**.

### Configuración Local

Agrega esta línea a tu archivo `.env.local`:

```bash
ADMIN_PASSWORD=tu_contraseña_segura_aqui
```

**IMPORTANTE:** El archivo `.env.local` está protegido por `.gitignore` y NUNCA se sube a GitHub.

### Configuración en Vercel (Producción)

1. Ve a tu proyecto en Vercel Dashboard
2. Settings → Environment Variables
3. Agrega una nueva variable:
   - **Name:** `ADMIN_PASSWORD`
   - **Value:** `tu_contraseña_segura` (la misma que en .env.local)
   - **Environments:** ✓ Production ✓ Preview ✓ Development
4. Click "Save"
5. Haz un nuevo deploy para que tome efecto

### Cambiar la Contraseña

Simplemente actualiza el valor de `ADMIN_PASSWORD` en:
- `.env.local` para desarrollo local
- Vercel Dashboard para producción

**IMPORTANTE:** El archivo `.env.local` está en `.gitignore` y NO se sube a GitHub, manteniendo tu contraseña segura.

## Duración de la Sesión

La sesión dura **30 días** por defecto. Para cambiarla, edita `app/api/admin/login/route.ts`:

```typescript
maxAge: 60 * 60 * 24 * 30 // 30 días en segundos
```

## Seguridad

- ✅ Contraseña en variables de entorno (no en código)
- ✅ Cookie `httpOnly` (no accesible desde JavaScript)
- ✅ Cookie `secure` en producción (solo HTTPS)
- ✅ Sesión persistente entre recargas
- ✅ Botón de logout en el dashboard

## Acceso al Admin

- **URL:** `/admin/login`
- **Contraseña por defecto:** `oskarpardo1`

