'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Save, Eye } from 'lucide-react'

export default function NewPost() {
  const [formData, setFormData] = useState({
    title: '',
    date: new Date().toISOString().split('T')[0],
    excerpt: '',
    category: 'Reflexiones',
    readTime: '5 min',
    content: ''
  })

  const [preview, setPreview] = useState(false)

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

  const generateMarkdown = () => {
    return `---
title: "${formData.title}"
date: "${formData.date}"
excerpt: "${formData.excerpt}"
category: "${formData.category}"
readTime: "${formData.readTime}"
---

${formData.content}`
  }

  const handleSave = () => {
    const markdown = generateMarkdown()
    const blob = new Blob([markdown], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    const slug = formData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
    a.download = `${slug}.md`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    
    alert('Post guardado! Mueve el archivo .md a la carpeta content/blog/')
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
              className="flex items-center px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
            >
              <Eye className="w-4 h-4 mr-2" />
              {preview ? 'Editar' : 'Vista previa'}
            </button>
            <button
              onClick={handleSave}
              className="flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
            >
              <Save className="w-4 h-4 mr-2" />
              Guardar
            </button>
          </div>
        </div>

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
