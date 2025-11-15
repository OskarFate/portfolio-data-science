import { supabase } from './supabase'
import type { 
  Settings, 
  Skill, 
  Project, 
  Post,
  JourneyStage,
  JourneyLocation,
  JourneyPhilosophy 
} from './supabase'

// ========== SETTINGS ==========
export async function getSettings(): Promise<Settings | null> {
  try {
    const { data, error } = await supabase
      .from('settings')
      .select('*')
      .single()
    
    if (error) throw error
    return data
  } catch (error) {
    console.error('Error fetching settings:', error)
    return null
  }
}

export async function updateSettings(id: string, updates: Partial<Settings>): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('settings')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
    
    if (error) throw error
    return true
  } catch (error) {
    console.error('Error updating settings:', error)
    return false
  }
}

// ========== SKILLS ==========
export async function getSkills(): Promise<Skill[]> {
  try {
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .order('category', { ascending: true })
      .order('name', { ascending: true })
    
    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching skills:', error)
    return []
  }
}

export async function createSkill(skill: Omit<Skill, 'id' | 'created_at' | 'updated_at'>): Promise<Skill | null> {
  try {
    const { data, error } = await supabase
      .from('skills')
      .insert([skill])
      .select()
      .single()
    
    if (error) throw error
    return data
  } catch (error) {
    console.error('Error creating skill:', error)
    return null
  }
}

export async function updateSkill(id: string, updates: Partial<Skill>): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('skills')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
    
    if (error) throw error
    return true
  } catch (error) {
    console.error('Error updating skill:', error)
    return false
  }
}

export async function deleteSkill(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('skills')
      .delete()
      .eq('id', id)
    
    if (error) throw error
    return true
  } catch (error) {
    console.error('Error deleting skill:', error)
    return false
  }
}

// ========== PROJECTS ==========
export async function getProjects(): Promise<Project[]> {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('featured', { ascending: false })
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching projects:', error)
    return []
  }
}

export async function createProject(project: Omit<Project, 'id' | 'created_at' | 'updated_at'>): Promise<Project | null> {
  try {
    const { data, error } = await supabase
      .from('projects')
      .insert([project])
      .select()
      .single()
    
    if (error) throw error
    return data
  } catch (error) {
    console.error('Error creating project:', error)
    return null
  }
}

export async function updateProject(id: string, updates: Partial<Project>): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('projects')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
    
    if (error) throw error
    return true
  } catch (error) {
    console.error('Error updating project:', error)
    return false
  }
}

export async function deleteProject(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id)
    
    if (error) throw error
    return true
  } catch (error) {
    console.error('Error deleting project:', error)
    return false
  }
}

// ========== POSTS ==========
export async function getPosts(publishedOnly = false): Promise<Post[]> {
  try {
    let query = supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (publishedOnly) {
      query = query.eq('published', true)
    }
    
    const { data, error } = await query
    
    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching posts:', error)
    return []
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('slug', slug)
      .single()
    
    if (error) throw error
    
    // Increment views
    if (data) {
      await supabase.rpc('increment_post_views', { post_id: data.id })
    }
    
    return data
  } catch (error) {
    console.error('Error fetching post:', error)
    return null
  }
}

export async function createPost(post: Omit<Post, 'id' | 'created_at' | 'updated_at' | 'views'>): Promise<Post | null> {
  try {
    const { data, error } = await supabase
      .from('posts')
      .insert([post])
      .select()
      .single()
    
    if (error) throw error
    return data
  } catch (error) {
    console.error('Error creating post:', error)
    return null
  }
}

export async function updatePost(id: string, updates: Partial<Post>): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('posts')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
    
    if (error) throw error
    return true
  } catch (error) {
    console.error('Error updating post:', error)
    return false
  }
}

export async function deletePost(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id)
    
    if (error) throw error
    return true
  } catch (error) {
    console.error('Error deleting post:', error)
    return false
  }
}

// ========== JOURNEY ==========
export async function getJourneyStages(): Promise<JourneyStage[]> {
  try {
    const { data, error } = await supabase
      .from('journey_stages')
      .select('*')
      .order('order_index', { ascending: true })
    
    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching journey stages:', error)
    return []
  }
}

export async function getJourneyLocations(): Promise<JourneyLocation[]> {
  try {
    const { data, error } = await supabase
      .from('journey_locations')
      .select('*')
      .order('order_index', { ascending: true })
    
    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching journey locations:', error)
    return []
  }
}

export async function getJourneyPhilosophy(): Promise<JourneyPhilosophy | null> {
  try {
    const { data, error } = await supabase
      .from('journey_philosophy')
      .select('*')
      .single()
    
    if (error) throw error
    return data
  } catch (error) {
    console.error('Error fetching journey philosophy:', error)
    return null
  }
}

export async function upsertJourneyStages(stages: Omit<JourneyStage, 'id' | 'created_at' | 'updated_at'>[]): Promise<boolean> {
  try {
    // Delete all existing stages
    await supabase.from('journey_stages').delete().neq('id', '00000000-0000-0000-0000-000000000000')
    
    // Insert new stages
    const { error } = await supabase
      .from('journey_stages')
      .insert(stages)
    
    if (error) throw error
    return true
  } catch (error) {
    console.error('Error upserting journey stages:', error)
    return false
  }
}

export async function upsertJourneyLocations(locations: Omit<JourneyLocation, 'id' | 'created_at' | 'updated_at'>[]): Promise<boolean> {
  try {
    // Delete all existing locations
    await supabase.from('journey_locations').delete().neq('id', '00000000-0000-0000-0000-000000000000')
    
    // Insert new locations
    const { error} = await supabase
      .from('journey_locations')
      .insert(locations)
    
    if (error) throw error
    return true
  } catch (error) {
    console.error('Error upserting journey locations:', error)
    return false
  }
}

export async function upsertJourneyPhilosophy(philosophy: Omit<JourneyPhilosophy, 'id' | 'created_at' | 'updated_at'>): Promise<boolean> {
  try {
    // Check if philosophy exists
    const { data: existing } = await supabase
      .from('journey_philosophy')
      .select('id')
      .single()
    
    if (existing) {
      // Update
      const { error } = await supabase
        .from('journey_philosophy')
        .update({ ...philosophy, updated_at: new Date().toISOString() })
        .eq('id', existing.id)
      
      if (error) throw error
    } else {
      // Insert
      const { error } = await supabase
        .from('journey_philosophy')
        .insert([philosophy])
      
      if (error) throw error
    }
    
    return true
  } catch (error) {
    console.error('Error upserting journey philosophy:', error)
    return false
  }
}

// ========== MIGRATION HELPERS ==========
// Estas funciones te ayudarán a migrar los datos de localStorage a Supabase

// Skills por defecto basadas en el roadmap de 104 semanas
const defaultSkills = [
  { name: 'Python', level: 'Intermedio', description: 'pandas, numpy, matplotlib, seaborn, scikit-learn', category: 'Lenguajes de Programación' },
  { name: 'SQL', level: 'Intermedio', description: 'Consultas analíticas, JOINs, CTEs, Window functions', category: 'Lenguajes de Programación' },
  { name: 'R', level: 'Básico', description: 'ggplot2, dplyr, análisis estadístico', category: 'Lenguajes de Programación' },
  { name: 'Power BI', level: 'Intermedio', description: 'Dashboards interactivos, DAX, modelado de datos', category: 'Análisis & Visualización' },
  { name: 'Tableau', level: 'Básico', description: 'Visualizaciones y storytelling', category: 'Análisis & Visualización' },
  { name: 'Excel', level: 'Avanzado', description: 'Tablas dinámicas, Power Query, VBA', category: 'Análisis & Visualización' },
  { name: 'dbt', level: 'En aprendizaje', description: 'Transformación de datos, modelado dimensional', category: 'Ingeniería de Datos' },
  { name: 'Apache Airflow', level: 'En aprendizaje', description: 'Orquestación de pipelines', category: 'Ingeniería de Datos' },
  { name: 'Apache Spark', level: 'En aprendizaje', description: 'Procesamiento distribuido', category: 'Ingeniería de Datos' },
  { name: 'Google Cloud Platform', level: 'Básico', description: 'BigQuery, Cloud Storage, Vertex AI', category: 'Cloud & Infraestructura' },
  { name: 'Docker', level: 'En aprendizaje', description: 'Contenedores y despliegues', category: 'Cloud & Infraestructura' },
  { name: 'Git & GitHub', level: 'Intermedio', description: 'Control de versiones, colaboración', category: 'Cloud & Infraestructura' },
  { name: 'Scikit-learn', level: 'En aprendizaje', description: 'Algoritmos supervisados y no supervisados', category: 'Machine Learning & IA' },
  { name: 'LangChain', level: 'Planeado', description: 'RAG, agentes y LLMs', category: 'Machine Learning & IA' },
  { name: 'TensorFlow/PyTorch', level: 'Planeado', description: 'Deep Learning', category: 'Machine Learning & IA' },
  { name: 'Análisis de KPIs', level: 'Intermedio', description: 'Definición y seguimiento de métricas', category: 'Business & Estrategia' },
  { name: 'Data Storytelling', level: 'Intermedio', description: 'Comunicación de insights', category: 'Business & Estrategia' },
  { name: 'A/B Testing', level: 'En aprendizaje', description: 'Experimentación y análisis', category: 'Business & Estrategia' },
]

const defaultLifeStages = [
  { emoji: '🩵', title: 'Etapa 1 — Formación y Estructura Interna', description: 'Construyo mis cimientos en Data Analysis, Python, SQL, Power BI e inglés. Descubro que mi fuerza no es la motivación: es mi disciplina silenciosa.', order_index: 0 },
  { emoji: '💻', title: 'Etapa 2 — Primeros Proyectos y Estabilidad', description: 'Empiezo a crear proyectos reales: dashboards, análisis profundos, EDA completos y modelos. Los documento en GitHub y LinkedIn.', order_index: 1 },
  { emoji: '🧠', title: 'Etapa 3 — Crecimiento Global', description: 'Aprendo automatización, IA, cloud, storytelling ejecutivo, estadística avanzada, modelado, pipelines y estrategia de negocio.', order_index: 2 },
  { emoji: '🏝️', title: 'Etapa 4 — Libertad Total y Base Global', description: 'Mi vida es ligera, inteligente y silenciosa. Puedo viajar, trabajar desde casa o desaparecer dos meses para recuperar energía.', order_index: 3 },
  { emoji: '🔥', title: 'Etapa 5 — Retiro Activo', description: 'No dejo de trabajar: dejo de depender del trabajo. Trabajo por gusto, no por necesidad.', order_index: 4 }
]

const defaultLocations = [
  { country: 'Chile', flag: '🇨🇱', subtitle: 'El Inicio', city: 'Santiago', description: 'Mi plataforma base donde construyo disciplina, rutinas, estructura y aprendizaje profundo.', highlights: ['Fortalecimiento de proyectos', 'Dominio del inglés', 'Desarrollo de carrera', 'Enfoque y concentración'], order_index: 0 },
  { country: 'Australia', flag: '🇦🇺', subtitle: 'Estabilidad y Meritocracia', city: 'Melbourne', description: 'Creativa, multicultural y calmada. Ideal para rutinas estables y trabajo profundo.', highlights: ['Economía lógica y segura', 'Camino a ciudadanía', 'Vida adulta consolidada', 'Libertad de movimiento'], order_index: 1 },
  { country: 'Singapur', flag: '🇸🇬', subtitle: 'Paz e Inteligencia', city: 'East Coast / Novena', description: 'Silencioso, limpio y extremadamente ordenado. Perfecto para introvertidos.', highlights: ['Vida minimalista e inteligente', 'Calma absoluta', 'Seguridad financiera', 'Base global para viajar'], order_index: 2 },
  { country: 'Europa', flag: '🇪🇺', subtitle: 'Experiencias y Creatividad', city: 'Berlín / Ámsterdam / Portugal', description: 'No es mi base permanente, es mi escape. Techno, raves, arte, cultura.', highlights: ['Temporadas largas', 'Festivales y música', 'Arte y escritura', 'Libertad temporal'], order_index: 3 }
]

const defaultPhilosophy = {
  title: '🕊️ Filosofía Final',
  quote: 'No busco la vida fácil. Busco la vida correcta.',
  verses: ['Chile me dio raíces.', 'Australia me dio estabilidad.', 'Singapur me dio mi base.', 'Europa me dio experiencias.'],
  closing: 'Y yo decidí quién soy en cada etapa.',
  final_thought: 'Mi ruta no sigue al mundo: mi ruta sigue a mi mente, mi calma y mi propósito.'
}

export async function migrateLocalStorageToSupabase() {
  if (typeof window === 'undefined') return

  try {
    // Migrar Settings
    const settingsData = localStorage.getItem('portfolio-settings')
    if (settingsData) {
      const settings = JSON.parse(settingsData)
      const { data: existingSettings } = await supabase.from('settings').select('id').single()
      if (existingSettings) {
        await updateSettings(existingSettings.id, settings)
        console.log('✅ Settings migrados')
      }
    }

    // Migrar Skills (usar defaults si no hay en localStorage)
    const skillsData = localStorage.getItem('skills')
    const skills = skillsData ? JSON.parse(skillsData) : defaultSkills
    
    // Eliminar skills existentes
    await supabase.from('skills').delete().neq('id', '00000000-0000-0000-0000-000000000000')
    
    // Insertar skills
    for (const skill of skills) {
      await createSkill({
        name: skill.name,
        category: skill.category,
        level: skill.level,
        description: skill.description || ''
      })
    }
    console.log(`✅ ${skills.length} skills migrados`)

    // Migrar Journey Data (usar defaults si no hay en localStorage)
    const journeyData = localStorage.getItem('journeyData')
    const journey = journeyData ? JSON.parse(journeyData) : {
      lifeStages: defaultLifeStages,
      locations: defaultLocations,
      philosophy: defaultPhilosophy
    }
    
    // Migrar stages
    if (journey.lifeStages) {
      const stages = journey.lifeStages.map((stage: any, index: number) => ({
        emoji: stage.icon || stage.emoji,
        title: stage.title,
        description: stage.description,
        order_index: stage.order_index !== undefined ? stage.order_index : index
      }))
      await upsertJourneyStages(stages)
      console.log('✅ Etapas de vida migradas')
    }

    // Migrar locations
    if (journey.locations) {
      const locations = journey.locations.map((loc: any, index: number) => ({
        country: loc.country,
        flag: loc.flag,
        subtitle: loc.subtitle,
        city: loc.city || '',
        description: loc.description,
        highlights: loc.highlights,
        order_index: loc.order_index !== undefined ? loc.order_index : index
      }))
      await upsertJourneyLocations(locations)
      console.log('✅ Ubicaciones migradas')
    }

    // Migrar philosophy
    if (journey.philosophy) {
      await upsertJourneyPhilosophy({
        title: journey.philosophy.title,
        quote: journey.philosophy.mainQuote || journey.philosophy.quote,
        verses: journey.philosophy.verses,
        closing: journey.philosophy.closing,
        final_thought: journey.philosophy.finalThought || journey.philosophy.final_thought
      })
      console.log('✅ Filosofía migrada')
    }

    return {
      success: true,
      message: '✅ ¡Migración completada! Todos tus datos ahora están en Supabase.',
      stats: {
        skills: skills.length,
        stages: journey.lifeStages?.length || 0,
        locations: journey.locations?.length || 0
      }
    }
  } catch (error) {
    console.error('Error durante la migración:', error)
    return {
      success: false,
      message: `❌ Error durante la migración: ${error instanceof Error ? error.message : 'Unknown error'}`
    }
  }
}
