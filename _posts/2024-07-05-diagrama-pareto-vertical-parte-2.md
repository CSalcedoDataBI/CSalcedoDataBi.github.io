---
title: "Crea un Diagrama de Pareto Vertical en Power BI con Deneb y Vega Lite (Parte 2)"
author: csalcedodatabi
date: 2024-10-03 23:34:00 +0800
categories: [Blogging, Tutorial]
tags: [Deneb, Vega-Lite, Pareto]
pin: false
image:
  path: https://raw.githubusercontent.com/CSalcedoDataBI/PowerBI-Deneb/main/Diagramas_Pareto/FIles/Pareto_Dinamico_Deneb_VegaLite_P1_Encabezado.gif
  alt: "Cross-Filtering y Cross-Highlight Scatter Plot"
description: "Potencia tu Análisis de Datos con Diagramas de Pareto Verticales en Power BI"
---

# ¡Hola a todos

¡Espero que estén tan emocionados como yo por seguir explorando el fascinante mundo del Diagrama de Pareto Vertical en Power BI! En la primera parte de este artículo, aprendimos a convertir un diagrama de Pareto de horizontal a vertical, personalizar los ejes, calcular variables de porcentaje y aplicar estilos y colores llamativos.

En esta segunda parte, daremos un paso más allá al sumergirnos en el emocionante mundo de los **parámetros dinámicos**. Con la incorporación de estos parámetros, podrás crear categorías personalizables y estilos flexibles en tu gráfico de Pareto Vertical. ¡Imagina las posibilidades que se abrirán para tus análisis de datos!

## Paso 6: Agregar "Fields Parameter" para tener categorías dinámicas

Comenzaremos explorando el Paso 6, donde añadiremos el "Fields Parameter" para tener categorías dinámicas en nuestro gráfico. Aunque esta funcionalidad no está disponible en la versión actual de Deneb, no te preocupes. **Daniel Marsh-Patrick nos ha informado que están trabajando arduamente para implementarla y es posible que esté disponible en futuras versiones. Mientras tanto, compartiremos una técnica ingeniosa para lograr categorías dinámicas en nuestro gráfico. ¡Sigue leyendo para descubrir cómo hacerlo!

**"Con Deneb en Power BI, ¡todo es posible!"**

## Paso 6: Agregar "Fields Parameter" para tener categorías dinámicas

Ahora, deseamos añadir algo aún más poderoso siguiendo la idea de Carlos Barboza. Nos gustaría incorporar la "nueva propiedad" de Fields Parameter para tener categorías dinámicas. Sin embargo, como mencionamos anteriormente, esta funcionalidad no está disponible en la versión actual de Power BI al momento de publicar este artículo.

Afortunadamente, gracias a algunas técnicas compartidas por [@vbakhVBakh](https://www.youtube.com/channel/UC0XT8w-Rdnfi2Co_qyFgQNA) y su canal de YouTube *Hoosier BI*, podemos sortear esta limitación. La técnica consiste en cambiar temporalmente todos los nombres de las categorías a un único nombre y luego agregar una columna con los nombres originales. A continuación, presento una imagen que muestra cómo insertar el "Fields Parameter" y el código necesario:

![Inserta aquí la imagen y el código](https://raw.githubusercontent.com/CSalcedoDataBI/PowerBI-Deneb/main/Diagramas_Pareto/FIles/Pareto_Dinamico_Deneb_VegaLite_P1_Encabezado.gif)

El código generado ha sido modificado para ajustar la primera columna y se ha agregado una última columna con los nombres de las categorías correspondientes:

<pre class="highlight"><code>
ParameterCategory =
{
    ( "Category", NAMEOF ( 'financials'[Country] ), 0, "Country" ),
    ( "Category", NAMEOF ( 'financials'[Month Name] ), 1, "Month Name" ),
    ( "Category", NAMEOF ( 'financials'[Product] ), 2, "Product" ),
    ( "Category", NAMEOF ( 'financials'[Segment] ), 3, "Segment" )
}
</code></pre>

 Además, agregaremos un filtro de selección única para la columna calculada, tal y como se muestra en la siguiente imagen.

![Inserta aquí la imagen y el código](https://raw.githubusercontent.com/CSalcedoDataBI/PowerBI-Deneb/main/Diagramas_Pareto/FIles/Pareto_Dinamico_Deneb_VegaLite_P1_Encabezado.gif)

Para implementar esto, accedemos al editor de Deneb y eliminamos la categoría "Product". Automáticamente, aparecerá un cuadro de diálogo que solicita esa categoría. En este punto, seleccionamos el campo de Field Parameter y lo elegimos, como se muestra en la imagen adjunta. Luego, hacemos clic en "Crear".

![Inserta aquí la imagen y el código](https://raw.githubusercontent.com/CSalcedoDataBI/PowerBI-Deneb/main/Diagramas_Pareto/FIles/Pareto_Dinamico_Deneb_VegaLite_P1_Encabezado.gif)

Agregando Fieds Parameter a Deneb
Como puedes ver, ahora tienes Field Parameter disponible en tu visualización.

![Inserta aquí la imagen y el código](https://raw.githubusercontent.com/CSalcedoDataBI/PowerBI-Deneb/main/Diagramas_Pareto/FIles/Pareto_Dinamico_Deneb_VegaLite_P1_Encabezado.gif)

Hasta este punto, hemos cubierto todos los aspectos necesarios. Sin embargo, si deseas ir aún más allá, podemos agregar otro parámetro para permitir la personalización de los estilos del gráfico de manera dinámica. Sigue los siguientes pasos:

## Paso 7: Implementar el parámetro "Numeric Range" para permitir la personalización dinámica de estilos en el gráfico

En este paso, utilizaremos la opción "Numeric Range" del parámetro de Fields Parameter para permitir la personalización dinámica de estilos en nuestro gráfico. Sigue estos pasos para implementarlo:

Dentro de la opción Fields Parameter, elige la opción "Numeric Range" en lugar de "Fields List".

Define los valores de rango numérico que deseas utilizar para personalizar los estilos en el gráfico. Por ejemplo, puedes establecer un rango de 1 a 3, ver imagen:

![Inserta aquí la imagen y el código](https://raw.githubusercontent.com/CSalcedoDataBI/PowerBI-Deneb/main/Diagramas_Pareto/FIles/Pareto_Dinamico_Deneb_VegaLite_P1_Encabezado.gif)

1. Utiliza el parámetro "Numeric Range" como filtro de selección única en la columna que deseas utilizar para personalizar los estilos.

2. A continuación, insertamos una columna calculada para las categorías de estilos (puedes nombrarlas como desees):

<pre class="highlight"><code>
Style =
IF (
    ParameterStyle[ParameterValue] = 1,
    "Style 1",
    IF (
        ParameterStyle[ParameterValue] = 2,
        "Style 2",
        "Style 3"
    )
)
</code></pre>

 Utilizaremos esta columna calculada como filtro de selección única.

## Paso 8: Utilizar las variables de estilo en la capa de color para lograr un estilo dinámico en los visuales

En este paso, utilizaremos las variables de estilo que hemos definido para lograr un estilo dinámico en la capa de color de nuestro gráfico. Sigue estos pasos para implementarlo:

Trae la medida "ParameterValue" que hemos creado en el Paso 7 a tu visual.

Declara los parámetros necesarios para traducir y crear condiciones que produzcan el efecto dinámico en el estilo. Utiliza el siguiente código:

<pre class="highlight"><code>
"params":[
    {
        "name":"Style",
        "expr":"pluck(data('dataset'),'ParameterValue')[0]"
    },
    {
        "name":"color1",
        "expr":"Style === 1? 'black': Style === 2? '#080202': '#799351'"
    },
    {
        "name":"color2",
        "expr":"Style === 1? 'gray': Style === 2? '#454545': '#F7D060'"
    },
    {
        "name":"color3",
        "expr":"Style === 1? 'red': Style === 2? '#DDE6ED': '#CD1818'"
    }
]
</code></pre>

 En este código, hemos declarado las variables de estilo como "color1", "color2" y "color3". Cada una de estas variables tiene una expresión condicional que determina el color según el valor de la medida "ParameterValue".

 1. Utiliza estas variables de estilo en la capa de color de tu visual para lograr un estilo dinámico. Aquí tienes un ejemplo de cómo hacerlo:

<pre class="highlight"><code>
"color":{
    "field":"%_Acumulado",
    "type":"quantitative",
    "scale":{
        "range":[
            {
                "expr":"color1"
            },
            {
                "expr":"color2"
            },
            {
                "expr":"color3"
            }
        ]
    },
    "legend":null
}
</code></pre>

Además, agregamos lo siguiente a la propiedad "resolve":     "color": "independent"  Ver imagen:

![Inserta aquí la imagen y el código](https://raw.githubusercontent.com/CSalcedoDataBI/PowerBI-Deneb/main/Diagramas_Pareto/FIles/Pareto_Dinamico_Deneb_VegaLite_P1_Encabezado.gif)

En este ejemplo, hemos utilizado las variables de estilo en el rango de colores de la escala de la capa de color. De esta manera, el estilo del gráfico se actualizará dinámicamente según el valor de la medida "ParameterValue".

Continúa explorando y experimentando con diferentes valores en el parámetro "Numeric Range" para ver cómo se reflejan en el estilo de tu gráfico. ¡Disfruta de la personalización dinámica de estilos en tus visuales!

## Conclusión

Hemos explorado en este artículo la creación del Diagrama de Pareto Vertical en  utilizando herramientas como  y . A lo largo de este proceso, hemos aprendido a personalizar los ejes, calcular variables de porcentaje, aplicar estilos y colores llamativos, e incluso incorporar parámetros dinámicos para lograr categorías personalizables y estilos flexibles. Estas técnicas nos permiten visualizar y analizar los datos de una manera más efectiva, identificando rápidamente los factores clave y tomando decisiones fundamentadas.

El Diagrama de Pareto Vertical es una valiosa herramienta para el análisis de datos, ya que nos brinda una representación clara y concisa de la distribución y relevancia de los diferentes elementos en un conjunto de datos. Al utilizar estas técnicas y herramientas en Power BI, podemos potenciar nuestras visualizaciones y obtener información más significativa para la toma de decisiones. ¡Sigue explorando y experimentando con estas técnicas para aprovechar al máximo el potencial de tus datos en Power BI!

🖋️ Escrito por Cristobal Salcedo Beltran con la ayuda de Pesante Analytics Llc

Descarga de la Plantilla y Visualización
Para facilitar la implementación de esta funcionalidad en tu propio proyecto, ponemos a tu disposición la plantilla de visualización en Deneb. Puedes descargar el archivo PBIX desde el siguiente enlace:

<https://github.com/cristobalsalcedo90/PowerBI-Deneb/raw/main/Diagrama%20de%20Pareto%20Vertical%20en%20Power%20BI%20con%20Deneb%20y%20Vega%20Lite%20(Parte%202%20).pbix>

Plantilla .json edesde el siguiente enlace:

PowerBI-Deneb/Diagrama de Pareto Vertical en Power BI con Deneb y Vega Lite (Parte 2 ).json at main · cristobalsalcedo90/PowerBI-Deneb · GitHub

Referencias y Recursos
Aquí tienes algunas referencias útiles que puedes consultar para obtener más información sobre el diagrama de Pareto vertical en Power BI utilizando Deneb y Vega Lite:

Documentación de D3.js: <https://github.com/d3/d3-format#locale_format>

Documentación Fields Parameter: Permita que los lectores de informes usen parámetros de campo para cambiar objetos visuales (versión preliminar) - Power BI | Microsoft Learn

Documentacion de Deneb: Declarative Visualization in Power BI | Deneb (deneb-viz.github.io)

Blog de Jon Peltier: <https://peltiertech.com/pareto-charts/>

Contribuciones de Carlos Barboza: <https://lnkd.in/eSwKQnSk>

Estas fuentes te proporcionarán información adicional y te ayudarán a explorar más a fondo el tema del diagrama de Pareto vertical.

Platilla:
<pre class="highlight"><code>
 {
"$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "usermeta": {
    "deneb": {
      "build": "1.5.1.0",
      "metaVersion": 1,
      "provider": "vegaLite",
      "providerVersion": "5.6.1"
    },
    "interactivity": {
      "tooltip": true,
      "contextMenu": true,
      "selection": true,
      "highlight": true,
      "dataPointLimit": 50
    },
    "information": {
      "name": "Diagrama de Pareto Vertical",
      "description": "Diagrama de Pareto Vertical en Power BI con Deneb y Vega Lite (Parte 2 )",
      "author": "Cristobal-Salcedo",
      "uuid": "30b29750-4291-4dec-aba7-59ba83b9e8cb",
      "generated": "2023-06-20T05:01:06.585Z"
    },
    "dataset": [
      {
        "key": "__0__",
        "name": "Category",
        "description": "",
        "type": "text",
        "kind": "column"
      },
      {
        "key": "__1__",
        "name": "Total Ventas",
        "description": "",
        "type": "numeric",
        "kind": "measure"
      },
      {
        "key": "__2__",
        "name": "ParameterValue",
        "description": "",
        "type": "numeric",
        "kind": "measure"
      }
    ]
  },
  "config": {
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
    "axisX": {
      "labelPadding": 5,
      "labelAngle": 0
    },
    "axisY": {
      "labelPadding": 10,
      "labels": false
    },
    "header": {
      "titleFont": "wf_standard-font, helvetica, arial, sans-serif",
      "titleFontSize": 16,
      "titleColor": "#252423",
      "labelFont": "Segoe UI",
      "labelFontSize": 12,
      "labelColor": "#605E5C"
    },
    "legend": {
      "title": "Principio de Pareto",
      "orient": "top",
      "symbolStrokeWidth": 0,
      "padding": 10,
      "labelFont": "Helvetica Neue, Arial",
      "labelFontSize": 14,
      "labelFontWeight": "normal",
      "labelColor": "#333333",
      "titleFont": "Helvetica Neue, Arial",
      "titleFontSize": 14,
      "titleFontWeight": "normal",
      "titleColor": "#333333",
      "gradientLength": 200,
      "gradientStrokeWidth": 0,
      "gradientHeight": 20,
      "gradientThickness": 10,
      "gradientLabelOffset": 4,
      "gradientLabelFont": "Helvetica Neue, Arial",
      "gradientLabelFontSize": 12,
      "gradientLabelFontWeight": "normal",
      "gradientLabelColor": "#333333"
    }
  },
  "data": {"name": "dataset"},
  "params": [
    {
      "name": "Style",
      "expr": "pluck(data('dataset'),'__2__')[0]"
    },
    {
      "name": "color1",
      "expr": "Style === 1? 'black': Style=== 2? '#080202': '#799351'"
    },
    {
      "name": "color2",
      "expr": "Style ===1? 'gray':Style===2? '#454545': '#F7D060'"
    },
    {
      "name": "color3",
      "expr": "Style ===1? 'red': Style=== 2?'#DDE6ED': '#CD1818'"
    }
  ],
  "transform": [
    {
      "sort": [
        {
          "field": "__1__",
          "order": "descending"
        }
      ],
      "window": [
        {
          "field": "__1__",
          "op": "sum",
          "as": "Total_Ventas_Acumulado"
        }
      ],
      "ignorePeers": true
    },
    {
      "sort": [{"field": "__1__"}],
      "window": [
        {
          "field": "__1__",
          "op": "sum",
          "as": "_GranTotal_Ventas"
        }
      ],
      "frame": [null, null]
    },
    {
      "calculate": "datum.Total_Ventas_Acumulado/datum._GranTotal_Ventas",
      "as": "%_Acumulado"
    },
    {
      "calculate": "datum['__1__']/datum._GranTotal_Ventas",
      "as": "PCT"
    }
  ],
  "layer": [
    {
      "layer": [
        {
          "mark": {
            "type": "bar",
            "opacity": 0.3,
            "tooltip": true
          },
          "encoding": {
            "x": {"field": "__1__"},
            "color": {
              "field": "%_Acumulado",
              "type": "quantitative",
              "scale": {
                "range": [
                  {"expr": "color1"},
                  {"expr": "color2"},
                  {"expr": "color3"}
                ]
              },
              "legend": null
            }
          }
        },
        {
          "mark": {
            "type": "bar",
            "tooltip": true
          },
          "encoding": {
            "x": {
              "field": "__1____highlight",
              "axis": {"labels": false}
            },
            "color": {
              "field": "%_Acumulado",
              "type": "quantitative",
              "scale": {
                "range": [
                  {"expr": "color1"},
                  {"expr": "color2"},
                  {"expr": "color3"}
                ]
              },
              "legend": null
            },
            "opacity": {
              "condition": {
                "test": {
                  "field": "__selected__",
                  "equal": "off"
                },
                "value": 0
              },
              "value": 1
            }
          }
        },
        {
          "mark": {
            "type": "text",
            "color": "#333333",
            "xOffset": 20
          },
          "encoding": {
            "text": {
              "field": "__1__",
              "format": "0.2s"
            },
            "x": {"field": "__1__"}
          }
        }
      ]
    },
    {
      "layer": [
        {
          "mark": {
            "type": "line",
            "color": "black",
            "point": {
              "color": "black",
              "filled": false,
              "fill": "white"
            }
          },
          "encoding": {
            "x": {
              "field": "%_Acumulado"
            }
          }
        },
        {
          "mark": {
            "type": "text",
            "color": "#333333",
            "xOffset": 25
          },
          "encoding": {
            "text": {
              "field": "%_Acumulado",
              "format": "0.0%",
              "formatType": "pbiFormat"
            },
            "x": {
              "field": "%_Acumulado",
              "axis": {
                "orient": "bottom",
                "formatType": "pbiFormat",
                "format": "0.0%",
                "values": [
                  0,
                  0.4,
                  0.8,
                  1
                ],
                "tickCount": 4
              }
            },
            "color": {
              "field": "%_Acumulado",
              "type": "quantitative",
              "scale": {
                "range": [
                  "#17202A",
                  "#D7DBDD",
                  "#ECF0F1"
                ],
                "reverse": true
              },
              "legend": null
            }
          }
        },
        {
          "mark": {"type": "text"},
          "encoding": {
            "text": {
              "field": "PCT",
              "format": "0.0%",
              "formatType": "pbiFormat"
            },
            "x": {"value": -25}
          }
        }
      ]
    }
  ],
  "resolve": {
    "scale": {
      "x": "independent",
      "color": "independent"
    }
  },
  "encoding": {
    "y": {
      "field": "__0__",
      "type": "nominal",
      "sort": {
        "field": "__1__",
        "op": "sum",
        "order": "descending"
      },
      "axis": {
        "labels": true,
        "title": "",
        "labelFontSize": 14,
        "offset": 40
      }
    },
    "x": {
      "type": "quantitative",
      "axis": {"title": ""}
    },
    "tooltip": [
      {
        "field": "__1__",
        "title": "Monto de Venta |",
        "format": "$#0,,0",
        "formatType": "pbiFormat"
      },
      {
        "field": "%_Acumulado",
        "title": "Porcentaje |",
        "format": "0.0%",
        "formatType": "pbiFormat"
      }
    ]
  }
}
</code></pre>
