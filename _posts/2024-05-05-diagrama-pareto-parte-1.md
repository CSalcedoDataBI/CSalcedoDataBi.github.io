---
title: "Diagrama de Pareto con Deneb y Vega-Lite en Power BI: Guía paso a paso (Parte 1)"
author: "Cristobal Salcedo Beltran"
date: 2024-05-03 23:34:00 +0800
categories: [Blogging, Tutorial]
tags: [Deneb, Vega, Pareto]
pin: false
image:
  path: /assets/img/post-dispersion-etiquetados-vega/dispersion-etiquetados.png
  alt: "Cross-Filtering y Cross-Highlight Scatter Plot"
description: "Una guía detallada para crear un diagrama de Pareto usando Deneb y Vega-Lite en Power BI. Esta es la primera parte de la serie."
---


>"El principio de Pareto, también conocido como la regla del 80/20, puede aplicarse en diversos contextos, incluyendo el empresarial. Por ejemplo, puede ser útil para identificar qué productos, clientes, proveedores o regiones representan el 80% de las ventas totales de una empresa".
{: .prompt-tip }

 En este artículo, te guiaremos paso a paso para crear un diagrama de Pareto utilizando Deneb, una herramienta de visualización personalizada que se conecta con el lenguaje  o . Mostraremos dos enfoques, uno utilizando  y otro con transformaciones avanzadas en .

## Paso 1: Preparación de datos

Antes de crear nuestro diagrama de Pareto, debemos preparar nuestros datos. Utilizaremos los datos de muestra suministrados por Power Bi en su sitio web, que puedes descargar desde este enlace: <https://go.microsoft.com/fwlink/?LinkID=521962>. También puedes acceder a estos datos siguiendo estos pasos:

-         Iniciar Power Bi.

-         Dar clic en el último botón que está en el lienzo del informe y dice "Probar    datos de ejemplo".

-         Elegir la tabla "Financials".

-         Dar clic en "Cargar datos al modelo" y listo.

## Paso 2: Crear una medida DAX

En este paso, nos basaremos en el blog escrito por **Amal BEN REBAI**, [How to find your best sub-categories of products that make up 80% of total sales?](https://amalbenrebai.substack.com/p/how-to-identify-product-sub-categories). Crearemos las medidas Total Ventas, Acumulado de Ventas Por Producto y % Acumulado de Ventas por Producto, utilizando el código proporcionado en el artículo, aquí presento una versión ajustada:

- Medida: Suma de las Ventas:

<pre class="highlight"><code>/*  
```dax
Total Ventas = SUM ( financials[ Sales] )
```
*/</code></pre>

- Medida: Acumulado de ventas por producto:

```dax
Acumulado de ventas Por Producto =
SUMX (
    WINDOW (
        1,
        ABS,
        0,
        REL,
        ALLSELECTED ( 'financials'[Product] ),
        ORDERBY ( [Total Ventas], DESC )
    ),
    [Total Ventas]
)
```

- Medida: % Acumulado de ventas por producto:
  
```dax
% Acumulado de Ventas por Producto =
VAR __TotalVentas =
    CALCULATE (
        [Total Ventas],
        ALLSELECTED ( 'financials'[Product] )
    )
VAR __Acumulado = [Acumulado de ventas Por Producto]
RETURN
    DIVIDE (
        __Acumulado,
        __TotalVentas
    )
```

## Paso 3: Creación de un visual de tabla

Para facilitar la comprensión, crearemos un visual de tabla con las columnas Product, Total Ventas, Acumulado de Ventas Por Producto y % Acumulado de Ventas por Producto. El visual debe verse como en la imagen proporcionada.

Minimizar imagen
Editar imagen
Borrar imagen
No hay texto alternativo para esta imagen

## Paso 4: Cambiar el visual de tabla a Deneb

Después de haber agregado el visual Deneb a la colección de visuales en Power Bi, seleccionaremos nuestro visual de tabla y lo cambiaremos a Deneb. Se debe ver como en la imagen proporcionada.

Minimizar imagen
Editar imagen
Borrar imagen
No hay texto alternativo para esta imagen

## Paso 5: Editar el visual de Deneb

Haz clic en los tres puntos suspensivos y elige "Editar visual de Deneb". Verás la imagen proporcionada en el artículo.

Minimizar imagen
Editar imagen
Borrar imagen
No hay texto alternativo para esta imagen

## Paso 6: Seleccionar plantilla y ajustar código

Dejamos seleccionado Vega-Lite por defecto y elegimos la plantilla "Simple Bar Chart". Asignamos la categoría "Product" al campo categórico y "Total Venta" al campo cuantitativo. Al hacerlo, se activará el botón "Crear", así:

Minimizar imagen
Editar imagen
Borrar imagen
No hay texto alternativo para esta imagen

Ya tenemos gran parte del código necesario para nuestro visual. Es una buena práctica comenzar con una plantilla y realizar pequeños ajustes para obtener el resultado deseado. No es necesario ser un experto en Vega o Vega-Lite para crear visuales personalizados. Al finalizar este artículo, te mostraremos una técnica para reutilizar el visual creado sin tener que repetir el proceso cada vez que lo necesites. Por ahora, realicemos los ajustes necesarios para crear nuestro diagrama de Pareto.

## Paso 7: Cambiar los ejes X e Y

Para cambiar el eje X al categórico "Product" y el eje Y a la variable cuantitativa "Total Ventas", modifica el fragmento de código de la siguiente manera:

Código original:
```json
"encoding":{
   "x":{
      "field":"Product",
      "type":"nominal"
   },
   "y":{
      "field":"Total Ventas",
      "type":"quantitative"
   }
}
```

Código modificado:

```json
"encoding":{
   "y":{
      "field":"Product",
      "type":"nominal"
   },
   "x":{
      "field":"Total Ventas",
      "type":"quantitative"
   }
}
```
A continuación, se muestra la imagen completa con las modificaciones necesarias para cambiar los ejes X e Y:

Minimizar imagen
Editar imagen
Borrar imagen
No hay texto alternativo para esta imagen

## Paso 8: Limpiar y ordenar etiquetas en los ejes X e Y

Para cambiar la orientación de las etiquetas de la categoría en el eje X de vertical a horizontal y ocultar las etiquetas en el eje Y, sigue estos pasos en el editor de Deneb:

Haz clic en el panel de configuración.

Cambia la orientación de la etiqueta en el eje X agregando <kbd>"labelAngle": 0</kbd> a la propiedad <kbd>"axisX": {}</kbd>. De esta manera, la orientación de la etiqueta cambiará a horizontal o al ángulo que desees.

 Oculta las etiquetas en el eje Y agregando <kbd>"labels": false</kbd> a la propiedad <kbd>"axisY": {}</kbd>.

 A continuación, se muestra la imagen con el panorama completo de los cambios realizados en las etiquetas de los ejes X e Y:

Minimizar imagen
Editar imagen
Borrar imagen
No hay texto alternativo para esta imagen
Imagen con cambios en las etiquetas de los ejes X e Y aquí

## Paso 9: Ordenar el gráfico de mayor a menor según la variable "Total Venta"

Para ordenar el gráfico de acuerdo con la variable "Total Venta" de mayor a menor, sigue estos pasos:

Regresa al panel de especificaciones en el editor de Deneb (si deseas conocer todos los botones y paneles de la versión de Deneb 1.5, puedes ver este video donde se explico cada uno de sus componentes : <https://youtu.be/odIYzsS11Qg>.

Agrega la propiedad <kbd>"sort"</kbd> en el eje X, de la siguiente manera:

```json
"sort":{
   "field":"Total Ventas",
   "op":"sum",
   "order":"descending"
}
```
<kbd>"field": "Total Ventas"</kbd> Especifica el campo (columna) del conjunto de datos que se utilizará como criterio de ordenación. En este caso, se utiliza la columna <kbd>"Total Ventas"</kbd>.

<kbd>"op": "sum"</kbd> Define la operación de agregación que se aplicará a los datos antes de ordenarlos. En este caso, se utiliza la función sum para sumar los valores de <kbd>"Total Ventas"</kbd>.

<kbd>"order": "descending"</kbd> Establece el orden de clasificación. En este caso, se utiliza "descending" para ordenar los datos de mayor a menor.

Al agregar este código, el gráfico se ordenará de acuerdo con la suma de "Total Ventas" para cada categoría en el eje X, mostrando los valores en orden descendente. Esto facilita la identificación visual de las categorías de productos que generan la mayor parte de las ventas.

Aprovecha para quitar el título del eje Y. A continuación, se muestra la imagen con las modificaciones realizadas para ordenar el gráfico y quitar el título del eje Y:

Minimizar imagen
Editar imagen
Borrar imagen
No hay texto alternativo para esta imagen
Imagen con cambios en la ordenación y quitando título del eje Y

## Paso 10: Agregar el gráfico de línea como una capa adicional en el array "layer"

Hasta ahora, si has seguido los pasos, te darás cuenta de que dentro del array "layer" existen dos objetos visuales, cada uno con un "mark" de tipo "bar" (gráfico de barras). A continuación, añadiremos un nuevo objeto para el gráfico de línea:

```json
"mark":{
   "type":"line",
   "interpolate":"linear",
   "color":"red",
   "point":{
      "color":"#1F77B4",
      "filled":false,
      "fill":"white"
   }
},
"encoding":{
   "y":{
      "field":"% Acumulado de Ventas por Producto"
   }
}
```

Este objeto define un gráfico de línea con las siguientes características:

<kbd>"type": "line</kbd> Establece que el tipo de marca será una línea.

<kbd>"interpolate": "linear"</kbd> Define que la interpolación de la línea será lineal.

<kbd>"color": "red"</kbd> Establece el color de la línea en rojo.

<kbd>"point":{...}</kbd> Define la apariencia de los puntos en la línea, con un color de borde azul, sin relleno y con un relleno blanco.

La propiedad "encoding" en este objeto especifica que el eje Y del gráfico de línea utilizará el campo "% Acumulado de Ventas por Producto" como valor.

Mira la siguiente imagen y observa que la línea está justo a nivel cero:

Minimizar imagen
Editar imagen
Borrar imagen
No hay texto alternativo para esta imagen
imagen con gráfico de línea justo a nivel cero
El problema aquí es que estamos usando un eje Y a una escala mayor que la del porcentaje. Debemos activar un segundo eje Y para graficar el porcentaje, que generalmente está a una escala de 0 a 1. Para ello, agrega el siguiente código después del array <kbd>"layer":</kbd>

```json
"resolve":{
   "scale":{
      "y":"independent"
   }
}, 
```
La propiedad "resolve" y su atributo "scale" indican que el eje Y utilizará escalas independientes para cada capa. De esta manera, el gráfico de línea usará una escala adecuada para representar el porcentaje acumulado de ventas por producto.

Esto resuelve el problema, y lo puedes ver en la siguiente imagen:

Minimizar imagen
Editar imagen
Borrar imagen
No hay texto alternativo para esta imagen

Al agregar este nuevo objeto y el segundo eje Y, el gráfico de línea mostrará el porcentaje acumulado de ventas por producto, facilitando la identificación de las categorías de productos que representan el 80% de las ventas totales. También puede ver en la imagen anterior los métodos de interpolación que se pueden usar en el gráfico de línea.

## Paso 11: Agregar capas de etiquetas al gráfico de líneas y al gráfico de barras dentro del array "layer"

A continuación, añadiremos dos nuevos objetos dentro del array "layer" para agregar etiquetas a los gráficos de líneas y barras. Estas etiquetas proporcionarán información adicional sobre el porcentaje acumulado de ventas por producto y el total de ventas.

Etiquetas para el gráfico de líneas:

.......
Este objeto define una capa de etiquetas con las siguientes características:

"type": "text": Establece que el tipo de marca será texto.

"color": "#333333": Establece el color del texto en gris oscuro.

"yOffset": -16: Desplaza las etiquetas hacia arriba en 16 unidades para evitar solapamientos con los puntos de la línea.

La propiedad "encoding" en este objeto especifica que el contenido de las etiquetas será el porcentaje acumulado de ventas por producto, con un formato de porcentaje (0.0%) utilizando el tipo de formato "pbiFormat".

Etiquetas para el gráfico de barras:

```json
{
   "mark":{
      "type":"text",
      "color":"#333333",
      "yOffset":-16
   },
   "encoding":{
      "text":{
         "field":"% Acumulado de Ventas por Producto",
         "format":"0.0%",
         "formatType":"pbiFormat"
      },
      "y":{
         "field":"% Acumulado de Ventas por Producto"
      }
   }
}
```

Este objeto define otra capa de etiquetas con las siguientes características:

<kbd>"type": "text"</kbd> Establece que el tipo de marca será texto.

<kbd>"color": "#333333"</kbd> Establece el color del texto en gris oscuro.

<kbd>"yOffset": -8</kbd> Desplaza las etiquetas hacia arriba en 8 unidades para evitar solapamientos con las barras.

La propiedad <kbd>"encoding"</kbd> en este objeto especifica que el contenido de las etiquetas será el total de ventas, con un formato de moneda <kbd>($#0,0)</kbd> utilizando el tipo de formato "pbiFormat".

Al agregar estas capas de etiquetas, el gráfico de Pareto se vuelve más informativo y fácil de interpretar, mostrando valores exactos para cada punto de la línea y cada barra en el gráfico. Ver la siguiente Imagen:

Minimizar imagen
Editar imagen
Borrar imagen
No hay texto alternativo para esta imagen
Imagen del gráfico de Pareto con etiquetas😍
Paso 12: Agregar color condicional a los gráficos de barras
Para mejorar la visualización, agregaremos un color condicional a los gráficos de barras. Esto permitirá resaltar las barras que representan el 80% de las ventas acumuladas en un color diferente al de las barras restantes.

Aplicar color condicional al primer gráfico de barras:
```json
   "mark":{
      "type":"bar",
      "opacity":0.3,
      "tooltip":true,
      "color":{
         "expr":"datum['% Acumulado de Ventas por Producto']<=0.8?'#7F7F7F':'#D62728'"
      }
   },
   "encoding":{
      "y":{
         "field":"Total Ventas"
      }
   }
}
```

En el objeto de marca, hemos agregado la propiedad "color" con la siguiente expresión:

"expr": "datum['% Acumulado de Ventas por Producto'] <=0.8 ?' ': ''": Esta expresión asigna un color gris () a las barras que representan hasta el 80% de las ventas acumuladas y un color rojo () a las barras restantes.

  1. Aplicar color condicional al segundo gráfico de barras:

```json
{
   "mark":{
      "type":"bar",
      "tooltip":true,
      "color":{
         "expr":"datum['% Acumulado de Ventas por Producto']<=0.8?'#7F7F7F': '#D62728'"
      }
   },
   "encoding":{
      "y":{
         "field":"Total Ventas__highlight"
      },
      "opacity":{
         "condition":{
            "test":{
               "field":"__selected__",
               "equal":"off"
            },
            "value":0
         },
         "value":1
      }
   }
}
```
Al igual que en el primer gráfico de barras, hemos agregado la propiedad "color" con la misma expresión para asignar colores condicionales. En este caso, estamos usando esta capa adicional para destacar las barras seleccionadas en el gráfico de barras. La documentación de Deneb menciona cómo las selecciones se pueden utilizar para resaltar elementos en la visualización, por lo que no queremos pasar por alto una breve explicación, de lo que pasa aquí:
```json
{
   "encoding":{
      "y":{
         "field":"Total Ventas__highlight"
      },
      "opacity":{
         "condition":{
            "test":{
               "field":"__selected__",
               "equal":"off"
            },
            "value":0
         },
         "value":1
      }
   }
}
```
<kbd>"field": "Total Ventas__highlight"</kbd> Este campo representa los valores de las ventas totales que se deben destacar cuando se selecciona otro gráfico, en el contexto.

<kbd>"opacity": { ... }"</kbd> Esta propiedad de codificación controla la opacidad de las barras en función de si están seleccionadas o no.

<kbd>"condition": { ... }"</kbd> La condición especifica qué sucede cuando se cumple un cierto criterio. En este caso, el criterio está relacionado con la selección de las barras en el gráfico.

<kbd>"test": { "field": "**selected**", "equal": "off" }"</kbd> Este objeto de prueba verifica si la barra seleccionada está en estado "off" (es decir, no seleccionada). Si la barra no está seleccionada, la condición se cumple y se aplica el valor de opacidad especificado.

<kbd>"value": 0</kbd> Cuando la condición se cumple (la barra no está seleccionada), la opacidad de la barra se establece en 0, lo que hace que la barra sea transparente.

<kbd>"value": 1</kbd> Este es el valor predeterminado de opacidad para las barras cuando no se cumple la condición (es decir, cuando una barra está seleccionada). En este caso, la opacidad se establece en 1, lo que hace que la barra sea completamente visible.

Ver imagen final:

Minimizar imagen
Editar imagen
Borrar imagen
No hay texto alternativo para esta imagen
Color condicional a los gráficos de barras
Conclusión
En este artículo, hemos explorado cómo crear un gráfico de Pareto utilizando Deneb y Vega-Lite, y hemos examinado varios aspectos clave de la visualización, como la incorporación de capas, la interacción y la selección de elementos, y la personalización de colores y leyendas.

Hemos llegado hasta el punto en el que, al seleccionar una barra en el gráfico o cualquier otro gráfico en el contexto, las barras no seleccionadas o no filtradas por el contexto se vuelven transparentes, mientras que las seleccionadas o filtradas se destacan. Esto permite a los usuarios centrarse en los elementos seleccionados y analizarlos con mayor detalle.

Dado que este artículo se ha vuelto bastante extenso, nos detendremos aquí y continuaremos explorando más características y posibilidades de Deneb y Vega-Lite en un próximo artículo. Estén atentos para obtener más información y consejos sobre cómo aprovechar al máximo estas potentes herramientas de visualización de datos.

Descarga de la Plantilla y Visualización
Para facilitar la implementación de esta funcionalidad en tu propio proyecto, ponemos a tu disposición la plantilla de visualización en Deneb. Puedes descargar el archivo PBIX desde el siguiente enlace:

<https://github.com/cristobalsalcedo90/PowerBI-Deneb/raw/main/Pareto%20Vega%20lite.pbix>

Plantilla .json edesde el siguiente enlace:

cristobalsalcedo90/PowerBI-Deneb (github.com)

Agradecimientos
Para concluir, quisiera expresar mi más profundo agradecimiento a mi equipo en Pesante Analytics Llc quienes me brindaron la oportunidad de aprender este lenguaje declarativo, bajo la experta guía de Daniel Marsh-Patrick. Gracias a esta capacitación, hemos podido aportar un gran valor a los proyectos de nuestros clientes. No olvides seguir a Pesante Analytics Llc en  para estar al tanto de nuestras últimas actualizaciones y publicaciones.

Esperamos que este artículo te haya sido de utilidad e inspirado a descubrir y aprovechar al máximo las capacidades de Deneb y Vega-Lite en tus propias visualizaciones de datos.

Plantilla:

```json
{
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "usermeta": {
    "deneb": {
      "build": "1.5.0.0",
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
      "name": "Pareto",
      "description": "[No Description Provided]",
      "author": "Cristobal Salcedo",
      "uuid": "a236726a-0d2a-4cdc-9963-44f0bf1dc803",
      "generated": "2023-05-03T18:47:49.498Z",
      "previewImageBase64PNG": ""
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
        "name": "% Acumulado de Ventas por Producto",
        "description": "",
        "type": "numeric",
        "kind": "measure"
      },
      {
        "key": "__2__",
        "name": "Acumulado de ventas Por Producto",
        "description": "",
        "type": "numeric",
        "kind": "measure"
      },
      {
        "key": "__3__",
        "name": "Total Ventas",
        "description": "",
        "type": "numeric",
        "kind": "measure"
      }
    ]
  },
  "config": {},
  "data": { "name": "dataset" },
  "title": {
    "text": "Ventas por producto (Principio de Pareto)",
    "subtitle": "'Muestra la contribución de los productos al total de ventas",
    "fontSize": 20,
    "color": "#333333"
  },
  "layer": [
    {
      "mark": { "type": "bar" },
      "encoding": {
        "y": { "field": "__3__" },
        "color": {
          "field": "__1__",
          "type": "nominal",
          "scale": {
            "domain": ["0% - 80%", "80% - 100%"],
            "range": ["#7F7F7F", "#D62728"]
          },
          "legend": {
            "title": "Principio de Pareto",
            "orient": "top",
            "padding": 10,
            "labelFont": "Helvetica Neue, Arial",
            "labelFontSize": 14
          }
        }
      }
    },
    {
      "mark": {
        "type": "bar",
        "opacity": 0.3,
        "tooltip": true,
        "color": {
          "expr": "datum['__1__']<=0.8?'#7F7F7F': '#D62728'"
        }
      },
      "encoding": {
        "y": { "field": "__3__" }
      }
    },
    {
      "mark": {
        "type": "bar",
        "color": {
          "expr": "datum['__1__']<=0.8?'#7F7F7F': '#D62728'"
        },
        "tooltip": true
      },
      "encoding": {
        "y": {
          "field": "__3____highlight"
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
        "type": "line",
        "interpolate": "step",
        "color": "#1F77B4",
        "point": {
          "color": "#1F77B4",
          "filled": false,
          "fill": "white"
        }
      },
      "encoding": {
        "y": { "field": "__1__" }
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
          "format": "0.0%",
          "formatType": "pbiFormat"
        },
        "y": { "field": "__1__" }
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
          "field": "__3__",
          "format": "$#0,0",
          "formatType": "pbiFormat"
        },
        "y": { "field": "__3__" }
      }
    }
  ],
  "resolve": {
    "scale": { "y": "independent" }
  },
  "encoding": {
    "x": {
      "field": "__0__",
      "type": "nominal",
      "sort": {
        "field": "__3__",
        "op": "sum",
        "order": "descending"
      }
    },
    "y": {
      "type": "quantitative",
      "axis": { "title": "" }
    },
    "tooltip": [
      {
        "field": "__3__",
        "title": "Monto de Venta |",
        "format": "$#0,,0",
        "formatType": "pbiFormat"
      },
      {
        "field": "__1__",
        "title": "Porcentaje |",
        "format": "0.0%",
        "formatType": "pbiFormat"
      }
    ]
  }
}
```
