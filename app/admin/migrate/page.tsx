'use client'

import { useState } from 'react'
import { migrateLocalStorageToSupabase } from '@/lib/supabase-helpers'
import { supabase } from '@/lib/supabase'

export default function MigratePage() {
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

  const initializeSupabase = async () => {
    setLoading(true)
    setStatus('🔄 Inicializando Supabase...')

    try {
      // 1. Verificar si ya existe un registro de settings
      const { data: existingSettings, error: checkError } = await supabase
        .from('settings')
        .select('id')
        .single()

      if (!existingSettings && checkError?.code === 'PGRST116') {
        // No existe, crear uno nuevo
        setStatus('📝 Creando registro inicial de Settings...')
        const { error: insertError } = await supabase
          .from('settings')
          .insert([{
            name: 'Oskar Pardo Salazar',
            title: 'Data Scientist & Business Analyst',
            email: 'contacto@oskarpardo.dev',
            phone: '',
            location: 'Concepción, Chile',
            bio: 'Transformando datos en decisiones estratégicas',
            github: 'https://github.com/OskarFate',
            linkedin: 'https://www.linkedin.com/in/oskarpardo/',
            twitter: '',
            roadmap_progress: 0
          }])

        if (insertError) throw insertError
        setStatus('✅ Registro inicial creado en Settings')
      } else {
        setStatus('✅ Settings ya existe en Supabase')
      }

      // 2. Migrar datos de localStorage o usar defaults
      setStatus('🚀 Migrando datos (localStorage o valores por defecto)...')
      const result = await migrateLocalStorageToSupabase()

      if (result?.success) {
        setStatus(
          `✅ ¡Migración completada exitosamente!\n\n` +
          `📊 Resumen:\n` +
          `- ${result.stats?.skills || 0} skills migrados\n` +
          `- ${result.stats?.stages || 0} etapas de vida migradas\n` +
          `- ${result.stats?.locations || 0} ubicaciones migradas\n\n` +
          `Todos tus datos están ahora en Supabase.`
        )
      } else {
        setStatus(result?.message || '❌ Error desconocido')
      }
    } catch (error) {
      console.error('Error:', error)
      setStatus(`❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
          🔄 Migración a Supabase
        </h1>
        
        <div className="space-y-4 mb-6">
          <p className="text-gray-600 dark:text-gray-300">
            Esta página migra todos tus datos de <strong>localStorage</strong> a <strong>Supabase</strong>.
          </p>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
              📋 Qué se va a migrar:
            </h3>
            <ul className="list-disc list-inside text-sm text-blue-800 dark:text-blue-200 space-y-1">
              <li>Settings (nombre, email, bio, enlaces sociales, etc.)</li>
              <li><strong>18 Skills por defecto</strong> (Python, SQL, R, Power BI, dbt, Airflow, etc.)</li>
              <li><strong>5 Etapas de vida</strong> (tu journey personal)</li>
              <li><strong>4 Ubicaciones</strong> (Chile, Australia, Singapur, Europa)</li>
              <li><strong>Filosofía personal</strong> (tu visión de vida)</li>
            </ul>
            <p className="text-sm text-blue-700 dark:text-blue-300 mt-3">
              💡 Si ya tienes datos en localStorage, se usarán esos. Si no, se usarán los valores por defecto del roadmap.
            </p>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
            <h3 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">
              ⚠️ Importante:
            </h3>
            <ul className="list-disc list-inside text-sm text-yellow-800 dark:text-yellow-200 space-y-1">
              <li>Solo necesitas hacer esto UNA VEZ</li>
              <li>Después de migrar, el admin usará Supabase automáticamente</li>
              <li>Puedes borrar localStorage después de confirmar que todo funciona</li>
            </ul>
          </div>
        </div>

        <button
          onClick={initializeSupabase}
          disabled={loading}
          className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? '⏳ Migrando...' : '🚀 Iniciar Migración'}
        </button>

        {status && (
          <div className={`mt-6 p-4 rounded-lg ${
            status.includes('❌') 
              ? 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 border border-red-200 dark:border-red-800'
              : status.includes('✅')
              ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200 border border-green-200 dark:border-green-800'
              : 'bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 border border-blue-200 dark:border-blue-800'
          }`}>
            <p className="font-mono text-sm whitespace-pre-wrap">{status}</p>
          </div>
        )}

        {status.includes('✅ ¡Migración completada!') && (
          <div className="mt-6 space-y-3">
            <a
              href="/admin/settings"
              className="block w-full bg-green-600 hover:bg-green-700 text-white text-center font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              ✅ Ir a Settings Admin
            </a>
            <a
              href="/admin"
              className="block w-full bg-gray-600 hover:bg-gray-700 text-white text-center font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              🏠 Volver al Dashboard
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
