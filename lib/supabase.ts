import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// ========== TYPES ==========
export type Settings = {
  id: string
  name: string
  title: string
  email: string
  phone?: string
  location?: string
  bio?: string
  github?: string
  linkedin?: string
  twitter?: string
  roadmap_progress: number
  created_at: string
  updated_at: string
}

export type Skill = {
  id: string
  name: string
  category: string
  level: string
  description?: string
  icon?: string
  created_at: string
  updated_at: string
}

export type Project = {
  id: string
  title: string
  description: string
  long_description?: string
  image?: string
  tags: string[]
  github_url?: string
  demo_url?: string
  featured: boolean
  technologies: string[]
  impact_metrics?: Record<string, any>
  status: string
  created_at: string
  updated_at: string
}

export type Post = {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  tags: string[]
  published: boolean
  featured: boolean
  featured_image?: string
  reading_time?: number
  views: number
  week_number?: number
  technologies?: string[]
  created_at: string
  updated_at: string
  published_at?: string
}

export type JourneyStage = {
  id: string
  emoji: string
  title: string
  description: string
  order_index: number
  created_at: string
  updated_at: string
}

export type JourneyLocation = {
  id: string
  country: string
  flag: string
  subtitle: string
  city?: string
  description: string
  highlights: string[]
  order_index: number
  created_at: string
  updated_at: string
}

export type JourneyPhilosophy = {
  id: string
  title: string
  quote: string
  verses: string[]
  closing: string
  final_thought: string
  created_at: string
  updated_at: string
}
