import { NextResponse } from 'next/response'
import { cookies } from 'next/headers'

// Contraseña desde variable de entorno (configúrala en .env.local y en Vercel)
// NUNCA expongas la contraseña real en el código que se sube a GitHub
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'default_change_me'

export async function POST(request: Request) {
  try {
    const { password } = await request.json()

    if (password === ADMIN_PASSWORD) {
      // Crear cookie de sesión que dura 30 días
      const cookieStore = await cookies()
      cookieStore.set('admin_auth', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 30 // 30 días
      })

      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ success: false, error: 'Invalid password' }, { status: 401 })
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 })
  }
}
