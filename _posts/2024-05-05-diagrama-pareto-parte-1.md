---
title: "Diagrama de Pareto con Deneb y Vega-Lite en Power BI (Parte 1)"
author: "Cristobal Salcedo Beltran"
date: 2024-04-03 23:34:00 +0800
categories: [Deneb, Tutorial]
tags: [Deneb, Vega, Pareto]
pin: false
image:
  path: https://raw.githubusercontent.com/CSalcedoDataBI/PowerBI-Deneb/main/Diagramas_Pareto/FIles/Pareto_Dinamico_Deneb_VegaLite_P1_Encabezado.gif
  alt: "Cross-Filtering y Cross-Highlight Scatter Plot"
description: "Una guía detallada para crear un diagrama de Pareto usando Deneb y Vega-Lite en Power BI. Esta es la primera parte de la serie."
---
## **Introducción**

>"El principio de Pareto, también conocido como la regla del 80/20, puede aplicarse en diversos contextos, incluyendo el empresarial. Por ejemplo, puede ser útil para identificar qué productos, clientes, proveedores o regiones representan el 80% de las ventas totales de una empresa".
{: .prompt-tip }

 En este artículo, te guiaremos paso a paso para crear un diagrama de Pareto utilizando Deneb, una herramienta de visualización personalizada que se conecta con el lenguaje  o . Mostraremos dos enfoques, uno utilizando  y otro con transformaciones avanzadas en .

## Paso 1: **Preparación de datos**

Antes de crear nuestro diagrama de Pareto, debemos preparar nuestros datos. Utilizaremos los datos de muestra suministrados por Power Bi en su sitio web, que puedes descargar desde este enlace: 
<https://go.microsoft.com/fwlink/?LinkID=521962>.

**También puedes acceder a estos datos siguiendo estos pasos:**

-         Iniciar Power Bi.
-         Dar clic en el último botón que está en el lienzo del informe y dice `"Probar    datos de ejemplo"`.
-         Elegir la tabla ``"Financials". ``
-         Dar clic en ``"Cargar datos al modelo"`` y listo.

## Paso 2: **Crear tres medidas DAX**

En este paso, nos basaremos en el blog escrito por **Amal BEN REBAI** [How to find your best sub-categories of products that make up 80% of total sales?](https://amalbenrebai.substack.com/p/how-to-identify-product-sub-categories). Crearemos las medidas ``Total Ventas``, ``Acumulado de Ventas Por Producto`` y ``% Acumulado de Ventas por Producto``, utilizando el código proporcionado en el artículo, aquí presento una versión ajustada:

 ``1.`` **Medida: Suma de las Ventas:**

<pre class="highlight"><code>
Total Ventas = SUM ( financials[ Sales] )
</code></pre>

``2.`` **Medida: Acumulado de ventas por producto:**

<pre class="highlight"><code>

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
</code></pre>

``3.`` **Medida: % Acumulado de ventas por producto:**
  
<pre class="highlight"><code>
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
</code></pre>

## Paso 3: **Creación de un visual de tabla**

Para facilitar la comprensión, crearemos un visual de tabla con las columnas Product, Total Ventas, Acumulado de Ventas Por Producto y % Acumulado de Ventas por Producto. El visual debe verse como en la imagen proporcionada.

![Datos](/assets/img/post-diagrama-pareto-parte-1/image_1.png)

## Paso 4: **Cambiar el visual de tabla a Deneb**

Después de haber agregado el visual Deneb a la colección de visuales en Power Bi, seleccionaremos nuestro visual de tabla y lo cambiaremos a Deneb. Se debe ver como en la imagen.gif proporcionada.

![TablaADeneb](/assets/img/post-diagrama-pareto-parte-1/TablaADeneb.gif)

## Paso 5: **Seleccionar plantilla y ajustar código**

- Haz clic en los tres puntos suspensivos y elige ``"Editar visual de Deneb"``.
- Dejamos seleccionado **Vega-Lite** por defecto y elegimos la plantilla <kbd>."Simple Bar Chart"</kbd>. Asignamos la categoría ``"Product"`` al campo categórico y ``"Total Ventas"`` al campo cuantitativo. Al hacerlo, se activará el botón <kbd>"Crear"</kbd>, así:

![Paso 5](/assets/img/post-diagrama-pareto-parte-1/Paso_5.gif)

>Ya tenemos gran parte del código necesario para nuestro visual. Es una buena práctica comenzar con una plantilla y realizar pequeños ajustes para obtener el resultado deseado. No es necesario ser un experto en Vega o Vega-Lite para crear visuales personalizados.
{: .prompt-tip }

## Paso 6: **Cambiar los ejes X e Y**

Para cambiar el eje X al categórico ``"Product"`` y el eje Y a la variable cuantitativa ``"Total Ventas"``, modifica el fragmento de código de la siguiente manera:

![Paso 6](/assets/img/post-diagrama-pareto-parte-1/Paso_6.gif)

## Paso 7: **Limpiar y ordenar etiquetas en los ejes X e Y**

Para cambiar la orientación de las etiquetas de la categoría en el eje X de vertical a horizontal y ocultar las etiquetas en el eje Y, sigue estos pasos en el editor de Deneb:

Haz clic en el panel de configuración he inserta el siguiente codigo.
<pre class="highlight"><code>
{
  "view": {"stroke": "transparent"},
  "line": {
    "strokeWidth": 3,
    "strokeCap": "round",
    "strokeJoin": "round"
  },
  "text": {
    "font": "Segoe UI",
    "fontSize": 18,
    "fill": "#605E5C"
  },
  "axis": {
    "ticks": false,
    "grid": false,
    "domain": false,
    "labelColor": "#605E5C",
    "labelFontSize": 18
  },
  "axisX": {
    "labelPadding": 5,
    "labelAngle": 0
  },
  "axisY": {
    "labelPadding": 10,
    "labels": false
  }
}
</code></pre>

Cambia la orientación de la etiqueta en el eje X agregando <kbd>"labelAngle": 0</kbd> a la propiedad <kbd>"axisX": {}</kbd>. De esta manera, la orientación de la etiqueta cambiará a horizontal o al ángulo que desees.

 Oculta las etiquetas en el eje Y agregando <kbd>"labels": false</kbd> a la propiedad <kbd>"axisY": {}</kbd>.

 A continuación, se muestra la imagen con el panorama completo de los cambios realizados en las etiquetas de los ejes X e Y:

![Paso 7](/assets/img/post-diagrama-pareto-parte-1/Paso_7.gif)

Por utimo para continuar con los siguiente paso es necesario envolver esta capa en un array de objetos visuales o en un "layer", para pode adiconar otras capas, para ello hacemos lo siguiente:

![Paso 7.1](/assets/img/post-diagrama-pareto-parte-1/Paso_7_1.png)

## Paso 8: **Ordenar el gráfico de mayor a menor según la variable "Total Ventas"**

Para ordenar el gráfico de acuerdo con la variable "Total Ventas" de mayor a menor, sigue estos pasos:

Regresa al panel de especificaciones en el editor de Deneb (si deseas conocer todos los botones y paneles de la versión de Deneb 1.5, puedes ver este video donde se explico cada uno de sus componentes : <https://youtu.be/odIYzsS11Qg>.

Agrega la propiedad <kbd>"sort"</kbd> en el eje X, de la siguiente manera:

<pre class="highlight"><code>
"sort":{
   "field":"Total Ventas",
   "op":"sum",
   "order":"descending"
}
</code></pre>
<kbd>"field": "Total Ventas"</kbd> Especifica el campo (columna) del conjunto de datos que se utilizará como criterio de ordenación. En este caso, se utiliza la columna <kbd>"Total Ventas"</kbd>.

<kbd>"op": "sum"</kbd> Define la operación de agregación que se aplicará a los datos antes de ordenarlos. En este caso, se utiliza la función sum para sumar los valores de <kbd>"Total Ventas"</kbd>.

<kbd>"order": "descending"</kbd> Establece el orden de clasificación. En este caso, se utiliza "descending" para ordenar los datos de mayor a menor.

Al agregar este código, el gráfico se ordenará de acuerdo con la suma de "Total Ventas" para cada categoría en el eje X, mostrando los valores en orden descendente. Esto facilita la identificación visual de las categorías de productos que generan la mayor parte de las ventas.

Aprovecha para quitar el título del eje Y. A continuación, se muestra la imagen con las modificaciones realizadas para ordenar el gráfico y quitar el título del eje Y:
* Imagen final finalizada


## Paso 9: **Agregar el gráfico de línea como una capa adicional en el array "layer"**

Hasta ahora, si has seguido los pasos, te darás cuenta de que dentro del array "layer" existen dos objetos visuales, cada uno con un "mark" de tipo "bar" (gráfico de barras). A continuación, añadiremos un nuevo objeto para el gráfico de línea:

<pre class="highlight"><code>
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
</code></pre>

Este objeto define un gráfico de línea con las siguientes características:

<kbd>"type": "line</kbd> Establece que el tipo de marca o grafico será, en este caso es de línea.

<kbd>"interpolate": "linear"</kbd> Define que la interpolación de la línea será lineal.

<kbd>"color": "red"</kbd> Establece el color de la línea en rojo.

<kbd>"point":{...}</kbd> Define la apariencia de los puntos en la línea, con un color de borde azul, sin relleno y con un relleno blanco.

La propiedad "encoding" en este objeto especifica que el eje Y del gráfico de línea utilizará el campo "% Acumulado de Ventas por Producto" como valor.

Mira la siguiente imagen y observa que la línea está justo a nivel cero:

![Paso 8](/assets/img/post-diagrama-pareto-parte-1/Paso_9.png)

>El problema aquí es que estamos usando un eje Y a una escala mayor que la del porcentaje. Debemos activar un segundo eje Y para graficar el porcentaje, que generalmente está a una escala de 0 a 1. Para ello, agrega el siguiente código después del array <kbd>"layer":</kbd>
{: .prompt-warning }

<pre class="highlight"><code>
"resolve":{
   "scale":{
      "y":"independent"
   }
},
</code></pre>

La propiedad <kbd>resolve</kbd> y su atributo <kbd>scale</kbd> indican que el eje Y utilizará escalas independientes para cada capa. De esta manera, el gráfico de línea usará una escala adecuada para representar el porcentaje acumulado de ventas por producto.

Esto resuelve el problema, y lo puedes ver en la siguiente imagen:

![Paso 8](/assets/img/post-diagrama-pareto-parte-1/Paso_9_1.png)

Al agregar este nuevo objeto y el segundo eje Y, el gráfico de línea mostrará el porcentaje acumulado de ventas por producto, facilitando la identificación de las categorías de productos que representan el 80% de las ventas totales. También puede ver en la imagen anterior los métodos de interpolación que se pueden usar en el gráfico de línea.

## Paso 10: **Agregar capas de etiquetas al gráfico de líneas y al gráfico de barras dentro del array "layer"**

A continuación, añadiremos dos nuevos objetos dentro del array "layer" para agregar etiquetas a los gráficos de líneas y barras. Estas etiquetas proporcionarán información adicional sobre el porcentaje acumulado de ventas por producto y el total de ventas.

Etiquetas para el gráfico de líneas:

<pre class="highlight"><code>
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
</code></pre>

Este objeto define una capa de etiquetas con las siguientes características:

<kbd>"type": "text":</kbd> Establece que el tipo de marca será texto.

<kbd>"color": "#333333":</kbd> Establece el color del texto en gris oscuro.

</kbd>"yOffset": -16: Desplaza las etiquetas hacia arriba en 16 unidades para evitar solapamientos con los puntos de la línea.

La propiedad "encoding" en este objeto especifica que el contenido de las etiquetas será el porcentaje acumulado de ventas por producto, con un formato de porcentaje (0.0%) utilizando el tipo de formato "pbiFormat".

Etiquetas para el gráfico de barras:

<pre class="highlight"><code>
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
</code></pre>

Este objeto define otra capa de etiquetas con las siguientes características:

<kbd>"type": "text"</kbd> Establece que el tipo de marca será texto.

<kbd>"color": "#333333"</kbd> Establece el color del texto en gris oscuro.

<kbd>"yOffset": -8</kbd> Desplaza las etiquetas hacia arriba en 8 unidades para evitar solapamientos con las barras.

La propiedad <kbd>"encoding"</kbd> en este objeto especifica que el contenido de las etiquetas será el total de ventas, con un formato de moneda <kbd>($#0,0)</kbd> utilizando el tipo de formato <kbd>"pbiFormat"</kbd>.

>Al agregar estas capas de etiquetas, el gráfico de Pareto se vuelve más informativo y fácil de interpretar, mostrando valores exactos para cada punto de la línea y cada barra en el gráfico. Ver la siguiente Imagen:
{: .prompt-info }

![Paso 10](/assets/img/post-diagrama-pareto-parte-1/Paso_10.png)
Imagen del gráfico de Pareto con etiquetas😍

## Paso 11: **Agregar color condicional a los gráficos de barras**

Para mejorar la visualización, agregaremos un color condicional a los gráficos de barras. Esto permitirá resaltar las barras que representan el 80% de las ventas acumuladas en un color diferente al de las barras restantes.

Aplicar color condicional al primer gráfico de barras:
<pre class="highlight"><code>
  { 
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
</code></pre>

En el objeto de marca, hemos agregado la propiedad <kbd>"color"</kbd> con la siguiente expresión:

<kbd>"expr": "datum['% Acumulado de Ventas por Producto'] <=0.8 ?' ': ''"</kbd> Esta expresión asigna un color gris () a las barras que representan hasta el 80% de las ventas acumuladas y un color rojo () a las barras restantes.

  1. Aplicar color condicional al segundo gráfico de barras:

<pre class="highlight"><code>
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
</code></pre>

Al igual que en el primer gráfico de barras, hemos agregado la propiedad <kbd>"color"</kbd> con la misma expresión para asignar colores condicionales. En este caso, estamos usando esta capa adicional para destacar las barras seleccionadas en el gráfico de barras. La documentación de **Deneb** menciona cómo las selecciones se pueden utilizar para resaltar elementos en la visualización, por lo que no queremos pasar por alto una breve explicación, de lo que pasa aquí:

<pre class="highlight"><code>
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
</code></pre>

<kbd>"field": "Total Ventas__highlight"</kbd> Este campo representa los valores de las ventas totales que se deben destacar cuando se selecciona otro gráfico, en el contexto.

<kbd>"opacity": { ... }"</kbd> Esta propiedad de codificación controla la opacidad de las barras en función de si están seleccionadas o no.

<kbd>"condition": { ... }"</kbd> La condición especifica qué sucede cuando se cumple un cierto criterio. En este caso, el criterio está relacionado con la selección de las barras en el gráfico.

<kbd>"test": { "field": "**selected**", "equal": "off" }"</kbd> Este objeto de prueba verifica si la barra seleccionada está en estado "off" (es decir, no seleccionada). Si la barra no está seleccionada, la condición se cumple y se aplica el valor de opacidad especificado.

<kbd>"value": 0</kbd> Cuando la condición se cumple (la barra no está seleccionada), la opacidad de la barra se establece en 0, lo que hace que la barra sea transparente.

<kbd>"value": 1</kbd> Este es el valor predeterminado de opacidad para las barras cuando no se cumple la condición (es decir, cuando una barra está seleccionada). En este caso, la opacidad se establece en 1, lo que hace que la barra sea completamente visible.

Ver imagen final:
![Pareto](https://raw.githubusercontent.com/CSalcedoDataBI/PowerBI-Deneb/main/Diagramas_Pareto/FIles/Pareto_Dinamico_Deneb_VegaLite_P1_Encabezado.gif)


## **Conclusión**

En este artículo, hemos creado un gráfico de Pareto con Deneb y **Vega-Lite**, destacando la incorporación de capas, la interacción y selección de elementos, y la personalización de colores y leyendas.

Seleccionar una barra en el gráfico hace que las no seleccionadas se vuelvan transparentes, permitiendo un análisis detallado.

Agradecemos a Pesante Analytics Llc y a **Daniel Marsh-Patrick** por su guía experta.

## Descarga los archivos utilizados aquí:

[🔽 Pareto_Dinamico_Deneb_VegaLite_P1.pbix](https://github.com/CSalcedoDataBI/PowerBI-Deneb/raw/752fca72da2d872e8b6c5c64288a5e6b2ad12247/Diagramas_Pareto/FIles/Pareto_Dinamico_Deneb_VegaLite_P1.pbix) (1.88 MB)

[🔽 Plantilla_Pareto_Dinamico_Deneb_VegaLite_P1.json:](https://github.com/CSalcedoDataBI/PowerBI-Deneb/blob/752fca72da2d872e8b6c5c64288a5e6b2ad12247/Diagramas_Pareto/FIles/Pareto_Dinamico_Deneb_VegaLite_P1.json) (7.66 KB)

### Copiar Plantilla:

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
      "name": "Gráfico de Pareto Dinámico",
      "description": "Gráfico de Pareto Dinámico",
      "author": "Gráfico de Pareto Dinámico",
      "uuid": "0fdc2305-7a56-4227-b162-f841a2064494",
      "generated": "2024-05-15T04:10:07.835Z"
    },
    "dataset": [
      {
        "key": "__0__",
        "name": "Product Category",
        "description": "",
        "type": "text",
        "kind": "column"
      },
      {
        "key": "__1__",
        "name": "Total  Sales",
        "description": "",
        "type": "numeric",
        "kind": "measure"
      },
      {
        "key": "__2__",
        "name": "% Acumulado de Ventas por Producto",
        "description": "",
        "type": "numeric",
        "kind": "measure"
      },
      {
        "key": "__3__",
        "name": "Acumulado de ventas Por Producto",
        "description": "",
        "type": "numeric",
        "kind": "measure"
      },
      {
        "key": "__4__",
        "name": "Total Ventas",
        "description": "",
        "type": "numeric",
        "kind": "measure"
      }
    ]
  },
  "config": {
    "view": {"stroke": "transparent"},
    "line": {
      "strokeWidth": 3,
      "strokeCap": "round",
      "strokeJoin": "round"
    },
    "point": {
      "filled": true,
      "size": 75
    },
    "text": {
      "font": "Segoe UI",
      "fontSize": 18,
      "fill": "#605E5C"
    },
    "axis": {
      "ticks": false,
      "grid": false,
      "domain": false,
      "labelColor": "#605E5C",
      "labelFontSize": 18
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
    }
  },
  "description": "Explora la distribución de ventas por producto con nuestro Gráfico de Pareto Dinámico en Deneb/Vega-Lite, ideal para analistas y especialistas en visualización de datos. Esta herramienta te permite identificar productos clave para maximizar ingresos eficazmente. Contacto: Cristóbal Salcedo (csalcedo90@mail.com).",
  "data": {"name": "dataset"},
  "title": {
    "text": "Ventas por producto (Principio de Pareto)",
    "subtitle": "'Muestra la contribución de los productos al total de ventas",
    "fontSize": 25,
    "color": "#333333"
  },
  "layer": [
    {
      "mark": {"type": "bar"},
      "encoding": {
        "y": {"field": "__4__"},
        "color": {
          "field": "__2__",
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
          "legend": {
            "title": "Principio de Pareto",
            "titleFontSize": 18,
            "orient": "top",
            "padding": 10,
            "labelFont": "Arial",
            "labelFontSize": 16
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
          "expr": "datum['__2__']<=0.8?'#7F7F7F': '#D62728'"
        }
      },
      "encoding": {
        "y": {"field": "__4__"}
      }
    },
    {
      "mark": {
        "type": "bar",
        "color": {
          "expr": "datum['__2__']<=0.8?'#7F7F7F': '#D62728'"
        },
        "tooltip": true
      },
      "encoding": {
        "y": {
          "field": "__4____highlight"
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
        "y": {"field": "__2__"}
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
          "field": "__2__",
          "format": "0.0%",
          "formatType": "pbiFormat"
        },
        "y": {"field": "__2__"}
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
          "field": "__4__",
          "format": "$#0,0",
          "formatType": "pbiFormat"
        },
        "y": {"field": "__4__"}
      }
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
        "field": "__4__",
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
        "field": "__4__",
        "title": "Monto de Venta |",
        "format": "$#0,,0",
        "formatType": "pbiFormat"
      },
      {
        "field": "__2__",
        "title": "Porcentaje |",
        "format": "0.0%",
        "formatType": "pbiFormat"
      }
    ]
  }
}
</code></pre>
