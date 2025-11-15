'use client'

import Link from 'next/link'
import { Calendar, Clock, ArrowRight, BookOpen, TrendingUp, Search, Hash } from 'lucide-react'
import { useState, useEffect } from 'react'
import { getPosts } from '@/lib/supabase-helpers'
import type { Post } from '@/lib/supabase'

export default function Blog() {
  const [posts, setPosts] = useState<Post[]>([])
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([])
  const [selectedCategory, setSelectedCategory] = useState('Todos')
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadPosts = async () => {
      const data = await getPosts()
      const published = data.filter(p => p.published)
      setPosts(published)
      setFilteredPosts(published)
      setLoading(false)
    }
    loadPosts()
  }, [])

  // Filtrar posts
  useEffect(() => {
    let filtered = posts

    // Filtrar por categoría
    if (selectedCategory !== 'Todos') {
      filtered = filtered.filter(post => 
        post.technologies?.includes(selectedCategory)
      )
    }

    // Filtrar por búsqueda
    if (searchQuery) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    setFilteredPosts(filtered)
  }, [selectedCategory, searchQuery, posts])

  // Extraer todas las categorías únicas
  const allCategories = ['Todos', ...new Set(posts.flatMap(p => p.technologies || []))]

  const weekPosts = posts.filter(p => p.week_number && p.week_number > 0)
  const totalWeeks = weekPosts.length
  const currentWeek = Math.max(...weekPosts.map(p => p.week_number || 0), 0)

  return (
    <div className="min-h-screen">
      {/* Hero Section con gradiente */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center mb-6">
            <BookOpen className="w-8 h-8 text-blue-600 dark:text-blue-400 mr-3" />
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white">
              Learning Journal
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Documentando mi <span className="text-blue-600 dark:text-blue-400 font-semibold">roadmap de 104 semanas</span>. 
            Cada post = 1 semana de aprendizaje profundo, proyectos reales y reflexiones honestas.
          </p>
        </div>
        </div>
      </section>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats Bar */}
        {totalWeeks > 0 && (
          <div className="mb-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 shadow-xl text-white">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-center md:text-left">
                <div className="text-4xl font-bold mb-1">{totalWeeks} / 104</div>
                <div className="text-primary-100">Semanas Documentadas</div>
              </div>
              <div className="flex-1 max-w-md">
                <div className="w-full bg-white/20 rounded-full h-3">
                  <div 
                    className="bg-white h-3 rounded-full transition-all duration-500"
                    style={{ width: `${(totalWeeks / 104) * 100}%` }}
                  ></div>
                </div>
                <p className="text-sm text-primary-100 mt-2 text-center">
                  Semana {currentWeek} en progreso
                </p>
              </div>
              <div className="text-center md:text-right">
                <div className="text-4xl font-bold mb-1">{posts.length}</div>
                <div className="text-primary-100">Posts Totales</div>
              </div>
            </div>
          </div>
        )}

        {/* Search & Filters */}
        <div className="mb-12 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar posts por título o contenido..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3">
            {allCategories.map((category, index) => (
              <button
                key={index}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-primary-600 to-blue-600 text-white shadow-lg scale-105'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          
          {/* Results Count */}
          {searchQuery || selectedCategory !== 'Todos' ? (
            <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              Mostrando {filteredPosts.length} de {posts.length} posts
            </div>
          ) : null}
        </div>

        {/* Posts Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">Cargando posts...</p>
            </div>
          </div>
        ) : filteredPosts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Week Badge */}
                {post.week_number && (
                  <div className="mb-4">
                    <span className="px-3 py-1 bg-gradient-to-r from-primary-600 to-blue-600 text-white rounded-lg text-sm font-bold shadow-sm">
                      📅 Semana {post.week_number}
                    </span>
                  </div>
                )}

                {/* Technologies Tags */}
                {post.technologies && post.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.technologies.slice(0, 3).map((tech, i) => (
                      <span key={i} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs font-medium">
                        <Hash className="w-3 h-3 inline mr-1" />
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors leading-tight">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-4">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    {new Date(post.created_at).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    {post.reading_time || 5} min
                  </div>
                </div>

                <div className="mt-4 flex items-center text-primary-600 dark:text-primary-400 font-medium">
                  Leer más
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 rounded-2xl p-12 max-w-2xl mx-auto border-2 border-dashed border-gray-300 dark:border-gray-600">
              <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                {searchQuery || selectedCategory !== 'Todos' 
                  ? 'No se encontraron posts'
                  : '📝 Roadmap de 104 Semanas'}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {searchQuery || selectedCategory !== 'Todos'
                  ? 'Intenta con otra búsqueda o categoría'
                  : 'Cada semana documento mi progreso en data science. Los posts se crean automáticamente desde el admin al avanzar en el roadmap.'}
              </p>
              <Link
                href="/admin/posts/new"
                className="inline-block px-6 py-3 bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-700 hover:to-blue-700 text-white rounded-lg transition-all shadow-lg hover:shadow-xl font-medium"
              >
                Crear Primer Post
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
