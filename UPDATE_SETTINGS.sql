-- Actualizar configuración personal con textos correctos
-- Ejecuta este SQL en tu Supabase SQL Editor

UPDATE settings SET
  name = 'Oskar Pardo Salazar',
  title = 'Data Science & Analytics',
  bio = 'Construyendo soluciones con datos. Enfocado en Python, SQL y visualización.',
  email = 'contacto@oskarpardo.dev',
  phone = '',
  location = 'Concepción, Chile',
  github = 'https://github.com/OskarFate',
  linkedin = 'https://www.linkedin.com/in/oskarpardo/',
  twitter = '',
  updated_at = NOW()
WHERE id = (SELECT id FROM settings LIMIT 1);

-- Verificar que se actualizó correctamente
SELECT name, title, bio, email, phone FROM settings;
