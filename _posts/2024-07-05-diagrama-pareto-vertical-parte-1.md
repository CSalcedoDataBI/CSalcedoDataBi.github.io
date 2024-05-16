---
title: "Diagrama de Pareto Vertical en Power BI con Deneb y Vega Lite (Parte: 1)"
author: "Cristobal Salcedo Beltran"
date: 2024-07-03 23:34:00 +0800
categories: [Blogging, Tutorial]
tags: [Deneb, Vega-Lite, Pareto]
pin: false
image:
  path: https://raw.githubusercontent.com/CSalcedoDataBI/PowerBI-Deneb/main/Diagramas_Pareto/FIles/Pareto_Dinamico_Deneb_VegaLite_P1_Encabezado.gif
  alt: "Cross-Filtering y Cross-Highlight Scatter Plot"
description: "Una guía detallada para crear un diagrama de Pareto usando Deneb y Vega-Lite en Power BI. Esta es la primera parte de la serie."
---


En este artículo, me complace continuar explorando el fascinante mundo del diagrama de Pareto vertical. Esta técnica, presentada inicialmente por Jon Peltier en su blog (https://peltiertech.com/pareto-charts/), ha sido ampliada y refinada por carlos barboza, quien ha creado una versión llamativa y única en . Agradezco sinceramente a ambos expertos por sus contribuciones valiosas en este campo.

Hoy, deseo presentarles una emocionante variante del diagrama de Pareto vertical utilizando  en combinación con las potentes herramientas  y . Esta combinación nos permitirá obtener resultados sorprendentes y flexibles al visualizar y analizar datos. Asimismo, me gustaría adoptar un lema que guiará todos mis futuros artículos, siempre y cuando la voluntad divina así lo permita: "Con Deneb en Power BI, ¡todo es posible!"

Implementación Paso a Paso:
Paso 1: Descargar el archivo PBIX que se utilizará pa este tuturial.
Comenzaremos descargando el archivo PBIX que utilizaremos para este tutorial. Pueden encontrar el enlace de descarga al final del artículo anterior:


o acceder directamente a él aquí.

Paso 2: Convertir el diagrama de Pareto de horizontal a vertical en el editor de Deneb.
Una vez que hayamos descargado el archivo PBIX, procederemos a abrirlo y seleccionaremos la opción "Editar" al hacer clic en los tres puntos. Esto abrirá el editor de Deneb.

En el panel de especificaciones, utilizaremos la función de búsqueda presionando Ctrl + F. Buscaremos la letra "x" y la reemplazaremos por la letra "z", tal como se muestra en la imagen adjunta.

Minimizar imagen
Editar imagen
Borrar imagen
No hay texto alternativo para esta imagen
Truco: Remplazando "y" por "z"
A continuación, realizaremos la búsqueda de la letra "y" y la reemplazaremos por la letra "x". Repetiremos este paso para reemplazar la letra "z" por la letra "y". Este intercambio nos permitirá cambiar los valores del eje x por los valores del eje y.

Es importante asegurarnos de seleccionar la opción "reemplazar todo" (ALL) para que todos los valores del eje x se conviertan en valores del eje y, y viceversa.

Una vez que hayamos realizado los cambios, aplicaremos las modificaciones y podremos ver la primera versión del diagrama de Pareto vertical así:

Minimizar imagen
Editar imagen
Borrar imagen
No hay texto alternativo para esta imagen
Primera versión de Pareto Vertical 😍😍
Paso 3: Personalizar los ejes, ocultando los valores del eje X principal y aplicando formato de porcentaje y divisiones al eje X secundario
En esta etapa, nos enfocaremos en personalizar y configurar los ejes del diagrama de Pareto vertical que incluye dos ejes X. Realizaremos ajustes específicos en cada uno de ellos. A continuación, detallo los subpasos:

  Ajustes para el primer eje X: "Total Ventas"

Para ocultar los valores del primer eje X y enfocar la atención en el eje X secundario, utilizaremos el siguiente código:

"axis": {"labels": false}

Con esta configuración, los valores del eje X principal no serán mostrados, lo que nos permitirá resaltar el segundo eje X.

  Ajustes para el segundo eje X: "%_Acumulado"

Para el segundo eje X, que representa la variable "%_Acumulado", realizaremos los siguientes ajustes:

"axis": {

"orient": "bottom",

"formatType": "pbiFormat",

"format": "0.0%",

"values": [0, 0.4, 0.8, 1],

"tickCount": 4

}
Ver imagen:

Minimizar imagen
Editar imagen
Borrar imagen
No hay texto alternativo para esta imagen
Limpiando Ejes
Estas configuraciones establecen que el segundo eje X se ubique en la parte inferior del gráfico. Además, aplicamos el formato de porcentaje con un decimal utilizando "formatType" y "format". Especificamos los valores que deseamos mostrar en el eje utilizando el arreglo [0, 0.4, 0.8, 1]. Por último, con "tickCount" definimos el número de divisiones del eje, estableciéndolo en 4. 

Paso 4: Calcular el porcentaje de participación y generar las etiquetas correspondientes.
 Dentro de la matriz de transformación, agregamos el siguiente código:

 {
     "calculate": "datum['Total Ventas']/datum._GranTotal_Ventas",

     "as": "PCT"

   }
Con este código, calculamos la variable "PCT" que representa el porcentaje de participación. Dividimos el valor de "Total Ventas" entre el valor total de ventas acumuladas (datum._GranTotal_Ventas) para obtener el porcentaje correspondiente. 

En la capa visual, dentro de la propiedad "layer", encontramos dos capas anidadas. En el segundo "layer", en la última capa, añadimos el siguiente código:



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
Con esta configuración, utilizamos la marca de texto para mostrar el valor de "PCT" como una etiqueta en el gráfico. Especificamos el campo "PCT" como fuente de texto y aplicamos el formato "0.0%" para mostrar el porcentaje con un decimal. Además, establecemos la posición horizontal (x) en -25 para ajustar la ubicación de la etiqueta:

 { "axis": 
        "labels": true,
        "title": "",
        "labelFontSize": 14,
        "offset": 40
      }
 como puede ver en la siguiente imagen

Minimizar imagen
Editar imagen
Borrar imagen
No hay texto alternativo para esta imagen

Paso 5: Ajustar el desplazamiento y el formato de las etiquetas utilizando la biblioteca D3.
En la capa visual donde mostramos las etiquetas de "Total Ventas", realizaremos cambios en el formato y el desplazamiento de las mismas. En lugar de utilizar el formato proporcionado por Power BI, utilizaremos la biblioteca D3 para lograr el formato deseado y aplicar ajustes personalizados. A continuación, se detallan los cambios necesarios: 

En la misma capa visual, modificaremos las propiedades de formato de la siguiente manera: 

Reemplazamos:

"format": "$#0,,0",

"formatType": "pbiFormat"

Por:

"format": "0.2s"

Esto cambiará el formato de las etiquetas de "Total Ventas" a una representación más adecuada utilizando la notación abreviada, como "1.5M" para 1.5 millones.

 Luego, cambiaremos "yOffset" por "xOffset" en la misma capa visual:

"xOffset": 20 

Adicionalmente, en la capa de "%_Acumulado", también ajustaremos el desplazamiento:

"xOffset": 25

Estos cambios asegurarán que las etiquetas estén formateadas correctamente y se desplacen adecuadamente en el gráfico. Puedes consultar la imagen adjunta para mayor claridad y hacer referencia al número de líneas modificadas o agregadas.

Si has seguido estos pasos, la imagen proporcionada será una guía útil para visualizar los cambios realizados

Minimizar imagen
Editar imagen
Borrar imagen
No hay texto alternativo para esta imagen

Como puedes observar, hemos logrado obtener nuestro Pareto Vertical como lo deseamos, tal como se muestra en la imagen anterior. Por último, para esta primera parte, podemos agregar un color más llamativo y dependiendo del objetivo.

Añadiremos una escala de colores a la capa donde declaramos las barras para resaltar visualmente los datos. Pero antes eliminamos las siguientes líneas de código ver imagen:

Minimizar imagen
Editar imagen
Borrar imagen
No hay texto alternativo para esta imagen

Ahora podemos utilizar el siguiente código para establecer la escala de color:

    { "color": 
              "field": "Total_Ventas_Acumulado",
              "type": "quantitative",
              "scale": {
                "range": [
                  "#7F7F7F",
                  "#D62728"
                ]
              },
              "legend": null
            }
Este código asigna colores a las barras según los valores de la variable "Total_Ventas_Acumulado". En este caso, hemos definido una escala de color con dos tonos: '' y ''. Puedes ajustar estos valores de color según tus preferencias y objetivos de visualización.

En la siguiente imagen insertamos la escala de color para las barras con los dos colores mencionados:

Minimizar imagen
Editar imagen
Borrar imagen
No hay texto alternativo para esta imagen

En esta otra imagen insertamos tres colores así:

Minimizar imagen
Editar imagen
Borrar imagen
No hay texto alternativo para esta imagen

Y por último para pulir, en esta otra insertamos color al texto del grafico de línea y dentro de la propiedad resolve, declaramos que el color es independiente así:

 "resolve": {

    "scale": {

      "x": "independent",

      "color": "independent"

    }
  }
Así:

Minimizar imagen
Editar imagen
Borrar imagen
No hay texto alternativo para esta imagen

Conclusión 
En conclusión, hemos explorado el fascinante mundo del diagrama de Pareto vertical utilizando Power BI, Deneb y Vega Lite. A través de los pasos detallados, hemos aprendido a convertir un diagrama de Pareto de horizontal a vertical, personalizar los ejes y calcular variables de porcentaje. Sin embargo, aún hay más por descubrir. En la próxima entrega, continuaremos explorando nuevas técnicas y conceptos, incluyendo la incorporación de parámetros dinámicos para obtener categorías personalizables y estilos flexibles en el gráfico. ¡Mantente atento para no perderte la segunda parte de este emocionante artículo!

Es importante destacar que este artículo se ha centrado principalmente en los aspectos técnicos de la implementación. Si deseas profundizar en el análisis de datos y explorar nuevas técnicas y conceptos, te invitamos a consultar nuestros artículos adicionales y seguirnos en Pesante Analytics Llc. Nuestra plataforma proporciona recursos valiosos y materiales de aprendizaje para ayudarte a aprovechar al máximo ,  y  en Power BI.

Aprovecha las infinitas posibilidades que estas herramientas ofrecen para visualizar, analizar y comprender tus datos. Recuerda que estamos aquí para ayudarte en caso de que surjan preguntas o necesites más clarificaciones. ¡Sigue explorando y descubriendo nuevas formas de potenciar tus visualizaciones de datos!

🖋️ Escrito por Cristobal Salcedo Beltran con la ayuda de Pesante Analytics Llc

Descarga de la Plantilla y Visualización
Para facilitar la implementación de esta funcionalidad en tu propio proyecto, ponemos a tu disposición la plantilla de visualización en Deneb. Puedes descargar el archivo PBIX desde el siguiente enlace:

https://github.com/cristobalsalcedo90/PowerBI-Deneb/raw/main/Diagrama%20de%20Pareto%20Vertical%20en%20Power%20BI%20con%20Deneb%20y%20Vega%20Lite%20(Parte%201).pbix

Plantilla .json edesde el siguiente enlace:

PowerBI-Deneb/Diagrama de Pareto Vertical en Power BI con Deneb y Vega Lite (Parte 1).json at main · cristobalsalcedo90/PowerBI-Deneb · GitHub

Referencias y Recursos
Aquí tienes algunas referencias útiles que puedes consultar para obtener más información sobre el diagrama de Pareto vertical en Power BI utilizando Deneb y Vega Lite:

Documentación de D3.js: https://github.com/d3/d3-format#locale_format

Blog de Jon Peltier: https://peltiertech.com/pareto-charts/

Contribuciones de Carlos Barboza: https://lnkd.in/eSwKQnSk

Estas fuentes te proporcionarán información adicional y te ayudarán a explorar más a fondo el tema del diagrama de Pareto vertical.

Platilla:

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
      "description": "Diagrama de Pareto Vertical en Power BI con Deneb y Vega Lite (Parte: 1)",
      "author": "Cristobal-Salcedo",
      "uuid": "88a97e3a-26fd-4c80-8e8f-98934537107d",
      "generated": "2023-06-19T05:12:48.455Z"
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
    "font": "Segoe UI",
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
      "titleFont": "wf_standard-font",
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
    "legend": {
      "title": "Principio de Pareto",
      "orient": "top",
      "symbolStrokeWidth": 0,
      "padding": 10
    }
  },
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
    },
    {
      "calculate": "datum['__1__']/datum._GranTotal_Ventas",
      "as": "PCT"
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
          "mark": {
            "type": "bar",
            "opacity": 0.3,
            "tooltip": true
          },
          "encoding": {
            "x": {"field": "__1__"},
            "color": {
              "field": "Total_Ventas_Acumulado",
              "type": "quantitative",
              "scale": {
                "range": [
                  "#000000",
                  "#7F7F7F",
                  "#D62728"
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
            "opacity": {
              "condition": {
                "test": {
                  "field": "__selected__",
                  "equal": "off"
                },
                "value": 0
              },
              "value": 1
            },
            "color": {
              "field": "Total_Ventas_Acumulado",
              "type": "quantitative",
              "scale": {
                "range": [
                  "#000000",
                  "#7F7F7F",
                  "#D62728"
                ]
              },
              "legend": null
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
            "color": "#1F77B4",
            "point": {
              "color": "#1F77B4",
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
              "field": "Total_Ventas_Acumulado",
              "type": "quantitative",
              "scale": {
                "range": [
                  "white",
                  "white",
                  "black"
                ]
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