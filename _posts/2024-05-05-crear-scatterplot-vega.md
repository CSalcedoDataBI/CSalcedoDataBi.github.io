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
   
   [Labeled-ScatterPlot-Example-Vega](https://vega.github.io/vega/examples/labeled-scatter-plot.vg.json)


- Copia todo el código tal cual se muestra en la página, puedes seleccionar todo con Ctrl + A.
- Ve al <kbd>editor de Deneb</kbd> que tienes abierto y pega el código copiado en el panel de edición.
  
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

![Paso 4 Ver](/assets/img/post/paso4.png){: width="700" height="400" }

A continuación, puedes apreciar el resultado del Scatter Plot una vez que se han aplicado los cambios mencionados:

![Paso 4 Ver](/assets/img/post/paso4_1.png){: width="700" height="400" }

En la imagen, se puede observar el Scatter Plot actualizado con los datos del conjunto de datos de Power BI.

## Paso 5: Habilitar Cross-Highlight y Cross-Filtering (Selection)
En este paso, vamos a habilitar la funcionalidad de "<kbd>Cross-Highlight</kbd> y <kbd>Cross-Filtering</kbd> (Selection). Sigue los siguientes subpasos:
* En el editor de Deneb, ve al panel de Configuración (Settings).
* Busca y selecciona los botones correspondientes para habilitar Cross-Highlight y Cross-Filtering (Selection).
  
>Asegúrate de que los botones estén seleccionados correctamente en el panel de Configuración. Puedes consultar la siguiente imagen como referencia visual.
{: .prompt-info }

![Paso 4 Ver](/assets/img/post/paso5.png){: width="700" height="400" }

## Paso 6: Codificar o declarar Cross-Highlight y Cross-Filtering (Selection)

En este paso, vamos a insertar un código que contiene la propiedad <kbd>Opacity</kbd> para gestionar la visualización de los puntos seleccionados en el Scatter Plot. 

Sigue el siguiente subpaso:

Inserta el siguiente código dentro de la propiedad <kbd>enter</kbd> del código principal:

```json
 "opacity": [
            {
              "test": "datum.__selected__ == 'on'",
              "value": 1
            },
            {
              "test": "datum.__selected__ == 'off' || datum['Sum of IMDB Rating__highlight']==null",
              "value": 0.1
            },
            {
              "test": "datum.__selected__ == 'neutral'",
              "value": 1
            }
          ] 
```

>Asegúrate de que el código se inserte correctamente en la ubicación indicada. Puedes consultar la siguiente imagen como referencia visual
{: .prompt-info }

![Paso 5 Ver](/assets/img/post/paso5_1.png){: width="700" height="400" }

## Paso 7: Segmentar y colorear los puntos del Scatter Plot
En este último paso, vamos a definir segmentos de colores para identificar cada punto en el Scatter Plot. Sigue los siguientes subpasos:
* Primero, vamos a definir una escala <kbd>Scales</kbd> para asignar colores a los puntos basados en la variable <kbd>Major Genre</kbd>. Agrega el siguiente código:

```json
{
      "name": "color",
      "type": "ordinal",
      "domain": {
        "data": "dataset",
        "field": "Major Genre",
        "sort": {"order": "descending"}
      },
      "range": "category"
    }
```
A continuación, vamos a utilizar la escala de color que hemos definido para colorear los puntos del Scatter Plot. Agrega el siguiente código dentro de la propiedad <kbd>fill</kbd>:

```json
{
     "fill": 
            "scale": "color",
            "field": "Major Genre"
          }

```
Este código asignará el color correspondiente a cada punto en función de la variable <kbd>Major Genre</kbd> utilizando la escala <kbd>scale</kbd> de color definida anteriormente.

>Recuerda que puedes personalizar la escala de color y los campos utilizados según tus necesidades.
¡Genial! Ahora has segmentado y coloreado los puntos en el Scatter Plot según la variable "Major Genre". Esto te permitirá identificar visualmente las diferentes categorías presentes en tus datos.
{: .prompt-info }

Además, habilitar el efecto de Cross-Filtering y Cross-Highlight te permitirá interactuar con los datos y obtener información más detallada. Puedes ver el resultado final y el efecto de Cross-Filtering en la siguiente imagen:

![Paso 5 Ver](/assets/img/post/paso5_2.png){: width="700" height="400" }

## Resultado Final:
Para tener una mejor comprensión del poder de la visualización y las funcionalidades agregadas, a continuación se muestra el efecto de <kbd>Cross-Highlight</kbd> en relación a otro gráfico, así como una comparación entre el Scatter Plot nativo de Power BI y el creado en Deneb.
Además, se ha incluido un gráfico de barras que representa la categoría "Major Genre" en el eje Y y la variable cuantitativa "IMDB Rating" en el eje X. Al seleccionar el gráfico de barras y dirigirse a la pestaña <kbd>Format</kbd> y luego <kbd>Editar interacciones</kbd>, se pueden apreciar los botones de interacción habilitados en ambos gráficos. Estos botones permiten explorar y obtener información más detallada al interactuar entre los gráficos.
Para obtener más información sobre las interacciones de visualización en Power BI, puedes consultar la documentación de Microsoft aquí: 

https://learn.microsoft.com/es-es/power-bi/create-reports/service-reports-visual-interactions?tabs=powerbi-desktop

A continuación, se muestra una imagen que ilustra estas características:

![Paso 5 Ver](/assets/img/post/paso5_3.png){: width="700" height="400" }

Conclusión
En conclusión, la integración de interacciones entre gráficos y la combinación de visualizaciones en Power BI potencian la capacidad de análisis y comprensión de los datos. La imagen presentada ejemplifica cómo el Cross-Highlighting y la comparación entre un Scatter Plot y un gráfico de barras enriquecen la exploración de los datos. Es importante tener en cuenta que la imagen es una representación visual y que la verdadera experiencia interactiva se vive en el entorno de Power BI. 
Aprovecha estas herramientas avanzadas para obtener información valiosa y comunicar patrones de manera efectiva. Continúa explorando y disfruta del proceso de creación y análisis de tus visualizaciones en hashtag#PowerBI y hashtag#Deneb para maximizar el potencial de tus datos.

Aprovecha estas herramientas avanzadas para obtener información valiosa y comunicar patrones de manera efectiva. Continúa explorando y disfruta del proceso de creación y análisis de tus visualizaciones en hashtag#PowerBI y hashtag#Deneb para maximizar el potencial de tus datos.

Descarga los archivos utilizados en este artículo aquí:
Archivo PBIX: Descargar
Plantilla .json: Descargar

Estos enlaces te proporcionarán acceso a los archivos PBIX y la plantilla .json utilizados en este artículo, permitiéndote explorar y adaptar los ejemplos a tus propias necesidades. ¡Buena suerte y diviértete explorando!

🖋️ Escrito por Cristobal Salcedo Beltran con la ayuda de Pesante Analytics Llc

## Referencias y recursos
A continuación, se presenta el código completo utilizado para crear el Scatter Plot en Deneb utilizando hashtag#Vega en hashtag#PowerBI, así como algunas referencias bibliográficas relacionadas.
Scatter Plot con etiquetas disponible en la documentación oficial de Vega: 

[labeled-scatter-plot](htps://vega.github.io/vega/examples/labeled-scatter-plot/)

Cross-Filtering (Selection): 

[Cross-Highlighting](https://deneb-viz.github.io/interactivity-selection)

Cross-Highlighting:

[deneb](https://deneb-viz.github.io/interactivity-highlight)

Código completo:

```json
{ 
 "$schema": "https://vega.github.io/schema/vega/v5.json",
  "usermeta": {
    "deneb": {
      "build": "1.5.1.0",
      "metaVersion": 1,
      "provider": "vega",
      "providerVersion": "5.23.0"
    },
    "interactivity": {
      "tooltip": true,
      "contextMenu": true,
      "selection": true,
      "highlight": true,
      "dataPointLimit": 50
    },
    "information": {
      "name": "Scatter Plot",
      "description": "El visual es un Scatter Plot que muestra la relación entre dos conjuntos de datos. Permite visualizar cómo se distribuyen y correlacionan los valores en el plano. Es una representación gráfica efectiva para identificar patrones, tendencias o agrupaciones en los datos.",
      "author": "Cristobal Salcedo",
      "uuid": "e7136de1-dae5-48a8-8ec2-6b476779cbd3",
      "generated": "2023-05-18T12:52:36.141Z"
    },
    "dataset": [
      {
        "key": "__0__",
        "name": "Categoria",
        "description": "Se utiliza para asignar colores a los puntos en el gráfico Scatter Plot",
        "type": "text",
        "kind": "column"
      },
      {
        "key": "__1__",
        "name": "SubCategoria",
        "description": "Se utiliza para etiquetar los puntos en el gráfico de Scatter Plot",
        "type": "text",
        "kind": "column"
      },
      {
        "key": "__2__",
        "name": "Variable Y",
        "description": "Se utiliza en el eje vertical del gráfico de Scatter Plot para ubicar los puntos",
        "type": "numeric",
        "kind": "measure"
      },
      {
        "key": "__3__",
        "name": "Variable X",
        "description": "Se utiliza en el eje horizontal del gráfico de Scatter Plot para ubicar los puntos",
        "type": "numeric",
        "kind": "measure"
      }
    ]
  },
  "config": {
    "autosize": {
      "contains": "padding",
      "type": "fit"
    },
    "view": {"stroke": "transparent"},
    "font": "Segoe UI",
    "arc": {},
    "area": {
      "line": true,
      "opacity": 0.6
    },
    "bar": {},
    "line": {
      "strokeWidth": 3,
      "strokeCap": "round",
      "strokeJoin": "round"
    },
    "path": {},
    "point": {
      "filled": true,
      "size": 75
    },
    "rect": {},
    "shape": {},
    "symbol": {
      "strokeWidth": 1.5,
      "size": 50
    },
    "text": {
      "font": "Segoe UI",
      "fontSize": 12,
      "fill": "#605E5C"
    },
    "axis": {
      "ticks": false,
      "grid": false,
      "domain": false,
      "labelColor": "#605E5C",
      "labelFontSize": 12,
      "titleFont": "wf_standard-font, helvetica, arial, sans-serif",
      "titleColor": "#252423",
      "titleFontSize": 16,
      "titleFontWeight": "normal"
    },
    "axisQuantitative": {
      "tickCount": 3,
      "grid": true,
      "gridColor": "#C8C6C4",
      "gridDash": [1, 5],
      "labelFlush": false
    },
    "axisX": {"labelPadding": 5},
    "axisY": {"labelPadding": 10},
    "header": {
      "titleFont": "wf_standard-font, helvetica, arial, sans-serif",
      "titleFontSize": 16,
      "titleColor": "#252423",
      "labelFont": "Segoe UI",
      "labelFontSize": 13.333333333333332,
      "labelColor": "#605E5C"
    },
    "legend": {
      "titleFont": "Segoe UI",
      "titleFontWeight": "bold",
      "titleColor": "#605E5C",
      "labelFont": "Segoe UI",
      "labelFontSize": 13.333333333333332,
      "labelColor": "#605E5C",
      "symbolType": "circle",
      "symbolSize": 75
    }
  },
  "description": "A labeled scatter plot or films showing rotten Tomatoes rarigs versus IMDB ratings,",
  "padding": 5,
  "width": 800,
  "height": 500,
  "autosize": "pad",
  "data": [
    {
      "name": "dataset",
      "transform": [
        {
          "type": "filter",
          "expr": "datum['__3__'] != null && datum['__2__'] != null "
        }
      ]
    },
    {
      "name": "fit",
      "source": "dataset",
      "transform": [
        {
          "type": "regression",
          "method": "quad",
          "x": "__3__",
          "y": "__2__",
          "as": ["u", "v"]
        }
      ]
    }
  ],
  "scales": [
    {
      "name": "x",
      "type": "linear",
      "domain": {
        "data": "dataset",
        "field": "__3__"
      },
      "range": "width"
    },
    {
      "name": "y",
      "type": "linear",
      "domain": {
        "data": "dataset",
        "field": "__2__"
      },
      "range": "height"
    },
    {
      "name": "color",
      "type": "ordinal",
      "domain": {
        "data": "dataset",
        "field": "__0__",
        "sort": {"order": "descending"}
      },
      "range": "category"
    }
  ],
  "axes": [
    {
      "orient": "left",
      "scale": "y",
      "title": ""
    },
    {
      "orient": "bottom",
      "scale": "x",
      "title": ""
    }
  ],
  "marks": [
    {
      "name": "points",
      "type": "symbol",
      "from": {"data": "dataset"},
      "encode": {
        "enter": {
          "fill": {
            "scale": "color",
            "field": "__0__"
          },
          "x": {
            "scale": "x",
            "field": "__3__"
          },
          "y": {
            "scale": "y",
            "field": "__2__"
          },
          "size": {"value": 200},
          "opacity": [
            {
              "test": "datum.__selected__ == 'on'",
              "value": 1
            },
            {
              "test": "datum.__selected__ == 'off' || datum['__2____highlight']==null",
              "value": 0.1
            },
            {
              "test": "datum.__selected__ == 'neutral'",
              "value": 1
            }
          ]
        }
      }
    },
    {
      "name": "trend",
      "type": "line",
      "from": {"data": "fit"},
      "encode": {
        "enter": {
          "x": {
            "scale": "x",
            "field": "u"
          },
          "y": {
            "scale": "y",
            "field": "v"
          },
          "stroke": {
            "value": "firebrick"
          }
        }
      }
    },
    {
      "type": "text",
      "from": {"data": "points"},
      "encode": {
        "enter": {
          "text": {
            "field": "datum['__1__']"
          },
          "fontSize": {"value": 12}
        }
      },
      "transform": [
        {
          "type": "label",
          "avoidMarks": ["points"],
          "anchor": [
            "top",
            "bottom",
            "right",
            "left"
          ],
          "offset": [1],
          "size": {
            "signal": "[width + 60, height + 1 ]"
          }
        }
      ]
    }
  ]
}

```