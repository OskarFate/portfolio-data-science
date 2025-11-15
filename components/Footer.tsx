'use client'

import Link from 'next/link'
import { Github, Linkedin, Mail } from 'lucide-react'
import { useEffect, useState } from 'react'
import { getSettings } from '@/lib/supabase-helpers'

export default function Footer() {
  const [contactInfo, setContactInfo] = useState({
    email: 'contacto@oskarpardo.dev',
    github: 'https://github.com/OskarFate',
    linkedin: 'https://www.linkedin.com/in/oskarpardo/',
    name: 'Oskar Pardo Salazar'
  })

  useEffect(() => {
    const loadSettings = async () => {
      const data = await getSettings()
      if (data) {
        setContactInfo({
          email: data.email || 'contacto@oskarpardo.dev',
          github: data.github || 'https://github.com/OskarFate',
          linkedin: data.linkedin || 'https://www.linkedin.com/in/oskarpardo/',
          name: data.name || 'Oskar Pardo Salazar'
        })
      }
    }
    loadSettings()
  }, [])

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* About Section */}
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              {contactInfo.name}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 max-w-md">
              Portfolio profesional de Data Science y Business Analytics. 
              Proyectos reales, stack tecnológico y experiencia práctica.
            </p>
            <div className="flex items-center gap-2 text-sm">
              <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full font-semibold">
                📍 Concepción, Chile
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 uppercase tracking-wider">
              Enlaces
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/projects" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Proyectos
                </Link>
              </li>
              <li>
                <Link href="/skills" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Stack Tecnológico
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/journey" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Plan de Vida
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-600 dark:text-gray-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} <span className="font-semibold">{contactInfo.name}</span> • Construido con Next.js
          </div>
          
          <div className="flex space-x-6">
            <a
              href={contactInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              aria-label="GitHub - Oskar Pardo"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href={contactInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              aria-label="LinkedIn - Oskar Pardo"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href={`mailto:${contactInfo.email}`}
              className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              aria-label="Email - Oskar Pardo"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
