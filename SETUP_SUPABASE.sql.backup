-- ========================================
-- DESACTIVAR ROW LEVEL SECURITY (RLS)
-- ========================================
-- Ejecuta estos comandos en el SQL Editor de Supabase
-- https://supabase.com/dashboard/project/bajkdvhooousgtahuslp/sql

-- Desactivar RLS en todas las tablas
ALTER TABLE settings DISABLE ROW LEVEL SECURITY;
ALTER TABLE skills DISABLE ROW LEVEL SECURITY;
ALTER TABLE projects DISABLE ROW LEVEL SECURITY;
ALTER TABLE posts DISABLE ROW LEVEL SECURITY;
ALTER TABLE journey_stages DISABLE ROW LEVEL SECURITY;
ALTER TABLE journey_locations DISABLE ROW LEVEL SECURITY;
ALTER TABLE journey_philosophy DISABLE ROW LEVEL SECURITY;

-- ========================================
-- ACTUALIZAR ESTRUCTURA DE POSTS
-- ========================================
-- Agregar columnas necesarias para el blog del roadmap

DO $$ 
BEGIN
    -- Agregar column featured si no existe
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='posts' AND column_name='featured') THEN
        ALTER TABLE posts ADD COLUMN featured BOOLEAN DEFAULT false;
    END IF;
    
    -- Agregar column week_number si no existe
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='posts' AND column_name='week_number') THEN
        ALTER TABLE posts ADD COLUMN week_number INTEGER;
    END IF;
    
    -- Agregar column technologies si no existe
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='posts' AND column_name='technologies') THEN
        ALTER TABLE posts ADD COLUMN technologies TEXT[];
    END IF;
END $$;

-- ========================================
-- INSERTAR DATOS DIRECTAMENTE
-- ========================================

-- 1. LIMPIAR DATOS EXISTENTES
DELETE FROM skills;
DELETE FROM journey_stages;
DELETE FROM journey_locations;
DELETE FROM journey_philosophy;
DELETE FROM posts;

-- 2. INSERTAR 18 SKILLS (Stack completo del roadmap de 104 semanas)
INSERT INTO skills (name, category, level, description) VALUES
-- Lenguajes de Programación (3)
('Python', 'Lenguajes de Programación', 'Intermedio', 'pandas, numpy, matplotlib, seaborn, scikit-learn'),
('SQL', 'Lenguajes de Programación', 'Intermedio', 'Consultas analíticas, JOINs, CTEs, Window functions, optimización'),
('R', 'Lenguajes de Programación', 'Básico', 'ggplot2, dplyr, tidyr, análisis estadístico'),

-- Análisis & Visualización (3)
('Power BI', 'Análisis & Visualización', 'Intermedio', 'Dashboards interactivos, DAX, modelado de datos, Power Query'),
('Tableau', 'Análisis & Visualización', 'Básico', 'Visualizaciones y storytelling con datos'),
('Excel', 'Análisis & Visualización', 'Avanzado', 'Tablas dinámicas, Power Query, VBA, análisis avanzado'),

-- Ingeniería de Datos (3)
('dbt', 'Ingeniería de Datos', 'Básico', 'Transformación de datos, modelado dimensional, tests'),
('Apache Airflow', 'Ingeniería de Datos', 'Básico', 'Orquestación de pipelines, DAGs, scheduling'),
('Apache Spark', 'Ingeniería de Datos', 'Básico', 'Procesamiento distribuido, PySpark, big data'),

-- Cloud & Infraestructura (3)
('Google Cloud Platform', 'Cloud & Infraestructura', 'Básico', 'BigQuery, Cloud Storage, Vertex AI, Composer'),
('Docker', 'Cloud & Infraestructura', 'Básico', 'Contenedores, Dockerfile, docker-compose, deployment'),
('Git & GitHub', 'Cloud & Infraestructura', 'Intermedio', 'Control de versiones, colaboración, CI/CD, GitHub Actions'),

-- Machine Learning & IA (3)
('Scikit-learn', 'Machine Learning & IA', 'Básico', 'Algoritmos supervisados, no supervisados, feature engineering'),
('LangChain', 'Machine Learning & IA', 'Básico', 'RAG, agentes inteligentes, LLMs, embeddings'),
('TensorFlow/PyTorch', 'Machine Learning & IA', 'Básico', 'Deep Learning, redes neuronales, computer vision'),

-- Business & Estrategia (3)
('Análisis de KPIs', 'Business & Estrategia', 'Intermedio', 'Definición de métricas, dashboards ejecutivos, OKRs'),
('Data Storytelling', 'Business & Estrategia', 'Intermedio', 'Comunicación de insights, presentaciones ejecutivas'),
('A/B Testing', 'Business & Estrategia', 'Básico', 'Experimentación, análisis estadístico, hipótesis de negocio');

-- 3. INSERTAR 5 ETAPAS DE VIDA
INSERT INTO journey_stages (emoji, title, description, order_index) VALUES
('📚', 'Etapa 1 — Formación y Fundamentos', 'Construyendo bases sólidas en Python, SQL, Power BI y análisis de datos. Esta etapa se enfoca en dominar los fundamentos técnicos a través de cursos, proyectos prácticos y documentación constante. El objetivo es crear un portfolio robusto que demuestre capacidad técnica real, no solo certificados. Cada proyecto se documenta en GitHub y se comparte en LinkedIn para construir presencia profesional desde el inicio.', 0),
('�', 'Etapa 2 — Primeros Proyectos Reales', 'Aplicación práctica de habilidades en proyectos reales de análisis de negocio. Dashboards ejecutivos con Power BI, análisis exploratorio de datos con Python, y primeros modelos predictivos con machine learning. Esta etapa marca la transición de estudiante a profesional: cada proyecto resuelve problemas reales, genera valor medible y se presenta con storytelling efectivo. El portafolio evoluciona de ejercicios académicos a casos de negocio documentados.', 1),
('🚀', 'Etapa 3 — Expansión Global', 'Desarrollo de habilidades avanzadas: Machine Learning en producción, Cloud Engineering con GCP/AWS, automatización de pipelines con Airflow y dbt. Esta etapa implica dominar el stack completo de un Data Scientist senior: desde la ingesta de datos hasta el deployment de modelos. Se busca trabajar en proyectos internacionales, colaborar con equipos distribuidos y construir soluciones escalables que impacten a miles de usuarios.', 2),
('�', 'Etapa 4 — Trabajo Remoto Internacional', 'Libertad geográfica total mientras se trabaja para empresas globales. Esta etapa combina expertise técnico con autonomía profesional: elegir proyectos de alto impacto, trabajar con tecnologías de punta y mantener balance entre carrera y calidad de vida. El objetivo es posicionarse como especialista confiable en el mercado internacional, capaz de entregar valor desde cualquier ubicación del mundo.', 3),
('⭐', 'Etapa 5 — Autonomía Profesional', 'Trabajar por elección estratégica, no por necesidad económica. Esta etapa representa la consolidación de años de experiencia: seleccionar proyectos que generen impacto real, colaborar con equipos de élite y tener la flexibilidad de explorar nuevas tecnologías. El enfoque está en proyectos de alto impacto que resuelvan problemas complejos, mentoría a otros profesionales y contribución a la comunidad técnica global.', 4);

-- 4. INSERTAR 4 UBICACIONES
INSERT INTO journey_locations (country, flag, subtitle, city, description, highlights, order_index) VALUES
('Chile', '🇨🇱', 'El Punto de Partida', 'Concepción', 'Base de operaciones. Desarrollo de carrera, proyectos y networking local.', ARRAY['Portfolio robusto', 'Inglés avanzado', 'Experiencia práctica', 'Capital inicial'], 0),
('Australia', '🇦🇺', 'Estabilidad y Crecimiento', 'Melbourne', 'Economía sólida, meritocracia, calidad de vida. Hub tech en crecimiento.', ARRAY['Visa de trabajo calificado', 'Salarios competitivos', 'Networking internacional', 'Path a residencia'], 1),
('Singapur', '🇸🇬', 'Hub Tecnológico Global', 'Central District', 'Centro financiero y tecnológico de Asia. Eficiencia, orden y oportunidades.', ARRAY['Impuestos bajos', 'Conexión Asia-Pacífico', 'Calidad de vida premium', 'Comunidad tech'], 2),
('Europa', '🇪🇺', 'Exploración Temporal', 'Berlín / Ámsterdam / Lisboa', 'Temporadas de trabajo remoto, networking europeo y experiencias culturales.', ARRAY['Escena tech vibrante', 'Visa de nómada digital', 'Arte y cultura', 'Conexiones globales'], 3);

-- 5. INSERTAR FILOSOFÍA
INSERT INTO journey_philosophy (title, quote, verses, closing, final_thought) VALUES
('🕊️ Filosofía de Ruta', 
 'No busco la vida fácil. Busco la vida correcta.',
 ARRAY['Chile me dio las bases.', 'Australia me dará estabilidad.', 'Singapur será mi hub global.', 'Europa me dará experiencias.'],
 'Cada ubicación es una decisión estratégica.',
 'Mi ruta sigue mi visión, no las expectativas de otros.');

-- 6. INSERTAR POSTS DE EJEMPLO (Semanas del Roadmap)
-- Estos posts documentan el progreso semanal del roadmap de 104 semanas

-- Semana 1: Fundamentos Python
INSERT INTO posts (title, slug, excerpt, content, published, featured, week_number, technologies, reading_time) VALUES
(
  '📊 Semana 1: Fundamentos de Python para Data Science',
  'semana-1-fundamentos-python',
  'Primera semana del roadmap de 104 semanas. Aprendí los fundamentos de Python: variables, tipos de datos, estructuras de control y funciones básicas.',
  E'# 📊 Semana 1: Fundamentos de Python para Data Science\n\n## 🎯 Objetivo de la Semana\nEstablecer las bases sólidas en Python, el lenguaje principal para ciencia de datos.\n\n## 📚 Lo que Aprendí\n\n### 1. Variables y Tipos de Datos\n```python\n# Tipos básicos\nnombre = "Data Scientist"\nedad = 25\naltura = 1.75\nes_estudiante = True\n```\n\n### 2. Estructuras de Control\n- Condicionales (if/elif/else)\n- Loops (for, while)\n- List comprehensions\n\n### 3. Funciones\n```python\ndef calcular_promedio(numeros):\n    return sum(numeros) / len(numeros)\n\nnotas = [85, 90, 78, 92]\npromedio = calcular_promedio(notas)\nprint(f"Promedio: {promedio}")\n```\n\n## 💡 Highlights\n- ✅ Completé 50 ejercicios en HackerRank\n- ✅ Entendí la diferencia entre listas y tuplas\n- ✅ Aprendí a usar f-strings para formateo\n\n## 🚧 Desafíos\n- Las list comprehensions fueron confusas al principio\n- Debugging tomó más tiempo del esperado\n\n## 🎯 Próxima Semana\n- Comenzar con NumPy y arrays\n- Aprender manipulación de datos básica\n- Crear mi primer mini-proyecto',
  true,
  true,
  1,
  ARRAY['Python', 'Fundamentos'],
  5
),
(
  '🔢 Semana 2: NumPy y Manipulación de Arrays',
  'semana-2-numpy-arrays',
  'Segunda semana enfocada en NumPy, la biblioteca fundamental para computación numérica en Python. Arrays, operaciones vectorizadas y álgebra lineal básica.',
  E'# 🔢 Semana 2: NumPy y Manipulación de Arrays\n\n## 🎯 Objetivo\nDominar NumPy para operaciones numéricas eficientes.\n\n## 📚 Contenido\n\n### Arrays en NumPy\n```python\nimport numpy as np\n\n# Crear arrays\narr = np.array([1, 2, 3, 4, 5])\nmatriz = np.array([[1, 2], [3, 4]])\n\n# Operaciones vectorizadas\narr * 2  # Más rápido que loops\n```\n\n### Indexing y Slicing\n```python\n# Slicing avanzado\narr[1:4]  # [2, 3, 4]\nmatriz[:, 1]  # Segunda columna\n```\n\n### Funciones Útiles\n- `np.mean()`, `np.std()`, `np.sum()`\n- `np.reshape()`, `np.transpose()`\n- Broadcasting de arrays\n\n## 💡 Key Learnings\n- ✅ NumPy es 100x más rápido que listas Python puras\n- ✅ Broadcasting evita loops explícitos\n- ✅ Arrays son la base de pandas y scikit-learn\n\n## 📊 Proyecto: Análisis de Ventas\nCreé un script que analiza datos de ventas usando NumPy:\n- Calculé promedios y desviaciones estándar\n- Identifiqué outliers usando percentiles\n- Visualicé resultados con matplotlib básico\n\n## 🎯 Próxima Semana\nComenzar con Pandas para análisis de datos tabulares',
  true,
  false,
  2,
  ARRAY['Python', 'NumPy', 'Data Analysis'],
  8
),
(
  '📊 Semana 3: Pandas - El Poder de los DataFrames',
  'semana-3-pandas-dataframes',
  'Tercera semana dedicada a Pandas, la biblioteca más importante para análisis de datos. DataFrames, limpieza de datos y operaciones de agregación.',
  E'# 📊 Semana 3: Pandas - El Poder de los DataFrames\n\n## 🎯 Objetivo\nAprender Pandas para manipulación y análisis de datos tabulares.\n\n## 📚 Fundamentos\n\n### Crear DataFrames\n```python\nimport pandas as pd\n\n# Desde diccionario\ndata = {\n    "nombre": ["Ana", "Luis", "María"],\n    "edad": [25, 30, 28],\n    "salario": [50000, 60000, 55000]\n}\ndf = pd.DataFrame(data)\n```\n\n### Operaciones Esenciales\n```python\n# Exploración\ndf.head()\ndf.info()\ndf.describe()\n\n# Filtrado\ndf[df["edad"] > 25]\n\n# Agregaciones\ndf.groupby("ciudad")["ventas"].mean()\n```\n\n### Limpieza de Datos\n- Manejo de valores nulos con `fillna()` y `dropna()`\n- Conversión de tipos con `astype()`\n- Eliminación de duplicados con `drop_duplicates()`\n\n## 💡 Highlights\n- ✅ Pandas hace SQL-like queries en Python\n- ✅ Method chaining hace código más legible\n- ✅ `groupby()` es increíblemente poderoso\n\n## 📊 Proyecto: Dashboard de Ventas\nAnalicé dataset de ventas de e-commerce:\n- Limpié 10,000 registros con datos faltantes\n- Calculé métricas por categoría y región\n- Identifiqué top 10 productos más vendidos\n- Exporté resultados a CSV y Excel\n\n## 🚧 Desafíos\n- Entender `apply()` vs `map()` vs `applymap()`\n- Memory management con datasets grandes\n\n## 🎯 Próxima Semana\nVisualización de datos con Matplotlib y Seaborn',
  true,
  true,
  3,
  ARRAY['Python', 'Pandas', 'Data Cleaning'],
  10
);

-- 7. ACTUALIZAR INFORMACIÓN PERSONAL
-- Portfolio de Oskar Pardo Salazar

UPDATE settings SET
  name = 'Oskar Pardo Salazar',
  title = 'Data Scientist & Business Analyst',
  email = 'contacto@oskarpardo.dev',
  phone = '+56921892848',
  location = 'Concepción, Chile',
  bio = E'Transformando datos en decisiones estratégicas.\n\nRoadmap de 104 semanas: Python, SQL, Machine Learning y Cloud Engineering.',
  github = 'https://github.com/OskarFate',
  linkedin = 'https://www.linkedin.com/in/oskarpardo/',
  twitter = '',
  roadmap_progress = 0
WHERE id = (SELECT id FROM settings LIMIT 1);

-- 8. VERIFICAR TODAS LAS TABLAS
SELECT 'SKILLS' as tabla, COUNT(*) as total FROM skills
UNION ALL
SELECT 'JOURNEY_STAGES', COUNT(*) FROM journey_stages
UNION ALL
SELECT 'JOURNEY_LOCATIONS', COUNT(*) FROM journey_locations
UNION ALL
SELECT 'JOURNEY_PHILOSOPHY', COUNT(*) FROM journey_philosophy
UNION ALL
SELECT 'POSTS', COUNT(*) FROM posts
UNION ALL
SELECT 'SETTINGS', COUNT(*) FROM settings
ORDER BY tabla;
