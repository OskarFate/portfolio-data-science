import { NextResponse } from 'next/server'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

export async function POST(request: Request) {
  try {
    const { message = 'Auto-update: Cambios desde admin panel' } = await request.json()

    // Verificar si hay cambios
    const { stdout: statusOutput } = await execAsync('git status --porcelain')
    
    if (!statusOutput.trim()) {
      return NextResponse.json({ 
        success: true, 
        message: 'No hay cambios para subir' 
      })
    }

    // Hacer commit y push
    await execAsync('git add .')
    await execAsync(`git commit -m "${message}"`)
    await execAsync('git push')

    return NextResponse.json({ 
      success: true, 
      message: 'Cambios subidos a GitHub exitosamente',
      changes: statusOutput
    })
  } catch (error: any) {
    console.error('Error en auto-deploy:', error)
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 })
  }
}
