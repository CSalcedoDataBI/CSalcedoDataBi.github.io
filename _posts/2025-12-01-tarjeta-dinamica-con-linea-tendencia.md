---
title: "Cómo crear un gráfico de tarjeta dinámica con líneas de tendencia en Power BI utilizando Vega-Lite y Deneb"
author: csalcedodatabi
date: 2025-12-01 00:00:00 +0000
categories: [Blogging, Tutorial]
tags: [Deneb, Vega-Lite, Pareto]
pin: false
image:
  path: https://github.com/CSalcedoDataBI/PowerBI-Deneb/blob/main/Tarjetas_Dinamicas/Files/Tarjetas_Dinamicas_Tendencia_Deneb_VegaLite.gif
  alt: "Tarjeta Dinámica con Líneas de Tendencia"
description: "Una guía detallada para crear un gráfico de tarjeta dinámico con líneas de tendencia en Power BI utilizando Deneb y Vega-Lite."
---


Introducción
En este artículo, exploraremos cómo crear un gráfico de tarjeta dinámico en Power BI utilizando **Deneb** y **Vega-Lite**. Esta idea está inspirada en el post de Brian Julius, donde demuestra cómo agregar líneas de tendencia dinámicas a las tarjetas visuales en **Power BI** utilizando M, Python y R. En lugar de utilizar **M, Python** y **R**, utilizaremos **Deneb** y **Vega-Lite** para lograr un resultado similar de una manera más visual y programática.

Paso 1: Configuración inicial
Comenzaremos con la configuración inicial, donde utilizaremos el código compartido por Brian Julius en Power Query. Utilizaremos este código en una consulta en blanco y eliminaremos los dos pasos finales que requieren paquetes de R. Además, normalizaremos los datos realizando una operación de 'unpivot' para tener una sola columna de categoría y otra con el valor del precio. Aquí puede ver los datos preparados: `DatosPreparados.pbix`
Paso 2: Crear Medidas en DAX y Transformaciones de datos en Vega-Lite
En este paso, crearemos una medida en DAX llamada "Price__Total" utilizando la función SUM para sumar los valores de la columna "Price". Puedes utilizar otro nombre de medida si lo deseas.

Price__Total = SUM (DATOS[Price])

Nota: Puede usar otro nombre de medida si lo desea.

Una vez creada la medida, procederemos a ingresarla en el visual junto con el campo "Date" y el campo "Stock" que contiene la categoría.

En este punto, utilizaremos la transformación de ventana (Window) en Vega-Lite para obtener el primer y último valor de "Price__Total" y "Date". Luego, aplicaremos transformaciones adicionales utilizando la función "calculate" para obtener la diferencia, el cambio porcentual y las etiquetas descriptivas.

// Fragmento de código para las transformaciones de datos contenido en variables:

```json
"transform": [
    {
      "window": [
        {
          "field": "Price__Total",
          "op": "first_value",
          "as": "first_value"
        },
        {
          "field": "Date",
          "op": "first_value",
          "as": "first_date"
        }
      ]
    },
    {
      "window": [
        {
          "field": "Price__Total",
          "op": "last_value",
          "as": "last_value"
        },
        {
          "field": "Date",
          "op": "last_value",
          "as": "last_date"
        },
        {
          "field": "Date",
          "op": "count",
          "as": "CountRow"
        }
      ],
      "frame": [null, null]
    },
    {
      "calculate": "datum.last_value - datum.first_value",
      "as": "SentimentColor"
    },
    {
      "calculate": "(datum.last_value - datum.first_value) / datum.first_value",
      "as": "PctDiff"
    },
    {
      "calculate": "pbiFormat(datum.first_date,'M-dd-yyyy') + ' to '+ pbiFormat(datum.last_date,'M-dd-yyyy')",
      "as": "__date__"
    },
    {
      "calculate": "datum['Stock'] + ' ' + datum.CountRow + '-Day' + (datum.PctDiff < 0 ? ' Loss ' : ' Gain ') + pbiFormat(datum.PctDiff, '0.0%')",
      "as": "__title__"
    }
  ]
```

Paso 3: Configuración de las capas de visualizaciones:
Ajustaremos el ancho y la altura del gráfico y crearemos una capa inicial para el fondo y la representación del cambio de sentimiento. Agregaremos etiquetas de texto para mostrar información relevante como el precio actual, el título, la fecha y el cambio porcentual.

// Fragmento de código para la configuración de la visualización

```json
    {
      "transform": [
        {"filter": "datum.__row__ == 1"}
      ],
      "layer": [
        {
          "mark": {
            "type": "rect",
            "align": "left",
            "fill": "gray",
            "opacity": 0.1,
            "height": 170,
            "width": 385,
            "yOffset": 60,
            "xOffset": -180,
            "cornerRadius": 15
          }
        },
        {
          "mark": {
            "type": "rect",
            "align": "left",
            "color": {
              "expr": "datum.SentimentColor<0? 'firebrick':'green'"
            },
            "height": 170,
            "width": 15,
            "yOffset": 60,
            "xOffset": 200
          }
        },
        {
          "mark": {
            "type": "text",
            "color": "black",
            "fontWeight": 600,
            "fontSize": 14
          },
          "encoding": {
            "text": {
              "value": "Current Price"
            },
            "x": {"value": -100},
            "y": {"value": 40}
          }
        },
        {
          "mark": {
            "type": "text",
            "align": "left",
            "color": "black",
            "fontWeight": 900,
            "fontSize": 14
          },
          "encoding": {
            "text": {
              "field": "__title__"
            },
            "x": {"value": -160},
            "y": {"value": -52}
          }
        },
        {
          "mark": {
            "type": "text",
            "color": "black",
            "align": "left",
            "fontWeight": 400,
            "fontSize": 10
          },
          "encoding": {
            "text": {
              "field": "__date__"
            },
            "x": {"value": -160},
            "y": {"value": -35}
          }
        },
        {
          "mark": {
            "type": "text",
            "color": {
              "expr": "datum.SentimentColor<0? 'firebrick':'green'"
            },
            "fontWeight": 700,
            "fontSize": 25
          },
          "encoding": {
            "text": {
              "field": "last_value",
              "formatType": "pbiFormat",
              "format": "$0.0"
            },
            "x": {"value": -100},
            "y": {"value": 70}
          }
        }
      ]
    }
```Creación del gráfico de línea:

Agregaremos una segunda capa para mostrar el gráfico de línea principal. Configuraremos las propiedades del gráfico, como el grosor, el color y la opacidad, y utilizaremos la codificación adecuada para los ejes x e y.

// Fragmento de código para la creación del gráfico de línea:

```json
    {  "mark": {
        "type": "line",
        "strokeWidth": 1.5,
        "color": "black",
        "opacity": 0.7,
        "tooltip": true
      },
      "encoding": {
        "y": {"field": "Price__Total"}
      }
    }
```
Paso 4: Agregar líneas de tendencia:
Agregaremos una tercera capa para mostrar las líneas de tendencia en el gráfico de línea. Aplicaremos una regresión de "Price__Total" en función de "Date" para obtener las líneas de tendencia. Calcularemos la diferencia entre el último y el primer valor de "Price__Total" y la guardaremos en la columna "SentimentColor", esto para darle color si es menor que cero quiere decir que el cambio tuvo un decrecimiento o tuvo un crecimiento en el caso positivo. Hay que tener en cuenta que esta es otra capa de transformaciones debido a que usamos un método de regresión lineal y solo deja visible la variable X, que en este caso es 'Date', y la variable Y, que en este caso es 'Total_Price'.

// Fragmento de código para agregar líneas de tendencia

```json
    {
  "transform": [
        {
          "regression": "Price__Total",
          "on": "Date"
        },
        {
          "window": [
            {
              "field": "Price__Total",
              "op": "first_value",
              "as": "first_value"
            }
          ]
        },
        {
          "window": [
            {
              "field": "Price__Total",
              "op": "last_value",
              "as": "last_value"
            }
          ],
          "frame": [null, null]
        },
        {
          "calculate": "datum.last_value-datum.first_value",
          "as": "SentimentColor"
        }
      ],
      "mark": {
        "type": "line",
        "strokeWidth": 1.5,
        "strokeDash": [4, 8],
        "color": {
          "expr": "datum.SentimentColor<0? 'firebrick' : 'green' "
        }
      },
      "encoding": {
        "x": {
          "field": "Date",
          "type": "ordinal"
        },
        "y": {
          "field": "Price__Total",
          "type": "quantitative"
        }
      }
    }
```
Paso 5: Ajustes finales:
En esta etapa final, realizaremos ajustes adicionales para personalizar las etiquetas y estilos del gráfico según tus preferencias. Es importante configurar correctamente los ejes x e y, incluyendo las escalas, los títulos y el formato de las etiquetas. Estos ajustes permitirán mejorar la apariencia y la legibilidad del gráfico.

En el caso de Deneb, una ventaja es que podemos utilizar la sintaxis declarativa de los lenguajes **Vega** o **Vega-Lite** para personalizar y adaptar nuestro visual a nuestras necesidades. Podemos aprovechar las características interactivas de Power BI y lograr una representación más rápida de los datos.

Es importante tener en cuenta que **Deneb** permite crear visuales como en **Vega** y **Vega-Lite**, lo que amplía las posibilidades de personalización y permite realizar tareas más avanzadas. "Con Deneb en Power BI, ¡todo es posible!"

Para finalizar, me gustaría abrir un tema de discusión y que compartas tus comentarios al respecto. La nueva tarjeta de **Power BI** permite incluir varios KPI, mientras que en este visual solo podemos ver uno. Sin embargo, con **Deneb**, podemos superar esta limitación y lograr concatenar varias imágenes o, si eres un usuario avanzado en estos lenguajes, realizar infinidad de cosas. Te animo a explorar esta posibilidad y compartir tus desarrollos, creando así una comunidad en esta red social de **Power BI**. Sería gratificante conocer personas interesadas en este material y poder intercambiar conocimientos.

Conclusiones:
En este artículo, hemos explorado cómo crear un gráfico de tarjeta dinámico en Power BI utilizando Vega-Lite y Deneb. Aprovechando las capacidades de diseño y visualización de Vega-Lite y la integración de Deneb en Power BI, podemos lograr visualizaciones impactantes y dinámicas sin la necesidad de utilizar código Python y R. ¡Explora estas herramientas y crea gráficos de tarjeta impresionantes en tus informes de Power BI!

Espero que este artículo te haya ayudado a crear tu gráfico de tarjeta dinámico utilizando Vega-Lite y Deneb en Power BI. Recuerda que con Deneb en Power BI, las posibilidades son ilimitadas. ¡Sigue explorando y creando visualizaciones únicas!

Descarga de la Plantilla y Visualización
Para facilitar la implementación de esta funcionalidad en tu propio proyecto, ponemos a tu disposición la plantilla de visualización en Deneb. Puedes descargar el archivo PBIX desde el siguiente enlace:

<https://github.com/CSalcedoDataBI/PowerBI-Deneb/raw/main/Gr%C3%A1fico%20de%20tarjeta%20din%C3%A1mico%20con%20l%C3%ADneas%20de%20tendencia%20en%20Power%20BI%20utilizando%20Vega-Lite%20y%20Deneb.pbix>

Plantilla .json desde el siguiente enlace:

[Plantilla JSON para Gráfico de Dispersión Etiquetado](https://github.com/CSalcedoDataBI/PowerBI-Deneb/blob/ab4175e174ef4c203da0b15153a58766db151556/Dispersion_Etiquetados/Files/Dispersion_Etiquetada.json)

Referencias y Recursos
Aquí tienes algunas referencias útiles que puedes consultar para obtener más información sobre el gráfico de tarjeta dinámica en Power BI utilizando Deneb y Vega-Lite:

Documentación de D3.js: <https://github.com/d3/d3-format#locale_format>

Post Brian: [Perfil de Brian Julius en LinkedIn](https://www.linkedin.com/in/brianjulius/)

Documentación Deneb: [Visualización declarativa en Power BI | Deneb](https://deneb-viz.github.io/)

Estas fuentes te proporcionarán información adicional y te ayudarán a explorar más a fondo el tema del diagrama de Pareto vertical.

Agradecimientos:
Me gustaría expresar mi profundo agradecimiento a Brian Julius por ser una fuente de inspiración y contribuir de manera invaluable a este artículo. Su post sobre la adición de líneas de tendencia dinámicas a las tarjetas visuales en Power BI utilizando M, Python y R ha sido fundamental para el desarrollo de este contenido. Agradezco su conocimiento y generosidad al compartir ideas que han enriquecido significativamente este artículo.

También quiero agradecer a Daniel Marsh-Patrick, el creador de **Deneb**, por brindarnos la oportunidad de utilizar esta poderosa herramienta en Power BI. Su dedicación y trabajo arduo han permitido que los usuarios exploremos nuevas posibilidades en la visualización de datos.

*   Pesante Analytics Llc
*   Kerry Kolosko
*   Andrzej Leszkiewicz
*   Madison Giammaria
*   Ben Ferry
*   Davide Bacci
*   Jefferson Alves
*   Juan David Bohorquez Giraldo
*   Imran Haq

Quiero expresar mi sincero agradecimiento por su contribución y por ser una fuente constante de aprendizaje.

Plantilla:
```json
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
      "name": "Gráfico de Tarjeta Dinámica en Power BI con Vega-Lite y Deneb",
      "description": "Gráfico de Tarjeta Dinámica en Power BI con Vega-Lite y Deneb",
      "author": "Cristobal Salcedo",
      "uuid": "598831c3-650c-4740-97db-214254dadcb4",
      "generated": "2023-06-23T15:50:21.169Z"
    },
    "dataset": [
      {
        "key": "__0__",
        "name": "Date",
        "description": "",
        "type": "dateTime",
        "kind": "column"
      },
      {
        "key": "__1__",
        "name": "Stock",
        "description": "",
        "type": "text",
        "kind": "column"
      },
      {
        "key": "__2__",
        "name": "Price__Total",
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
  "data": {"name": "dataset"},
  "transform": [
    {
      "window": [
        {
          "field": "__2__",
          "op": "first_value",
          "as": "first_value"
        },
        {
          "field": "__0__",
          "op": "first_value",
          "as": "first_date"
        }
      ]
    },
    {
      "window": [
        {
          "field": "__2__",
          "op": "last_value",
          "as": "last_value"
        },
        {
          "field": "__0__",
          "op": "last_value",
          "as": "last_date"
        },
        {
          "field": "__0__",
          "op": "count",
          "as": "CountRow"
        }
      ],
      "frame": [null, null]
    },
    {
      "calculate": "datum.last_value - datum.first_value",
      "as": "SentimentColor"
    },
    {
      "calculate": "(datum.last_value - datum.first_value) / datum.first_value",
      "as": "PctDiff"
    },
    {
      "calculate": "pbiFormat(datum.first_date,'M-dd-yyyy') + ' to '+ pbiFormat(datum.last_date,'M-dd-yyyy')",
      "as": "__date__"
    },
    {
      "calculate": "datum['__1__'] + ' ' + datum.CountRow + '-Day' + (datum.PctDiff < 0 ? ' Loss ' : ' Gain ') + pbiFormat(datum.PctDiff, '0.0%')",
      "as": "__title__"
    }
  ],
  "width": 200,
  "height": 120,
  "layer": [
    {
      "transform": [
        {"filter": "datum.__row__ == 1"}
      ],
      "layer": [
        {
          "mark": {
            "type": "rect",
            "align": "left",
            "fill": "gray",
            "opacity": 0.1,
            "height": 170,
            "width": 385,
            "yOffset": 60,
            "xOffset": -180,
            "cornerRadius": 15
          }
        },
        {
          "mark": {
            "type": "rect",
            "align": "left",
            "color": {
              "expr": "datum.SentimentColor<0? 'firebrick':'green'"
            },
            "height": 170,
            "width": 15,
            "yOffset": 60,
            "xOffset": 200
          }
        },
        {
          "mark": {
            "type": "text",
            "color": "black",
            "fontWeight": 600,
            "fontSize": 14
          },
          "encoding": {
            "text": {
              "value": "Current Price"
            },
            "x": {"value": -100},
            "y": {"value": 40}
          }
        },
        {
          "mark": {
            "type": "text",
            "align": "left",
            "color": "black",
            "fontWeight": 900,
            "fontSize": 14
          },
          "encoding": {
            "text": {
              "field": "__title__"
            },
            "x": {"value": -160},
            "y": {"value": -52}
          }
        },
        {
          "mark": {
            "type": "text",
            "color": "black",
            "align": "left",
            "fontWeight": 400,
            "fontSize": 10
          },
          "encoding": {
            "text": {
              "field": "__date__"
            },
            "x": {"value": -160},
            "y": {"value": -35}
          }
        },
        {
          "mark": {
            "type": "text",
            "color": {
              "expr": "datum.SentimentColor<0? 'firebrick':'green'"
            },
            "fontWeight": 700,
            "fontSize": 25
          },
          "encoding": {
            "text": {
              "field": "last_value",
              "formatType": "pbiFormat",
              "format": "$0.0"
            },
            "x": {"value": -100},
            "y": {"value": 70}
          }
        }
      ]
    },
    {
      "mark": {
        "type": "line",
        "strokeWidth": 1.5,
        "color": "black",
        "opacity": 0.7,
        "tooltip": true
      },
      "encoding": {
        "y": {"field": "__2__"}
      }
    },
    {
      "transform": [
        {
          "regression": "__2__",
          "on": "__0__"
        },
        {
          "window": [
            {
              "field": "__2__",
              "op": "first_value",
              "as": "first_value"
            }
          ]
        },
        {
          "window": [
            {
              "field": "__2__",
              "op": "last_value",
              "as": "last_value"
            }
          ],
          "frame": [null, null]
        },
        {
          "calculate": "datum.last_value-datum.first_value",
          "as": "SentimentColor"
        }
      ],
      "mark": {
        "type": "line",
        "strokeWidth": 1.5,
        "strokeDash": [4, 8],
        "color": {
          "expr": "datum.SentimentColor<0? 'firebrick' : 'green' "
        }
      },
      "encoding": {
        "x": {
          "field": "__0__",
          "type": "ordinal"
        },
        "y": {
          "field": "__2__",
          "type": "quantitative"
        }
      }
    }
  ],
  "encoding": {
    "x": {
      "field": "__0__",
      "timeUnit": "monthdate",
      "type": "nominal",
      "axis": {
        "labelExpr": "[datum.label[0] + '-' +split[datum.label,' '](1)]",
        "title": "",
        "labelFontSize": 8,
        "labelSeparation": 1,
        "tickCount": 10
      }
    },
    "y": {
      "type": "quantitative",
      "axis": {
        "labelFontSize": 8,
        "title": ""
      },
      "scale": {
        "type": "linear",
        "zero": false
      }
    }
  }
}
```
