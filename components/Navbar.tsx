'use client'

import Link from 'next/link'
import { Home, User, Briefcase, Code, BookOpen, Mail, Menu, X } from 'lucide-react'
import ThemeToggle from './ThemeToggle'

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <span className="text-2xl">⚡</span>
            <span>Oskar Pardo</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium">
              Inicio
            </Link>
            <Link href="/projects" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium">
              Proyectos
            </Link>
            <Link href="/skills" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium">
              Stack
            </Link>
            <Link href="/blog" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors text-sm">
              Blog
            </Link>
            <Link href="/contact" className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors font-semibold">
              Contacto
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  )
}
