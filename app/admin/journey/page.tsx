'use client'

import { useState, useEffect } from 'react'
import { Save, Plus, Trash2, Download, MapPin } from 'lucide-react'
import { 
  getJourneyStages, 
  getJourneyLocations, 
  getJourneyPhilosophy,
  upsertJourneyStages,
  upsertJourneyLocations,
  upsertJourneyPhilosophy
} from '@/lib/supabase-helpers'
import { defaultLifeStages, defaultLocations, defaultPhilosophy, type LifeStage, type Location, type Philosophy } from '@/lib/data-loader'

export default function JourneyAdmin() {
  const [lifeStages, setLifeStages] = useState<LifeStage[]>(defaultLifeStages)
  const [locations, setLocations] = useState<Location[]>(defaultLocations)
  const [philosophy, setPhilosophy] = useState<Philosophy>(defaultPhilosophy)

  const [editingStage, setEditingStage] = useState<string | null>(null)
  const [editingLocation, setEditingLocation] = useState<string | null>(null)
  const [newHighlight, setNewHighlight] = useState('')
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(true)

  // Cargar datos desde Supabase
  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      const [stagesData, locationsData, philosophyData] = await Promise.all([
        getJourneyStages(),
        getJourneyLocations(),
        getJourneyPhilosophy()
      ])

      if (stagesData.length > 0) {
        setLifeStages(stagesData.map(s => ({
          id: s.id,
          icon: s.emoji,
          title: s.title,
          description: s.description
        })))
      }

      if (locationsData.length > 0) {
        setLocations(locationsData.map(l => ({
          id: l.id,
          flag: l.flag,
          country: l.country,
          subtitle: l.subtitle,
          city: l.city,
          description: l.description,
          highlights: l.highlights
        })))
      }

      if (philosophyData) {
        setPhilosophy({
          title: philosophyData.title,
          mainQuote: philosophyData.quote,
          verses: philosophyData.verses,
          closing: philosophyData.closing,
          finalThought: philosophyData.final_thought
        })
      }
      setLoading(false)
    }
    loadData()
  }, [])

  const saveAll = async () => {
    const stagesData = lifeStages.map((stage, index) => ({
      emoji: stage.icon,
      title: stage.title,
      description: stage.description,
      order_index: index
    }))

    const locationsData = locations.map((loc, index) => ({
      country: loc.country,
      flag: loc.flag,
      subtitle: loc.subtitle,
      city: loc.city || '',
      description: loc.description,
      highlights: loc.highlights,
      order_index: index
    }))

    const philosophyData = {
      title: philosophy.title,
      quote: philosophy.mainQuote,
      verses: philosophy.verses,
      closing: philosophy.closing,
      final_thought: philosophy.finalThought
    }

    const [stagesSuccess, locationsSuccess, philosophySuccess] = await Promise.all([
      upsertJourneyStages(stagesData),
      upsertJourneyLocations(locationsData),
      upsertJourneyPhilosophy(philosophyData)
    ])

    if (stagesSuccess && locationsSuccess && philosophySuccess) {
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } else {
      alert('Error al guardar algunos datos')
    }
  }

  const exportJSON = () => {
    const data = { lifeStages, locations, philosophy }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'journey-data.json'
    a.click()
  }

  const updateStage = (id: string, field: keyof LifeStage, value: string) => {
    setLifeStages(prev => prev.map(stage => 
      stage.id === id ? { ...stage, [field]: value } : stage
    ))
  }

  const deleteStage = (id: string) => {
    if (confirm('¿Eliminar esta etapa?')) {
      setLifeStages(prev => prev.filter(stage => stage.id !== id))
    }
  }

  const addStage = () => {
    const newStage: LifeStage = {
      id: Date.now().toString(),
      icon: '✨',
      title: 'Nueva Etapa',
      description: 'Descripción de la etapa...'
    }
    setLifeStages(prev => [...prev, newStage])
    setEditingStage(newStage.id)
  }

  const updateLocation = (id: string, field: keyof Location, value: string | string[]) => {
    setLocations(prev => prev.map(loc => 
      loc.id === id ? { ...loc, [field]: value } : loc
    ))
  }

  const deleteLocation = (id: string) => {
    if (confirm('¿Eliminar esta ubicación?')) {
      setLocations(prev => prev.filter(loc => loc.id !== id))
    }
  }

  const addLocation = () => {
    const newLocation: Location = {
      id: Date.now().toString(),
      flag: '🌍',
      country: 'Nuevo País',
      subtitle: 'Subtítulo',
      description: 'Descripción del lugar...',
      highlights: []
    }
    setLocations(prev => [...prev, newLocation])
    setEditingLocation(newLocation.id)
  }

  const addHighlight = (locationId: string) => {
    if (!newHighlight.trim()) return
    updateLocation(locationId, 'highlights', [
      ...locations.find(l => l.id === locationId)!.highlights,
      newHighlight
    ])
    setNewHighlight('')
  }

  const removeHighlight = (locationId: string, index: number) => {
    const location = locations.find(l => l.id === locationId)!
    updateLocation(locationId, 'highlights', location.highlights.filter((_, i) => i !== index))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Cargando journey data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Gestión de Ruta de Vida
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Administra tus etapas de vida, ubicaciones geográficas y filosofía personal
          </p>
        </div>

        {/* Success Message */}
        {saved && (
          <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-200 rounded-lg flex items-center">
            <span className="text-2xl mr-3">✅</span>
            <div>
              <strong>¡Datos guardados exitosamente!</strong>
              <p className="text-sm mt-1">Los cambios se verán reflejados en la página "Sobre Mí".</p>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 mb-8">
          <button
            onClick={saveAll}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              saved 
                ? 'bg-green-600 hover:bg-green-700' 
                : 'bg-primary-600 hover:bg-primary-700'
            } text-white`}
          >
            <Save className="w-5 h-5" />
            {saved ? '✅ Guardado' : 'Guardar Todo'}
          </button>
          <button
            onClick={exportJSON}
            className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            <Download className="w-5 h-5" />
            Exportar JSON
          </button>
        </div>

        {/* Life Stages Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Etapas de Vida
            </h2>
            <button
              onClick={addStage}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              <Plus className="w-5 h-5" />
              Añadir Etapa
            </button>
          </div>

          <div className="space-y-4">
            {lifeStages.map((stage) => (
              <div
                key={stage.id}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      value={stage.icon}
                      onChange={(e) => updateStage(stage.id, 'icon', e.target.value)}
                      className="w-16 text-3xl text-center border border-gray-300 dark:border-gray-600 rounded px-2 py-1 dark:bg-gray-700"
                      maxLength={2}
                    />
                  </div>
                  <button
                    onClick={() => deleteStage(stage.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                <input
                  type="text"
                  value={stage.title}
                  onChange={(e) => updateStage(stage.id, 'title', e.target.value)}
                  className="w-full text-xl font-semibold mb-3 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 dark:text-white"
                  placeholder="Título de la etapa"
                />

                <textarea
                  value={stage.description}
                  onChange={(e) => updateStage(stage.id, 'description', e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 dark:text-white"
                  placeholder="Descripción de la etapa..."
                />
              </div>
            ))}
          </div>
        </section>

        {/* Locations Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Ubicaciones Geográficas
            </h2>
            <button
              onClick={addLocation}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              <Plus className="w-5 h-5" />
              Añadir Ubicación
            </button>
          </div>

          <div className="space-y-6">
            {locations.map((location) => (
              <div
                key={location.id}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      value={location.flag}
                      onChange={(e) => updateLocation(location.id, 'flag', e.target.value)}
                      className="w-16 text-3xl text-center border border-gray-300 dark:border-gray-600 rounded px-2 py-1 dark:bg-gray-700"
                      maxLength={2}
                    />
                  </div>
                  <button
                    onClick={() => deleteLocation(location.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    value={location.country}
                    onChange={(e) => updateLocation(location.id, 'country', e.target.value)}
                    className="text-xl font-bold px-3 py-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 dark:text-white"
                    placeholder="País"
                  />
                  <input
                    type="text"
                    value={location.subtitle}
                    onChange={(e) => updateLocation(location.id, 'subtitle', e.target.value)}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 dark:text-white"
                    placeholder="Subtítulo"
                  />
                </div>

                <input
                  type="text"
                  value={location.city || ''}
                  onChange={(e) => updateLocation(location.id, 'city', e.target.value)}
                  className="w-full mb-4 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 dark:text-white"
                  placeholder="Ciudad (opcional)"
                />

                <textarea
                  value={location.description}
                  onChange={(e) => updateLocation(location.id, 'description', e.target.value)}
                  rows={3}
                  className="w-full mb-4 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 dark:text-white"
                  placeholder="Descripción..."
                />

                {/* Highlights */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Highlights
                  </label>
                  <div className="space-y-2 mb-3">
                    {location.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <span className="text-gray-700 dark:text-gray-300 flex-1">{highlight}</span>
                        <button
                          onClick={() => removeHighlight(location.id, index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={editingLocation === location.id ? newHighlight : ''}
                      onChange={(e) => setNewHighlight(e.target.value)}
                      onFocus={() => setEditingLocation(location.id)}
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 dark:text-white"
                      placeholder="Nuevo highlight..."
                    />
                    <button
                      onClick={() => addHighlight(location.id)}
                      className="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Filosofía Personal
          </h2>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Título
              </label>
              <input
                type="text"
                value={philosophy.title}
                onChange={(e) => setPhilosophy({ ...philosophy, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Cita Principal
              </label>
              <input
                type="text"
                value={philosophy.mainQuote}
                onChange={(e) => setPhilosophy({ ...philosophy, mainQuote: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Versos (uno por línea)
              </label>
              <textarea
                value={philosophy.verses.join('\n')}
                onChange={(e) => setPhilosophy({ ...philosophy, verses: e.target.value.split('\n') })}
                rows={5}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Cierre
              </label>
              <input
                type="text"
                value={philosophy.closing}
                onChange={(e) => setPhilosophy({ ...philosophy, closing: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Pensamiento Final
              </label>
              <input
                type="text"
                value={philosophy.finalThought}
                onChange={(e) => setPhilosophy({ ...philosophy, finalThought: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
        </section>

        {/* Save Button Footer */}
        <div className="flex justify-center">
          <button
            onClick={saveAll}
            className={`px-8 py-3 rounded-lg font-semibold transition-colors ${
              saved 
                ? 'bg-green-600 hover:bg-green-700' 
                : 'bg-primary-600 hover:bg-primary-700'
            } text-white`}
          >
            {saved ? '✅ Guardado Exitosamente' : '💾 Guardar Todos los Cambios'}
          </button>
        </div>
      </div>
    </div>
  )
}
