import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { ThemeProvider } from '@/components/ThemeProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Oskar Pardo - Data Scientist & Business Analyst',
  description: 'Roadmap de 104 semanas hacia Data Science. Documentando mi viaje desde Python básico hasta Machine Learning y Cloud Engineering. Sin motivación externa, solo disciplina silenciosa.',
  keywords: ['Oskar Pardo', 'Data Science', 'Business Analytics', 'Python', 'SQL', 'Power BI', 'Machine Learning', 'Portfolio'],
  authors: [{ name: 'Oskar Pardo Salazar' }],
  openGraph: {
    title: 'Oskar Pardo - Data Scientist & Business Analyst',
    description: 'Roadmap de 104 semanas hacia Data Science. Disciplina silenciosa y trabajo profundo.',
    type: 'website',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            {children}
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
