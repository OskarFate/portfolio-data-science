// Hook para auto-deploy después de cambios en Supabase

export async function autoDeployAfterChange(action: string, entity: string) {
  try {
    // 1. Exportar datos
    const exportRes = await fetch('/api/export-data', {
      method: 'POST'
    })
    
    if (!exportRes.ok) {
      console.error('Error exportando datos')
      return false
    }

    // 2. Hacer commit y push
    const deployRes = await fetch('/api/auto-deploy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: `Auto-update: ${action} ${entity} - ${new Date().toLocaleDateString()}`
      })
    })

    const result = await deployRes.json()
    
    if (result.success) {
      console.log('✅ Auto-deploy exitoso:', result.message)
      return true
    } else {
      console.error('❌ Error en auto-deploy:', result.error)
      return false
    }
  } catch (error) {
    console.error('Error en auto-deploy:', error)
    return false
  }
}

// Helper para mostrar notificación
export function showDeployNotification(success: boolean, message?: string) {
  if (typeof window !== 'undefined') {
    const notification = document.createElement('div')
    notification.className = `fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg text-white z-50 ${
      success ? 'bg-green-600' : 'bg-red-600'
    }`
    notification.textContent = message || (success ? '✅ Cambios subidos a GitHub' : '❌ Error al subir cambios')
    
    document.body.appendChild(notification)
    
    setTimeout(() => {
      notification.remove()
    }, 3000)
  }
}
