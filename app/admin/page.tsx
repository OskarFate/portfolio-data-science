'use client'

import Link from 'next/link'
import { FileText, Code, Briefcase, Settings, BarChart3, Calendar, MapPin, Database, TrendingUp, CheckCircle, Target, Clock, Zap, Award } from 'lucide-react'
import { useEffect, useState } from 'react'
import { getSettings, getSkills, getProjects, getPosts } from '@/lib/supabase-helpers'
import type { Post } from '@/lib/supabase'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    posts: 0,
    projects: 0,
    skills: 0,
    roadmapProgress: 0,
    currentWeek: 0,
    weeksRemaining: 104,
    daysInRoadmap: 0,
    recentPosts: [] as Post[],
    draftPosts: 0,
    weeklyStreak: 0,
    skillsByCategory: {} as Record<string, number>
  })
  const [loading, setLoading] = useState(true)
  const [userName, setUserName] = useState('Admin')
  const [greeting, setGreeting] = useState('Hola')

  useEffect(() => {
    // Set greeting based on time
    const hour = new Date().getHours()
    if (hour < 12) setGreeting('Buenos días')
    else if (hour < 18) setGreeting('Buenas tardes')
    else setGreeting('Buenas noches')

    const loadDashboardData = async () => {
      setLoading(true)
      const [settingsData, skillsData, projectsData, postsData] = await Promise.all([
        getSettings(),
        getSkills(),
        getProjects(),
        getPosts()
      ])

      const progress = settingsData?.roadmap_progress || 0
      const currentWeek = Math.floor(progress / 100 * 104)
      const weeksRemaining = 104 - currentWeek
      const daysInRoadmap = currentWeek * 7

      // Calculate skills by category
      const skillsByCategory = skillsData.reduce((acc, skill) => {
        acc[skill.category] = (acc[skill.category] || 0) + 1
        return acc
      }, {} as Record<string, number>)

      // Calculate weekly streak (posts with consecutive week numbers)
      const weeklyPosts = postsData
        .filter(p => p.published && p.week_number)
        .sort((a, b) => (b.week_number || 0) - (a.week_number || 0))
      
      let streak = 0
      if (weeklyPosts.length > 0) {
        const latestWeek = weeklyPosts[0].week_number || 0
        for (let i = 0; i < weeklyPosts.length; i++) {
          if ((weeklyPosts[i].week_number || 0) === latestWeek - i) {
            streak++
          } else {
            break
          }
        }
      }

      setStats({
        posts: postsData.filter(p => p.published).length,
        projects: projectsData.length,
        skills: skillsData.length,
        roadmapProgress: progress,
        currentWeek,
        weeksRemaining,
        daysInRoadmap,
        recentPosts: postsData.filter(p => p.published).slice(0, 3),
        draftPosts: postsData.filter(p => !p.published).length,
        weeklyStreak: streak,
        skillsByCategory
      })

      setUserName(settingsData?.name?.split(' ')[0] || 'Admin')
      setLoading(false)
    }
    loadDashboardData()
  }, [])

  const statsDisplay = [
    { 
      label: 'Posts Publicados', 
      value: stats.posts.toString(), 
      icon: FileText, 
      color: 'bg-gradient-to-br from-blue-500 to-blue-600',
      subtitle: stats.posts === 0 ? 'Comienza a documentar' : 'Blog activo'
    },
    { 
      label: 'Proyectos', 
      value: stats.projects.toString(), 
      icon: Briefcase, 
      color: 'bg-gradient-to-br from-green-500 to-green-600',
      subtitle: stats.projects === 0 ? 'Añade tu primer proyecto' : 'Portfolio completo'
    },
    { 
      label: 'Skills Registradas', 
      value: stats.skills.toString(), 
      icon: Code, 
      color: 'bg-gradient-to-br from-purple-500 to-purple-600',
      subtitle: `${stats.skills} tecnologías dominadas`
    },
    { 
      label: 'Semana Actual', 
      value: `${stats.currentWeek}/104`, 
      icon: Target, 
      color: 'bg-gradient-to-br from-orange-500 to-red-500',
      subtitle: `${stats.weeksRemaining} semanas restantes`
    },
  ]

  const quickLinks = [
    {
      title: '🔄 Migrar a Supabase',
      description: '¡IMPORTANTE! Migra tus datos a la nube',
      href: '/admin/migrate',
      icon: Database,
      color: 'bg-red-500'
    },
    {
      title: 'Crear Post',
      description: 'Escribe un nuevo post para el blog',
      href: '/admin/posts/new',
      icon: FileText,
      color: 'bg-blue-500'
    },
    {
      title: 'Gestionar Skills',
      description: 'Actualiza tus habilidades y niveles',
      href: '/admin/skills',
      icon: Code,
      color: 'bg-purple-500'
    },
    {
      title: 'Gestionar Proyectos',
      description: 'Añade o edita tus proyectos',
      href: '/admin/projects',
      icon: Briefcase,
      color: 'bg-green-500'
    },
    {
      title: 'Ruta de Vida',
      description: 'Edita tus etapas y destinos geográficos',
      href: '/admin/journey',
      icon: MapPin,
      color: 'bg-indigo-500'
    },
    {
      title: 'Configuración',
      description: 'Actualiza tu información personal',
      href: '/admin/settings',
      icon: Settings,
      color: 'bg-gray-500'
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 bg-gradient-to-r from-primary-500 via-purple-600 to-pink-500 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
          {/* Animated background */}
          <div className="absolute inset-0 bg-white/5 animate-pulse"></div>
          
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
                👋 {greeting}, {userName}
              </h1>
              <p className="text-white/90 text-lg mb-4">
                {stats.currentWeek === 0 
                  ? '¡Comienza tu viaje de 104 semanas hacia Data Science hoy!' 
                  : `Llevas ${stats.daysInRoadmap} días en tu roadmap. ¡Sigue adelante!`}
              </p>
              
              {/* Quick stats */}
              <div className="flex items-center gap-6 text-white/80 text-sm">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  <span>{stats.weeklyStreak} {stats.weeklyStreak === 1 ? 'semana' : 'semanas'} consecutivas</span>
                </div>
                {stats.draftPosts > 0 && (
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    <span>{stats.draftPosts} {stats.draftPosts === 1 ? 'borrador' : 'borradores'}</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="hidden md:block">
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center min-w-[140px] border-2 border-white/30">
                <div className="text-6xl font-bold text-white mb-2">
                  {stats.roadmapProgress.toFixed(1)}%
                </div>
                <div className="text-white/90 text-sm font-semibold uppercase tracking-wide">
                  Completado
                </div>
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">Cargando dashboard...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {statsDisplay.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transform hover:scale-105 transition-all hover:shadow-2xl group"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`${stat.color} p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                      {stat.label}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {stat.subtitle}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Roadmap Progress Bar */}
            <div className="mb-8 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 flex items-center gap-2">
                    🎯 Progreso del Roadmap de 104 Semanas
                    {stats.weeklyStreak > 0 && (
                      <span className="text-sm bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 px-3 py-1 rounded-full font-semibold">
                        🔥 {stats.weeklyStreak} {stats.weeklyStreak === 1 ? 'semana' : 'semanas'}
                      </span>
                    )}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {stats.currentWeek === 0 
                      ? 'Tu viaje hacia Data Science comienza ahora' 
                      : `Semana ${stats.currentWeek} de 104 • ${stats.weeksRemaining} semanas restantes • ${(stats.roadmapProgress).toFixed(1)}% completado`}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                    {stats.roadmapProgress.toFixed(1)}%
                  </div>
                </div>
              </div>
              <div className="relative w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden shadow-inner">
                <div 
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary-500 via-purple-500 to-pink-500 rounded-full transition-all duration-1000 ease-out shadow-lg"
                  style={{ width: `${stats.roadmapProgress || 0.5}%` }}
                >
                  <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                </div>
              </div>
              <div className="flex items-center justify-between mt-4 text-xs text-gray-500 dark:text-gray-400">
                <span>🚀 Inicio</span>
                <span>📊 Semana 26</span>
                <span>🧠 Semana 52</span>
                <span>🏆 Semana 78</span>
                <span>🎓 Semana 104</span>
              </div>
            </div>

            {/* Skills Breakdown */}
            {Object.keys(stats.skillsByCategory).length > 0 && (
              <div className="mb-8 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  💼 Stack Tecnológico
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {Object.entries(stats.skillsByCategory).map(([category, count]) => (
                    <div 
                      key={category}
                      className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-600"
                    >
                      <div className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-1">
                        {count}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                        {category}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Actions Shortcuts */}
            <div className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                ⚡ Acciones Rápidas
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Link
                  href="/admin/posts/new"
                  className="flex items-center gap-3 bg-white dark:bg-gray-800 p-4 rounded-lg hover:shadow-md transition-shadow group border border-gray-200 dark:border-gray-700"
                >
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg group-hover:scale-110 transition-transform">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white text-sm">Nuevo Post</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Documenta tu semana</p>
                  </div>
                </Link>
                <Link
                  href="/admin/projects"
                  className="flex items-center gap-3 bg-white dark:bg-gray-800 p-4 rounded-lg hover:shadow-md transition-shadow group border border-gray-200 dark:border-gray-700"
                >
                  <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg group-hover:scale-110 transition-transform">
                    <Briefcase className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white text-sm">Nuevo Proyecto</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Añade a tu portfolio</p>
                  </div>
                </Link>
                <Link
                  href="/admin/skills"
                  className="flex items-center gap-3 bg-white dark:bg-gray-800 p-4 rounded-lg hover:shadow-md transition-shadow group border border-gray-200 dark:border-gray-700"
                >
                  <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg group-hover:scale-110 transition-transform">
                    <Code className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white text-sm">Nueva Skill</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Actualiza tu stack</p>
                  </div>
                </Link>
              </div>
            </div>
          </>
        )}

        {/* Migration Alert */}
        {!loading && stats.skills === 0 && stats.posts === 0 && (
          <div className="mb-8 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border-2 border-red-200 dark:border-red-800 rounded-lg p-6 shadow-lg">
            <div className="flex items-start">
              <Database className="w-8 h-8 text-red-600 dark:text-red-400 mr-4 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-xl font-bold text-red-900 dark:text-red-100 mb-2">
                  ⚠️ ¡Base de datos vacía!
                </h3>
                <p className="text-red-800 dark:text-red-200 mb-4">
                  Parece que aún no has migrado tus datos de localStorage a Supabase. 
                  <strong> Haz clic abajo para iniciar la migración automática.</strong>
                </p>
                <Link
                  href="/admin/migrate"
                  className="inline-flex items-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors shadow-lg hover:shadow-xl"
                >
                  <Database className="w-5 h-5 mr-2" />
                  🚀 Migrar Datos Ahora
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Success Message */}
        {!loading && stats.skills > 0 && (
          <div className="mb-8 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-200 dark:border-green-800 rounded-lg p-6 shadow-lg">
            <div className="flex items-start">
              <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400 mr-4 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-xl font-bold text-green-900 dark:text-green-100 mb-2">
                  ✅ ¡Conectado a Supabase!
                </h3>
                <p className="text-green-800 dark:text-green-200">
                  Tu portfolio está usando la base de datos en la nube. Todos tus cambios se sincronizan automáticamente.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Acciones Rápidas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickLinks.map((link, index) => {
              const Icon = link.icon
              return (
                <Link
                  key={index}
                  href={link.href}
                  className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow group"
                >
                  <div className="flex items-start">
                    <div className={`${link.color} p-3 rounded-lg mr-4 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                        {link.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {link.description}
                      </p>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Recent Posts */}
        {!loading && stats.posts > 0 && (
          <div className="mb-8 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                📝 Posts Recientes
              </h2>
              <Link
                href="/admin/posts/new"
                className="text-sm text-primary-600 dark:text-primary-400 hover:underline font-medium"
              >
                Crear nuevo →
              </Link>
            </div>
            <div className="space-y-3">
              {stats.recentPosts.map((post) => (
                <div 
                  key={post.id}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center space-x-3 flex-1">
                    <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
                      <FileText className="w-4 h-4 text-blue-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {post.title}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {post.published_at && new Date(post.published_at).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })}
                        {post.week_number && ` • Semana ${post.week_number}`}
                      </p>
                    </div>
                  </div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-xs text-primary-600 dark:text-primary-400 hover:underline whitespace-nowrap ml-4"
                  >
                    Ver →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent Activity */}
        {!loading && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              📊 Resumen del Portfolio
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg mr-3">
                    <FileText className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {stats.posts === 0 ? 'Sin posts publicados aún' : `${stats.posts} post${stats.posts !== 1 ? 's' : ''} publicado${stats.posts !== 1 ? 's' : ''}`}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {stats.posts === 0 ? 'Crea tu primer post del blog' : 'Blog activo'}
                    </p>
                  </div>
                </div>
                <Link
                  href="/admin/posts/new"
                  className="text-primary-600 dark:text-primary-400 hover:underline text-sm font-medium"
                >
                  {stats.posts === 0 ? 'Crear →' : 'Ver posts →'}
                </Link>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center">
                  <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg mr-3">
                    <Code className="w-5 h-5 text-purple-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {stats.skills} skill{stats.skills !== 1 ? 's' : ''} registrada{stats.skills !== 1 ? 's' : ''}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {stats.skills === 0 ? 'Agrega tus habilidades técnicas' : 'Stack tecnológico completo'}
                    </p>
                  </div>
                </div>
                <Link
                  href="/admin/skills"
                  className="text-primary-600 dark:text-primary-400 hover:underline text-sm font-medium"
                >
                  Gestionar →
                </Link>
              </div>
              <div className="flex items-center justify-between py-3">
                <div className="flex items-center">
                  <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg mr-3">
                    <Briefcase className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {stats.projects} proyecto{stats.projects !== 1 ? 's' : ''} en el portfolio
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {stats.projects === 0 ? 'Muestra tus trabajos destacados' : 'Portfolio completo'}
                    </p>
                  </div>
                </div>
                <Link
                  href="/admin/projects"
                  className="text-primary-600 dark:text-primary-400 hover:underline text-sm font-medium"
                >
                  {stats.projects === 0 ? 'Añadir →' : 'Ver proyectos →'}
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Back to Site */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:underline"
          >
            ← Volver al sitio público
          </Link>
        </div>
      </div>
    </div>
  )
}
