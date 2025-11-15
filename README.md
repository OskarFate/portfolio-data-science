# Oskar Pardo Salazar

Data Scientist & Business Analyst de Concepción, Chile. Este es mi espacio personal donde documento mi camino profesional y comparto proyectos de análisis de datos, machine learning e ingeniería de datos.

## Sobre este proyecto

Portfolio web construido desde cero para mostrar mi trabajo y aprendizaje continuo. La idea era simple: crear algo funcional, limpio y que refleje realmente lo que hago.

**Stack:** Next.js 14, TypeScript, Supabase, Tailwind CSS

## Lo que encontrarás aquí

- **Proyectos**: Casos reales de análisis de datos y ML
- **Skills**: Stack técnico que manejo
- **Blog**: Apuntes semanales de lo que voy aprendiendo
- **Journey**: Mi plan a 2 años (104 semanas) de formación intensiva

## Setup local

```bash
npm install
npm run dev
```

Necesitarás crear un archivo `.env.local` con tus credenciales de Supabase:

```env
NEXT_PUBLIC_SUPABASE_URL=tu_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_key
```

El script SQL para la base de datos está en `SETUP_SUPABASE_FIXED.sql`. Solo ejecútalo en el SQL Editor de Supabase y listo.

## Estructura

```
app/
   page.tsx          # inicio
   projects/         # portfolio
   skills/           # stack técnico
   blog/             # posts
   journey/          # roadmap personal
   contact/          # contacto
   admin/            # panel para gestionar contenido

components/
   Navbar.tsx
   Footer.tsx
   ThemeProvider.tsx

lib/
   supabase.ts       # cliente
   supabase-helpers.ts
```

## Features

El sitio tiene dark mode, es responsive y todo el contenido se gestiona desde Supabase. Hay un panel admin básico para editar skills, proyectos y posts sin tocar código.

## Contacto

 contacto@oskarpardo.dev  
 [linkedin.com/in/oskarpardo](https://linkedin.com/in/oskarpardo)  
 [github.com/OskarFate](https://github.com/OskarFate)

---

Hecho en Concepción, Chile 
