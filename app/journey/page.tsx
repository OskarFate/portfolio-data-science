'use client'

import { useEffect, useState } from 'react'
import { getJourneyStages, getJourneyLocations, getJourneyPhilosophy } from '@/lib/supabase-helpers'
import type { JourneyStage, JourneyLocation, JourneyPhilosophy } from '@/lib/supabase'

export default function JourneyPage() {
  const [stages, setStages] = useState<JourneyStage[]>([])
  const [locations, setLocations] = useState<JourneyLocation[]>([])
  const [philosophy, setPhilosophy] = useState<JourneyPhilosophy | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadJourneyData = async () => {
      setLoading(true)
      const [stagesData, locationsData, philosophyData] = await Promise.all([
        getJourneyStages(),
        getJourneyLocations(),
        getJourneyPhilosophy()
      ])
      setStages(stagesData)
      setLocations(locationsData)
      setPhilosophy(philosophyData)
      setLoading(false)
    }
    loadJourneyData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Cargando mi ruta...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section con gradiente */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Plan de Vida
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            No tengo todo resuelto. Estoy aprendiendo, cometiendo errores y mejorando cada semana.
            Este es mi plan, no una promesa.
          </p>
        </div>
      </section>

      {/* Timeline of Stages */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            📍 Las 5 Etapas
          </h2>
          <div className="space-y-8">
            {stages.map((stage, index) => (
              <div
                key={stage.id}
                className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-shadow"
              >
                <div className="flex items-start gap-6">
                  <div className="text-6xl flex-shrink-0">
                    {stage.emoji}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                      {stage.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                      {stage.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Locations Map */}
      <section className="px-4 py-16 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-900 dark:text-white">
            🌍 Ubicaciones que Quiero Explorar
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
            Países que me llaman la atención. Puede que termine viviendo en todos, en ninguno, o que cambie de opinión.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {locations.map((location) => (
              <div
                key={location.id}
                className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-shadow"
              >
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-5xl">{location.flag}</span>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {location.country}
                    </h3>
                    <p className="text-primary-600 dark:text-primary-400 font-semibold">
                      {location.subtitle}
                    </p>
                  </div>
                </div>
                <p className="text-gray-500 dark:text-gray-500 text-sm mb-3">
                  📍 {location.city}
                </p>
                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  {location.description}
                </p>
                <div className="space-y-2">
                  {location.highlights.map((highlight, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300"
                    >
                      <span className="text-primary-500">✓</span>
                      {highlight}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16 sm:px-6 lg:px-8 bg-gray-900 dark:bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            ¿Quieres seguir mi progreso?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Documento cada semana del roadmap en mi blog. Código, aprendizajes, errores y proyectos reales.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/blog"
              className="inline-flex items-center px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-xl transition-all shadow-lg hover:shadow-xl font-semibold"
            >
              📝 Ver Blog (Semana por Semana)
            </a>
            <a
              href="/projects"
              className="inline-flex items-center px-8 py-4 bg-white hover:bg-gray-100 text-gray-900 rounded-xl transition-all shadow-lg hover:shadow-xl font-semibold"
            >
              💼 Ver Proyectos
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
