'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Save, User, Mail, Linkedin, Github, Globe } from 'lucide-react'
import { getSettings, updateSettings } from '@/lib/supabase-helpers'

export default function Settings() {
  const [settingsId, setSettingsId] = useState<string>('')
  const [settings, setSettings] = useState({
    // Personal Info
    name: 'Oskar Pardo Salazar',
    title: 'Data Scientist & Business Analyst',
    bio: 'Transformando datos en decisiones estratégicas. Roadmap de 104 semanas: Python, SQL, Machine Learning y Cloud Engineering.',
    email: 'contacto@oskarpardo.dev',
    phone: '+56921892848',
    location: 'Concepción, Chile',
    
    // Social Links
    linkedin: 'https://www.linkedin.com/in/oskarpardo/',
    github: 'https://github.com/OskarFate',
    website: 'https://oskarpardo.dev',
    twitter: '',
    
    // Roadmap Progress
    currentWeek: 1,
    totalWeeks: 104,
    currentQuarter: 1,
    
    // Site Config
    siteTitle: 'Portfolio - Data Science & Analytics',
    siteDescription: 'Portfolio profesional de ciencia de datos, analítica de negocio e ingeniería de datos',
    darkModeDefault: true,
  })

  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(true)

  // Cargar configuración desde Supabase
  useEffect(() => {
    const loadSettings = async () => {
      setLoading(true)
      const data = await getSettings()
      if (data) {
        setSettingsId(data.id)
        setSettings({
          name: data.name || '',
          title: data.title || '',
          bio: data.bio || '',
          email: data.email || '',
          phone: data.phone || '',
          location: data.location || '',
          linkedin: data.linkedin || '',
          github: data.github || '',
          website: '',
          twitter: data.twitter || '',
          currentWeek: 1,
          totalWeeks: 104,
          currentQuarter: 1,
          siteTitle: 'Portfolio - Data Science & Analytics',
          siteDescription: 'Portfolio profesional de ciencia de datos',
          darkModeDefault: true,
        })
      }
      setLoading(false)
    }
    loadSettings()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSettings({
      ...settings,
      [e.target.name]: e.target.value
    })
  }

  const handleSave = async () => {
    if (!settingsId) {
      alert('Error: No se encontró el ID de settings')
      return
    }

    const success = await updateSettings(settingsId, {
      name: settings.name,
      title: settings.title,
      bio: settings.bio,
      email: settings.email,
      phone: settings.phone,
      location: settings.location,
      linkedin: settings.linkedin,
      github: settings.github,
      twitter: settings.twitter,
      roadmap_progress: (settings.currentWeek / settings.totalWeeks) * 100,
    })

    if (success) {
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } else {
      alert('Error al guardar la configuración')
    }
  }

  const exportConfig = () => {
    const json = JSON.stringify(settings, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'portfolio-config.json'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-8 sm:px-6 lg:px-8">
      {loading ? (
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Cargando configuración...</p>
          </div>
        </div>
      ) : (
      <div className="max-w-4xl mx-auto">
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
              Configuración
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Actualiza tu información personal y configuración del sitio
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={exportConfig}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
            >
              Exportar
            </button>
            <button
              onClick={handleSave}
              className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                saved 
                  ? 'bg-green-600 hover:bg-green-700' 
                  : 'bg-primary-600 hover:bg-primary-700'
              } text-white`}
            >
              <Save className="w-4 h-4 mr-2" />
              {saved ? '✅ Guardado' : 'Guardar Cambios'}
            </button>
          </div>
        </div>

        {saved && (
          <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-200 rounded-lg flex items-center">
            <span className="text-2xl mr-3">✅</span>
            <div>
              <strong>¡Configuración guardada exitosamente!</strong>
              <p className="text-sm mt-1">Tus cambios han sido guardados en el navegador.</p>
            </div>
          </div>
        )}

        <div className="space-y-6">
          {/* Personal Information */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center mb-4">
              <User className="w-5 h-5 text-primary-600 dark:text-primary-400 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Información Personal
              </h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  name="name"
                  value={settings.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Título / Rol
                </label>
                <input
                  type="text"
                  name="title"
                  value={settings.title}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Bio / Descripción
                </label>
                <textarea
                  name="bio"
                  value={settings.bio}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={settings.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Teléfono
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={settings.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Ubicación
                </label>
                <input
                  type="text"
                  name="location"
                  value={settings.location}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center mb-4">
              <Globe className="w-5 h-5 text-primary-600 dark:text-primary-400 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Redes Sociales
              </h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Linkedin className="w-4 h-4 inline mr-2" />
                  LinkedIn
                </label>
                <input
                  type="url"
                  name="linkedin"
                  value={settings.linkedin}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Github className="w-4 h-4 inline mr-2" />
                  GitHub
                </label>
                <input
                  type="url"
                  name="github"
                  value={settings.github}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Globe className="w-4 h-4 inline mr-2" />
                  Website
                </label>
                <input
                  type="url"
                  name="website"
                  value={settings.website}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Twitter / X
                </label>
                <input
                  type="url"
                  name="twitter"
                  value={settings.twitter}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Roadmap Progress */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Progreso del Roadmap
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Semana Actual
                </label>
                <input
                  type="number"
                  name="currentWeek"
                  value={settings.currentWeek}
                  onChange={handleChange}
                  min="1"
                  max="104"
                  className="w-full px-4 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Trimestre Actual
                </label>
                <input
                  type="number"
                  name="currentQuarter"
                  value={settings.currentQuarter}
                  onChange={handleChange}
                  min="1"
                  max="8"
                  className="w-full px-4 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Progreso
                </label>
                <div className="px-4 py-2 bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white font-semibold">
                  {((settings.currentWeek / settings.totalWeeks) * 100).toFixed(1)}%
                </div>
              </div>
            </div>
          </div>

          {/* Site Configuration */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Configuración del Sitio
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Título del Sitio
                </label>
                <input
                  type="text"
                  name="siteTitle"
                  value={settings.siteTitle}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Descripción del Sitio
                </label>
                <textarea
                  name="siteDescription"
                  value={settings.siteDescription}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      )}
    </div>
  )
}
