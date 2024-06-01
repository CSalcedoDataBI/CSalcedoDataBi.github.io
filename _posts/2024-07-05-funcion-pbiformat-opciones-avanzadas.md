---
title: "Cómo crear un gráfico de tarjeta dinámica con líneas de tendencia en Power BI utilizando Vega-Lite y Deneb"
author: csalcedodatabi
date: 2024-08-03 23:34:00 +0800
categories: [Blogging, Tutorial]
tags: [Deneb, Vega-Lite, Pareto]
pin: false
image:
  path: /assets/img/post-funcion-pbiformat/pbiFormat.gif
  alt: "Cross-Filtering y Cross-Highlight Scatter Plot"
description: "Una guía detallada para crear un diagrama de Pareto usando Deneb y Vega-Lite en Power BI. Esta es la primera parte de la serie."
---
**`pbiFormat()`**: Función para formatear los datos en un formato personalizado en **Deneb** que permite a los usuarios utilizar cadenas de formato de **Power BI** en lugar de la convención de `formato D3`. Esto significa que puedes personalizar cómo se muestran los números y las fechas en tus gráficos.

**Example in vega-lite**:

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
    }
  ]
  ...
}
</code></pre>

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
  <h2>Exploring the Power of pbiFormat Function</h2>
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

   

Aquí tienes el código formateado para mayor claridad:

<pre class="highlight"><code>
pbiFormat(datum['Sales'], '$#0,0', {
    value: if(datum.Sales > 1e12, 1e12,
              if(datum.Sales > 1e9, 1e9,
                 if(datum.Sales > 1e6, 1e6,
                    if(datum.Sales > 1e3, 1e3, 0)))),
    precision: 0
})
</code></pre>


### Explicación de cada parte

1. **`pbiFormat()`**: Función para formatear los datos en un formato personalizado en Deneb que permite a los usuarios utilizar cadenas de formato de Power BI en lugar de la convención de formato D3. Esto significa que puedes personalizar cómo se muestran los números y las fechas en tus gráficos.
2. **`datum['Sales'],`**: El valor de 'Sales' que se va a formatear.
3. **`'$#0,0',`**: El formato de salida. Aquí se está especificando un formato de moneda.
4. **`{`**: Apertura del objeto de configuración que contiene `value` y `precision`.


#### Bloque `value`

5. **`value:`**: Define el valor a utilizar basado en condiciones.
6. **`if(`**: Inicio de la primera condición.
7. **`datum.Sales > 1e12,`**: Si las ventas son mayores a 1e12 (un billón), entonces...
8. **`1e12,`**: El valor será 1e12.
9. **`if(`**: Si no, entonces evalúa la siguiente condición.
10. **`datum.Sales > 1e9,`**: Si las ventas son mayores a 1e9 (mil millones), entonces...
11. **`1e9,`**: El valor será 1e9.
12. **`if(`**: Si no, entonces evalúa la siguiente condición.
13. **`datum.Sales > 1e6,`**: Si las ventas son mayores a 1e6 (un millón), entonces...
14. **`1e6,`**: El valor será 1e6.
15. **`if(`**: Si no, entonces evalúa la siguiente condición.
16. **`datum.Sales > 1e3,`**: Si las ventas son mayores a 1e3 (mil), entonces...
17. **`1e3,`**: El valor será 1e3.
18. **`0`**: Si ninguna de las condiciones anteriores se cumple, el valor será 0.
19. **`))),`**: Cierre de las condiciones anidadas y del objeto `value`.

#### Bloque `precision`

20. **`precision: 0`**: Define la precisión del formato, que en este caso es 0 (sin decimales).
21. **`}`**: Cierre del objeto de configuración.
22. **`)`**: Cierre de la función `pbiFormat`.

Este formato es más fácil de leer y entender, especialmente cuando se trabaja con múltiples condiciones anidadas.