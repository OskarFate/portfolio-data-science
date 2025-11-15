# Portfolio - Data Science & Business Analytics

Portfolio profesional desarrollado con Next.js, TypeScript y Tailwind CSS. Documentando mi viaje de 104 semanas en ciencia de datos y analítica de negocio.

## 🚀 Stack Tecnológico

- **Framework:** Next.js 14+ (App Router)
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS
- **Blog:** Markdown/MDX
- **Deployment:** Vercel (recomendado)

## 📁 Estructura del Proyecto

```
porta/
├── app/                    # App Router de Next.js
│   ├── about/             # Página Sobre Mí
│   ├── blog/              # Blog con posts en Markdown
│   ├── contact/           # Página de Contacto
│   ├── projects/          # Showcase de Proyectos
│   ├── skills/            # Skills & Tecnologías
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Home page
│   └── globals.css        # Estilos globales
├── components/            # Componentes reutilizables
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── ThemeToggle.tsx
│   └── ThemeProvider.tsx
├── content/               # Contenido del blog
│   └── blog/             # Posts en Markdown
├── public/               # Assets estáticos
└── .github/              # GitHub config
    └── copilot-instructions.md
```

## 🎯 Características

- ✅ **Diseño Responsivo** - Optimizado para móvil, tablet y desktop
- ✅ **Dark Mode** - Modo oscuro por defecto con toggle
- ✅ **Blog Integrado** - Sistema de posts con Markdown
- ✅ **Panel de Administración** - Gestiona contenido sin tocar código
- ✅ **Editor de Posts** - Crea posts con vista previa en tiempo real
- ✅ **Gestor de Skills** - Administra habilidades, niveles y categorías
- ✅ **Gestor de Proyectos** - Añade y edita proyectos fácilmente
- ✅ **SEO Optimizado** - Metadata configurada para Next.js
- ✅ **Tipado Fuerte** - TypeScript en todo el proyecto
- ✅ **Performance** - Optimización de imágenes y assets

## 🛠️ Instalación y Uso

### Prerrequisitos

- Node.js 18+ 
- npm o yarn

### Pasos

1. **Clonar el repositorio**

\`\`\`bash
git clone https://github.com/tu-usuario/porta.git
cd porta
\`\`\`

2. **Instalar dependencias**

\`\`\`bash
npm install
# o
yarn install
\`\`\`

3. **Ejecutar en desarrollo**

\`\`\`bash
npm run dev
# o
yarn dev
\`\`\`

4. **Abrir en el navegador**

Visita [http://localhost:3000](http://localhost:3000)

## 📝 Agregar Posts al Blog

### Opción 1: Panel de Administración (Recomendado)

1. Visita **http://localhost:3000/admin**
2. Haz clic en "Crear Post"
3. Completa el formulario:
   - Título
   - Fecha
   - Categoría
   - Resumen
   - Contenido en Markdown
4. Usa la vista previa para verificar
5. Haz clic en "Guardar" para descargar el archivo `.md`
6. Mueve el archivo descargado a `content/blog/`

### Opción 2: Manualmente

1. Crea un archivo `.md` en `content/blog/`
2. Agrega el frontmatter:

\`\`\`markdown
---
title: "Tu título aquí"
date: "2025-01-15"
excerpt: "Descripción breve del post"
category: "EDA"
readTime: "5 min"
---

# Contenido del post...
\`\`\`

3. El post aparecerá automáticamente en `/blog`

## 🛠️ Panel de Administración

Accede al panel completo en **`/admin`**:

### 💡 Sistema de Persistencia:
- ✅ **Skills:** Guardado automático al editar
- ✅ **Projects:** Guardado manual (botón "Exportar JSON")
- ✅ **Journey:** Guardado manual (botón "Guardar Todo")
- ✅ **Settings:** Guardado manual (botón "Guardar Cambios")
- 📦 **Almacenamiento:** Todos los datos se guardan en `localStorage` del navegador
- 🔄 **Sincronización:** Los cambios se reflejan automáticamente en las páginas públicas al recargar

### Funcionalidades:

- **Dashboard** (`/admin`)
  - Estadísticas generales
  - Actividad reciente
  - Accesos rápidos a todas las secciones

- **Editor de Posts** (`/admin/posts/new`)
  - Crear nuevos posts con Markdown
  - Vista previa en tiempo real
  - 10 categorías predefinidas
  - Exportar a archivo .md con frontmatter

- **Gestor de Skills** (`/admin/skills`)
  - Añadir/editar habilidades técnicas
  - 6 niveles: Básico, Intermedio, Avanzado, Experto, En aprendizaje, Planeado
  - 6 categorías: Lenguajes, Análisis & Visualización, Ingeniería de Datos, Cloud, ML & IA, Business
  - Exportar a JSON

- **Gestor de Proyectos** (`/admin/projects`)
  - Crear y editar proyectos de portfolio
  - Gestionar stack tecnológico con tags
  - 4 estados: Planeado, En progreso, Completado, Pausado
  - Links a GitHub y demos
  - Exportar a JSON

- **Ruta de Vida** (`/admin/journey`) ✨ NUEVO
  - Editar 5 etapas de vida personal
  - Gestionar ubicaciones geográficas (Chile, Australia, Singapur, Europa)
  - Personalizar filosofía personal
  - Añadir/eliminar highlights por ubicación
  - Exportar a JSON
  - **Los cambios se reflejan automáticamente en la página "Sobre Mí"**

- **Configuración** (`/admin/settings`)
  - Información personal (nombre, título, bio, contacto)
  - Redes sociales (LinkedIn, GitHub, website, Twitter)
  - Progreso del roadmap (semana/trimestre actual de 104)
  - Configuración del sitio (título, descripción)
  - Exportar configuración completa

## 🎨 Personalización

### Colores

Edita `tailwind.config.js` para cambiar la paleta:

\`\`\`js
theme: {
  extend: {
    colors: {
      primary: {
        // Tu paleta personalizada
      }
    }
  }
}
\`\`\`

### Información de Contacto

Actualiza los enlaces en:
- `components/Footer.tsx`
- `app/contact/page.tsx`

## 🚀 Deployment

### Vercel (Recomendado)

1. Conecta tu repo a [Vercel](https://vercel.com)
2. El deploy es automático con cada push

### Otras opciones

- **Netlify:** Compatible con Next.js
- **GitHub Pages:** Requiere configuración adicional
- **Docker:** Incluye `Dockerfile` si lo necesitas

## 📊 Roadmap Personal

Este portfolio documenta mi progreso en un roadmap de 104 semanas:

- **Q1-Q2 (Sem 1-26):** Fundamentos (Python, SQL, Excel, R, Git)
- **Q3-Q4 (Sem 27-52):** Visualización, Power BI, Negocio
- **Q5-Q6 (Sem 53-78):** Machine Learning, Big Data, Spark
- **Q7-Q8 (Sem 79-104):** Ingeniería de Datos, MLOps, IA Estratégica

## 🤝 Contribuciones

Este es un proyecto personal de aprendizaje, pero cualquier sugerencia es bienvenida.

## 📄 Licencia

MIT License - Siéntete libre de usar este código como base para tu propio portfolio.

## 📧 Contacto

- **Email:** tu@email.com
- **LinkedIn:** [linkedin.com/in/tu-perfil](https://linkedin.com/in/tu-perfil)
- **GitHub:** [github.com/tu-usuario](https://github.com/tu-usuario)

---

Hecho con ❤️ y mucho ☕ durante el roadmap de 104 semanas
