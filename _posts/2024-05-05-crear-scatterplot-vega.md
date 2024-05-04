---
title: Cómo crear un impresionante Scatter Plot en Deneb con Vega en Power BI
author: Cristobal Salcedo Beltran
date: 2024-05-03 23:34:00 +0800
categories: [Blogging, Tutorial]
tags: [Deneb, Vega]
---

¡Hola a todos! En este artículo, quiero compartir una solución que encontramos mientras trabajábamos en un proyecto con Pesante Analytics LlC para un cliente. Durante nuestro trabajo, nos dimos cuenta de que el visual <kbd>Scatter Plot</kbd> de **PowerBI** era bastante limitado, ya que carecía de la funcionalidad de <kbd>Cross-highlight.</kbd> Por esta razón, decidimos utilizar **Deneb** y **VegaLite**, y pensamos que sería una buena sugerencia que Power BI agregara esta funcionalidad. Por lo tanto, mencionamos este tema al equipo de trabajo de **PBICoreVisuals** y a Miguel Myers - Product Manager. Esperamos que puedan leer nuestro mensaje en español...
Bueno, para empezar, quiero trabajar con **Vega** de la manera más fácil y cómoda posible, incluso para aquellos con pocos conocimientos en este lenguaje, para que todos puedan disfrutar de las ventajas de **Deneb** y **Vega** en **PowerBi**. En este artículo, resumiré los pasos necesarios para crear un Scatter Plot. Para ello, he utilizado datos oficiales de Vega.

## Paso 1: Preparar los datos en Power BI:

Utilice el conector web y pegue este enlace:
https://raw.githubusercontent.com/vega/vega/main/docs/data/movies.json

 - `Transforme los datos en una tabla y luego expanda todos los campos, dándoles el formato adecuado.`{: .filepath}
 - `Agregue una columna para el año.`{: .filepath}

>El objetivo de este artículo no es enseñar cómo modelar datos en Power BI, así que si lo prefieres, puedes omitir todos los pasos anteriores y descargar el archivo .pbix con los datos ya preparados, descargar 
{: .prompt-info }


## Paso 2: Crear un visual de Deneb e incorporar las variables necesarias

En esta etapa, vamos a crear un visual utilizando `Deneb` y configurar las variables necesarias para nuestro Scatter Plot. Haz clic en "Visualizaciones" en la barra de herramientas de Power BI >> Selecciona la visualización de `Deneb`. Sigue los siguientes subpasos:
1. Arrastra y suelta las dos variables categóricas y las dos variables cuantitativas en las áreas correspondientes del visual de `Deneb`. Asegúrate de que las variables estén asignadas correctamente así:
- ` ✓  IMDB Rating`
- ` ✓  Rotten Tomatoes Rating`
- ` ✓  Title`
- ` ✓  Major Genre`

Haz clic en <kbd>Editar visual</kbd> en la parte superior del visual de <kbd>Deneb</kbd>. A continuación, se abrirá la ventana de edición del visual. Aquí es donde seleccionaremos <kbd>Vega</kbd> 
Selecciona la plantilla vacía <kbd>(`*empty `)</kbd> para comenzar desde cero con nuestro visual. 
Haz clic en el botón <kbd>Crear</kbd> para generar una plantilla vacía plantilla vacía.
Puedes consultar la siguiente imagen como referencia visual para estos subpasos:

[Imagen](https://raw.githubusercontent.com/CSalcedoDataBI/PowerBI-Deneb/main/Dispersion_Etiquetados/Files/Imagenes/Paso1.png)

## Paso 3: Copiar y pegar el código del Scatter Plot

En este paso, vamos a copiar y pegar el código del Scatter Plot en el editor de Deneb que ya tienes preparado. Sigue estos subpasos:
- `Haz clic en el siguiente enlace para acceder al código del Scatter Plot:`
   
   [Labeled-ScatterPlot-Example-Vega](https://vega.github.io/vega/examples/labeled-scatter-plot/)

- `Copia todo el código tal cual se muestra en la página.`
- `Ve al <kbd>editor de Deneb</kbd> que tienes abierto y pega el código copiado en el panel de edición.`
  
>Asegúrate de que el código se pegue correctamente en el editor. Puedes consultar la siguiente imagen como referencia visual
{: .prompt-info }

## Paso 4: Modificar el código para leer el dataset de Power BI

En esta etapa, vamos a modificar el código del Scatter Plot para que pueda leer el <kbd>dataset</kbd> de Power BI. Sigue los siguientes subpasos:

Estando en el editor de Deneb, ve al <kbd>panel de especificación</kbd> (Specification) donde hemos pegado el código.
* Selecciona la palabra <kbd>movies</kbd> en el código y presiona <kbd>Ctrl + F</kbd> para abrir el cuadro de diálogo de búsqueda.

* Expande el cuadro de diálogo hacia abajo haciendo clic en el botón `*+` en el logotipo.
Reemplaza todas las apariciones de la palabra "<kbd>movies</kbd> por la palabra <kbd>dataset</kbd>, que es la <kbd>palabra clave que Deneb utiliza para nombrar el conjunto de datos</kbd>.

>Verifica que la palabra "dataset" reemplace todas las apariciones de "<kbd>movies</kbd> en el código. Puedes consultar la siguiente imagen como referencia visual.
{: .prompt-info }

img_cdn:
paso4: "/assets/img/post/paso4.png"