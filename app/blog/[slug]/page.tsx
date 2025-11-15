import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Link from 'next/link'
import { Calendar, Clock, ArrowLeft } from 'lucide-react'

async function getPost(slug: string) {
  const postsDirectory = path.join(process.cwd(), 'content/blog')
  const fullPath = path.join(postsDirectory, `${slug}.md`)
  
  if (!fs.existsSync(fullPath)) {
    return null
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  return {
    slug,
    title: data.title || 'Sin título',
    date: data.date || new Date().toISOString(),
    excerpt: data.excerpt || '',
    category: data.category || 'General',
    readTime: data.readTime || '5 min',
    content,
  }
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)

  if (!post) {
    return (
      <div className="min-h-screen px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Post no encontrado
          </h1>
          <Link href="/blog" className="text-primary-600 dark:text-primary-400 hover:underline">
            Volver al blog
          </Link>
        </div>
      </div>
    )
  }

  return (
    <article className="min-h-screen px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          href="/blog"
          className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver al blog
        </Link>

        {/* Header */}
        <header className="mb-8">
          <div className="mb-4">
            <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded-md text-sm">
              {post.category}
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {post.title}
          </h1>

          <div className="flex items-center gap-6 text-gray-600 dark:text-gray-400">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              {new Date(post.date).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              {post.readTime}
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <MDXRemote source={post.content} />
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <Link
            href="/blog"
            className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:underline"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Ver todos los posts
          </Link>
        </footer>
      </div>
    </article>
  )
}
