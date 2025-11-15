---
title: "Trimestre 1: Fundamentos de Análisis de Datos"
date: "2025-01-20"
excerpt: "Resumen de las primeras 13 semanas del roadmap. Excel avanzado, SQL básico, Python para datos, estadística descriptiva y storytelling con datos."
category: "EDA"
readTime: "8 min"
---

# Trimestre 1: Fundamentos de Análisis de Datos

Han pasado las primeras 13 semanas del roadmap y quiero compartir los logros, desafíos y aprendizajes clave de este primer trimestre.

## 🎯 Objetivo del Trimestre

Dominar las bases técnicas del análisis de datos:
- Hojas de cálculo avanzadas
- Consultas SQL
- Fundamentos estadísticos
- Python para datos
- Comunicación visual

## 📊 Lo que Aprendí

### 1. Excel Avanzado

Superé mis expectativas con Excel. Ahora puedo:

- Crear **tablas dinámicas** complejas con múltiples niveles
- Usar **XLOOKUP** y **Power Query** para integrar fuentes
- Automatizar procesos con **macros básicas**
- Conectar Excel directamente a bases SQL

**Proyecto destacado:** Dashboard de ventas interactivo con segmentadores y formato condicional avanzado.

### 2. SQL Básico

SQL se convirtió en mi herramienta favorita:

\`\`\`sql
-- Ejemplo: Análisis de retención por cohorte
WITH first_purchase AS (
  SELECT 
    user_id,
    DATE_TRUNC('month', MIN(purchase_date)) AS cohort_month
  FROM purchases
  GROUP BY user_id
)
SELECT 
  cohort_month,
  COUNT(DISTINCT user_id) AS cohort_size,
  COUNT(DISTINCT CASE 
    WHEN EXTRACT(MONTH FROM AGE(purchase_date, cohort_month)) = 1 
    THEN user_id 
  END) AS month_1_retention
FROM purchases p
JOIN first_purchase fp ON p.user_id = fp.user_id
GROUP BY cohort_month
ORDER BY cohort_month;
\`\`\`

Aprendí:
- JOINs complejos y CTEs
- Window functions básicas
- Optimización con `EXPLAIN`

### 3. Python para Datos

Pandas cambió mi forma de trabajar:

\`\`\`python
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# EDA automatizado
def quick_eda(df):
    """Genera resumen rápido de un dataset"""
    print("=" * 50)
    print("RESUMEN DEL DATASET")
    print("=" * 50)
    print(f"\\nShape: {df.shape}")
    print(f"\\nNulos por columna:\\n{df.isnull().sum()}")
    print(f"\\nTipos de datos:\\n{df.dtypes}")
    print(f"\\nEstadísticas:\\n{df.describe()}")
    
    # Visualizar distribuciones numéricas
    numeric_cols = df.select_dtypes(include=['float64', 'int64']).columns
    df[numeric_cols].hist(figsize=(12, 8), bins=30)
    plt.tight_layout()
    plt.savefig('./outputs/distributions.png', dpi=300, bbox_inches='tight')
    plt.close()
    
quick_eda(df_ventas)
\`\`\`

### 4. Estadística Descriptiva

Conceptos clave dominados:
- Medidas de tendencia central y dispersión
- Distribución normal y asimetría
- Correlación y covarianza
- Detección de outliers con Z-score

### 5. Storytelling con Datos

Lo más valioso: **los datos no hablan solos**.

Aprendí a:
- Elegir el gráfico correcto para cada mensaje
- Crear narrativas con estructura (inicio-desarrollo-cierre)
- Diseñar dashboards ejecutivos con jerarquía visual
- Presentar insights en 5 diapositivas o menos

## 🚀 Proyecto Final: Dashboard Ejecutivo

**Caso:** Análisis de ventas de e-commerce

**Stack:** Excel + SQL + Python + Power BI

**Hallazgos clave:**
- ✅ El 20% de productos generan el 80% de ingresos
- ✅ Tasa de retención baja en el mes 2 (acción: campaña de reactivación)
- ✅ Margen mayor en categoría "Premium" (recomendar expansión)

[Ver proyecto en GitHub →](#)

## 💡 Reflexiones

**Lo bueno:**
- La estructura del roadmap funciona
- Documentar todo ayuda a consolidar
- Cada semana es un paso concreto hacia la meta

**Lo difícil:**
- Combinar 5 materias a la vez requiere disciplina
- A veces sentí que avanzaba lento (pero es normal)

**Lo siguiente:**
- Trimestre 2: SQL avanzado, limpieza de datos, R y Git

## 📚 Recursos que Usé

- **Python for Data Analysis** (Wes McKinney)
- **SQL for Data Analysis** (Cathy Tanimura)
- **Storytelling with Data** (Cole Nussbaumer Knaflic)
- [Mode SQL Tutorial](https://mode.com/sql-tutorial/)
- [Real Python](https://realpython.com/)

---

**Próximo post:** Semana 14 - Transición a SQL avanzado y modelado analítico.

¿Estás siguiendo un roadmap similar? Comparte tu experiencia en los [comentarios](/contact).
