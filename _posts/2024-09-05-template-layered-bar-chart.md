---

title: "Mejora tus Visuales en Power BI: Control Avanzado de Ejes con Vega-Lite y Plantilla de Gráfico de Barras Apiladas"
author: csalcedodatabi
date: 2024-09-05 23:34:00 +0800
categories: [Blogging, Tutorial+Template]
tags: [Power BI, Deneb, Vega-Lite]
pin: false
image: 
  path: /assets/img/post-layered_bar_chart/0_image.png
  alt: "Gráficos personalizados en Power BI usando Vega-Lite"
description: "Descubre cómo mejorar la presentación y precisión de tus gráficos en Power BI con el control detallado de los ejes usando Vega-Lite y Deneb. Aprende a formatear y personalizar tus visuales para obtener resultados más efectivos."

---
### **Introducción**

En esta publicación, continuamos con nuestra serie de plantillas de gráficos en Deneb utilizando Vega-Lite dentro de Power BI. En esta ocasión, nos enfocaremos en algunas configuraciones clave que son esenciales para optimizar la estética y precisión de nuestros visuales. Exploraremos en detalle las propiedades de los ejes en Vega-Lite, lo que nos permitirá tener un control más preciso sobre la presentación de los datos en nuestros gráficos y mejorar la experiencia visual.

### **Controlando y Formateando los Ejes en Vega-Lite**

**Desafío:** **¿Cómo podemos transformar un gráfico básico en uno con ejes formateados y personalizados de manera precisa?**

A menudo, los valores predeterminados en los ejes de nuestros gráficos no reflejan el nivel de claridad ni la precisión que buscamos. Esto puede generar confusión o una presentación menos atractiva. Considera la siguiente imagen mientras analizamos cómo solucionar este problema:

**Antes y Después:**

![Antes y Después de la Configuración del Eje Y](/assets/img/post-layered_bar_chart/1_image.PNG)
*Imagen 1: Comparativa del gráfico antes y después de aplicar la configuración correcta al eje Y.*

Es probable que ya tengas algo de experiencia con `Vega-Lite` y hayas considerado usar la propiedad `tickCount: 5`. Sin embargo, es importante destacar que esta propiedad es aleatoria y no ofrece un control preciso sobre los valores mostrados.

Para obtener el resultado deseado, necesitamos dominar algunas de las [propiedades disponibles](https://vega.github.io/vega-lite/docs/axis.html#conditional) para los ejes `x` o `y`. Estas propiedades son:

- **Value**: El valor de los datos.
- **Label**: La etiqueta de texto.
- **Index**: Índice de ticks fraccionarios, útil para definir puntos específicos en los ejes.

![Propiedades del Eje](/assets/img/post-layered_bar_chart/2_image.PNG)
*Imagen 2: Desglose de las propiedades `label`, `value` e `index` en el código Vega-Lite.*

#### **Propiedades Clave de los Ejes en Vega-Lite**

**1. `labelExpr`: Controlando los valores visibles**  
La propiedad `labelExpr` es una de las más útil a la hora de personalizar los ejes. Con ella, podemos decidir qué valores mostrar y cómo formatearlos. Por ejemplo, si queremos mostrar solo ciertos valores fraccionados a lo largo del eje, podemos usar `datum.index` para crear una condición que nos permita controlar este aspecto.

**Ejemplo de Condicional para los Valores del Eje Y:**

![Condicional para Mostrar Valores Específicos](/assets/img/post-layered_bar_chart/3_image.PNG)
*Imagen 3: Uso de un condicional para mostrar valores específicos en el eje.*

El `index` es una propiedad que varía entre 0 y 1, representando un rango porcentual del total de valores. Al usar `Index`, podemos establecer condicionales que determinen qué valores mostrar en el gráfico. Por ejemplo, si queremos mostrar solo el primer y último valor, o los valores en los puntos 0, 0.25, 0.5, 0.75 y 1, podemos construir un condicional como el siguiente:

<pre class="highlight"><code class="language-json">
datum.index == 0 || datum.index == 0.25 || datum.index == 0.5 
|| datum.index == 0.75 || datum.index == 1
</code></pre>

Usamos `datum` para acceder al valor actual y evaluarlo, construyendo un condicional `or` con el operador `||`. Esto nos permite controlar qué valores se muestran en los ticks, la cuadrícula y las etiquetas.

Para controlar los valores del eje `y`, el código sería:

<pre class="highlight"><code class="language-json">
...
"axisY": {
  "labelExpr": "datum.index == 0 || datum.index == 0.25 
  || datum.index == 0.5 || datum.index == 0.75 || datum.index == 1 ?
   datum.value : '' "
},...
</code></pre>

En este ejemplo, mostramos solo los valores correspondientes a los puntos 0, 0.25, 0.5, 0.75 y 1. Esto ayuda a reducir el desorden visual y destaca solo los valores importantes.

#### **Formateando Valores con `pbiFormatAutoUnit`**

Una de las nuevas funciones en Deneb 1.7 es [`pbiFormatAutoUnit`](https://deneb-viz.github.io/formatting#auto-formatting-with-pbiformatautounit), que permite aplicar un formato automático a los valores. Esto es útil cuando queremos mostrar grandes cantidades de datos en miles o millones sin tener que preocuparse por el formato manual.

**Ejemplo de Código Usando `pbiFormatAutoUnit`:**

![Condicional con Formateo Automático](/assets/img/post-layered_bar_chart/4_image.PNG)
*Imagen 4: Aplicación del formateo automático utilizando `pbiFormatAutoUnit`.*

**Ejemplo de Código Usando `pbiFormatAutoUnit`:**

<pre class="highlight"><code class="language-json">
"axisY": {
  "labelExpr": "datum.index == 0 || datum.index == 0.25 || datum.index == 0.5 
  || datum.index == 0.75 || datum.index == 1 ? pbiFormatAutoUnit(datum.value) : '' "
},...
</code></pre>


Este condicional y las propiedades asociadas permiten un control preciso sobre la visualización de los ejes, asegurando que solo los valores deseados se muestren y estén correctamente formateados.

#### **Ejemplo Completo: Controlando Ticks, Cuadrículas y Etiquetas del panel de Configuración**

Después de haber explorado las propiedades y el formato de los ejes, el siguiente paso es ver cómo esto se aplica a un gráfico completo. A continuación, se muestra un ejemplo donde controlamos los ticks, la cuadrícula y las etiquetas del eje Y:

![Controlando Ticks, Cuadrícula y Etiquetas](/assets/img/post-layered_bar_chart/5_image.PNG)
*Imagen 5: Ejemplo completo de cómo controlar los ticks, la cuadrícula y las etiquetas del eje Y.*

Código completo: 

<pre class="highlight"><code class="language-json">
{
  "background": "transparent",
  "view": {
    "stroke": "transparent"
  },
  "axisY": {
    "tickColor": {
      "expr": "datum.index==0 || datum.index==0.25||datum.index==0.5 ||datum.index==0.75 || datum.index==1? 'black':'' "
    },
    "gridColor": {
      "expr": "datum.index==0 || datum.index==0.25||datum.index==0.5 ||datum.index==0.75 || datum.index==1? '#eee':'' "
    },
    "labelExpr": "datum.index==0 || datum.index==0.25||datum.index==0.5 ||datum.index==0.75 || datum.index==1? pbiFormatAutoUnit(datum.value):'' ",
    "labelFontSize": 16,
    "titleFontSize": 18
  },
  "axisX": {
    "labelAngle": 0,
    "offset": 3,
    "labelFontSize": 16,
    "titleFontSize": 18
  },
  // Legend configuration
  "legend": {
    "title": "", // No title for the legend
    "orient": "top",
    "symbolSize": 280, // Size of the symbols in the legend
    "disable": false, // Ensure legend is enabled
    "labelFontSize": 14, // Font size of legend labels
    "labelFontWeight": "bold", // Bold font for legend labels
    "columnPadding": 10, // Padding between legend columns
    "labelColor": {
      "expr": "datum.label == 'Male' ?  '#ca8861':'#675193' " // Conditional color for labels
    },
    "labelAlign": "left" // Align legend text to the left of the symbol
  }
}
</code></pre>
Este código muestra cómo podemos tener control total sobre los elementos visuales de los ejes, adaptando el formato y la visibilidad a nuestras necesidades.

#### **Conclusión**

El uso de Vega-Lite en Power BI, a través de Deneb, te brinda un control sin precedentes sobre la visualización de datos. El formato y la personalización de los ejes son esenciales para comunicar información de manera clara y efectiva. Con propiedades como `labelExpr` y la función `pbiFormatAutoUnit`, es posible transformar gráficos simples en herramientas visuales precisas y atractivas.

No dudes en experimentar con estas propiedades en tus propios proyectos de Power BI y sacar el máximo provecho de Vega-Lite. ¡Tu audiencia lo agradecerá!

## Download the files used here

[🔽 layered_bar_chart.pbix](https://github.com/CSalcedoDataBI/PowerBI-Deneb/raw/main/Layered_Bar_Chart/Files/Layered_Bar_Chart.pbix) (2 MB)

[🔽 layered_bar_chart.json:](https://github.com/CSalcedoDataBI/PowerBI-Deneb/blob/64c1d499b5e948656218b4c2986ac48879778e58/Layered_Bar_Chart/Files/Layered_Bar_Chart.json) ( 4.08 KB)


### **Referencias:**  
- [Deneb Official Website](https://deneb-viz.github.io/): Recursos y documentación oficial de Deneb.  
- [Opciones avanzadas para la función pbiFormat](https://csalcedodatabi.github.io/posts/pbiformat-function-advanced-options/): Guía sobre el uso avanzado de `pbiFormat`.  
- [Formateo en Deneb](https://deneb-viz.github.io/formatting#auto-formatting-with-pbiformatautounit): Recurso completo sobre las técnicas de formateo en Deneb.  
- [Ejemplo de gráfico de barras con capas y transparencia en Vega-Lite](https://vega.github.io/vega-lite/examples/bar_layered_transparent.html): Un ejemplo práctico sobre cómo aplicar capas y transparencia en gráficos de barras usando Vega-Lite.


### Copy the Template Below👇✔

<pre class="highlight"><code class="language-json">
{
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "usermeta": {
    "information": {
      "uuid": "f1235fc5-778a-4e37-be73-87beefca0455",
      "generated": "2024-09-06T02:12:54.724Z",
      "previewImageBase64PNG": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
      "name": "Layered Bar Chart",
      "description": "Based on an official Vega-Lite example and adapted for use in Deneb within Power BI. Note: Cross-filtering interactivity is limited when using 'aggregate'.",
      "author": "Cristobal-Salcedo"
    },
    "deneb": {
      "build": "1.7.1.0",
      "metaVersion": 1,
      "provider": "vegaLite",
      "providerVersion": "5.20.1"
    },
    "interactivity": {
      "tooltip": true,
      "contextMenu": true,
      "selection": false,
      "selectionMode": "simple",
      "highlight": false,
      "dataPointLimit": 50
    },
    "config": "{\r\n  \"background\": \"transparent\",\r\n  \"view\": {\r\n    \"stroke\": \"transparent\"\r\n  },\r\n  \"axisY\": {\r\n    \"tickColor\": {\r\n      \"expr\": \"datum.index==0 || datum.index==0.25||datum.index==0.5 ||datum.index==0.75 || datum.index==1? 'black':'' \"\r\n    },\r\n    \"gridColor\": {\r\n      \"expr\": \"datum.index==0 || datum.index==0.25||datum.index==0.5 ||datum.index==0.75 || datum.index==1? '#eee':'' \"\r\n    },\r\n    \"labelExpr\": \"datum.index==0 || datum.index==0.25||datum.index==0.5 ||datum.index==0.75 || datum.index==1? pbiFormatAutoUnit(datum.value):'' \",\r\n    \"labelFontSize\":16,\r\n    \"titleFontSize\":18\r\n  },\r\n  \"axisX\": {\r\n    \"labelAngle\": 0,\r\n    \"offset\": 3,\r\n    \"labelFontSize\":16,\r\n    \"titleFontSize\":18\r\n  },\r\n  // Legend configuration\r\n  \"legend\": {\r\n    \"title\": \"\", // No title for the legend\r\n    \"orient\": \"top\",\r\n    \"symbolSize\": 280, // Size of the symbols in the legend\r\n    \"disable\": false, // Ensure legend is enabled\r\n    \"labelFontSize\": 14, // Font size of legend labels\r\n    \"labelFontWeight\": \"bold\", // Bold font for legend labels\r\n    \"columnPadding\": 10, // Padding between legend columns\r\n    \"labelColor\": {\r\n      \"expr\": \"datum.label == 'Male' ?  '#ca8861':'#675193' \" // Conditional color for labels\r\n    },\r\n    \"labelAlign\": \"left\" // Align legend text to the left of the symbol\r\n  }\r\n}",
    "dataset": [
      {
        "key": "__0__",
        "name": "year",
        "description": "",
        "kind": "column",
        "type": "text"
      },
      {
        "key": "__1__",
        "name": "sex",
        "description": "",
        "kind": "column",
        "type": "numeric"
      },
      {
        "key": "__2__",
        "name": "age",
        "description": "",
        "kind": "column",
        "type": "numeric"
      },
      {
        "key": "__3__",
        "name": "people",
        "description": "",
        "kind": "measure",
        "type": "numeric"
      }
    ]
  },
  "data": {
    "name": "dataset"
  },
  "description": "Layered Bar Chart: Based on an official Vega-Lite example and adapted for use in Deneb within Power BI. Note: Cross-filtering interactivity is limited when using 'aggregate'. Author: Cristobal Salcedo Beltran. Contact: csalcedo90@gmail.com.",
  "transform": [
    {
      "filter": "datum['__0__'] == '2000' "
    },
    {
      "calculate": "datum['__1__'] == 2 ? 'Female' : 'Male'",
      "as": "gender"
    }
  ],
  "mark": {
    "type": "bar",
    "width": {
      "expr": "datum.gender==='Female'?width/40: width/20"
    }
  },
  "encoding": {
    "x": {
      "field": "__2__",
      "type": "ordinal"
    },
    "y": {
      "aggregate": "sum",
      "field": "__3__",
      "title": "population",
      "stack": null
    },
    "color": {
      "field": "gender",
      "scale": {
        "range": [
          "#675193",
          "#ca8861"
        ]
      }
    },
    "opacity": {
      "value": 0.7
    }
  },
  "title": {
    "text": "US population distribution of age groups and gender in 2000",
    // Chart title
    "fontSize": 25,
    "fontWeight": "bold",
    "fontStyle": "arial"
  }
}
</code></pre>