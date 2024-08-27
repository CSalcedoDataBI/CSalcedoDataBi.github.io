---

title: "Claves Huérfanas: El Error Silencioso que Sabotea tu Análisis de Datos (Parte 1)"
author: csalcedodatabi
date: 2024-08-28 23:34:00 +0800
categories: [Deneb, Template]
tags: [Deneb, Vega-Lite, Power BI]
pin: false
image: 
  path: /assets/img/claves-huerfanas/crear-notebook_7.gif
  alt: "Claves Huérfanas: El Error Silencioso que Sabotea tu Análisis de Datos"
description: ""

---
### Introducción

En esta entrada quiero compartir un problema muy común pero sutil que, a menudo, pasamos por alto. Es un problema que, cuando buscamos precisión en nuestros análisis, puede convertirse en una verdadera fuente de frustración y consumir mucho tiempo en la investigación de su causa. En la mayoría de los casos, este problema se manifiesta cuando los cálculos no coinciden con los valores reales.

Identificar la raíz del problema es fundamental, ya que una vez detectado, se pueden aplicar varias soluciones posibles.

### Integridad Referencial
Antes de profundizar en este tema, quiero que observes la siguiente imagen. Se trata de un modelo dimensional típico, tipo estrella, recomendado para realizar análisis en Power BI. Utilizando datos de ejemplo de Power BI, he creado dos tablas dimensionales y una tabla de hechos para esta simulación.

![Modelo](/assets/img/claves-huerfanas/imagen_1.PNG)

Como podemos ver, las relaciones son correctas, de uno a muchos, y ambas están activas. Aparentemente, todo parece estar en orden, pero este modelo oculta un problema que he creado intencionalmente para este ejemplo. Este problema, conocido como claves o datos huérfanos, se refiere a la falta de integridad referencial en el modelo.
Para ilustrarlo mejor, he ampliado la imagen anterior para mostrar claramente este problema. Te invito, estimado lector, a detenerte un momento y observar con atención la imagen para comprender mejor lo que está ocurriendo.

![Modelo](/assets/img/claves-huerfanas/imagen_2.PNG)

### Problemas Identificados en la Imagen:

- **Advertencia en las claves `Segment_KEY` y `Country_KEY` dentro de la tabla `FactFinancials`:**
    - **Segment_KEY**: La tabla de hechos contiene valores `Segment_KEY = 8` y `Segment_KEY = 9`, los cuales no existen en la tabla `DimSegment`, generando así un error de integridad referencial.
    - **Country_KEY**: De manera similar, hay valores como `Country_KEY = 0` que no existen en la tabla `DimCountry`, lo que causa otra advertencia de integridad referencial.

### Implicaciones:

- Estos errores indican que hay datos en la tabla de hechos (`FactFinancials`) que no tienen correspondencia en las tablas de dimensión (`DimSegment` y `DimCountry`). Esto podría comprometer la calidad de los análisis y reportes, ya que algunas ventas no podrán ser correctamente categorizadas o analizadas según su segmento o país.

### **¿Por Qué Se Origina Este Tipo de Problema en el Mundo Real?**

Este tipo de problema puede surgir por diversas razones. Basado en mi experiencia, algunas de las causas comunes incluyen:

- **Mantenimiento Manual de Tablas Dimensionales**:
   Los datos pueden provenir de archivos de Excel donde las tablas dimensionales se mantienen manualmente. A menudo, cuando se ingresan nuevos datos, no se actualizan las tablas dimensionales, lo que genera discrepancias.

- **Modelado y Normalización de Datos**:
   Los datos que se modelan y normalizan en herramientas como Power Query o Python pueden verse afectados por procesos de combinación de datos (merge) que no se ejecutan correctamente debido a caracteres especiales u otros factores.

- **Problemas Heredados de Bases de Datos Mal Definidas**:
   Los problemas de integridad referencial también pueden originarse en bases de datos que no fueron correctamente definidas o mantenidas, lo que provoca incoherencias en el modelo.

Recuerdo que cuando comencé a trabajar con modelos de datos, hace algunos años, desconocía completamente este tema. En aquel entonces, después de navegar por diferentes páginas web, encontré un artículo que explicaba cómo identificar este problema en mi modelo utilizando la herramienta externa DAX Studio, ejecutando algunos comandos en MDX. Sin embargo, me pareció un proceso complejo, especialmente porque mi modelo contaba con más de 10 tablas dimensionales y varias tablas de hechos. No fue fácil localizar el origen de la falla, lo que me llevó a profundizar en este tema.

### **Herramientas para Identificar Problemas de Integridad Referencial**

Una de las primeras herramientas que encontré, y que me ha sorprendido por su evolución, es DAX Studio. Desde la primera vez que la utilicé, ha mejorado significativamente, permitiendo ahora identificar fácilmente las claves o datos faltantes en tu modelo. 

Recientemente intenté replicar aquel laborioso trabajo que hice en mis inicios para demostrar lo complicado que era. Sin embargo, para mi sorpresa, ahora es mucho más sencillo gracias a las mejoras implementadas en DAX Studio, que además es una herramienta gratuita, lo cual es un gran beneficio para quienes trabajamos con modelos de datos.

Observa la siguiente imagen para comprender mejor cómo DAX Studio facilita la identificación de problemas de integridad referencial.
 
![Modelo](/assets/img/claves-huerfanas/imagen_3.PNG)

Puedes profundizar un poco más con la siguiente imagen:
 
![Modelo](/assets/img/claves-huerfanas/imagen_4.PNG)

>Nota: La imagen muestra una enumeración de las pestañas y botones en los que debes hacer clic para identificar problemas de integridad referencial en DAX Studio.
{: .prompt-tip }

### Relaciones Analizadas

1. **FactFinancials[Segment_KEY] ∞--1 DimSegment[Segment_KEY]**
2. **FactFinancials[Country_KEY] ∞--1 DimCountry[Country_KEY]**

### Columnas de Interés

1. **Claves Faltantes (Missing Keys):**
   - **3 claves faltantes** en todo el modelo indican que hay valores en `FactFinancials` que no encuentran correspondencia en `DimSegment` o `DimCountry`.

2. **Filas Inválidas (Invalid Rows):**
   - **10 filas inválidas** relacionadas con `Segment_KEY` y **5 filas inválidas** relacionadas con `Country_KEY` en `FactFinancials` carecen de correspondencia en sus respectivas tablas de dimensión.

3. **Violaciones de Muestra (Sample Violations):**
   - Claves 9 y 8 en `Segment_KEY`, y clave 0 en `Country_KEY`, representan violaciones que indican la ausencia de correspondencia en las tablas de dimensiones.



- **Claves Faltantes:** Se identifican **3 claves faltantes** en el modelo, lo que indica problemas de integridad referencial.
- **Filas Inválidas:** Existen 15 filas con `Segment_KEY` inválidos y 10 filas con `Country_KEY` inválidos en `FactFinancials`.
- **Integridad Referencial:** Es esencial corregir estos problemas para asegurar un análisis preciso y confiable, donde todos los registros en `FactFinancials` tengan correspondencia en las tablas de dimensiones.


La segunda herramienta funciona en un entorno de **Microsoft Fabric**, específicamente en un **Notebook**. Es una biblioteca excelente que permite identificar estos problemas de manera precisa y sencilla.

**Primer paso:** Es tener un entorno de Fabric; en mi caso, he utilizado la versión de prueba.

**Segundo paso:** Es que tu modelo semántico debe estar en un **Workspace** en **Power BI Services**; puede ser incluso “My Workspace”.

**Tercer paso:** crear un **Notebook**, como muestro en esta imagen:

![Modelo](/assets/img/claves-huerfanas/crear-notebook_7.gif)

**Cuarto paso:** copia y pega este script y solo modifica el nombre de tu modelo semántico entre comillas dobles.
 
```python
# Instalación de la biblioteca semantic-link, necesaria para trabajar con relaciones semánticas en Microsoft Fabric
%pip install semantic-link

# Importación de módulos necesarios
import sempy.fabric as fabric  # Importamos el módulo fabric de sempy con un alias para facilitar su uso
from sempy.fabric import list_relationship_violations  # Importamos la función para listar violaciones de relaciones entre tablas
import pandas as pd  # Importamos pandas para manipulación de datos

# Configuración de pandas para mostrar el contenido completo de las columnas sin truncar
pd.set_option('display.max_colwidth', None)

# Definición del conjunto de datos a utilizar
dataset = "Test5"

# Carga de todas las tablas del conjunto de datos en un diccionario
# Las claves del diccionario son los nombres de las tablas y los valores son los datos de las tablas
tables = {table: fabric.read_table(dataset, table) for table in fabric.list_tables(dataset)['Name']}
tables.keys()
list_relationship_violations(tables, fabric.list_relationships(dataset))

```

Ejecuta este script y obtendrás este resumen:

![Modelo](/assets/img/claves-huerfanas/imagen_8.png)


Esto evidencia claramente el mismo problema que hemos identificado utilizando DAX Studio. En conclusión, creo que uno de los mayores desafíos al trabajar con modelos de datos es la detección temprana de estos problemas de integridad referencial. La dificultad radica en que estos errores pueden permanecer ocultos durante mucho tiempo, afectando la precisión de los análisis sin ser detectados fácilmente. Por esta razón, en una próxima entrada, me gustaría compartir algunas recomendaciones y estrategias prácticas sobre cómo abordar estos problemas de manera efectiva, utilizando herramientas avanzadas y buenas prácticas en el diseño y mantenimiento de modelos de datos.




