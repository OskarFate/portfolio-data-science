import { ExternalLink, Github } from 'lucide-react'
import Link from 'next/link'

export default function Projects() {
  const projects = [
    {
      title: 'Proyecto #1: Análisis Exploratorio',
      description: 'Primer proyecto completo de EDA con Python. Limpieza de datos, visualizaciones y hallazgos clave para un caso de negocio real.',
      stack: ['Python', 'Pandas', 'Matplotlib', 'Seaborn'],
      status: 'En progreso',
      impact: 'Identificación de patrones y outliers en dataset de ventas',
      github: '#',
      demo: '#'
    },
    {
      title: 'Dashboard Ejecutivo - Power BI',
      description: 'Dashboard interactivo para seguimiento de KPIs de negocio con filtros dinámicos y drill-down capabilities.',
      stack: ['Power BI', 'DAX', 'SQL Server'],
      status: 'Planeado',
      impact: 'Visualización de métricas clave para toma de decisiones',
      github: '#',
      demo: '#'
    },
    {
      title: 'Modelo Predictivo - Customer Churn',
      description: 'Modelo de ML para predecir abandono de clientes usando algoritmos de clasificación supervisada.',
      stack: ['Python', 'Scikit-learn', 'XGBoost', 'SQL'],
      status: 'Planeado',
      impact: 'Predicción temprana para retención de clientes',
      github: '#',
      demo: '#'
    },
    {
      title: 'Pipeline ETL con dbt',
      description: 'Pipeline automatizado de transformación de datos usando dbt y Airflow para analytics layer.',
      stack: ['dbt', 'Airflow', 'BigQuery', 'Python'],
      status: 'Planeado',
      impact: 'Automatización de procesos analíticos',
      github: '#',
      demo: '#'
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completado':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'En progreso':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'Planeado':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section con gradiente */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Proyectos
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Casos de negocio end-to-end. Cada proyecto incluye el problema a resolver, 
              el stack tecnológico utilizado, y los resultados/impacto generado.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {project.title}
                </h3>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                  {project.status}
                </span>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {project.description}
              </p>

              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  Stack Tecnológico:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded-md text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-900 rounded-md">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                  Impacto de Negocio:
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {project.impact}
                </p>
              </div>

              <div className="flex gap-4">
                <a
                  href={project.github}
                  className="flex items-center text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  <Github className="w-5 h-5 mr-2" />
                  Código
                </a>
                <a
                  href={project.demo}
                  className="flex items-center text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  <ExternalLink className="w-5 h-5 mr-2" />
                  Demo
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center bg-gray-50 dark:bg-gray-900 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            Más Proyectos en Camino
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Sigo trabajando en nuevos proyectos cada semana. Consulta mi blog para ver 
            el progreso en tiempo real y los aprendizajes del proceso.
          </p>
          <Link
            href="/blog"
            className="inline-block px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
          >
            Ver Blog
          </Link>
        </div>
      </div>
    </div>
  )
}
