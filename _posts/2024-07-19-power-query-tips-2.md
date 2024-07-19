---
title: "Tips de Power Query: Función Personalizada para Mejorar la Legibilidad de los Nombres de las Columnas"
author: csalcedodatabi
date: 2024-08-04 12:00:00 +0800
categories: [Power Query, Tips]
tags: [Power Query, Transformaciones, Nombres de Columnas, Funciones Personalizadas]
pin: false
image:
  path: /assets/img/power-query-tips-1/Eje_2_power_query_tips.PNG
  alt: "Power Query Column Cleaning"
description: "Aprende a crear una función personalizada en Power Query para mejorar la legibilidad de los nombres de las columnas en tus tablas, separando palabras en notación CamelCase y reemplazando guiones bajos por espacios."
---

# Tips de Power Query: Función Personalizada para Mejorar la Legibilidad de los Nombres de las Columnas

Continuando con los tips de Power Query, he estado pensando que una de las mejores practica que he identicado durante mi experiencia al trabajar con datos es crear pequeñas funcines personalizada en el lenguaje M, que me ayudan a mejorar a la la ora de trabajar por lo que he creado varlias funciones que cumplen el mismo proposito de limpieza de nombre del post anterior pero en esta ocacisión encasuladas dentro de una fucíon lo cual es muy util para tareas repetitivas, la primera de ella es La función en sí está diseñada para convertir nombres de columnas de estilo camelCase en nombres de columnas con espacios entre las palabras. Aquí tienes la función con algunos comentarios que pueden ayudar a aclarar su propósito:

```powerquery
// Función que convierte los nombres de columnas en camelCase a nombres con espacios entre las palabras
(optional CamelCaseTable as nullable table) as table =>
  let
    // Aplica la transformación a los nombres de las columnas
    transformedCamelCaseTable = Table.TransformColumnNames(
      CamelCaseTable, 
      each Text.Combine(Splitter.SplitTextByCharacterTransition({"a" .. "z"}, {"A" .. "Z"})(_), " ")
    )
  in
    // Devuelve la tabla con los nombres de columnas transformados
    transformedCamelCaseTable
```

Esta función realiza las siguientes tareas:

1. `Table.TransformColumnNames` aplica una función a cada nombre de columna en la tabla `CamelCaseTable`.
2. La función anónima `each Text.Combine(Splitter.SplitTextByCharacterTransition({"a" .. "z"}, {"A" .. "Z"})(_), " ")` divide el nombre de la columna en partes basadas en las transiciones de minúsculas a mayúsculas y luego las combina de nuevo con espacios.

Si deseas usar esta función en un contexto de Power Query en Power BI o Excel, puedes copiar y pegar el código y luego aplicarlo a tus tablas según sea necesario.

En resumen, `FXCleanColumnHeadersCamelCase` es un nombre claro y apropiado para la función que has descrito.

### Referencias adicionales

Para más información sobre las funciones utilizadas, puedes consultar la documentación oficial de Microsoft Power Query M:

- [Table.TransformColumnNames](https://learn.microsoft.com/en-us/powerquery-m/table-transformcolumnnames)
- [Splitter.SplitTextByCharacterTransition](https://learn.microsoft.com/en-us/powerquery-m/splitter-splittextbycharactertransition)
- [Text.Combine](https://learn.microsoft.com/en-us/powerquery-m/text-combine)

Estas referencias proporcionarán detalles adicionales sobre los parámetros y el uso de estas funciones en Power Query M.

---
