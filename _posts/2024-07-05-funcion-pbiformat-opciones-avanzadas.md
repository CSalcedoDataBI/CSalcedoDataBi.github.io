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
