const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  'https://bajkdvhooousgtahuslp.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJhamtkdmhvb291c2d0YWh1c2xwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIxMzU2MzcsImV4cCI6MjA3NzcxMTYzN30.LtfTHTYysZRnG6NALQYRvD0ofurntS9aljOXuAVw2sM'
)

async function checkDatabase() {
  console.log('🔍 Verificando base de datos Supabase...\n')

  // Check settings
  const { data: settings, error: settingsError } = await supabase.from('settings').select('*')
  console.log('📋 Settings:', settings?.length || 0, 'registros')
  if (settingsError) console.error('Error settings:', settingsError.message)

  // Check skills
  const { data: skills, error: skillsError } = await supabase.from('skills').select('*')
  console.log('💻 Skills:', skills?.length || 0, 'registros')
  if (skillsError) console.error('Error skills:', skillsError.message)
  if (skills && skills.length > 0) {
    console.log('   Primeras 3 skills:', skills.slice(0, 3).map(s => s.name).join(', '))
  }

  // Check journey_stages
  const { data: stages, error: stagesError } = await supabase.from('journey_stages').select('*')
  console.log('🗺️  Journey Stages:', stages?.length || 0, 'registros')
  if (stagesError) console.error('Error stages:', stagesError.message)

  // Check journey_locations
  const { data: locations, error: locationsError } = await supabase.from('journey_locations').select('*')
  console.log('🌍 Journey Locations:', locations?.length || 0, 'registros')
  if (locationsError) console.error('Error locations:', locationsError.message)

  // Check projects
  const { data: projects, error: projectsError } = await supabase.from('projects').select('*')
  console.log('📊 Projects:', projects?.length || 0, 'registros')
  if (projectsError) console.error('Error projects:', projectsError.message)

  // Check posts
  const { data: posts, error: postsError } = await supabase.from('posts').select('*')
  console.log('📝 Posts:', posts?.length || 0, 'registros')
  if (postsError) console.error('Error posts:', postsError.message)

  console.log('\n✅ Diagnóstico completo')
}

checkDatabase().catch(console.error)
