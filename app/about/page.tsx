'use client'

import { useState, useEffect } from 'react'
import { Calendar, TrendingUp, Globe2, MapPin } from 'lucide-react'
import { getJourneyStages, getJourneyLocations, getJourneyPhilosophy } from '@/lib/supabase-helpers'
import { defaultLifeStages, defaultLocations, defaultPhilosophy } from '@/lib/data-loader'

export default function About() {
  const [journeyData, setJourneyData] = useState({
    lifeStages: defaultLifeStages,
    locations: defaultLocations,
    philosophy: defaultPhilosophy
  })

  useEffect(() => {
    // Cargar datos desde Supabase
    const loadData = async () => {
      const [stagesData, locationsData, philosophyData] = await Promise.all([
        getJourneyStages(),
        getJourneyLocations(),
        getJourneyPhilosophy()
      ])

      setJourneyData({
        lifeStages: stagesData.length > 0 ? stagesData.map(s => ({
          id: s.id,
          icon: s.emoji,
          title: s.title,
          description: s.description
        })) : defaultLifeStages,
        locations: locationsData.length > 0 ? locationsData.map(l => ({
          id: l.id,
          flag: l.flag,
          country: l.country,
          subtitle: l.subtitle,
          city: l.city,
          description: l.description,
          highlights: l.highlights
        })) : defaultLocations,
        philosophy: philosophyData ? {
          title: philosophyData.title,
          mainQuote: philosophyData.quote,
          verses: philosophyData.verses,
          closing: philosophyData.closing,
          finalThought: philosophyData.final_thought
        } : defaultPhilosophy
      })
    }
    loadData()
  }, [])

  const quarters = [
    {
      title: 'Q1: Fundamentos',
      weeks: 'Semanas 1-13',
      topics: ['Python & SQL', 'Estadística', 'EDA & Visualización', 'Git & Control de versiones']
    },
    {
      title: 'Q2: Machine Learning',
      weeks: 'Semanas 14-26',
      topics: ['Algoritmos supervisados', 'Algoritmos no supervisados', 'Feature Engineering', 'Model Evaluation']
    },
    {
      title: 'Q3: MLOps & Deploy',
      weeks: 'Semanas 27-52',
      topics: ['MLOps pipelines', 'Docker & Kubernetes', 'Model serving', 'Monitoring & A/B testing']
    },
    {
      title: 'Q4: Ingeniería de Datos',
      weeks: 'Semanas 53-78',
      topics: ['dbt & SQL avanzado', 'Airflow & Spark', 'Data warehouses', 'Google Cloud / BigQuery']
    },
    {
      title: 'Q5-Q6: Deep Learning & IA',
      weeks: 'Semanas 79-104',
      topics: ['Neural Networks', 'NLP & LLMs', 'LangChain & RAG', 'IA estratégica aplicada']
    }
  ]

  return (
    <div className="min-h-screen px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            🌍 Ruta de Vida y Trabajo
          </h1>
          <p className="text-2xl text-gray-600 dark:text-gray-300 leading-relaxed font-light">
            Una vida diseñada para la calma, la precisión y la libertad.
          </p>
        </div>

        {/* Life Stages */}
        <section className="mb-20">
          <div className="flex items-center mb-10">
            <TrendingUp className="w-8 h-8 text-primary-600 dark:text-primary-400 mr-3" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Etapas de Vida
            </h2>
          </div>
          
          <div className="space-y-6">
            {journeyData.lifeStages.map((stage, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:border-primary-400 dark:hover:border-primary-600 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="text-4xl flex-shrink-0">{stage.icon}</div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                      {stage.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {stage.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Geographic Journey */}
        <section className="mb-20">
          <div className="flex items-center mb-10">
            <Globe2 className="w-8 h-8 text-primary-600 dark:text-primary-400 mr-3" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Dónde Quiero Vivir y Por Qué
            </h2>
          </div>
          
          <div className="space-y-8">
            {journeyData.locations.map((location, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-lg p-8 shadow-lg border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-5xl">{location.flag}</div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                      {location.country}
                    </h3>
                    <p className="text-primary-600 dark:text-primary-400 font-medium text-lg mb-2">
                      {location.subtitle}
                    </p>
                    {location.city && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1 mb-3">
                        <MapPin className="w-4 h-4" />
                        {location.city}
                      </p>
                    )}
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                      {location.description}
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {location.highlights.map((highlight, hIndex) => (
                        <li
                          key={hIndex}
                          className="flex items-center text-sm text-gray-600 dark:text-gray-300"
                        >
                          <span className="w-1.5 h-1.5 bg-primary-600 dark:bg-primary-400 rounded-full mr-2"></span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Philosophy */}
        <section className="mb-20">
          <div className="bg-primary-600 dark:bg-primary-700 rounded-lg p-8 text-white">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              {journeyData.philosophy.title}
            </h2>
            <div className="space-y-3 text-lg leading-relaxed">
              <p className="font-semibold">{journeyData.philosophy.mainQuote}</p>
              <div>
                {journeyData.philosophy.verses.map((verse, index) => (
                  <p key={index}>{verse}</p>
                ))}
              </div>
              <p className="font-semibold pt-2">{journeyData.philosophy.closing}</p>
              <p className="italic pt-3 border-t border-primary-400">
                {journeyData.philosophy.finalThought}
              </p>
            </div>
          </div>
        </section>


        {/* Learning Roadmap */}
        <section className="mb-16">
          <div className="flex items-center mb-8">
            <Calendar className="w-8 h-8 text-primary-600 dark:text-primary-400 mr-3" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Roadmap de Aprendizaje — 104 Semanas
            </h2>
          </div>
          
          <div className="space-y-6">
            {quarters.map((quarter, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                      {quarter.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {quarter.weeks}
                    </p>
                  </div>
                  <TrendingUp className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {quarter.topics.map((topic, topicIndex) => (
                    <li
                      key={topicIndex}
                      className="flex items-center text-gray-600 dark:text-gray-300"
                    >
                      <span className="w-2 h-2 bg-primary-600 dark:bg-primary-400 rounded-full mr-2"></span>
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Current Focus */}
        <section className="bg-primary-50 dark:bg-gray-800 rounded-lg p-8 border border-primary-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            Enfoque Actual
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Actualmente estoy construyendo mi foundation en:
          </p>
          <ul className="space-y-2 text-gray-600 dark:text-gray-300">
            <li className="flex items-center">
              <span className="w-2 h-2 bg-primary-600 dark:bg-primary-400 rounded-full mr-3"></span>
              Python para análisis de datos (pandas, numpy, matplotlib, seaborn)
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-primary-600 dark:bg-primary-400 rounded-full mr-3"></span>
              SQL para consultas analíticas y modelado de datos
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-primary-600 dark:bg-primary-400 rounded-full mr-3"></span>
              Estadística descriptiva e inferencial
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-primary-600 dark:bg-primary-400 rounded-full mr-3"></span>
              Visualización de datos y dashboards con Power BI
            </li>
          </ul>
        </section>
      </div>
    </div>
  )
}

