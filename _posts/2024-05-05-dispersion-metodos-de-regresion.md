---
title: "Selección Dinámica de Métodos de Regresión en Deneb para Power BI"
author: csalcedodatabi
date: 2024-07-03 23:34:00 +0800
categories: [Blogging, Tutorial]
tags: [Deneb, Vega]
pin: false
image:
  path: /assets/img/post-dispersion-etiquetados-vega/dispersion-etiquetados.png
  alt: "Cross-Filtering y Cross-Highlight Scatter Plot"
description: "Descubre cómo seleccionar dinámicamente métodos de regresión en Deneb para Power BI con esta guía detallada."
---

## Introducción

En este artículo, nos adentraremos en una funcionalidad innovadora que hemos integrado en nuestro scatter plot, desarrollado previamente con **Deneb** en **Power BI**. Si aún no has tenido la oportunidad de ver cómo se crea, te invito a visitar el siguiente enlace:

Nuestro objetivo es enriquecer la visualización al permitir la selección del método de regresión. A continuación, detallaremos los pasos necesarios para implementar esta función y mejorar aún más nuestra visualización.

## Selección de Métodos de Regresión

En la versión adaptada de **Deneb**, ahora puedes seleccionar entre una variedad de métodos de regresión para aplicar a tus visualizaciones. Los métodos disponibles incluyen:

- **Lineal (linear)**: ``y = a + b * x``
- **Logarítmico  (log)**: ``y = a + b * log(x)``
- **Exponencial (exp)**: ``y = a + e^{b * x}``
- **Potencial (pow)**: ``y = a * x^b``
- **Cuadrático (quad)**: ``y = a + b * x + c * x^2``
- **Polinomial (poly)**: ``y = a + b * x + … + k * x^{order}``

Mas información acerca de esto aquí: Regression Transform | Vega

## Implementación Paso a Paso

A continuación, te presentamos los pasos necesarios para incorporar la selección de métodos de regresión en tu visualización en Deneb:

## Paso 1: Descarga el archivo PBIX

[🔽 Dispersion_Etiquetados.pbix](https://github.com/CSalcedoDataBI/PowerBI-Deneb/raw/main/Dispersion_Etiquetados/Files/Dispersion_Etiquetada.pbix) (1.88 MB)

>Para comenzar, puedes descargar el archivo PBIX desde aquí. Este archivo contiene la plantilla de visualización en Deneb, que incluye todos los elementos necesarios para implementar la selección de métodos de regresión. Al descargar el archivo PBIX, tendrás acceso a la estructura y configuración predefinida para facilitar la implementación de esta funcionalidad en tu propio proyecto.
{: .prompt-info }

## Paso 2: Crear Tablas Calculadas y Medidas

Una vez que hayas descargado la plantilla, ábrela en Power BI y crea las siguientes tablas que van totalmente desconectadas del modelo, como tablas de ``parámetros`` y sus medidas relacionadas utilizando el lenguaje **DAX**:

Tabla Calculada la he llamado "OptionsGroupby", pero puedes colocarles en nombre que desees.

Esta tabla permite seleccionar la categoría de agrupamiento. Puedes incluir opciones como “none” (Ninguna) o “genre” (Género) para agrupar los datos, ver el correspondiente código DAX:

<pre class="highlight"><code>
OptionsGroupby =
SELECTCOLUMNS (
    {
        ( 1, "none" ),
        ( 2, "Genre" )
    },
    "Index", [Value1],
    "Groupby", [Value2]
)
</code></pre>

Medida relacionada:

<pre class="highlight"><code>
GroupbySelected  = SELECTEDVALUE ( 'OptionsGroupby'[Index], 1 )
</code></pre>

Tabla Calculada "OptionsMethod"

Esta tabla te permite seleccionar el método de regresión que deseas aplicar. Incluye opciones como "Lineal", "Logarítmico", "Exponencial", entre otros. Ver el siguiente código:

<pre class="highlight"><code>
OptionsMethod =
SELECTCOLUMNS (
    {
        ( 1, "linear" ),
        ( 2, "log" ),
        ( 3, "exp" ),
        ( 4, "pow" ),
        ( 5, "quad" ),
        ( 6, "poly" )
    },
    "Index", [Value1],
    "Method", [Value2]
)
</code></pre>

Medida relacionada:
<pre class="highlight"><code>
MethodSelected = SELECTEDVALUE ( 'OptionsMethod'[Index], 1 )
</code></pre>

Tabla Calculada "PolyOrder"

Esta tabla define el orden del polinomio en caso de seleccionar el método polinomial. Puedes establecer un rango de 1 a 10, por ejemplo.
<pre class="highlight"><code>
PolyOrder = GENERATESERIES ( 1, 10, 1 )
</code></pre>
Medida relacionada:
<pre class="highlight"><code>
PolyValue = SELECTEDVALUE('PolyOrder'[PolyOrder], 1)
</code></pre>

## Paso 3: Agregar Medidas y Filtros

Una vez creadas las tablas y medidas, agrega las medidas correspondientes y los filtros necesarios a tu visualización en Deneb. Asegúrate de colocar los filtros en una configuración que permita una sola selección de las categorías correspondientes, así como muestra la siguiente imagen:

Minimizar imagen
Editar imagen
Borrar imagen
No hay texto alternativo para esta imagen

## Paso 4: Personalizar el Visual

Dentro de la visualización, haz clic en los puntos suspensivos y selecciona "Editar". En esta sección, agregaremos fragmentos de código que nos permitirán controlar la selección dinámica del método de regresión y mostrar información relevante en el visual.

El siguiente fragmento de código nos permitirá establecer una traducción de los parámetros dinámicos creados en DAX y declararlos internamente en VEGA como "signals" (señales). En otros lenguajes de programación, estas señales se considerarían variables, pero en VEGA se definen de esta manera.

A continuación, se muestra el código correspondiente:
<pre class="highlight"><code>
"signals":[
   {
      "name":"methodValue",
      "update":"pluck(data('dataset'),'MethodSelected')[0]"
   },
   {
      "name":"methodSelect",
      "update":"methodValue === 1 ? 'linear': methodValue === 2 ? 'log': methodValue === 3 ? 'exp': methodValue === 4 ? 'pow': methodValue === 5 ? 'quad': 'poly'"
   },
   {
      "name":"currentMethod",
      "update":"methodValue === 1 ? '(linear): y = a + b * x': methodValue === 2 ? '(log): y = a + b * log(x)': methodValue === 3 ? '(exp): y = a + eb * x': methodValue === 4 ? '(pow): y = a * xb': methodValue === 5 ? '(quad): y = a + b * x + c * x2': '(poly): y = a + b * x + … + k * xorder'"
   },
   {
      "name":"polyOrder",
      "update":"pluck(data('dataset'),'PolyValue')[0]"
   },
   {
      "name":"groupbySelected",
      "update":"pluck(data('dataset'),'GroupbySelected')[0]"
   },
   {
      "name":"groupby",
      "update":"groupbySelected === 1 ? 'none' : 'genre' "
   }
]
</code></pre>

Utilizando este código, establecemos las señales correspondientes a los parámetros dinámicos creados en DAX. Estas señales nos permitirán controlar la selección del método de regresión, determinar el orden polinomial y definir la agrupación. Ver la siguiente imagen para mayor comprensión.

Minimizar imagen
Editar imagen
Borrar imagen
No hay texto alternativo para esta imagen

Además, es necesario realizar una modificación en la transformación de la regresión lineal. En el código del visual anterior, buscamos la transformación denominada "fit" dentro de "data" y la cambiamos a "trend". También modificamos la matriz de transformación de la siguiente manera:
<pre class="highlight"><code>
{
   "name":"trend",
   "source":"dataset",
   "transform":[
      {
         "type":"regression",
         "groupby":[
            {
               "signal":"groupby === 'genre' ? 'Major Genre' : 'foo'"
            }
         ],
         "method":{
            "signal":"methodSelect"
         },
         "order":{
            "signal":"polyOrder"
         },
         "extent":{
            "signal":"domain('x')"
         },
         "x":"Rotten Tomatoes Rating",
         "y":"IMDB Rating",
         "as":[
            "u",
            "v"
         ]
      }
   ]
}
</code></pre>

Al realizar estos cambios, creamos una capa dinámica de regresión que se ajusta al filtro externo. La transformación ahora utiliza la señal de agrupación seleccionada para determinar si se agrupa por "Major Genre" o por otro criterio. Además, el método de regresión seleccionado y el orden polinomial se toman en cuenta en el cálculo de la regresión.

Revisar la imagen adjunta para tener una mejor comprensión visual de cómo se aplican estos cambios.

Minimizar imagen
Editar imagen
Borrar imagen
No hay texto alternativo para esta imagen

## Paso 5: Agregar la Capa de texto

En la sección de Mark:[], vamos a insertar el siguiente fagmento de código el cual va hacer uso de la variable o señal (signal ) creada anteriormente “ currentMethod” el cual nos devuelve la formula del método de regresión usado, y nos lo va a crear como una marca de agua dentro de las coordenadas declaradas, cabe mencionar que solo es con fines educativos, pero este texto puede ser con respecto al análisis que se esté realizado.

Ver código:
<pre class="highlight"><code>
"marks":{
   "type":"text",
   "encode":{
      "update":{
         "text":{
            "signal":"currentMethod"
         },
         "x":{
            "value":200
         },
         "y":{
            "value":450
         },
         "fill":{
            "value":"grey"
         },
         "fillOpacity":{
            "value":0.25
         },
         "fontSize":{
            "value":40
         }
      }
   }
}
</code></pre>
Como se muestra en la siguiente imagen:

Minimizar imagen
Editar imagen
Borrar imagen
No hay texto alternativo para esta imagen
😍😍
Paso 6: Agregar la Capa de Regresión

Utiliza el código proporcionado para agregar la capa de regresión a tu visualización. Esto permitirá visualizar la línea de regresión según el método seleccionado.

<pre class="highlight"><code>
{
   "type":"group",
   "from":{
      "facet":{
         "data":"trend",
         "name":"curve",
         "groupby":"Major Genre"
      }
   },
   "marks":[
      {
         "type":"line",
         "from":{
            "data":"curve"
         },
         "encode":{
            "enter":{
               "x":{
                  "scale":"x",
                  "field":"u"
               },
               "y":{
                  "scale":"y",
                  "field":"v"
               },
               "stroke":{
                  "value":"firebrick"
               }
            }
         }
      }
   ]
}
</code></pre>
Como se muestra en la siguiente imagen:

Minimizar imagen
Editar imagen
Borrar imagen
No hay texto alternativo para esta imagen

Explora y Personaliza tu Visualización
Te animamos a que descargues la plantilla, la abras en Power BI y explores todos los elementos y configuraciones que hemos incorporado. Mediante el ajuste de los filtros y la selección de diferentes métodos de regresión, podrás ver cómo cambia la línea de regresión y cómo se adaptan las fórmulas descriptivas en tiempo real.

Además, te invitamos a experimentar y personalizar aún más la visualización según tus propias necesidades. Puedes modificar los colores, las etiquetas, los títulos y cualquier otro aspecto visual para que se ajusten a tu estilo y preferencias.

Descarga de la Plantilla y Visualización
Para facilitar la implementación de esta funcionalidad en tu propio proyecto, ponemos a tu disposición la plantilla de visualización en Deneb. Puedes descargar el archivo PBIX desde el siguiente enlace:

PowerBI-Deneb/Selected Method Regression (ScatterPlot).pbix at main · cristobalsalcedo90/PowerBI-Deneb (github.com).

Plantilla .json edesde el siguiente enlace:

PowerBI-Deneb/Selected Method Regression (ScatterPlot).json at main · cristobalsalcedo90/PowerBI-Deneb · GitHub

 Al utilizar esta plantilla, podrás visualizar directamente cómo se aplica la selección de métodos de regresión en un ejemplo práctico.

## Conclusiones

La incorporación de la selección de métodos de regresión en nuestra visualización en Deneb representa un avance significativo en la exploración y análisis de datos. Gracias a la adaptación de la biblioteca , hemos logrado ofrecerte una herramienta más potente y flexible para investigar patrones y tendencias en tus datos.

Recuerda que la plantilla de visualización en Deneb está disponible para su descarga, lo que te permitirá comprender mejor la implementación de esta funcionalidad y explorar las posibilidades de personalización. ¡Esperamos que esta mejora en la visualización en  en  sea de gran utilidad en tus proyectos de análisis de datos!

Si deseas profundizar más en estos temas o explorar otras técnicas de visualización de datos, te invito a consultar los artículos adicionales que hemos creado en Pesante Analytics Llc. ¡Diviértete creando visualizaciones impactantes y contando historias con tus datos!

🖋️ Escrito por Cristobal Salcedo Beltran con la ayuda de Pesante Analytics Llc

Referencias y recursos
Aquí encontrarás el código completo utilizado para crear el Scatter Plot con selección dinámica del método de regresión y otros parámetros en Deneb utilizando  en . También se incluyen algunas referencias bibliográficas relacionadas.

Scatter Plot con etiquetas disponible en la documentación oficial de Vega: htps://vega.github.io/vega/examples/labeled-scatter-plot/

Cross-Filtering (Selection):

<https://deneb-viz.github.io/interactivity-selection>

Cross-Highlighting:

<https://deneb-viz.github.io/interactivity-highlight>

## Plantillla

<pre class="highlight"><code>

{  "$schema": "https://vega.github.io/schema/vega/v5.json",
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
      "name": "Selected Method Regression (ScatterPlot)",
      "description": "Selected Method Regression (ScatterPlot)",
      "author": "Cristobal-Salcedo",
      "uuid": "b4d72b67-65bf-4fcc-8479-c3c021d851e8",
      "generated": "2023-06-10T06:06:14.885Z"
    },
    "dataset": [
      {
        "key": "__0__",
        "name": "Major Genre",
        "description": "",
        "type": "text",
        "kind": "column"
      },
      {
        "key": "__1__",
        "name": "Title",
        "description": "",
        "type": "text",
        "kind": "column"
      },
      {
        "key": "__2__",
        "name": "IMDB Rating",
        "description": "",
        "type": "numeric",
        "kind": "measure"
      },
      {
        "key": "__3__",
        "name": "Rotten Tomatoes Rating",
        "description": "",
        "type": "numeric",
        "kind": "measure"
      },
      {
        "key": "__4__",
        "name": "PolyValue",
        "description": "",
        "type": "numeric",
        "kind": "measure"
      },
      {
        "key": "__5__",
        "name": "MethodSelected",
        "description": "",
        "type": "numeric",
        "kind": "measure"
      },
      {
        "key": "__6__",
        "name": "GroupbySelected",
        "description": "",
        "type": "numeric",
        "kind": "measure"
      }
    ]
  },
  "config": {},
  "description": "A labeled scatter plot or films showing rotten Tomatoes rarigs versus IMDB ratings,",
  "padding": 5,
  "width": 800,
  "height": 480,
  "autosize": "pad",
  "signals": [
    {
      "name": "methodValue",
      "update": "pluck(data('dataset'),'__5__')[0]"
    },
    {
      "name": "methodSelect",
      "update": "methodValue === 1 ? 'linear': methodValue === 2 ? 'log': methodValue === 3 ? 'exp': methodValue === 4 ? 'pow': methodValue === 5 ? 'quad': 'poly'"
    },
    {
      "name": "currentMethod",
      "update": "methodValue === 1 ? '(linear): y = a + b * x': methodValue === 2 ? '(log): y = a + b * log(x)': methodValue === 3 ? '(exp): y = a + eb * x': methodValue === 4 ? '(pow): y = a * xb': methodValue === 5 ? '(quad): y = a + b * x + c * x2': '(poly): y = a + b * x + … + k * xorder'"
    },
    {
      "name": "polyOrder",
      "update": "pluck(data('dataset'),'__4__')[0]"
    },
    {
      "name": "groupbySelected",
      "update": "pluck(data('dataset'),'__6__')[0]"
    },
    {
      "name": "groupby",
      "update": "groupbySelected === 1 ? 'none' : 'genre' "
    }
  ],
  "data": [
    {
      "name": "dataset",
      "transform": [
        {
          "type": "filter",
          "expr": "datum['__3__'] != null && datum['__2__'] != null && datum['__0__'] != null "
        }
      ]
    },
    {
      "name": "trend",
      "source": "dataset",
      "transform": [
        {
          "type": "regression",
          "groupby": [
            {
              "signal": "groupby === 'genre' ? '__0__' : 'foo'"
            }
          ],
          "method": {
            "signal": "methodSelect"
          },
          "order": {
            "signal": "polyOrder"
          },
          "extent": {
            "signal": "domain('x')"
          },
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
      "title": "__2__"
    },
    {
      "orient": "bottom",
      "scale": "x",
      "title": "__3__"
    }
  ],
  "marks": [
    {
      "type": "text",
      "encode": {
        "update": {
          "text": {
            "signal": "currentMethod"
          },
          "x": {"value": 200},
          "y": {"value": 450},
          "fill": {"value": "grey"},
          "fillOpacity": {
            "value": 0.25
          },
          "fontSize": {"value": 40}
        }
      }
    },
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
          "size": {"value": 80},
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
      "type": "group",
      "from": {
        "facet": {
          "data": "trend",
          "name": "curve",
          "groupby": "__0__"
        }
      },
      "marks": [
        {
          "type": "line",
          "from": {"data": "curve"},
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
        }
      ]
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
</code></pre>
