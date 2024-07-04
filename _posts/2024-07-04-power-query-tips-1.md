---
title: "Tips de Power Query: Mejora la Legibilidad de los Nombres de las Columnas"
author: csalcedodatabi
date: 2024-07-04 12:00:00 +0800
categories: [Power Query, Tips]
tags: [Power Query, Transformaciones, Nombres de Columnas]
pin: false
image:
  path: /assets/img/power-query-tips-1/Eje_2_power_query_tips.PNG
  alt: "Power Query Column Cleaning"
description: "Mejora la legibilidad de los nombres de las columnas en tus tablas utilizando Power Query. Aprende a reemplazar guiones bajos por espacios y a separar palabras en notación CamelCase."
---

# Tips de Power Query: Mejora la Legibilidad de los Nombres de las Columnas

En esta ocasión quiero compartir con ustedes algunos tips útiles de Power Query que espero sean de gran utilidad para mejorar la legibilidad de los nombres de las columnas en sus tablas.

## Ejemplo 1: Reemplazar Guiones Bajos por Espacios

### Tabla de entrada

En este ejemplo, tenemos una tabla con nombres de columnas que contienen guiones bajos, como se muestra a continuación:

![Ejemplo 1: Tabla de entrada](/assets/img/power-query-tips-1/Ej1TablaDeEntrada.png)

### Limpieza de nombres de columnas

El objetivo es reemplazar los guiones bajos por espacios y eliminar los espacios adicionales a los lados de los nombres. Para lograrlo, utilizamos el siguiente código en Power Query:

```m
= Table.TransformColumnNames(
    PasoAnterior,
    each Text.Trim(Text.Replace(_, "_", " "))
)
```

### Tabla de salida

El resultado es una tabla con nombres de columnas más legibles:

![Ejemplo 1: Tabla de salida](/assets/img/power-query-tips-1/Ej1TabladeSalida.png)

Ejemplo completo:
![Ejemplo 1:](/assets/img/power-query-tips-1/Eje_1_power_query_tips.PNG)

## Ejemplo 2: Separar Palabras en Notación CamelCase

### Tabla de entrada

En este ejemplo, la tabla de entrada presenta los nombres de sus columnas en notación CamelCase, donde las palabras están concatenadas sin espacios intermedios, con la primera letra de cada nueva palabra en mayúscula:

![Ejemplo 2: Tabla de entrada](/assets/img/power-query-tips-1/Ej2TablaDeEntrada.png)

### Limpieza de nombres de columnas

El objetivo es separar los nombres de las columnas en palabras individuales, facilitando así la legibilidad y el manejo de los datos. Utilizamos el siguiente código en Power Query:

```m
let
    PasoAnterior = ...,
    Resultado = Table.TransformColumnNames(PasoAnterior, each Text.Combine(Splitter.SplitTextByCharacterTransition({"a".."z"}, {"A".."Z"})(_)," "))
in
    Resultado
```

### Tabla de salida

El resultado es una tabla con nombres de columnas más claros y separados por espacios:

![Ejemplo 2: Tabla de salida](/assets/img/power-query-tips-1/Ej2TabladeSalida.png)

---

Ejemplo completo:
![Ejemplo 1:](/assets/img/power-query-tips-1/Eje_2_power_query_tips.PNG)

Espero que estos tips les sean de ayuda para trabajar más eficientemente con sus datos en Power Query. ¡Feliz análisis de datos!

### Referencias adicionales

Para más información sobre las funciones utilizadas, puedes consultar la documentación oficial de Microsoft Power Query M:

- [Table.TransformColumnNames](https://learn.microsoft.com/en-us/powerquery-m/table-transformcolumnnames)
- [Splitter.SplitTextByCharacterTransition](https://learn.microsoft.com/en-us/powerquery-m/splitter-splittextbycharactertransition)
- [Text.Combine](https://learn.microsoft.com/en-us/powerquery-m/text-combine)

Estas referencias proporcionarán detalles adicionales sobre los parámetros y el uso de estas funciones en Power Query M.

---
