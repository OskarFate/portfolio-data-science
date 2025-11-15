'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Plus, Edit2, Trash2, Save, X } from 'lucide-react'

interface Project {
  id: string
  title: string
  description: string
  stack: string[]
  status: string
  impact: string
  github: string
  demo: string
}

export default function ProjectsManager() {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      title: 'Proyecto #1: Análisis Exploratorio',
      description: 'Primer proyecto completo de EDA con Python. Limpieza de datos, visualizaciones y hallazgos clave para un caso de negocio real.',
      stack: ['Python', 'Pandas', 'Matplotlib', 'Seaborn'],
      status: 'En progreso',
      impact: 'Identificación de patrones y outliers en dataset de ventas',
      github: '#',
      demo: '#'
    },
  ])

  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [isAdding, setIsAdding] = useState(false)

  const statuses = ['Planeado', 'En progreso', 'Completado', 'Pausado']

  const [newProject, setNewProject] = useState<Partial<Project>>({
    title: '',
    description: '',
    stack: [],
    status: 'Planeado',
    impact: '',
    github: '',
    demo: ''
  })

  const [newStack, setNewStack] = useState('')

  const handleEdit = (project: Project) => {
    setEditingProject({ ...project })
    setIsAdding(false)
  }

  const handleSave = () => {
    if (editingProject) {
      setProjects(projects.map(p => p.id === editingProject.id ? editingProject : p))
      setEditingProject(null)
    }
  }

  const handleAdd = () => {
    if (newProject.title && newProject.description) {
      const project: Project = {
        id: Date.now().toString(),
        title: newProject.title,
        description: newProject.description,
        stack: newProject.stack || [],
        status: newProject.status || 'Planeado',
        impact: newProject.impact || '',
        github: newProject.github || '#',
        demo: newProject.demo || '#'
      }
      setProjects([...projects, project])
      setNewProject({ title: '', description: '', stack: [], status: 'Planeado', impact: '', github: '', demo: '' })
      setIsAdding(false)
    }
  }

  const handleDelete = (id: string) => {
    if (confirm('¿Estás seguro de eliminar este proyecto?')) {
      setProjects(projects.filter(p => p.id !== id))
    }
  }

  const addStackItem = (stack: string[], setStack: (stack: string[]) => void) => {
    if (newStack.trim()) {
      setStack([...stack, newStack.trim()])
      setNewStack('')
    }
  }

  const removeStackItem = (index: number, stack: string[], setStack: (stack: string[]) => void) => {
    setStack(stack.filter((_, i) => i !== index))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completado':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'En progreso':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'Planeado':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
      case 'Pausado':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
    }
  }

  const exportProjects = () => {
    const json = JSON.stringify(projects, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'projects.json'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
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
              Gestionar Proyectos
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Total: {projects.length} proyectos
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={exportProjects}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
            >
              Exportar JSON
            </button>
            <button
              onClick={() => setIsAdding(true)}
              className="flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Agregar Proyecto
            </button>
          </div>
        </div>

        {/* Add New Project Form */}
        {isAdding && (
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Nuevo Proyecto
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Título
                </label>
                <input
                  type="text"
                  value={newProject.title}
                  onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                  className="w-full px-4 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
                  placeholder="Ej: Proyecto #2: Dashboard de Ventas"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Descripción
                </label>
                <textarea
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
                  placeholder="Descripción del proyecto..."
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Estado
                  </label>
                  <select
                    value={newProject.status}
                    onChange={(e) => setNewProject({ ...newProject, status: e.target.value })}
                    className="w-full px-4 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
                  >
                    {statuses.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Stack Tecnológico
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newStack}
                      onChange={(e) => setNewStack(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addStackItem(newProject.stack || [], (stack) => setNewProject({ ...newProject, stack }))}
                      className="flex-1 px-4 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
                      placeholder="Ej: Python"
                    />
                    <button
                      onClick={() => addStackItem(newProject.stack || [], (stack) => setNewProject({ ...newProject, stack }))}
                      className="px-4 py-2 bg-primary-600 text-white rounded-lg"
                    >
                      +
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {newProject.stack?.map((tech, idx) => (
                      <span key={idx} className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded-md text-sm flex items-center gap-2">
                        {tech}
                        <button onClick={() => removeStackItem(idx, newProject.stack || [], (stack) => setNewProject({ ...newProject, stack }))}>
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Impacto de Negocio
                </label>
                <input
                  type="text"
                  value={newProject.impact}
                  onChange={(e) => setNewProject({ ...newProject, impact: e.target.value })}
                  className="w-full px-4 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
                  placeholder="Describe el impacto..."
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    GitHub URL
                  </label>
                  <input
                    type="text"
                    value={newProject.github}
                    onChange={(e) => setNewProject({ ...newProject, github: e.target.value })}
                    className="w-full px-4 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
                    placeholder="https://github.com/..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Demo URL
                  </label>
                  <input
                    type="text"
                    value={newProject.demo}
                    onChange={(e) => setNewProject({ ...newProject, demo: e.target.value })}
                    className="w-full px-4 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
                    placeholder="https://..."
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <button
                onClick={handleAdd}
                className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg"
              >
                Guardar
              </button>
              <button
                onClick={() => setIsAdding(false)}
                className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}

        {/* Projects List */}
        <div className="space-y-4">
          {projects.map((project) => (
            <div key={project.id} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              {editingProject?.id === project.id ? (
                /* Edit Mode */
                <div className="space-y-4">
                  <input
                    type="text"
                    value={editingProject.title}
                    onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                    className="w-full px-4 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
                  />
                  <textarea
                    value={editingProject.description}
                    onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
                  />
                  <select
                    value={editingProject.status}
                    onChange={(e) => setEditingProject({ ...editingProject, status: e.target.value })}
                    className="px-4 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
                  >
                    {statuses.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                  <div className="flex gap-2">
                    <button
                      onClick={handleSave}
                      className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Guardar
                    </button>
                    <button
                      onClick={() => setEditingProject(null)}
                      className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                /* View Mode */
                <>
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        {project.title}
                      </h3>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                        {project.status}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(project)}
                        className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {project.description}
                  </p>
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Stack:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.stack.map((tech, idx) => (
                        <span key={idx} className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded-md text-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-md">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                      Impacto:
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {project.impact}
                    </p>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
