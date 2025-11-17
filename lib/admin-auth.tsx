'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    // No proteger la página de login
    if (pathname === '/admin/login') {
      setLoading(false)
      return
    }

    // Verificar autenticación para todas las rutas /admin/*
    if (pathname?.startsWith('/admin')) {
      checkAuth()
    } else {
      setLoading(false)
    }
  }, [pathname])

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/admin/verify')
      const data = await response.json()

      if (data.authenticated) {
        setAuthenticated(true)
        setLoading(false)
      } else {
        router.push('/admin/login')
      }
    } catch (error) {
      router.push('/admin/login')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Verificando autenticación...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
