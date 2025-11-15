'use client'

import Link from 'next/link'
import { ArrowRight, BarChart3, Database, LineChart } from 'lucide-react'
import { useEffect, useState } from 'react'
import { getSettings } from '@/lib/supabase-helpers'

export default function Home() {
  const [settings, setSettings] = useState({
    name: 'Oskar Pardo Salazar',
    title: 'Data Science & Analytics',
    bio: 'Construyendo soluciones con datos. Enfocado en Python, SQL y visualizacion.',
  })

  useEffect(() => {
    const loadSettings = async () => {
      const data = await getSettings()
      if (data) {
        setSettings({
          name: data.name || 'Oskar Pardo Salazar',
          title: data.title || 'Data Science & Analytics',
          bio: data.bio || 'Construyendo soluciones con datos. Enfocado en Python, SQL y visualizacion.',
        })
      }
    }
    loadSettings()
  }, [])

  return (
    <>
      <section className="relative py-20 md:py-32 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <div className="inline-block">
                <span className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
                  Concepcion, Chile
                </span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white">
                {settings.name}
              </h1>
              
              <p className="text-2xl md:text-3xl text-gray-600 dark:text-gray-300 font-light">
                {settings.title}
              </p>
            </div>

            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {settings.bio}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Link 
                href="/projects"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl transition-all shadow-lg hover:shadow-xl font-semibold"
              >
                Ver Proyectos
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              
              <Link 
                href="/skills"
                className="inline-flex items-center px-8 py-4 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-xl transition-all shadow-lg hover:shadow-xl border-2 border-gray-200 dark:border-gray-700 font-semibold"
              >
                Stack Tecnologico
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white dark:bg-gray-800 border-y border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-2">
              <BarChart3 className="w-12 h-12 mx-auto mb-2 text-blue-600 dark:text-blue-400" />
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                Ingenieria de Datos
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                ETL, Pipelines, Automatizacion
              </p>
            </div>
            
            <div className="text-center space-y-2">
              <Database className="w-12 h-12 mx-auto mb-2 text-purple-600 dark:text-purple-400" />
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                Ciencia de Datos
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Analisis, Visualizacion, ML
              </p>
            </div>
            
            <div className="text-center space-y-2">
              <LineChart className="w-12 h-12 mx-auto mb-2 text-green-600 dark:text-green-400" />
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                Implementacion
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                APIs, Dashboards, Produccion
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Listo para Colaborar
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Busco oportunidades en ciencia de datos y analisis. 
            Revisa mis proyectos y conectemos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl transition-all shadow-lg hover:shadow-xl font-semibold"
            >
              Contactar
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link 
              href="/blog"
              className="inline-flex items-center px-8 py-4 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-xl transition-all shadow-lg hover:shadow-xl border-2 border-gray-200 dark:border-gray-700 font-semibold"
            >
              Leer Blog
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
