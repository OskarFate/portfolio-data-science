'use client'

import { useState, useEffect } from 'react'
import { Code2, Database, BarChart3, Cloud, Brain, TrendingUp, Sparkles } from 'lucide-react'
import { getSkills } from '@/lib/supabase-helpers'
import type { Skill } from '@/lib/supabase'

export default function Skills() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null)

  useEffect(() => {
    const loadSkillsData = async () => {
      const data = await getSkills()
      setSkills(data)
    }
    loadSkillsData()
  }, [])

  // Agrupar skills por categoría
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Lenguajes de Programación':
        return Code2
      case 'Análisis & Visualización':
        return BarChart3
      case 'Ingeniería de Datos':
        return Database
      case 'Cloud & Infraestructura':
        return Cloud
      case 'Machine Learning & IA':
        return Brain
      case 'Business & Estrategia':
        return TrendingUp
      default:
        return Code2
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Lenguajes de Programación':
        return 'from-blue-500 to-cyan-500'
      case 'Análisis & Visualización':
        return 'from-green-500 to-emerald-500'
      case 'Ingeniería de Datos':
        return 'from-purple-500 to-pink-500'
      case 'Cloud & Infraestructura':
        return 'from-orange-500 to-red-500'
      case 'Machine Learning & IA':
        return 'from-indigo-500 to-purple-500'
      case 'Business & Estrategia':
        return 'from-yellow-500 to-orange-500'
      default:
        return 'from-gray-500 to-gray-600'
    }
  }

  const categories = [
    'Lenguajes de Programación',
    'Análisis & Visualización',
    'Ingeniería de Datos',
    'Cloud & Infraestructura',
    'Machine Learning & IA',
    'Business & Estrategia'
  ]

  const skillsByCategory = categories.map(category => ({
    title: category,
    icon: getCategoryIcon(category),
    color: getCategoryColor(category),
    skills: skills.filter(skill => skill.category === category)
  })).filter(cat => cat.skills.length > 0)

  // Filtrar por nivel si está seleccionado
  const filteredSkillsByCategory = selectedLevel
    ? skillsByCategory.map(cat => ({
        ...cat,
        skills: cat.skills.filter(s => s.level === selectedLevel)
      })).filter(cat => cat.skills.length > 0)
    : skillsByCategory

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Experto':
        return 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
      case 'Avanzado':
        return 'bg-gradient-to-r from-green-600 to-emerald-600 text-white'
      case 'Intermedio':
        return 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white'
      case 'Básico':
        return 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white'
      default:
        return 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
    }
  }

  const levelStats = {
    'Experto': skills.filter(s => s.level === 'Experto').length,
    'Avanzado': skills.filter(s => s.level === 'Avanzado').length,
    'Intermedio': skills.filter(s => s.level === 'Intermedio').length,
    'Básico': skills.filter(s => s.level === 'Básico').length,
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section con gradiente como el inicio */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center mb-6">
              <Sparkles className="w-8 h-8 text-blue-600 dark:text-blue-400 mr-3" />
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white">
                Stack Tecnológico
              </h1>
            </div>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Mi arsenal completo para <span className="text-blue-600 dark:text-blue-400 font-semibold">ciencia de datos</span>, 
              {' '}<span className="text-green-600 dark:text-green-400 font-semibold">analítica de negocio</span> e 
              {' '}<span className="text-purple-600 dark:text-purple-400 font-semibold">ingeniería de datos</span>
            </p>
          </div>
        </div>
      </section>

      {/* Content Section con fondo */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats & Filters */}
        <div className="mb-12 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-4">
              {Object.entries(levelStats).map(([level, count]) => (
                <button
                  key={level}
                  onClick={() => setSelectedLevel(selectedLevel === level ? null : level)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                    selectedLevel === level 
                      ? getLevelColor(level) + ' scale-110 shadow-lg' 
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:scale-105'
                  }`}
                >
                  {level}: {count}
                </button>
              ))}
            </div>
            
            {/* Total */}
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600 dark:text-primary-400">
                {skills.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                Skills Totales
              </div>
            </div>
          </div>
          
          {selectedLevel && (
            <div className="mt-4 text-center">
              <button
                onClick={() => setSelectedLevel(null)}
                className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
              >
                ← Mostrar todas las skills
              </button>
            </div>
          )}
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSkillsByCategory.map((category, categoryIndex) => {
            const Icon = category.icon
            return (
              <div
                key={categoryIndex}
                className="group bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Category Header */}
                <div className="flex items-center mb-6">
                  <div className={`w-14 h-14 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center mr-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">
                      {category.title}
                    </h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {category.skills.length} skill{category.skills.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>

                {/* Skills List */}
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div 
                      key={skillIndex} 
                      className="relative pl-4 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200 border-l-4 border-primary-200 dark:border-primary-800 hover:border-primary-500"
                    >
                      <div className="flex items-start justify-between mb-2 gap-2">
                        <h3 className="font-bold text-gray-900 dark:text-white text-base leading-tight">
                          {skill.name}
                        </h3>
                        <span className={`px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap shadow-sm ${getLevelColor(skill.level)}`}>
                          {skill.level}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                        {skill.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Roadmap Info */}
        <div className="mt-16 bg-gradient-to-r from-primary-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 shadow-xl border-2 border-primary-200 dark:border-primary-800">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="ml-6 flex-1">
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                🚀 Roadmap de 104 Semanas
              </h2>
              <p className="text-gray-700 dark:text-gray-200 mb-4 text-lg leading-relaxed">
                Cada skill aquí representa horas de estudio deliberado, proyectos prácticos y documentación constante. 
                Mi objetivo es dominar el stack completo de Data Science: desde Python y SQL hasta Machine Learning, 
                Cloud Engineering y Business Strategy.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                <strong className="text-primary-600 dark:text-primary-400">Metodología:</strong> Aprendo haciendo. 
                Cada semana incluye teoría + proyecto + documentación en blog. Sin motivación, solo disciplina.
              </p>
              
              {/* Legend */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="flex items-center">
                  <div className={`w-4 h-4 rounded ${getLevelColor('Experto')} mr-2`}></div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Experto - Dominio total</span>
                </div>
                <div className="flex items-center">
                  <div className={`w-4 h-4 rounded ${getLevelColor('Avanzado')} mr-2`}></div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Avanzado - Uso productivo</span>
                </div>
                <div className="flex items-center">
                  <div className={`w-4 h-4 rounded ${getLevelColor('Intermedio')} mr-2`}></div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Intermedio - Proyectos reales</span>
                </div>
                <div className="flex items-center">
                  <div className={`w-4 h-4 rounded ${getLevelColor('Básico')} mr-2`}></div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Básico - Fundamentos sólidos</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
