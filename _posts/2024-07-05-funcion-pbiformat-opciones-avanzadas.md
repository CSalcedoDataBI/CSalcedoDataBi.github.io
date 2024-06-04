---
title: "Guía detallada del uso de la función pbiFormat en Deneb"
author: csalcedodatabi
date: 2024-07-03 23:34:00 +0800
categories: [Blogging, Tutorial]
tags: [Deneb, Vega-Lite, pbiFormat]
pin: false
image:
  path: /assets/img/post-funcion-pbiformat/pbiFormat.gif
  alt: "Entendiendo el uso de pbiFormat"
description: "Una guía detallada sobre el uso básico y avanzado de la función pbiFormat de Deneb en Power BI"
---

**pbiFormat():** Función para formatear los datos en un formato personalizado en **Deneb**, que permite a los usuarios utilizar cadenas de formato de Power BI en lugar de la convención de formato D3. Esto significa que puedes personalizar cómo se muestran los números y las fechas en tus gráficos.

## **Ejemplo básico en Vega-Lite:**

<pre class="highlight"><code>
{
  "data": {"name": "dataset"},
  "transform": [
    {
      "calculate": "pbiFormat(1980.126, '#,0.00')",
      "as": "Formatted Positive"
    },
    {
      "calculate": "pbiFormat(-1980.1, '#,0.00')",
      "as": "Formatted Negative"
    },
    {
      "calculate": "pbiFormat(0, '#,0.00')",
      "as": "Formatted Zero"
    },
    {
      "calculate": "pbiFormat(null, '#,0.00')",
      "as": "Formatted Blank"
    },
    {
      "calculate": "pbiFormat(1980.126, '#,0.00;(#,0.00)')",
      "as": "Formatted Positive Negative"
    },
    {
      "calculate": "pbiFormat(-1980.1, '#,0.00;(#,0.00)')",
      "as": "Formatted Negative Positive"
    },
    {
      "calculate": "pbiFormat(0, '#,0.00;(#,0.00)')",
      "as": "Formatted Zero Negative Positive"
    },
    {
      "calculate": "pbiFormat(null, '#,0.00;(#,0.00)')",
      "as": "Formatted Blank Negative Positive"
    },
    {
      "calculate": "pbiFormat(1980.12, '#,#.##;(#,#.##);-')",
      "as": "Formatted Positive Custom"
    },
    {
      "calculate": "pbiFormat(-1980.12, '#,#.##;(#,#.##);-')",
      "as": "Formatted Negative Custom"
    },
    {
      "calculate": "pbiFormat(0, '#,#.##;(#,#.##);-')",
      "as": "Formatted Zero Custom"
    },
    {
      "calculate": "pbiFormat(null, '#,#.##;(#,#.##);-')",
      "as": "Formatted Blank Custom"
    },...
  ...
}
</code></pre>

![Proyectando Resultado](/assets/img/post-funcion-pbiformat/1_pbiFormat.png)

Esta forma básica toma formatos utilizados en Power BI, que también se usan con la función [**DAX FORMAT**](https://dax.guide/format/). Como se puede ver en la línea resaltada, el número es 1980.126 y el formato es #,0.00. Al especificar dos decimales, el número se redondea hacia arriba a 1980.13, lo cual es importante entender.

La siguiente tabla muestra el fragmento de pbiFormat y el formato, por si desea usarlo, ya que la imagen anterior no permite copiar el código.

<style>
  .responsive-table {
    width: 100%;
    overflow-x: auto;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
    font-size: 18px;
    text-align: left;
    table-layout: auto;
  }
  table th, table td {
    padding: 12px 15px;
    border: 1px solid #ddd;
    word-wrap: break-word;
  }
  table th {
    background-color: #007acc;
    color: white;
  }
  table tr:nth-of-type(even) {
    background-color: #f9f9f9;
  }
  table tr:hover {
    background-color: #f1f1f1;
  }
  code {
    color: #d63384;
    background-color: #f8f9fa;
    padding: 2px 4px;
    border-radius: 4px;
    font-family: Consolas, "Courier New", monospace;
  }
  @media (max-width: 600px) {
    table {
      font-size: 14px;
    }
    table th, table td {
      padding: 8px 10px;
    }
  }
  table th:first-child,
  table td:first-child {
    width: 45%;
  }
  table th:nth-child(2),
  table td:nth-child(2) {
    width: 35%;
  }
  table th:last-child,
  table td:last-child {
    width: 20%;
  }
</style>

<div class="responsive-table">
  <table>
    <thead>
      <tr>
        <th>Function</th>
        <th>Formatted</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>pbiFormat(1980.126, '#,0.00')</code></td>
        <td>1,980.13</td>
        <td>Positive Number</td>
      </tr>
      <tr>
        <td><code>pbiFormat(-1980.1, '#,0.00')</code></td>
        <td>-1,980.10</td>
        <td>Negative Number</td>
      </tr>
      <tr>
        <td><code>pbiFormat(0, '#,0.00')</code></td>
        <td>0.00</td>
        <td>Zero Value</td>
      </tr>
      <tr>
        <td><code>pbiFormat(null, '#,0.00')</code></td>
        <td>(Blank)</td>
        <td>Blank Value</td>
      </tr>
      <tr>
        <td><code>pbiFormat(1980.126, '#,0.00;(#,0.00)')</code></td>
        <td>1,980.13</td>
        <td>Positive with Neg. Format</td>
      </tr>
      <tr>
        <td><code>pbiFormat(-1980.1, '#,0.00;(#,0.00)')</code></td>
        <td>(1,980.10)</td>
        <td>Negative with Parentheses</td>
      </tr>
      <tr>
        <td><code>pbiFormat(0, '#,0.00;(#,0.00)')</code></td>
        <td>0.00</td>
        <td>Zero with Neg. Format</td>
      </tr>
      <tr>
        <td><code>pbiFormat(null, '#,0.00;(#,0.00)')</code></td>
        <td>(Blank)</td>
        <td>Blank with Neg. Format</td>
      </tr>
      <tr>
        <td><code>pbiFormat(1980.12, '#,#.##;(#,##);-')</code></td>
        <td>1,980.12</td>
        <td>Positive Custom</td>
      </tr>
      <tr>
        <td><code>pbiFormat(-1980.12, '#,#.##;(#,##);-')</code></td>
        <td>(1,980.12)</td>
        <td>Negative Custom</td>
      </tr>
      <tr>
        <td><code>pbiFormat(0, '#,#.##;(#,##);-')</code></td>
        <td>-</td>
        <td>Zero Custom</td>
      </tr>
      <tr>
        <td><code>pbiFormat(null, '#,#.##;(#,##);-')</code></td>
        <td>(Blank)</td>
        <td>Blank Custom</td>
      </tr>
    </tbody>
  </table>
</div>

### Ejemplo de un Formato más Elegante

En esta sección, presento un ejemplo de un formato de datos más elegante utilizando la función `pbiFormat`. Este método permite dar formato a los valores de ventas en diferentes escalas, desde enteros hasta billones, facilitando así su interpretación visual.

<pre class="highlight"><code>
{
  "data": {"name": "dataset"},
  "transform": [
    {
      "calculate": "pbiFormat(datum['$Sales'],'$#,0')",
      "as": "Formatted Integer"
    },
    {
      "calculate": "pbiFormat(datum['$Sales'],'$#,0,.0#K')",
      "as": "Formatted Thousands"
    },
    {
      "calculate": "pbiFormat(datum['$Sales'],'$#,0,,.0#M')",
      "as": "Formatted Millions"
    },
    {
      "calculate": "pbiFormat(datum['$Sales'],'$#,0,,,.0#B')",
      "as": "Formatted Billions"
    },
    {
      "calculate": "pbiFormat(datum['$Sales'],'$#,0,,,,.0#T')",
      "as": "Formatted Trillions"
    },
    ...
  ],
  ...
}
</code></pre>


la siguiente imagen ilustra el resultado proyectado de aplicar estos formatos:

![Proyectando Resultado](/assets/img/post-funcion-pbiformat/2_pbiFormat.png)

La siguiente tabla muestra el fragmento de <code>pbiFormat</code> y el formato, por si desea usarlo, ya que la imagen anterior no permite copiar el código.

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tabla de Formatos</title>
  <style>
    .responsive-table {
      width: 100%;
      overflow-x: auto;
      padding: 0;
      margin: 0;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
      font-size: 14px;
      text-align: left;
      table-layout: auto;
      border: none; /* Elimina el borde de la tabla */
      border-spacing: 0;
    }
    table th, table td {
      padding: 1px 1px;
      border: 1px solid #ddd;
      word-wrap: break-word;
    }
    table th {
      background-color: #007acc;
      color: white;
      border: none; /* Elimina el borde del header */
    }
    table tr:nth-of-type(even) {
      background-color: #f9f9f9;
    }
    table tr:hover {
      background-color: #f1f1f1;
    }
    code {
      color: #d63384;
      background-color: #f8f9fa;
      padding: 2px 4px;
      border-radius: 4px;
      font-family: Consolas, "Courier New", monospace;
    }
    @media (max-width: 600px) {
      table {
        font-size: 14px;
      }
      table th, table td {
        padding: 8px 10px;
      }
    }
    table th:first-child,
    table td:first-child {
      width: 45%;
    }
    table th:nth-child(2),
    table td:nth-child(2) {
      width: 35%;
    }
    table th:last-child,
    table td:last-child {
      width: 20%;
    }
  </style>
</head>
<body>

  <div class="responsive-table">
    <table>
      <thead>
        <tr>
          <th>Function</th>
          <th>Formatted</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>pbiFormat(datum['$Sales'],'$#,0')</code></td>
          <td>$1,001,001,002,030</td>
          <td>Formatted Integer</td>
        </tr>
        <tr>
          <td><code>pbiFormat(datum['$Sales'],'$#,0,.0#K')</code></td>
          <td>$1,001,001,002.03K</td>
          <td>Formatted Thousands</td>
        </tr>
        <tr>
          <td><code>pbiFormat(datum['$Sales'],'$#,0,,.0#M')</code></td>
          <td>$1,001,001.0M</td>
          <td>Formatted Millions</td>
        </tr>
        <tr>
          <td><code>pbiFormat(datum['$Sales'],'$#,0,,,.0#B')</code></td>
          <td>$1,001.0B</td>
          <td>Formatted Billions</td>
        </tr>
        <tr>
          <td><code>pbiFormat(datum['$Sales'],'$#,0,,,,.0#T')</code></td>
          <td>$1.0T</td>
          <td>Formatted Trillions</td>
        </tr>
      </tbody>
    </table>
  </div>

</body>


## Ejemplo Formateando Fechas

En esta sección, se muestra cómo utilizar la función `pbiFormat` para dar formato a las fechas en diferentes estilos. El siguiente ejemplo transforma un conjunto de datos aplicando varios formatos de fecha y hora.


<pre class="highlight"><code>
{
  "data": {"name": "dataset"},
  "transform": [
    {
      "calculate": "pbiFormat(datum['Date'],'dd/MM/yyyy hh:mm:ss')",
      "as": "Formatted DateTime"
    },
    {
      "calculate": "pbiFormat(datum['Date'],'dd/MM/yyyy')",
      "as": "Formatted Date"
    },
    {
      "calculate": "pbiFormat(datum['Date'],'M - yyyy')",
      "as": "Formatted Month Year Single Digit"
    },
    {
      "calculate": "pbiFormat(datum['Date'],'MM - yyyy')",
      "as": "Formatted Month Year Double Digit"
    },
    {
      "calculate": "pbiFormat(datum['Date'],'MMM - yyyy')",
      "as": "Formatted Month Year Abbreviation"
    },
    {
      "calculate": "pbiFormat(datum['Date'],'yyyy')",
      "as": "Formatted Year"
    },
    {
      "calculate": "pbiFormat(datum['Date'],'hh:mm:ss')",
      "as": "Formatted Time"
    },
    {
      "calculate": "pbiFormat(datum['Date'],'M')",
      "as": "Month Single Digit"
    },
    {
      "calculate": "pbiFormat(datum['Date'],'MM')",
      "as": "Month Double Digit"
    },
    {
      "calculate": "pbiFormat(datum['Date'],'MMM')",
      "as": "Month Abbreviation"
    },
    {
      "calculate": "pbiFormat(datum['Date'],'MMMM')",
      "as": "Month Full"
    },...
  ],...
}
</code></pre>


El siguiente gráfico muestra el resultado proyectado de aplicar estos formatos:

![Proyectando Resultado](/assets/img/post-funcion-pbiformat/3_pbiFormat.png)

La siguiente tabla muestra el fragmento de pbiFormat y el formato, por si desea usarlo, ya que la imagen anterior no permite copiar el código.

<style>
  .responsive-table {
    width: 100%;
    overflow-x: auto;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 2px 0;
    font-size: 14px;
    text-align: left;
    table-layout: auto;
  }
  table th, table td {
    padding: 2px 5px;
    border: 1px solid #ddd;
    word-wrap: break-word;
  }
  table th {
    background-color: #007acc;
    color: white;
  }
  table tr:nth-of-type(even) {
    background-color: #f9f9f9;
  }
  table tr:hover {
    background-color: #f1f1f1;
  }
  code {
    color: #d63384;
    background-color: #f8f9fa;
    padding: 2px 4px;
    border-radius: 4px;
    font-family: Consolas, "Courier New", monospace;
  }
  @media (max-width: 500px) {
    table {
      font-size: 12px;
    }
    table th, table td {
      padding: 8px 10px;
    }
  }
  table th:first-child,
  table td:first-child {
    width: 45%;
  }
  table th:nth-child(2),
  table td:nth-child(2) {
    width: 35%;
  }
  table th:last-child,
  table td:last-child {
    width: 20%;
  }
</style>

<div class="responsive-table">
  <table>
    <thead>
      <tr>
        <th>Function</th>
        <th>Formatted</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>pbiFormat(datum['Date'], 'dd/MM/yyyy hh:mm:ss')</code></td>
        <td>02/01/2020 03:30:00</td>
        <td>Formatted DateTime</td>
      </tr>
      <tr>
        <td><code>pbiFormat(datum['Date'], 'dd/MM/yyyy')</code></td>
        <td>02/01/2020</td>
        <td>Formatted Date</td>
      </tr>
      <tr>
        <td><code>pbiFormat(datum['Date'], 'M - yyyy')</code></td>
        <td>1 - 2020</td>
        <td>Formatted Month Year Single Digit</td>
      </tr>
      <tr>
        <td><code>pbiFormat(datum['Date'], 'MM - yyyy')</code></td>
        <td>01 - 2020</td>
        <td>Formatted Month Year Double Digit</td>
      </tr>
      <tr>
        <td><code>pbiFormat(datum['Date'], 'MMM - yyyy')</code></td>
        <td>Jan - 2020</td>
        <td>Formatted Month Year Abbreviation</td>
      </tr>
      <tr>
        <td><code>pbiFormat(datum['Date'], 'yyyy')</code></td>
        <td>2020</td>
        <td>Formatted Year</td>
      </tr>
      <tr>
        <td><code>pbiFormat(datum['Date'], 'hh:mm:ss')</code></td>
        <td>03:30:00</td>
        <td>Formatted Time</td>
      </tr>
      <tr>
        <td><code>pbiFormat(datum['Date'], 'M')</code></td>
        <td>1</td>
        <td>Month Single Digit</td>
      </tr>
      <tr>
        <td><code>pbiFormat(datum['Date'], 'MM')</code></td>
        <td>01</td>
        <td>Month Double Digit</td>
      </tr>
      <tr>
        <td><code>pbiFormat(datum['Date'], 'MMM')</code></td>
        <td>Jan</td>
        <td>Month Abbreviation</td>
      </tr>
      <tr>
        <td><code>pbiFormat(datum['Date'], 'MMMM')</code></td>
        <td>January</td>
        <td>Month Full</td>
      </tr>
    </tbody>
  </table>
</div>







<style>
  .content-section {
    font-family: Arial, sans-serif;
    margin: 20px 0;
  }
  .content-section h2 {
    color: #007acc;
  }
  .content-section p {
    font-size: 16px;
    line-height: 1.6;
  }
  .parameter-table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
    font-size: 16px;
    text-align: left;
  }
  .parameter-table th, .parameter-table td {
    padding: 12px 15px;
    border: 1px solid #ddd;
  }
  .parameter-table th {
    background-color: #007acc;
    color: white;
  }
  .parameter-table tr:nth-of-type(even) {
    background-color: #f9f9f9;
  }
  .parameter-table tr:hover {
    background-color: #f1f1f1;
  }
  .code-block {
    background-color: #f8f9fa;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-family: Consolas, "Courier New", monospace;
    color: #d63384;
  }
  .code-inline {
    background-color: #f8f9fa;
    padding: 2px 4px;
    border-radius: 4px;
    font-family: Consolas, "Courier New", monospace;
    color: #d63384;
  }
</style>

<div class="content-section">
  <h2>Exploring avanzado the Power of pbiFormat Function</h2>
  <p>
    The <span class="code-inline">pbiFormat</span> function offers great versatility when used in expression functions, providing more control compared to direct encoding properties. The complete signature of this function is:
  </p>
  <div class="code-block">
    pbiFormat(value, format, options = {})
  </div>
  <p>Here are the key parameters:</p>
  <table class="parameter-table">
    <thead>
      <tr>
        <th>Parameter</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><span class="code-inline">value</span></td>
        <td>The number to be formatted.</td>
      </tr>
      <tr>
        <td><span class="code-inline">format</span></td>
        <td>A valid Power BI format string.</td>
      </tr>
      <tr>
        <td><span class="code-inline">options</span></td>
        <td>An optional object with additional formatting options.</td>
      </tr>
    </tbody>
  </table>
  <p>Important options within the <span class="code-inline">options</span> parameter include:</p>
  <ul>
    <li><span class="code-inline">format</span> - Custom format string (overrides the format parameter if specified)</li>
    <li><span class="code-inline">precision</span> - Maximum decimal places</li>
    <li><span class="code-inline">value</span> - Value for formatting (e.g., <span class="code-inline">1e3</span> for thousands, <span class="code-inline">1e6</span> for millions)</li>
    <li><span class="code-inline">cultureSelector</span> - Locale-specific formatting (e.g., <span class="code-inline">en-GB</span>, <span class="code-inline">fr-FR</span>)</li>
  </ul>
  <h3>Example Implementation in Vega-Lite</h3>
  <p>The following Vega-Lite specification demonstrates the use of <span class="code-inline">pbiFormat</span> for dynamic number formatting:</p>
</div>

<pre class="highlight"><code>
{
  "data": {"name": "dataset"},
  "transform": [
    {
      "calculate": "pbiFormat(datum['$Sales'],datum['$Sales__format'],{ value : if(datum['$Sales']>1e12,1e12,if(datum['$Sales']>1e9,1e9,if(datum['$Sales']>1e6,1e6,if(datum['$Sales']>1e3,1e3,0 ) ) ) ), precision: datum['Precision Value']})",
      "as": "SalesFormated"
    },...
  ],...
}
</code></pre>


Aquí tienes el código formateado para mayor claridad:

<pre class="highlight"><code>
pbiFormat(datum['$Sales'], datum['$Sales__format'], {
    value: if(datum['$Sales'] > 1e12, 1e12,
              if(datum['$Sales'] > 1e9, 1e9,
                 if(datum['$Sales'] > 1e6, 1e6,
                    if(datum['$Sales'] > 1e3, 1e3, 0)))),
    precision: 0
})
</code></pre>


### Explicación de cada parte

1. **`pbiFormat()`**: Función para formatear los datos en un formato personalizado en Deneb
2. **`datum['$Sales'],`**: El valor de '$Sales' que se va a formatear.
3. **`datum['$Sales__format'],`**: El formato de salida. Aquí se está especificando un formato de moneda.
4. **`{`**: Apertura del objeto de configuración que contiene `value` y `precision`.


#### Bloque `value`

5. **`value:`**: Define el valor a utilizar basado en condiciones.
6. **`if(`**: Inicio de la primera condición.
7. **`datum['$Sales'] > 1e12,`**: Si las ventas son mayores a 1e12 (un billón), entonces...
8. **`1e12,`**: El valor será 1e12.
9. **`if(`**: Si no, entonces evalúa la siguiente condición.
10. **`datum['$Sales'] > 1e9,`**: Si las ventas son mayores a 1e9 (mil millones), entonces...
11. **`1e9,`**: El valor será 1e9.
12. **`if(`**: Si no, entonces evalúa la siguiente condición.
13. **`datum['$Sales'] > 1e6,`**: Si las ventas son mayores a 1e6 (un millón), entonces...
14. **`1e6,`**: El valor será 1e6.
15. **`if(`**: Si no, entonces evalúa la siguiente condición.
16. **`datum['$Sales'] > 1e3,`**: Si las ventas son mayores a 1e3 (mil), entonces...
17. **`1e3,`**: El valor será 1e3.
18. **`0`**: Si ninguna de las condiciones anteriores se cumple, el valor será 0.
19. **`))),`**: Cierre de las condiciones anidadas y del objeto `value`.

#### Bloque `precision`

20. **`precision: 0`**: Define la precisión del formato, que en este caso es 0 (sin decimales).
21. **`}`**: Cierre del objeto de configuración.
22. **`)`**: Cierre de la función `pbiFormat`.

Este formato es más fácil de leer y entender, especialmente cuando se trabaja con múltiples condiciones anidadas.


## Ejemplo de formateo de fecha según la cultura

En este ejemplo, se demuestra cómo formatear una fecha utilizando diferentes configuraciones culturales. Utilizamos la función `pbiFormat` para transformar la fecha a varios formatos específicos de diferentes regiones. A continuación, se presenta el código de ejemplo:

<pre class="highlight"><code>
{
  "data":{
    "name":"dataset"
  },
  "transform":[
    {
      "calculate":"pbiFormat(datum['Date'],'mm/dd/yyyy',{format:'dd MMMM yyyy' ,cultureSelector: 'pt-BR'})",
      "as":"Formatted_Brazil_pt-BR"
    },
    {
      "calculate":"pbiFormat(datum['Date'],'mm/dd/yyyy',{format:'dd MMMM yyyy' ,cultureSelector: 'ru-RU'})",
      "as":"Formatted_Russia_ru-RU"
    },
    {
      "calculate":"pbiFormat(datum['Date'],'mm/dd/yyyy',{format:'dd MMMM yyyy' ,cultureSelector: 'en-US'})",
      "as":"Formatted_USA_en-US"
    },
    {
      "calculate":"pbiFormat(datum['Date'],'mm/dd/yyyy',{format:'MM/dd/yyyy' ,cultureSelector: 'en-GB'})",
      "as":"Formatted_UK_en-GB"
    },
    {
      "calculate":"pbiFormat(datum['Date'],'',{format:'MM/dd/yyyy hh:mm:ss a',cultureSelector: 'en-US'})",
      "as":"Formatted_USA_With_Time_en-US"
    },
    {
      "calculate":"pbiFormat(datum['Date'],'',{format:'dd/MM/yyyy HH:mm:ss',cultureSelector: 'en-GB'})",
      "as":"Formatted_UK_With_Time_en-GB"
    },...
  ],...
}
</code></pre>

En este código:

- `Formatted_Brazil_pt-BR`: Formatea la fecha según el formato `dd MMMM yyyy` y la cultura `pt-BR` (Brasil).
- `Formatted_Russia_ru-RU`: Formatea la fecha según el formato `dd MMMM yyyy` y la cultura `ru-RU` (Rusia).
- `Formatted_USA_en-US`: Formatea la fecha según el formato `dd MMMM yyyy` y la cultura `en-US` (Estados Unidos).
- `Formatted_UK_en-GB`: Formatea la fecha según el formato `MM/dd/yyyy` y la cultura `en-GB` (Reino Unido).
- `Formatted_USA_With_Time_en-US`: Formatea la fecha y hora según el formato `MM/dd/yyyy hh:mm:ss a` y la cultura `en-US` (Estados Unidos).
- `Formatted_UK_With_Time_en-GB`: Formatea la fecha y hora según el formato `dd/MM/yyyy HH:mm:ss` y la cultura `en-GB` (Reino Unido).

Este enfoque permite la representación de fechas de manera consistente y específica a la cultura, lo que es crucial para aplicaciones internacionales.

<style>
  .responsive-table {
    width: 100%;
    overflow-x: auto;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 2px 0;
    font-size: 14px;
    text-align: left;
    table-layout: auto;
  }
  table th, table td {
    padding: 2px 5px;
    border: 1px solid #ddd;
    word-wrap: break-word;
  }
  table th {
    background-color: #007acc;
    color: white;
  }
  table tr:nth-of-type(even) {
    background-color: #f9f9f9;
  }
  table tr:hover {
    background-color: #f1f1f1;
  }
  code {
    color: #d63384;
    background-color: #f8f9fa;
    padding: 2px 4px;
    border-radius: 4px;
    font-family: Consolas, "Courier New", monospace;
  }
  @media (max-width: 500px) {
    table {
      font-size: 12px;
    }
    table th, table td {
      padding: 8px 10px;
    }
  }
  table th:first-child,
  table td:first-child {
    width: 45%;
  }
  table th:nth-child(2),
  table td:nth-child(2) {
    width: 35%;
  }
  table th:last-child,
  table td:last-child {
    width: 20%;
  }
</style>

<div class="responsive-table">
  <table>
    <thead>
      <tr>
        <th>Function</th>
        <th>Formatted</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>pbiFormat(datum['Date'], 'mm/dd/yyyy', {format: 'dd MMMM yyyy', cultureSelector: 'pt-BR'})</code></td>
        <td>02 janeiro 2020</td>
        <td>Formatted_Brazil_pt-BR</td>
      </tr>
      <tr>
        <td><code>pbiFormat(datum['Date'], 'mm/dd/yyyy', {format: 'dd MMMM yyyy', cultureSelector: 'ru-RU'})</code></td>
        <td>02 января 2020</td>
        <td>Formatted_Russia_ru-RU</td>
      </tr>
      <tr>
        <td><code>pbiFormat(datum['Date'], 'mm/dd/yyyy', {format: 'dd MMMM yyyy', cultureSelector: 'en-US'})</code></td>
        <td>02 January 2020</td>
        <td>Formatted_USA_en-US</td>
      </tr>
      <tr>
        <td><code>pbiFormat(datum['Date'], 'mm/dd/yyyy', {format: 'MM/dd/yyyy', cultureSelector: 'en-GB'})</code></td>
        <td>01/02/2020</td>
        <td>Formatted_UK_en-GB</td>
      </tr>
      <tr>
        <td><code>pbiFormat(datum['Date'], '', {format: 'MM/dd/yyyy hh:mm:ss a', cultureSelector: 'en-US'})</code></td>
        <td>1/2/2020 3:30:00 PM</td>
        <td>Formatted_USA_With_Time_en-US</td>
      </tr>
      <tr>
        <td><code>pbiFormat(datum['Date'], '', {format: 'dd/MM/yyyy HH:mm:ss', cultureSelector: 'en-GB'})</code></td>
        <td>02/01/2020 15:30:00</td>
        <td>Formatted_UK_With_Time_en-GB</td>
      </tr>
    </tbody>
  </table>
</div>
