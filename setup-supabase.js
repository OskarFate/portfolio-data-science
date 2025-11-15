const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  'https://bajkdvhooousgtahuslp.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJhamtkdmhvb291c2d0YWh1c2xwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIxMzU2MzcsImV4cCI6MjA3NzcxMTYzN30.LtfTHTYysZRnG6NALQYRvD0ofurntS9aljOXuAVw2sM'
)

async function setupDatabase() {
  console.log('🚀 Configurando base de datos desde 0...\n')

  try {
    // 1. LIMPIAR TODO
    console.log('🧹 Limpiando datos existentes...')
    await supabase.from('skills').delete().neq('id', '00000000-0000-0000-0000-000000000000')
    await supabase.from('journey_stages').delete().neq('id', '00000000-0000-0000-0000-000000000000')
    await supabase.from('journey_locations').delete().neq('id', '00000000-0000-0000-0000-000000000000')
    await supabase.from('journey_philosophy').delete().neq('id', '00000000-0000-0000-0000-000000000000')
    console.log('✅ Limpieza completada\n')

    // 2. CREAR SETTINGS (si no existe)
    console.log('📋 Configurando Settings...')
    const { data: existingSettings } = await supabase.from('settings').select('*').single()
    
    if (!existingSettings) {
      const { error: settingsError } = await supabase.from('settings').insert([{
        name: 'Oskar Pardo Salazar',
        title: 'Data Scientist & Business Analyst',
        email: 'contacto@oskarpardo.dev',
        phone: '+56921892848',
        location: 'Concepción, Chile',
        bio: 'Transformando datos en decisiones estratégicas. Roadmap de 104 semanas: Python, SQL, Machine Learning y Cloud Engineering.',
        github: 'https://github.com/OskarFate',
        linkedin: 'https://www.linkedin.com/in/oskarpardo/',
        twitter: '',
        roadmap_progress: 0
      }])
      
      if (settingsError) {
        console.error('❌ Error creando settings:', settingsError.message)
      } else {
        console.log('✅ Settings creado')
      }
    } else {
      console.log('✅ Settings ya existe')
    }

    // 3. INSERTAR 18 SKILLS
    console.log('\n💻 Insertando 18 skills...')
    const skills = [
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

    const { data: skillsData, error: skillsError } = await supabase.from('skills').insert(skills).select()
    
    if (skillsError) {
      console.error('❌ Error insertando skills:', skillsError.message)
    } else {
      console.log(`✅ ${skillsData.length} skills insertadas`)
    }

    // 4. INSERTAR 5 ETAPAS DE VIDA
    console.log('\n🗺️  Insertando etapas de vida...')
    const stages = [
      { emoji: '🩵', title: 'Etapa 1 — Formación y Estructura Interna', description: 'Construyo mis cimientos en Data Analysis, Python, SQL, Power BI e inglés. Descubro que mi fuerza no es la motivación: es mi disciplina silenciosa.', order_index: 0 },
      { emoji: '💻', title: 'Etapa 2 — Primeros Proyectos y Estabilidad', description: 'Empiezo a crear proyectos reales: dashboards, análisis profundos, EDA completos y modelos. Los documento en GitHub y LinkedIn.', order_index: 1 },
      { emoji: '🧠', title: 'Etapa 3 — Crecimiento Global', description: 'Aprendo automatización, IA, cloud, storytelling ejecutivo, estadística avanzada, modelado, pipelines y estrategia de negocio.', order_index: 2 },
      { emoji: '🏝️', title: 'Etapa 4 — Libertad Total y Base Global', description: 'Mi vida es ligera, inteligente y silenciosa. Puedo viajar, trabajar desde casa o desaparecer dos meses para recuperar energía.', order_index: 3 },
      { emoji: '🔥', title: 'Etapa 5 — Retiro Activo', description: 'No dejo de trabajar: dejo de depender del trabajo. Trabajo por gusto, no por necesidad.', order_index: 4 }
    ]

    const { data: stagesData, error: stagesError } = await supabase.from('journey_stages').insert(stages).select()
    
    if (stagesError) {
      console.error('❌ Error insertando stages:', stagesError.message)
    } else {
      console.log(`✅ ${stagesData.length} etapas insertadas`)
    }

    // 5. INSERTAR 4 UBICACIONES
    console.log('\n🌍 Insertando ubicaciones...')
    const locations = [
      { country: 'Chile', flag: '🇨🇱', subtitle: 'El Inicio', city: 'Santiago', description: 'Mi plataforma base donde construyo disciplina, rutinas, estructura y aprendizaje profundo.', highlights: ['Fortalecimiento de proyectos', 'Dominio del inglés', 'Desarrollo de carrera', 'Enfoque y concentración'], order_index: 0 },
      { country: 'Australia', flag: '🇦🇺', subtitle: 'Estabilidad y Meritocracia', city: 'Melbourne', description: 'Creativa, multicultural y calmada. Ideal para rutinas estables y trabajo profundo.', highlights: ['Economía lógica y segura', 'Camino a ciudadanía', 'Vida adulta consolidada', 'Libertad de movimiento'], order_index: 1 },
      { country: 'Singapur', flag: '🇸🇬', subtitle: 'Paz e Inteligencia', city: 'East Coast / Novena', description: 'Silencioso, limpio y extremadamente ordenado. Perfecto para introvertidos.', highlights: ['Vida minimalista e inteligente', 'Calma absoluta', 'Seguridad financiera', 'Base global para viajar'], order_index: 2 },
      { country: 'Europa', flag: '🇪🇺', subtitle: 'Experiencias y Creatividad', city: 'Berlín / Ámsterdam / Portugal', description: 'No es mi base permanente, es mi escape. Techno, raves, arte, cultura.', highlights: ['Temporadas largas', 'Festivales y música', 'Arte y escritura', 'Libertad temporal'], order_index: 3 }
    ]

    const { data: locationsData, error: locationsError } = await supabase.from('journey_locations').insert(locations).select()
    
    if (locationsError) {
      console.error('❌ Error insertando locations:', locationsError.message)
    } else {
      console.log(`✅ ${locationsData.length} ubicaciones insertadas`)
    }

    // 6. INSERTAR FILOSOFÍA
    console.log('\n🕊️  Insertando filosofía...')
    const philosophy = {
      title: '🕊️ Filosofía Final',
      quote: 'No busco la vida fácil. Busco la vida correcta.',
      verses: ['Chile me dio raíces.', 'Australia me dio estabilidad.', 'Singapur me dio mi base.', 'Europa me dio experiencias.'],
      closing: 'Y yo decidí quién soy en cada etapa.',
      final_thought: 'Mi ruta no sigue al mundo: mi ruta sigue a mi mente, mi calma y mi propósito.'
    }

    const { error: philosophyError } = await supabase.from('journey_philosophy').insert([philosophy])
    
    if (philosophyError) {
      console.error('❌ Error insertando philosophy:', philosophyError.message)
    } else {
      console.log('✅ Filosofía insertada')
    }

    // 7. VERIFICAR TODO
    console.log('\n📊 Verificando datos insertados...')
    const { data: finalSkills } = await supabase.from('skills').select('*')
    const { data: finalStages } = await supabase.from('journey_stages').select('*')
    const { data: finalLocations } = await supabase.from('journey_locations').select('*')
    const { data: finalPhilosophy } = await supabase.from('journey_philosophy').select('*')
    const { data: finalSettings } = await supabase.from('settings').select('*')

    console.log('\n✅ SETUP COMPLETADO:')
    console.log(`   📋 Settings: ${finalSettings?.length || 0}`)
    console.log(`   💻 Skills: ${finalSkills?.length || 0}`)
    console.log(`   🗺️  Etapas: ${finalStages?.length || 0}`)
    console.log(`   🌍 Ubicaciones: ${finalLocations?.length || 0}`)
    console.log(`   🕊️  Filosofía: ${finalPhilosophy?.length || 0}`)
    console.log('\n🎉 ¡Base de datos lista!\n')
    console.log('👉 Ahora ve a: http://localhost:3000/admin')
    console.log('👉 Deberías ver: 18 Skills en el dashboard\n')

  } catch (error) {
    console.error('\n❌ Error:', error)
  }
}

setupDatabase()
