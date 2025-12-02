---
title: "Diagrama de Pareto con Deneb y Vega-Lite en Power BI (Parte 2)"
author: csalcedodatabi
date: 2024-10-03 23:34:00 +0800
categories: [Blogging, Tutorial]
tags: [Deneb, Vega, Pareto]
pin: false
image:
  path: https://raw.githubusercontent.com/CSalcedoDataBI/PowerBI-Deneb/752fca72da2d872e8b6c5c64288a5e6b2ad12247/Diagramas_Pareto/FIles/Pareto_Dinamico_Deneb_VegaLite_P2.gif
  alt: "Cross-Filtering y Cross-Highlight Scatter Plot"
description: "Continúa la guía para crear un diagrama de Pareto usando Deneb y Vega-Lite en Power BI. Esta es la segunda parte de la serie."
---

Imagina un mundo donde no tienes que lidiar con la complejidad de las variables necesarias para crear un gráfico de Pareto cada vez que lo necesitas. En lugar de eso, simplemente utilizas una plantilla de Deneb, predefinida que incorpora todas las características y mejoras estéticas que has definido previamente. Esta plantilla puede ser reutilizada en múltiples informes, simplemente asignando las dos variables principales: tu categoría X y tu valor o medida Y. Así de sencillo, así de eficiente 🚀.

## Uso de DAX y Vega-lite

En la primera parte de este artículo, utilizamos **DAX** y **Vega-lite**,
aqui esta el enlace a la [versión combinada con DAX](https://csalcedodatabi.github.io/posts/diagrama-pareto-parte-1/).

## Alternativa con Vega-Lite

En esta alternativa, usamos **Vega-Lite** y las dos variables principales: la variable categórica ``"Product"`` y la variable cuantitativa ``"Total Venta"``. Utilizaremos Vega-Lite para calcular las variables adicionales requeridas para construir el gráfico de Pareto.

Para lograr esto, agregaremos un nuevo flujo de transformaciones de datos justo después de la propiedad <kbd>"data": {"name": "dataset"}</kbd>. Estas transformaciones nos permitirán realizar una serie de operaciones para calcular las variables necesarias utilizando únicamente las variables originales "Product" y "Total Venta".

A continuación, mostraremos el código para estas transformaciones:

<pre class="highlight"><code>
  "transform":[
   {
      "sort":[
         {
            "field":"Total Ventas",
            "order":"descending"
         }
      ],
      "window":[
         {
            "field":"Total Ventas",
            "op":"sum",
            "as":"Total_Ventas_Acumulado"
         }
      ],
      "ignorePeers":true
   },
   {
      "sort":[
         {
            "field":"Total Ventas"
         }
      ],
      "window":[
         {
            "field":"Total Ventas",
            "op":"sum",
            "as":"_GranTotal_Ventas"
         }
      ],
      "frame":[
         null,
         null
      ]
   },
   {
      "calculate":"datum.Total_Ventas_Acumulado/datum._GranTotal_Ventas",
      "as":"%_Acumulado"
   }
]
</code></pre>

### Explicación de las Transformaciones

1. **Ordenamiento de Datos:**  
   Los datos de ventas se ordenan en orden descendente. Esto se logra con el bloque `sort` que ordena el campo "Total Ventas" en orden "descending".

2. **Cálculo del Total Acumulado de Ventas:**  
   Se utiliza la transformación ``window`` para calcular el total acumulado de ventas. Esto se logra con la operación `sum` en el campo "Total Ventas", y el resultado se almacena en el nuevo campo <kbd>Total_Ventas_Acumulado</kbd>.

3. **Cálculo del Gran Total de Ventas:**  
   De manera similar, se utiliza otra transformación `window` para calcular el gran total de ventas. Nuevamente, se aplica la operación ``sum`` en el campo "Total Ventas", y el resultado se almacena en el nuevo campo <kbd>GranTotal_Ventas</kbd>.

4. **Cálculo del Porcentaje Acumulado:**  
   Finalmente, se realiza un cálculo para obtener el porcentaje acumulado. Esto se logra dividiendo el "<kbd>Total_Ventas_Acumulado</kbd>" entre  "<kbd>GranTotal_Ventas</kbd>. El resultado se almacena en un nuevo campo "<kbd>%_Acumulado</kbd>".

Estas transformaciones permiten analizar los datos de ventas de una manera más detallada y significativa. Ahora, con todas las variables necesarias calculadas, podemos proceder a construir nuestro gráfico de Pareto.

A continuación, te mostramos una imagen que ilustra cómo se ve el código insertado y el nuevo flujo de datos <kbd>data_0</kbd> en el editor de Deneb. Este flujo de datos muestra el cálculo de las tres variables adicionales que hemos creado utilizando las transformaciones mencionadas anteriormente:

![Paso 4 Ver](/assets/img/post-diagrama-pareto-parte-2/image_2.png)

En la imagen anterior, puedes observar cómo las secciones de código están enumeradas y corresponden a las columnas agregadas en un nuevo flujo de datos. Este flujo de datos se transforma a nivel de visualización, lo que demuestra el increíble poder de Deneb y Vega-Lite. Es similar a realizar una referencia en Power Query y luego aplicar transformaciones adicionales a partir de ella.

Esta potencia también se ve reflejada en la valiosa característica de Deneb de poder copiar nuestras visualizaciones como plantillas JSON, facilitando su reutilización en futuros proyectos.

## Conclusión

Con este enfoque alternativo, hemos demostrado cómo utilizar Deneb y Vega-Lite para construir un gráfico de Pareto utilizando solo dos variables, aprovechando al máximo las capacidades de transformación de datos de Vega-Lite. Esperamos que este artículo te haya sido útil e inspirador para explorar y sacar el máximo provecho de Deneb y Vega-Lite en tus propias visualizaciones de datos.

Puedes descargar el archivo PBIX y la plantilla .json utilizados en este artículo aquí 👇:

[🔽 Pareto_Dinamico_Deneb_VegaLite_P2.pbix](https://github.com/CSalcedoDataBI/PowerBI-Deneb/raw/main/Diagramas_Pareto/FIles/Pareto_Dinamico_Deneb_VegaLite_P2.pbix) (1.88 MB)

[🔽 Plantilla_Pareto_Dinamico_Deneb_VegaLite_P2.json:](https://github.com/CSalcedoDataBI/PowerBI-Deneb/blob/752fca72da2d872e8b6c5c64288a5e6b2ad12247/Diagramas_Pareto/FIles/Pareto_Dinamico_Deneb_VegaLite_P2.json) (6.13 KB)

Estos enlaces te proporcionarán acceso a los archivos PBIX y la plantilla .json utilizados en este artículo, permitiéndote explorar y adaptar los ejemplos a tus propias necesidades. ¡Buena suerte y diviértete explorando!

🖋️ Escrito por Cristobal Salcedo Beltran con la ayuda de Pesante Analytics Llc

## Plantilla

<pre class="highlight"><code>
{
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "usermeta": {
    "deneb": {
      "build": "1.6.2.1",
      "metaVersion": 1,
      "provider": "vegaLite",
      "providerVersion": "5.16.3"
    },
    "interactivity": {
      "tooltip": true,
      "contextMenu": true,
      "selection": true,
      "highlight": true,
      "dataPointLimit": 50
    },
    "information": {
      "name": "Gráfico de Pareto Dinámico con Deneb y Vega-Lite",
      "description": "Plantilla de gráfico de Pareto para visualizar distribución de ventas por producto. Detecta productos clave con el Principio de Pareto. Ideal para analistas, especialistas en visualización y comunicación efectiva de patrones de ventas.",
      "author": "Cristobal-Salcedo",
      "uuid": "2dd4d879-524a-48c4-8180-b43e81ca0e71",
      "generated": "2024-05-12T01:50:08.479Z"
    },
    "dataset": [
      {
        "key": "__0__",
        "name": "Product",
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
      }
    ]
  },
  "config": {
    "view": {"stroke": "transparent"},
    "line": {"strokeWidth": 3},
    "point": {
      "filled": true,
      "size": 75
    },
    "text": {
      "font": "Segoe UI",
      "fontSize": 12,
      "fill": "#605E5C"
    },
    "axis": {
      "ticks": false,
      "grid": false,
      "domain": false
    },
    "axisX": {
      "labelPadding": 5,
      "labelAngle": 0,
      "labelFontSize": 14
    },
    "axisY": {
      "labelPadding": 10,
      "labels": false
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
      "titleColor": "#333333"
    }
  },
  "description": "Gráfico de Pareto Dinámico con Deneb y Vega-Lite, Author : Cristobal Salcedo Beltran, Email address: csalcedo90@gmail.com",
  "data": {"name": "dataset"},
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
    }
  ],
  "title": {
    "text": "Ventas por producto (Principio de Pareto)",
    "subtitle": "'Muestra la contribución de los productos al total de ventas",
    "fontSize": 20,
    "color": "#333333"
  },
  "layer": [
    {
      "layer": [
        {
          "mark": {"type": "bar"},
          "encoding": {
            "y": {"field": "__1__"},
            "color": {
              "field": "%_Acumulado",
              "type": "nominal",
              "scale": {
                "domain": [
                  "0% - 80%",
                  "80% - 100%"
                ],
                "range": [
                  "#7F7F7F",
                  "#D62728"
                ]
              },
              "title": "Principio de Pareto"
            }
          }
        },
        {
          "mark": {
            "type": "bar",
            "opacity": 0.3,
            "tooltip": true,
            "color": {
              "expr": "datum['%_Acumulado']<=0.8?'#7F7F7F': '#D62728'"
            }
          },
          "encoding": {
            "y": {"field": "__1__"}
          }
        },
        {
          "mark": {
            "type": "bar",
            "color": {
              "expr": "datum['%_Acumulado']<=0.8?'#7F7F7F': '#D62728'"
            },
            "tooltip": true
          },
          "encoding": {
            "y": {
              "field": "__1____highlight"
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
            "yOffset": -16
          },
          "encoding": {
            "text": {
              "field": "__1__",
              "format": "$#0,0",
              "formatType": "pbiFormat"
            },
            "y": {"field": "__1__"}
          }
        }
      ]
    },
    {
      "layer": [
        {
          "mark": {
            "type": "line",
            "color": "#1F77B4",
            "point": {
              "color": "#1F77B4",
              "filled": false,
              "fill": "white"
            }
          },
          "encoding": {
            "y": {
              "field": "%_Acumulado"
            }
          }
        },
        {
          "mark": {
            "type": "text",
            "color": "#333333",
            "yOffset": -16
          },
          "encoding": {
            "text": {
              "field": "%_Acumulado",
              "format": "0.0%",
              "formatType": "pbiFormat"
            },
            "y": {
              "field": "%_Acumulado"
            }
          }
        }
      ]
    }
  ],
  "resolve": {
    "scale": {"y": "independent"}
  },
  "encoding": {
    "x": {
      "field": "__0__",
      "type": "nominal",
      "sort": {
        "field": "__1__",
        "op": "sum",
        "order": "descending"
      }
    },
    "y": {
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
