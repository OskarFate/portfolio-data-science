// Sistema para cargar datos del localStorage o valores por defecto
// Usado tanto por páginas públicas como por el admin panel

export interface Skill {
  id: string
  name: string
  level: string
  description: string
  category: string
}

export interface LifeStage {
  id: string
  icon: string
  title: string
  description: string
}

export interface Location {
  id: string
  flag: string
  country: string
  subtitle: string
  city?: string
  description: string
  highlights: string[]
}

export interface Philosophy {
  title: string
  mainQuote: string
  verses: string[]
  closing: string
  finalThought: string
}

export interface JourneyData {
  lifeStages: LifeStage[]
  locations: Location[]
  philosophy: Philosophy
}

// Valores por defecto para Skills
export const defaultSkills: Skill[] = [
  { id: '1', name: 'Python', level: 'Intermedio', description: 'pandas, numpy, matplotlib, seaborn, scikit-learn', category: 'Lenguajes de Programación' },
  { id: '2', name: 'SQL', level: 'Intermedio', description: 'Consultas analíticas, JOINs, CTEs, Window functions', category: 'Lenguajes de Programación' },
  { id: '3', name: 'R', level: 'Básico', description: 'ggplot2, dplyr, análisis estadístico', category: 'Lenguajes de Programación' },
  { id: '4', name: 'Power BI', level: 'Intermedio', description: 'Dashboards interactivos, DAX, modelado de datos', category: 'Análisis & Visualización' },
  { id: '5', name: 'Tableau', level: 'Básico', description: 'Visualizaciones y storytelling', category: 'Análisis & Visualización' },
  { id: '6', name: 'Excel', level: 'Avanzado', description: 'Tablas dinámicas, Power Query, VBA', category: 'Análisis & Visualización' },
  { id: '7', name: 'dbt', level: 'En aprendizaje', description: 'Transformación de datos, modelado dimensional', category: 'Ingeniería de Datos' },
  { id: '8', name: 'Apache Airflow', level: 'En aprendizaje', description: 'Orquestación de pipelines', category: 'Ingeniería de Datos' },
  { id: '9', name: 'Apache Spark', level: 'En aprendizaje', description: 'Procesamiento distribuido', category: 'Ingeniería de Datos' },
  { id: '10', name: 'Google Cloud Platform', level: 'Básico', description: 'BigQuery, Cloud Storage, Vertex AI', category: 'Cloud & Infraestructura' },
  { id: '11', name: 'Docker', level: 'En aprendizaje', description: 'Contenedores y despliegues', category: 'Cloud & Infraestructura' },
  { id: '12', name: 'Git & GitHub', level: 'Intermedio', description: 'Control de versiones, colaboración', category: 'Cloud & Infraestructura' },
  { id: '13', name: 'Scikit-learn', level: 'En aprendizaje', description: 'Algoritmos supervisados y no supervisados', category: 'Machine Learning & IA' },
  { id: '14', name: 'LangChain', level: 'Planeado', description: 'RAG, agentes y LLMs', category: 'Machine Learning & IA' },
  { id: '15', name: 'TensorFlow/PyTorch', level: 'Planeado', description: 'Deep Learning', category: 'Machine Learning & IA' },
  { id: '16', name: 'Análisis de KPIs', level: 'Intermedio', description: 'Definición y seguimiento de métricas', category: 'Business & Estrategia' },
  { id: '17', name: 'Data Storytelling', level: 'Intermedio', description: 'Comunicación de insights', category: 'Business & Estrategia' },
  { id: '18', name: 'A/B Testing', level: 'En aprendizaje', description: 'Experimentación y análisis', category: 'Business & Estrategia' },
]

// Valores por defecto para Journey
export const defaultLifeStages: LifeStage[] = [
  {
    id: '1',
    icon: '🩵',
    title: 'Etapa 1 — Formación y Estructura Interna',
    description: 'Construyo mis cimientos en Data Analysis, Python, SQL, Power BI e inglés. Descubro que mi fuerza no es la motivación: es mi disciplina silenciosa. Organizo mi ambiente, mis ciclos y mis horarios. Trabajo mejor en silencio, sin caos externo, y eso se convierte en mi ventaja competitiva.'
  },
  {
    id: '2',
    icon: '💻',
    title: 'Etapa 2 — Primeros Proyectos y Estabilidad',
    description: 'Empiezo a crear proyectos reales: dashboards, análisis profundos, EDA completos y modelos. Los documento en GitHub y LinkedIn, no para buscar atención, sino para construir una reputación escrita y medible. Consigo mis primeras oportunidades en Data. Mi talento está en pensar, analizar, estructurar y comunicar con precisión.'
  },
  {
    id: '3',
    icon: '🧠',
    title: 'Etapa 3 — Crecimiento Global',
    description: 'Aprendo automatización, IA, cloud, storytelling ejecutivo, estadística avanzada, modelado, pipelines y estrategia de negocio. Mis proyectos crecen, mi ingreso crece, mi independencia mental se consolida. No necesito "caer bien": necesito resolver problemas y comunicarme claro.'
  },
  {
    id: '4',
    icon: '🏝️',
    title: 'Etapa 4 — Libertad Total y Base Global',
    description: 'Mi vida es ligera, inteligente y silenciosa. Puedo viajar, trabajar desde casa o desaparecer dos meses para recuperar energía. Mi trabajo deja de ser obligación y pasa a ser elección. Vivo exactamente la vida que diseñé, no la que me tocó.'
  },
  {
    id: '5',
    icon: '🔥',
    title: 'Etapa 5 — Retiro Activo',
    description: 'No dejo de trabajar: dejo de depender del trabajo. Trabajo por gusto, no por necesidad. Mi rutina se vuelve arte: mañanas de datos, tardes de música, noches de calma. Tengo tiempo, dinero, salud, libertad y paz mental.'
  }
]

export const defaultLocations: Location[] = [
  {
    id: '1',
    flag: '🇨🇱',
    country: 'Chile',
    subtitle: 'El Inicio',
    description: 'Mi plataforma base donde construyo disciplina, rutinas, estructura y aprendizaje profundo. Es el punto de partida estratégico para saltar al mundo.',
    highlights: ['Fortalecimiento de proyectos', 'Dominio del inglés', 'Desarrollo de carrera', 'Enfoque y concentración']
  },
  {
    id: '2',
    flag: '🇦🇺',
    country: 'Australia',
    subtitle: 'Estabilidad y Meritocracia',
    city: 'Melbourne',
    description: 'Creativa, multicultural y calmada. Ordenada, moderna y predecible. Ideal para rutinas estables y trabajo profundo. Respetuosa de la neurodiversidad y el enfoque individual.',
    highlights: ['Economía lógica y segura', 'Camino a ciudadanía', 'Vida adulta consolidada', 'Libertad de movimiento']
  },
  {
    id: '3',
    flag: '🇸🇬',
    country: 'Singapur',
    subtitle: 'Paz e Inteligencia',
    city: 'East Coast / Novena',
    description: 'Silencioso, limpio y extremadamente ordenado. Eficiente, tecnológico y matemático. Perfecto para introvertidos: seguridad total, transporte perfecto, cero caos. Un país donde importa tu precisión, no tu carisma.',
    highlights: ['Vida minimalista e inteligente', 'Calma absoluta', 'Seguridad financiera', 'Base global para viajar']
  },
  {
    id: '4',
    flag: '🇪🇺',
    country: 'Europa',
    subtitle: 'Experiencias y Creatividad',
    city: 'Berlín / Ámsterdam / Portugal',
    description: 'No es mi base permanente, es mi escape. Techno, raves, arte, cultura, descanso. Europa es para experiencias, no para vivir permanentemente.',
    highlights: ['Temporadas largas', 'Festivales y música', 'Arte y escritura', 'Libertad temporal']
  }
]

export const defaultPhilosophy: Philosophy = {
  title: '🕊️ Filosofía Final',
  mainQuote: 'No busco la vida fácil. Busco la vida correcta.',
  verses: [
    'Chile me dio raíces.',
    'Australia me dio estabilidad.',
    'Singapur me dio mi base.',
    'Europa me dio experiencias.'
  ],
  closing: 'Y yo decidí quién soy en cada etapa.',
  finalThought: 'Mi ruta no sigue al mundo: mi ruta sigue a mi mente, mi calma y mi propósito.'
}

// Función para cargar datos (solo funciona en el cliente)
export const loadJourneyData = (): JourneyData => {
  if (typeof window === 'undefined') {
    // En el servidor, retornar valores por defecto
    return {
      lifeStages: defaultLifeStages,
      locations: defaultLocations,
      philosophy: defaultPhilosophy
    }
  }

  try {
    const saved = localStorage.getItem('journeyData')
    if (saved) {
      const data = JSON.parse(saved)
      return {
        lifeStages: data.lifeStages || defaultLifeStages,
        locations: data.locations || defaultLocations,
        philosophy: data.philosophy || defaultPhilosophy
      }
    }
  } catch (error) {
    console.error('Error loading journey data:', error)
  }

  return {
    lifeStages: defaultLifeStages,
    locations: defaultLocations,
    philosophy: defaultPhilosophy
  }
}

// Función para cargar skills
export const loadSkills = (): Skill[] => {
  if (typeof window === 'undefined') {
    return defaultSkills
  }

  try {
    const saved = localStorage.getItem('skills')
    if (saved) {
      return JSON.parse(saved)
    }
  } catch (error) {
    console.error('Error loading skills:', error)
  }

  return defaultSkills
}

// Función para guardar skills
export const saveSkills = (skills: Skill[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('skills', JSON.stringify(skills))
  }
}

