'use client'

import { Mail, Linkedin, Github, Send, MapPin, Phone } from 'lucide-react'
import { useState, useEffect } from 'react'
import { getSettings } from '@/lib/supabase-helpers'

interface Settings {
  name: string
  title: string
  bio: string
  email: string
  phone: string
  location: string
  linkedin: string
  github: string
  website: string
  twitter: string
}

export default function Contact() {
  const [settings, setSettings] = useState<Settings>({
    name: 'Oskar Pardo Salazar',
    title: 'Data Scientist & Business Analyst',
    bio: '',
    email: 'contacto@oskarpardo.dev',
    phone: '+56921892848',
    location: 'Concepción, Chile',
    linkedin: 'https://www.linkedin.com/in/oskarpardo/',
    github: 'https://github.com/OskarFate',
    website: 'https://oskarpardo.dev',
    twitter: ''
  })

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  // Cargar datos de configuración desde Supabase
  useEffect(() => {
    const loadSettings = async () => {
      const data = await getSettings()
      if (data) {
        setSettings({
          name: data.name,
          title: data.title,
          bio: data.bio || '',
          email: data.email,
          phone: data.phone || '',
          location: data.location || '',
          linkedin: data.linkedin || '',
          github: data.github || '',
          website: '',
          twitter: data.twitter || ''
        })
      }
    }
    loadSettings()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí puedes agregar la lógica para enviar el formulario
    console.log('Form submitted:', formData)
    alert('¡Gracias por tu mensaje! Te responderé pronto.')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section con gradiente */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"></div>
        
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Contacto
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            ¿Tienes alguna pregunta o propuesta? ¡Me encantaría escucharte! 
            Puedes contactarme por cualquiera de estos medios.
          </p>
        </div>
        </div>
      </section>

      {/* Content Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
              Información de Contacto
            </h2>
            
            <div className="space-y-6">
              <a
                href={`mailto:${settings.email}`}
                className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow group"
              >
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-4 group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-colors">
                  <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Email</h3>
                  <p className="text-gray-600 dark:text-gray-300">{settings.email}</p>
                </div>
              </a>

              <a
                href={settings.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow group"
              >
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mr-4 group-hover:bg-primary-200 dark:group-hover:bg-primary-800 transition-colors">
                  <Linkedin className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">LinkedIn</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{settings.linkedin.replace('https://', '')}</p>
                </div>
              </a>

              <a
                href={settings.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow group"
              >
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mr-4 group-hover:bg-primary-200 dark:group-hover:bg-primary-800 transition-colors">
                  <Github className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">GitHub</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{settings.github.replace('https://', '')}</p>
                </div>
              </a>

              {settings.phone && (
                <button
                  onClick={() => {
                    const phone = settings.phone
                    navigator.clipboard.writeText(phone)
                    alert('📞 Número copiado: ' + phone)
                  }}
                  className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow group cursor-pointer w-full text-left"
                >
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mr-4 group-hover:bg-primary-200 dark:group-hover:bg-primary-800 transition-colors">
                    <Phone className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Teléfono</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">Click para copiar número</p>
                  </div>
                </button>
              )}

              {settings.location && (
                <div className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mr-4">
                    <MapPin className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Ubicación</h3>
                    <p className="text-gray-600 dark:text-gray-300">{settings.location}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-8 p-6 bg-primary-50 dark:bg-gray-800 rounded-lg border border-primary-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Disponibilidad
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Actualmente en proceso de aprendizaje intensivo, pero abierto a colaboraciones 
                y oportunidades relacionadas con data science y analítica.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
              Envíame un Mensaje
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Asunto
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 dark:text-white"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors font-medium"
              >
                <Send className="w-5 h-5 mr-2" />
                Enviar Mensaje
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
