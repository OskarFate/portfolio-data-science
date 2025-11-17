'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Save, Eye, Upload, Check } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { createPost } from '@/lib/supabase-helpers'

export default function NewPost() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: '',
    date: new Date().toISOString().split('T')[0],
    excerpt: '',
    category: 'Reflexiones',
    readTime: '5 min',
    content: '',
    technologies: [] as string[],
    weekNumber: 0,
    published: true
  })

  const [preview, setPreview] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState('')

  const categories = [
    'Reflexiones',
    'EDA',
    'Machine Learning',
    'SQL',
    'Power BI',
    'Python',
    'R',
    'Cloud',
    'MLOps',
    'Proyectos'
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleTechnologiesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const techs = e.target.value.split(',').map(t => t.trim()).filter(t => t)
    setFormData({ ...formData, technologies: techs })
  }

  const handleSaveToSupabase = async () => {
    if (!formData.title || !formData.excerpt || !formData.content) {
      alert('Por favor completa título, excerpt y contenido')
      return
    }

    setSaving(true)
    setSaveMessage('💾 Guardando en Supabase...')

    try {
      // Generar slug
      const slug = formData.title
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')

      // Guardar en Supabase
      const newPost = await createPost({
        title: formData.title,
        slug,
        excerpt: formData.excerpt,
        content: formData.content,
        published: formData.published,
        published_at: formData.published ? new Date(formData.date).toISOString() : undefined,
        featured: false,
        tags: [formData.category],
        reading_time: parseInt(formData.readTime.replace(/\D/g, '')) || 5,
        technologies: formData.technologies,
        week_number: formData.weekNumber > 0 ? formData.weekNumber : undefined
      })

      if (!newPost) {
        throw new Error('Error al crear el post')
      }

      setSaveMessage('🚀 Exportando y haciendo deploy...')

      // Auto-deploy
      try {
        await fetch('/api/export-data', { method: 'POST' })
        await fetch('/api/auto-deploy', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: `Nuevo post: ${formData.title}`
          })
        })
        setSaveMessage('✅ Post publicado y subido a GitHub!')
      } catch (deployError) {
        console.error('Error en deploy:', deployError)
        setSaveMessage('✅ Post guardado (deploy manual requerido)')
      }

      // Redirigir al blog después de 2 segundos
      setTimeout(() => {
        router.push('/admin')
      }, 2000)

    } catch (error: any) {
      console.error('Error guardando post:', error)
      setSaveMessage('❌ Error: ' + error.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link
              href="/admin"
              className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al panel
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Crear Nuevo Post
            </h1>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setPreview(!preview)}
              className="flex items-center px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors disabled:opacity-50"
              disabled={saving}
            >
              <Eye className="w-4 h-4 mr-2" />
              {preview ? 'Editar' : 'Vista previa'}
            </button>
            <button
              onClick={handleSaveToSupabase}
              disabled={saving}
              className="flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Guardando...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  Publicar
                </>
              )}
            </button>
          </div>
        </div>

        {/* Save Message */}
        {saveMessage && (
          <div className={`mb-4 px-4 py-3 rounded-lg ${
            saveMessage.startsWith('✅') 
              ? 'bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 text-green-800 dark:text-green-200' 
              : saveMessage.startsWith('❌')
              ? 'bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 text-red-800 dark:text-red-200'
              : 'bg-blue-100 dark:bg-blue-900/30 border border-blue-300 dark:border-blue-700 text-blue-800 dark:text-blue-200'
          }`}>
            {saveMessage}
          </div>
        )}

        {!preview ? (
          /* Editor Form */
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Título del Post *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 dark:text-white"
                  placeholder="Ej: Semana 2 - Aprendiendo Pandas"
                  required
                />
              </div>

              {/* Date and Category Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Fecha *
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Categoría *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 dark:text-white"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Tiempo de lectura
                  </label>
                  <input
                    type="text"
                    name="readTime"
                    value={formData.readTime}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 dark:text-white"
                    placeholder="Ej: 5 min"
                  />
                </div>
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Resumen / Excerpt *
                </label>
                <textarea
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 dark:text-white"
                  placeholder="Breve descripción del post (aparecerá en la lista de posts)"
                  required
                />
              </div>

              {/* Technologies and Week */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Tecnologías (separadas por coma)
                  </label>
                  <input
                    type="text"
                    value={formData.technologies.join(', ')}
                    onChange={handleTechnologiesChange}
                    className="w-full px-4 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 dark:text-white"
                    placeholder="Ej: Python, Pandas, SQL"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Semana del Roadmap (opcional)
                  </label>
                  <input
                    type="number"
                    name="weekNumber"
                    value={formData.weekNumber || ''}
                    onChange={(e) => setFormData({...formData, weekNumber: parseInt(e.target.value) || 0})}
                    className="w-full px-4 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 dark:text-white"
                    placeholder="Ej: 2"
                    min="0"
                    max="104"
                  />
                </div>
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Contenido (Markdown) *
                </label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  rows={20}
                  className="w-full px-4 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 dark:text-white font-mono text-sm"
                  placeholder="# Tu contenido aquí&#10;&#10;Escribe en Markdown...&#10;&#10;## Subtítulo&#10;&#10;- Lista&#10;- de&#10;- items"
                  required
                />
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Tip: Usa Markdown para formato. Ejemplo: # Título, ## Subtítulo, **negrita**, *cursiva*, [link](url)
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* Preview */
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="mb-4">
              <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded-md text-sm">
                {formData.category}
              </span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {formData.title || 'Sin título'}
            </h1>
            <div className="flex items-center gap-4 text-gray-500 dark:text-gray-400 mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
              <span>{formData.date}</span>
              <span>•</span>
              <span>{formData.readTime}</span>
            </div>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
                {formData.excerpt}
              </p>
              <div className="whitespace-pre-wrap text-gray-700 dark:text-gray-300">
                {formData.content}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
