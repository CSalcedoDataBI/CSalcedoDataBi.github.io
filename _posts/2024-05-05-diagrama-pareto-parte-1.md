---
title: "Diagrama de Pareto con Deneb y Vega-Lite en Power BI (Parte 1)"
author: csalcedodatabi
date: 2024-05-28 07:30:00 +0800
categories: [Deneb, Tutorial+Template]
tags: [Deneb, Vega-Lite, Pareto]
pin: false
image:
  path: /assets/img/post-diagrama-pareto-parte-1/Paso_12.gif
  alt: "Diagrama de Pareto Dinámico con Cross-Filtering + etiqueta"
description: "Una guía detallada para crear un diagrama de Pareto usando [Deneb](https://deneb-viz.github.io/) y [Vega-Lite](https://vega.github.io/vega-lite/) en Power BI. Esta es la primera parte de la serie."
---
## **Introducción**

>"El principio de Pareto, también conocido como la regla del 80/20, puede aplicarse en diversos contextos, incluyendo el empresarial. Por ejemplo, puede ser útil para identificar qué productos, clientes, proveedores o regiones representan el 80% de las ventas totales de una empresa".
{: .prompt-tip }

 En este artículo, te guiaremos paso a paso para crear un diagrama de Pareto utilizando **Deneb**, una herramienta de visualización personalizada que se conecta con el lenguaje **Vega-Lite** o **Vega**.

## Paso 1: **Preparación de datos**

Antes de crear nuestro diagrama de Pareto, debemos preparar nuestros datos. Utilizaremos los datos de muestra suministrados por **Power Bi** en su sitio web, que puedes descargar desde este enlace:
<https://go.microsoft.com/fwlink/?LinkID=521962>.

**También puedes acceder a estos datos siguiendo estos pasos:**

-         Iniciar Power Bi.
-         Dar clic en el último botón que está en el lienzo del informe y dice `"Probar    datos de ejemplo"`.
-         Elegir la tabla ``"Financials". ``
-         Dar clic en ``"Cargar datos al modelo"`` y listo.

## Paso 2: **Crear tres medidas DAX**

En este paso, nos basaremos en el blog escrito por **Amal BEN REBAI** [How to find your best sub-categories of products that make up 80% of total sales?](https://amalbenrebai.substack.com/p/how-to-identify-product-sub-categories). Crearemos las medidas ``Total Ventas``, ``Acumulado de Ventas Por Producto`` y ``% Acumulado de Ventas por Producto``, utilizando el código proporcionado en el artículo, aquí presento una versión ajustada:

 ``1.`` **Medida: Suma de las Ventas:**

<pre class="highlight"><code class="language-json">
Total Ventas = SUM ( financials[ Sales] )
</code></pre>

``2.`` **Medida: Acumulado de ventas por producto:**

<pre class="highlight"><code class="language-json">

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
  
<pre class="highlight"><code class="language-json">
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
<pre class="highlight"><code class="language-json">
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

Por último, para continuar con el siguiente paso, es necesario envolver esta capa en un array de objetos visuales o en un "layer" para poder adicionar otras capas. Para ello, realizamos lo siguiente, como se muestra en la imagen a continuación:

![Paso 7.1](/assets/img/post-diagrama-pareto-parte-1/Paso_7_1.png)

## Paso 8: **Ordenar el gráfico de mayor a menor según la variable "Total Ventas"**

Para ordenar el gráfico de acuerdo con la variable "Total Ventas" de mayor a menor, sigue estos pasos:

Agrega la propiedad <kbd>"sort"</kbd> en el eje X, de la siguiente manera:

<pre class="highlight"><code class="language-json">
"sort":{
   "field":"Total Ventas",
   "op":"sum",
   "order":"descending"
}
</code></pre>

Ver imagen .gif para ver como agregar:

![Paso 8](/assets/img/post-diagrama-pareto-parte-1/Paso_8.gif)

### Explicación del código

<kbd>"field": "Total Ventas"</kbd> Especifica el campo (columna) del conjunto de datos que se utilizará como criterio de ordenación. En este caso, se utiliza la columna <kbd>"Total Ventas"</kbd>.

<kbd>"op": "sum"</kbd> Define la operación de agregación que se aplicará a los datos antes de ordenarlos. En este caso, se utiliza la función sum para sumar los valores de <kbd>"Total Ventas"</kbd>.

<kbd>"order": "descending"</kbd> Establece el orden de clasificación. En este caso, se utiliza "descending" para ordenar los datos de mayor a menor.

>Al agregar este código, el gráfico se ordenará de acuerdo con la suma de "Total Ventas" para cada categoría en el eje X, mostrando los valores en orden descendente. Esto facilita la identificación visual de las categorías de productos que generan la mayor parte de las ventas.
{: .prompt-tip }

>**Advertencia:** Si estás copiando el código de este tutorial, ten en cuenta que las comas no están incluidas en los fragmentos de código proporcionados. Sin embargo, en la imagen GIF se muestra que, para insertar el código, primero se debe colocar la coma y luego seguir las demás instrucciones.
{: .prompt-warning }

## Paso 9: **Agregar el gráfico de línea como una capa adicional en el array "layer"**

Hasta ahora, si has seguido los pasos, te darás cuenta de que dentro del array "layer" existen un objeto visual, con un "mark" de tipo "bar" (gráfico de barras). A continuación, añadiremos un nuevo objeto para el gráfico de línea:

<pre class="highlight"><code class="language-json">
{
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
            "field":"% Acumulado de Ventas por Producto",
            "title":""
        }
    }
}
</code></pre>

### Explicación del código

Este objeto define un gráfico de línea con las siguientes características:

<kbd>"type": "line</kbd> Establece que el tipo de marca o grafico será, en este caso es de línea.

<kbd>"interpolate": "linear"</kbd> Define que la interpolación de la línea será lineal.

<kbd>"color": "red"</kbd> Establece el color de la línea en rojo.

<kbd>"point":{...}</kbd> Define la apariencia de los puntos en la línea, con un color de borde azul, sin relleno y con un relleno blanco.

La propiedad "encoding" en este objeto especifica que el eje Y del gráfico de línea utilizará el campo "% Acumulado de Ventas por Producto" como valor.

Mira la siguiente imagen y observa que la línea está justo a nivel cero:

![Paso 9](/assets/img/post-diagrama-pareto-parte-1/Paso_9.png)

>El problema aquí es que estamos usando un eje Y a una escala mayor que la del porcentaje. Debemos activar un segundo eje Y para graficar el porcentaje, que generalmente está a una escala de 0 a 1. Para ello, agrega el siguiente código después del array <kbd>"layer":</kbd>
{: .prompt-warning }

<pre class="highlight"><code class="language-json">
"resolve":{
   "scale":{
      "y":"independent"
   }
},
</code></pre>

La propiedad <kbd>resolve</kbd> y su atributo <kbd>scale</kbd> indican que el eje Y utilizará escalas independientes para cada capa. De esta manera, el gráfico de línea usará una escala adecuada para representar el porcentaje acumulado de ventas por producto.

Esto resuelve el problema, y lo puedes ver en la siguiente imagen.gif:

![Paso 9-1](/assets/img/post-diagrama-pareto-parte-1/Paso_9_1.gif)

Al agregar este nuevo objeto y el segundo eje Y, el gráfico de línea mostrará el porcentaje acumulado de ventas por producto, facilitando la identificación de las categorías de productos que representan el 80% de las ventas totales.

## Paso 10: **Agregar capas de etiquetas al gráfico de líneas y al gráfico de barras dentro del array "layer"**

A continuación, añadiremos dos nuevos objetos dentro del array "layer" para agregar etiquetas a los gráficos de líneas y barras. Estas etiquetas proporcionarán información adicional sobre el porcentaje acumulado de ventas por producto y el total de ventas.

Etiquetas para el gráfico de líneas:

<pre class="highlight"><code class="language-json">
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

### Explicación del código

Este objeto define una capa de etiquetas con las siguientes características:

<kbd>"type": "text":</kbd> Establece que el tipo de marca será texto.

<kbd>"color": "#333333":</kbd> Establece el color del texto en gris oscuro.

</kbd>"yOffset": -16: Desplaza las etiquetas hacia arriba en 16 unidades para evitar solapamientos con los puntos de la línea.

La propiedad "encoding" en este objeto especifica que el contenido de las etiquetas será el porcentaje acumulado de ventas por producto, con un formato de porcentaje (0.0%) utilizando el tipo de formato "pbiFormat".

Etiquetas para el gráfico de barras:

<pre class="highlight"><code class="language-json">
{
    "mark":{
        "type":"text",
        "color":"#333333",
        "yOffset":-8
    },
    "encoding":{
        "text":{
            "field":"Total Ventas",
            "format":"$#0,0",
            "formatType":"pbiFormat"
        },
        "y":{
            "field":"Total Ventas"
        }
    }
}
</code></pre>

### Explicación del código

Este objeto define otra capa de etiquetas con las siguientes características:

<kbd>"type": "text"</kbd> Establece que el tipo de marca será texto.

<kbd>"color": "#333333"</kbd> Establece el color del texto en gris oscuro.

<kbd>"yOffset": -8</kbd> Desplaza las etiquetas hacia arriba en 8 unidades para evitar solapamientos con las barras.

La propiedad <kbd>"encoding"</kbd> en este objeto especifica que el contenido de las etiquetas será el total de ventas, con un formato de moneda <kbd>($#0,0)</kbd> utilizando el tipo de formato <kbd>"pbiFormat"</kbd>.

>Al agregar estas capas de etiquetas, el gráfico de Pareto se vuelve más informativo y fácil de interpretar, mostrando valores exactos para cada punto de la línea y cada barra en el gráfico. Ver la siguiente Imagen:
{: .prompt-info }

![Paso 10](/assets/img/post-diagrama-pareto-parte-1/Paso_10.gif)
Imagen del gráfico de Pareto con etiquetas😍

## Paso 11: **Agregar color condicional a los gráficos de barras**

Para mejorar la visualización, agregaremos un color condicional al gráfico de barras. Esto permitirá resaltar las barras que representan el 80% de las ventas acumuladas en un color diferent al de las barras restantes.

Aplicar color condicional al gráfico de barras:
<pre class="highlight"><code class="language-json">
,
"color":{
    "expr":"datum['% Acumulado de Ventas por Producto']<=0.8?'#7F7F7F':'#D62728'"
}
</code></pre>

En el objeto de marca, hemos agregado la propiedad <kbd>"color"</kbd> con la siguiente expresión:

<kbd>"expr": "datum['% Acumulado de Ventas por Producto'] <=0.8 ?' ': ''"</kbd> Esta expresión asigna un color gris () a las barras que representan hasta el 80% de las ventas acumuladas y un color rojo () a las barras restantes.

## Paso 12: **Agregar Cross-Filtering y Tooltip**

En este paso, implementaremos una característica que destaca a Deneb como un visual personalizado poderoso: la capacidad de Cross-Filtering y Tooltip. Esta propiedad permite que los visuales de Deneb se comporten de manera similar a los visuales nativos de Power BI, resaltando las barras seleccionadas en un gráfico de barras. Esta interacción permite que los visuales cobren vida y puedan interactuar con otros visuales en el informe.

Para activar esta propiedad en Deneb, debemos ir al Editor y en el panel de Configuración (Settings) activar el botón 'Cross-filtering (selection) of data points'. Para más información, puedes consultar la documentación de **Deneb**. Una vez activado, es importante entender brevemente lo que sucede en los siguientes fragmentos de código:

### Código para la capa del gráfico de barras

Este código da opacidad a la capa del gráfico de barras y activa el tooltip:

<pre class="highlight"><code class="language-json">
"opacity": 0.3,
"tooltip": true,
</code></pre>

### Código para resaltar solo lo seleccionado

Agregamos otra capa de gráfico de barras para resaltar solo las barras seleccionadas:

<pre class="highlight"><code class="language-json">
{
  "mark": {
    "type": "bar",
    "color": {
      "expr": "datum['% Acumulado de Ventas por Producto']<=0.8?'#7F7F7F': '#D62728'"
    },
    "tooltip": true
  },
  "encoding": {
    "y": {
      "field": "Total Ventas"
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
}
</code></pre>

### Explicación del código

- **"field": "Total Ventas"**: Este campo representa los valores de las ventas totales que se deben destacar cuando se selecciona otro gráfico en el contexto.

- **"opacity": { ... }**: Esta propiedad de codificación controla la opacidad de las barras en función de si están seleccionadas o no.

- **"condition": { ... }**: La condición especifica qué sucede cuando se cumple un cierto criterio. En este caso, el criterio está relacionado con la selección de las barras en el gráfico.

- **"test": { "field": "**selected**", "equal": "off" }**: Este objeto de prueba verifica si la barra seleccionada está en estado "off" (es decir, no seleccionada). Si la barra no está seleccionada, la condición se cumple y se aplica el valor de opacidad especificado.

- **"value": 0**: Cuando la condición se cumple (la barra no está seleccionada), la opacidad de la barra se establece en 0, lo que hace que la barra sea transparente.

- **"value": 1**: Este es el valor predeterminado de opacidad para las barras cuando no se cumple la condición (es decir, cuando una barra está seleccionada). En este caso, la opacidad se establece en 1, lo que hace que la barra sea completamente visible.

### Resultado Final

Ver imagen final:
![Paso 10](/assets/img/post-diagrama-pareto-parte-1/Paso_12.gif)

## **Conclusión**

En este artículo, hemos creado un gráfico de Pareto con Deneb y **Vega-Lite**, destacando la incorporación de capas, la interacción y selección de elementos, y la personalización de colores y leyendas.

Seleccionar una barra en el gráfico hace que las no seleccionadas se vuelvan transparentes, permitiendo un análisis detallado.

Agradecemos a [**Pesante Analytics Llc**](https://www.linkedin.com/article/edit/7058858211172347904/#?lipi=urn%3Ali%3Apage%3Ad_flagship3_publishing_post_edit%3BKSUv7MnJReKyAuZYYZ8ayw%3D%3D) y a [**Daniel Marsh-Patrick**](https://www.linkedin.com/article/edit/7058858211172347904/#?lipi=urn%3Ali%3Apage%3Ad_flagship3_publishing_post_edit%3BKSUv7MnJReKyAuZYYZ8ayw%3D%3D) por su guía experta.

>Nota: Esta es la versión actualizada de un artículo originalmente publicado en Linkding. La versión original puede encontrarse [aquí](https://www.linkedin.com/pulse/creaci%25C3%25B3n-de-un-diagrama-pareto-con-deneb-y-vega-lite-salcedo-beltran/?trackingId=ZMLmYst8SHignSJ1ROZpgA%3D%3D).
{: .prompt-info }

## Descarga los archivos utilizados aquí

[🔽 Pareto_Dinamico_Deneb_VegaLite_P1.pbix](https://github.com/CSalcedoDataBI/PowerBI-Deneb/raw/752fca72da2d872e8b6c5c64288a5e6b2ad12247/Diagramas_Pareto/FIles/Pareto_Dinamico_Deneb_VegaLite_P1.pbix) (1.88 MB)

[🔽 Plantilla_Pareto_Dinamico_Deneb_VegaLite_P1.json:](https://github.com/CSalcedoDataBI/PowerBI-Deneb/blob/752fca72da2d872e8b6c5c64288a5e6b2ad12247/Diagramas_Pareto/FIles/Pareto_Dinamico_Deneb_VegaLite_P1.json) (7.66 KB)

### Copiar Plantilla

<pre class="highlight"><code class="language-json">
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
      "description": "Esta plantilla permite la creación de un gráfico de Pareto dinámico, el cual puede ser personalizado según las necesidades del usuario. Los campos de datos y medidas son ejemplos y pueden ser reemplazados para adaptarse a diferentes categorías y métricas.",
      "author": "Cristobal Salcedo Beltran, Contacto: csalcedo90@gmail.com.",
      "uuid": "267e3e24-a51c-4d9c-9474-4fb34725506b",
      "generated": "2024-05-27T21:20:00.612Z"
    },
    "dataset": [
      {
        "key": "__0__",
        "name": "Product",
        "description": "Este campo categórico puede ser reemplazado por cualquier otro, según las necesidades del usuario",
        "type": "text",
        "kind": "column"
      },
      {
        "key": "__1__",
        "name": "Total Ventas",
        "description": "Esta medida representa el total de ventas acumuladas. Puede ser remplazada por cualquier otra medida, según las necesidades del usuario",
        "type": "numeric",
        "kind": "measure"
      },
      {
        "key": "__2__",
        "name": "Acumulado de ventas Por Producto",
        "description": "Muestra el total acumulado de ventas para cada producto. Descripción opcional para el usuario final. Puede ser remplazada por cualquier otra medida, según las necesidades del usuario",
        "type": "numeric",
        "kind": "measure"
      },
      {
        "key": "__3__",
        "name": "% Acumulado de Ventas por Producto",
        "description": "Indica el porcentaje acumulado de ventas por producto. Descripción opcional para el usuario final. Puede ser remplazada por cualquier otra medida, según las necesidades del usuario",
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
  },
  "description": "Gráfico de Pareto Dinámico, Autor: Cristóbal Salcedo. Contacto: csalcedo90@gmail.com. Artículos relacionados: https://csalcedodatabi.github.io/posts/diagrama-pareto-parte-1/",
  "data": {"name": "dataset"},
  "title": {
    "text": "Ventas por producto (Principio de Pareto)",
    "subtitle": "'Muestra la contribución de los productos al total de ventas",
    "fontSize": 20,
    "color": "#333333"
  },
  "layer": [
    {
      "mark": {
        "type": "bar",
        "tooltip": true,
        "color": {
          "expr": "datum['__3__']<=0.8?'#7F7F7F': '#D62728'"
        }
      },
      "encoding": {
        "y": {"field": "__1__"},
        "opacity": {
          "condition": {
            "test": {
              "field": "__selected__",
              "equal": "off"
            },
            "value": 0.3
          },
          "value": 1
        }
      }
    },
    {
      "mark": {
        "type": "line",
        "interpolate": "linear",
        "color": "blue",
        "point": {
          "color": "#1F77B4",
          "filled": false,
          "fill": "white"
        }
      },
      "encoding": {
        "y": {"field": "__3__"}
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
          "format": "0.0%",
          "formatType": "pbiFormat"
        },
        "y": {"field": "__3__"}
      }
    },
    {
      "mark": {
        "type": "text",
        "color": "#333333",
        "yOffset": -8
      },
      "encoding": {
        "text": {
          "field": "__1__",
          "format": "$#0,0",
          "formatType": "pbiFormat"
        },
        "y": {"field": "__1__"}
      }
    },
    {
      "mark": {"type": "bar"},
      "encoding": {
        "y": {"field": "__1__"},
        "color": {
          "field": "__3__",
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
            "orient": "top",
            "padding": 10,
            "labelFont": "Helvetica Neue, Arial",
            "labelFontSize": 14,
            "symbolType": "square",
            "symbolSize": 100
          }
        }
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
        "field": "__1__",
        "op": "max",
        "order": "descending"
      }
    },
    "y": {
      "type": "quantitative",
      "axis": {"title": " "}
    }
  }
}
</code></pre>
