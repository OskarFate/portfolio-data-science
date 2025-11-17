import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import fs from 'fs/promises'
import path from 'path'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST() {
  try {
    // Obtener todos los datos de Supabase
    const [
      { data: settings },
      { data: skills },
      { data: projects },
      { data: posts },
      { data: journey }
    ] = await Promise.all([
      supabase.from('settings').select('*').single(),
      supabase.from('skills').select('*').order('name'),
      supabase.from('projects').select('*').order('created_at', { ascending: false }),
      supabase.from('posts').select('*').order('date', { ascending: false }),
      supabase.from('journey_stages').select('*').order('stage_number')
    ])

    // Crear archivo JSON con todos los datos
    const exportData = {
      exported_at: new Date().toISOString(),
      settings,
      skills,
      projects,
      posts,
      journey,
      counts: {
        skills: skills?.length || 0,
        projects: projects?.length || 0,
        posts: posts?.length || 0,
        journey_stages: journey?.length || 0
      }
    }

    // Guardar en archivo
    const exportPath = path.join(process.cwd(), 'data', 'export.json')
    await fs.mkdir(path.join(process.cwd(), 'data'), { recursive: true })
    await fs.writeFile(exportPath, JSON.stringify(exportData, null, 2))

    // Crear SQL backup
    const sqlLines = [
      '-- Backup automático de Supabase',
      `-- Exportado: ${new Date().toISOString()}`,
      '',
      '-- Settings',
      `UPDATE settings SET`,
      `  name = '${settings?.name}',`,
      `  title = '${settings?.title}',`,
      `  bio = '${settings?.bio?.replace(/'/g, "''")}',`,
      `  email = '${settings?.email}',`,
      `  phone = '${settings?.phone || ''}',`,
      `  location = '${settings?.location}',`,
      `  github = '${settings?.github}',`,
      `  linkedin = '${settings?.linkedin}',`,
      `  twitter = '${settings?.twitter || ''}';`,
      ''
    ]

    const sqlPath = path.join(process.cwd(), 'data', 'backup.sql')
    await fs.writeFile(sqlPath, sqlLines.join('\n'))

    return NextResponse.json({
      success: true,
      message: 'Datos exportados exitosamente',
      counts: exportData.counts,
      files: ['data/export.json', 'data/backup.sql']
    })
  } catch (error: any) {
    console.error('Error exportando datos:', error)
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 })
  }
}
