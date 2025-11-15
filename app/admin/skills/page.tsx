'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Plus, Edit2, Trash2, Save } from 'lucide-react'
import { getSkills, createSkill, updateSkill, deleteSkill } from '@/lib/supabase-helpers'
import type { Skill } from '@/lib/supabase'

export default function SkillsManager() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null)
  const [isAdding, setIsAdding] = useState(false)
  const [loading, setLoading] = useState(true)

  // Cargar skills desde Supabase
  useEffect(() => {
    const loadSkillsData = async () => {
      setLoading(true)
      const data = await getSkills()
      setSkills(data)
      setLoading(false)
    }
    loadSkillsData()
  }, [])

  const levels = ['Básico', 'Intermedio', 'Avanzado', 'Experto', 'En aprendizaje', 'Planeado']
  
  const categories = [
    'Lenguajes de Programación',
    'Análisis & Visualización',
    'Ingeniería de Datos',
    'Cloud & Infraestructura',
    'Machine Learning & IA',
    'Business & Estrategia'
  ]

  const [newSkill, setNewSkill] = useState<Partial<Skill>>({
    name: '',
    level: 'Básico',
    description: '',
    category: 'Lenguajes de Programación'
  })

  const handleEdit = (skill: Skill) => {
    setEditingSkill({ ...skill })
    setIsAdding(false)
  }

  const handleSave = async () => {
    if (editingSkill) {
      const success = await updateSkill(editingSkill.id, {
        name: editingSkill.name,
        level: editingSkill.level,
        description: editingSkill.description,
        category: editingSkill.category
      })
      if (success) {
        setSkills(skills.map(s => s.id === editingSkill.id ? editingSkill : s))
        setEditingSkill(null)
      }
    }
  }

  const handleAdd = async () => {
    if (newSkill.name && newSkill.level && newSkill.description && newSkill.category) {
      const created = await createSkill({
        name: newSkill.name,
        level: newSkill.level,
        description: newSkill.description || '',
        category: newSkill.category
      })
      
      if (created) {
        setSkills([...skills, created])
        setNewSkill({ name: '', level: 'Básico', description: '', category: 'Lenguajes de Programación' })
        setIsAdding(false)
      }
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm('¿Estás seguro de eliminar esta skill?')) {
      const success = await deleteSkill(id)
      if (success) {
        setSkills(skills.filter(s => s.id !== id))
      }
    }
  }

  const exportSkills = () => {
    const json = JSON.stringify(skills, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'skills.json'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Avanzado':
      case 'Experto':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'Intermedio':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'Básico':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'En aprendizaje':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
      case 'Planeado':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
    }
  }

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = []
    }
    acc[skill.category].push(skill)
    return acc
  }, {} as Record<string, Skill[]>)

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Cargando skills...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
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
              Gestionar Skills
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Total: {skills.length} habilidades • ✅ Los cambios se guardan automáticamente
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={exportSkills}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
            >
              Exportar JSON
            </button>
            <button
              onClick={() => setIsAdding(true)}
              className="flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Agregar Skill
            </button>
          </div>
        </div>

        {/* Info Alert */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            💡 <strong>Tip:</strong> Todas las skills que añadas o edites aquí se verán reflejadas automáticamente en la página pública <code className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900 rounded">/skills</code>
          </p>
        </div>

        {/* Add New Skill Form */}
        {isAdding && (
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Nueva Skill
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nombre
                </label>
                <input
                  type="text"
                  value={newSkill.name}
                  onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                  className="w-full px-4 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white"
                  placeholder="Ej: TensorFlow"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nivel
                </label>
                <select
                  value={newSkill.level}
                  onChange={(e) => setNewSkill({ ...newSkill, level: e.target.value })}
                  className="w-full px-4 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white"
                >
                  {levels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Categoría
                </label>
                <select
                  value={newSkill.category}
                  onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
                  className="w-full px-4 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Descripción
                </label>
                <input
                  type="text"
                  value={newSkill.description}
                  onChange={(e) => setNewSkill({ ...newSkill, description: e.target.value })}
                  className="w-full px-4 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-white"
                  placeholder="Breve descripción..."
                />
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleAdd}
                className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
              >
                Guardar
              </button>
              <button
                onClick={() => setIsAdding(false)}
                className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}

        {/* Skills List Grouped by Category */}
        <div className="space-y-6">
          {Object.entries(groupedSkills).map(([category, categorySkills]) => (
            <div key={category} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {category} ({categorySkills.length})
              </h2>
              <div className="space-y-3">
                {categorySkills.map((skill) => (
                  <div key={skill.id}>
                    {editingSkill?.id === skill.id ? (
                      /* Edit Mode */
                      <div className="border border-primary-500 rounded-lg p-4 bg-primary-50 dark:bg-primary-900/20">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <input
                            type="text"
                            value={editingSkill.name}
                            onChange={(e) => setEditingSkill({ ...editingSkill, name: e.target.value })}
                            className="px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded text-gray-900 dark:text-white"
                          />
                          <select
                            value={editingSkill.level}
                            onChange={(e) => setEditingSkill({ ...editingSkill, level: e.target.value })}
                            className="px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded text-gray-900 dark:text-white"
                          >
                            {levels.map(level => (
                              <option key={level} value={level}>{level}</option>
                            ))}
                          </select>
                          <input
                            type="text"
                            value={editingSkill.description}
                            onChange={(e) => setEditingSkill({ ...editingSkill, description: e.target.value })}
                            className="px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded text-gray-900 dark:text-white md:col-span-2"
                          />
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={handleSave}
                            className="flex items-center px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-sm"
                          >
                            <Save className="w-3 h-3 mr-1" />
                            Guardar
                          </button>
                          <button
                            onClick={() => setEditingSkill(null)}
                            className="px-3 py-1 bg-gray-500 hover:bg-gray-600 text-white rounded text-sm"
                          >
                            Cancelar
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* View Mode */
                      <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-gray-900 dark:text-white">
                              {skill.name}
                            </h3>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${getLevelColor(skill.level)}`}>
                              {skill.level}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {skill.description}
                          </p>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <button
                            onClick={() => handleEdit(skill)}
                            className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(skill.id)}
                            className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
