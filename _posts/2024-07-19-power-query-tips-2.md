---
title: "Tips de Power Query: Función Personalizada para Mejorar la Legibilidad de los Nombres de las Columnas"
author: csalcedodatabi
date: 2024-07-19 12:00:00 +0800
categories: [Power Query, Tips]
tags: [Power Query, Transformaciones, Nombres de Columnas, Funciones Personalizadas]
pin: false
image:
  path: /assets/img/power-query-tips-2/0_FXCleanColumnHeaders.png
  alt: "Power Query Column Cleaning"
description: "Aprende a crear una función personalizada en Power Query para mejorar la legibilidad de los nombres de las columnas en tus tablas, separando palabras en notación CamelCase y reemplazando guiones bajos por espacios."
---


# Tips de Power Query: Función Personalizada para Mejorar la Legibilidad de los Nombres de las Columnas

En esta entrada, quiero compartir con ustedes una práctica que he encontrado sumamente útil al trabajar con Power Query: crear funciones personalizadas en el lenguaje M. Estas funciones me han ayudado a mejorar la legibilidad de los nombres de las columnas, lo que resulta especialmente útil en tareas repetitivas. En esta ocasión, les mostraré cómo encapsular estas funciones para facilitar su uso.

## Funciones Personalizadas de Power Query para Limpiar Encabezados de Tablas

A continuación, presento varias funciones personalizadas diseñadas para limpiar y transformar los nombres de las columnas de manera eficiente. Puedes adaptar estas funciones según las necesidades de tus proyectos.

### 1. Transformar nombres de columnas separando palabras en camelCase

- **Función**: `FXCleanColumnHeadersCamelCase`
![FXCamelCase](/assets/img/power-query-tips-2/1_FXCamelCase.png)

- **Descripción**: Convierte los nombres de columnas en formato camelCase a nombres con espacios entre las palabras.
- **Código**:

 <pre class="highlight"><code class="language-javascript">

(optional CamelCaseTable as nullable table) as table =>
  let
    transformedCamelCaseTable = Table.TransformColumnNames(
      CamelCaseTable,
      each Text.Combine(Splitter.SplitTextByCharacterTransition({"a" .. "z"}, {"A" .. "Z"})(_), " ")
    )
  in
    transformedCamelCaseTable
  </code></pre>
  
- **Tabla de entrada**:
![Ejemplo 1: Tabla de entrada](/assets/img/power-query-tips-2/1_ImputCamelCase.png)

- **Tabla de salida**:
![Ejemplo 1: Tabla de salida](/assets/img/power-query-tips-2/1_ResultCamelCase.png)

### 2. Transformar nombres de columnas reemplazando guiones bajos con espacios y recortando espacios

- **Función**: `FXCleanColumnHeadersUnderscore`
![FXUnderscore](/assets/img/power-query-tips-2/2_FXUnderscore.png)

- **Descripción**: Convierte los nombres de columnas con guiones bajos (_) en nombres con espacios y formato de título (cada palabra comienza con mayúscula).
- **Código**:

<pre class="highlight"><code class="language-javascript">
(optional UnderscoreTable as nullable table) as table =>
  let
    transformedUnderscoreTable = Table.TransformColumnNames(
      UnderscoreTable,
      each Text.Proper(Text.Trim(Text.Replace(_, "_", " ")))
    )
  in
    transformedUnderscoreTable
 </code></pre>

- **Tabla de entrada**:
![Ejemplo 1: Tabla de entrada](/assets/img/power-query-tips-2/2_ImputUnderscore.png)

- **Tabla de salida**:
![Ejemplo 1: Tabla de salida](/assets/img/power-query-tips-2/2_ResultUnderscore.png)

### 3. Transformar nombres de columnas reemplazando guiones bajos con espacios, excepto los que terminan con "KEY"

- **Función**: `FXCleanColumnHeadersUnderscoreWithKey`
![FXCamelCase](/assets/img/power-query-tips-2/3_FXUnderscoreWithKey.png)

- **Descripción**: Convierte los nombres de columnas con guiones bajos (_) en nombres con espacios y formato de título, exceptuando aquellos que terminan con "KEY".
- **Código**:

<pre class="highlight"><code class="language-javascript">
(optional UnderscoreWithKeyTable as nullable table) as table =>
  let
    transformedUnderscoreWithKeyTable = Table.TransformColumnNames(
      UnderscoreWithKeyTable,
      each if Text.EndsWith(Text.Upper(_), "KEY") then _ else Text.Proper(Text.Replace(_, "_", " "))
    )
  in
    transformedUnderscoreWithKeyTable

</code></pre>

- **Tabla de entrada**:
![Ejemplo 1: Tabla de entrada](/assets/img/power-query-tips-2/3_ImputUnderscoreWithKey.png)

- **Tabla de salida**:
![Ejemplo 1: Tabla de salida](/assets/img/power-query-tips-2/3_ResultUnderscoreWithKey.png)

### 4. Transformar nombres de columnas reemplazando guiones bajos con espacios y cambiando "Id" a "ID"

- **Función**: `FXCleanColumnHeadersUnderscoreWithID`

![FXCamelCase](/assets/img/power-query-tips-2/4_FXUnderscoreWithID.png)

- **Descripción**: Convierte los nombres de columnas con guiones bajos (_) en nombres con espacios y formato de título, y reemplaza "Id" por "ID".
- **Código**:

<pre class="highlight"><code class="language-javascript">
 (optional UnderscoreWithIDTable as nullable table) as table =>
  let
    transformedUnderscoreWithIDTable = Table.TransformColumnNames(
      UnderscoreWithIDTable,
      each [R1 = Text.Replace(_, "_", " "), P = Text.Proper(R1), R = Text.Replace(P, "Id", "ID")][R]
    )
  in
    transformedUnderscoreWithIDTable
</code></pre>

- **Tabla de entrada**:
![Ejemplo 1: Tabla de entrada](/assets/img/power-query-tips-2/4_ImputUnderscoreWithID.png)

- **Tabla de salida**:
![Ejemplo 1: Tabla de salida](/assets/img/power-query-tips-2/4_ResultUnderscoreWithID.png)
Tomado del post de [``Aditya Kumar Darak 🇮🇳``](https://www.linkedin.com/feed/update/urn:li:activity:7206158321580433408/)

### Referencias adicionales

Para más información sobre las funciones utilizadas, puedes consultar la documentación oficial de Microsoft Power Query M:

- [Table.TransformColumnNames](https://learn.microsoft.com/en-us/powerquery-m/table-transformcolumnnames)
- [Splitter.SplitTextByCharacterTransition](https://learn.microsoft.com/en-us/powerquery-m/splitter-splittextbycharactertransition)
- [Text.Combine](https://learn.microsoft.com/en-us/powerquery-m/text-combine)

## Código Completo

<pre class="highlight"><code class="language-javascript">
FXCleanColumnHeaders = (
    optional CamelCaseTable as nullable table,
    optional UnderscoreTable as nullable table,
    optional UnderscoreWithKeyTable as nullable table,
    optional UnderscoreWithIDTable as nullable table
) as table =>
let
    // Transformar nombres de columnas separando palabras en camel_case
    transformedCamelCaseTable = Table.TransformColumnNames(
        CamelCaseTable,
        each Text.Combine(Splitter.SplitTextByCharacterTransition({"a".."z"}, {"A".."Z"})(_ ), " ")
    ),

    // Transformar nombres de columnas reemplazando guiones bajos con espacios y recortando espacios
    transformedUnderscoreTable = Table.TransformColumnNames(
        UnderscoreTable,
        each Text.Proper(Text.Trim(Text.Replace(_, "_", " ")))
    ),

    // Transformar nombres de columnas reemplazando guiones bajos con espacios, excepto los que terminan con "KEY"
    transformedUnderscoreWithKeyTable = Table.TransformColumnNames(
        UnderscoreWithKeyTable,
        each if Text.EndsWith(Text.Upper(_), "KEY") then _ else Text.Proper(Text.Replace(_, "_", " "))
    ),

    // Transformar nombres de columnas reemplazando guiones bajos con espacios y cambiando "Id" a "ID"
    transformedUnderscoreWithIDTable = Table.TransformColumnNames(
        UnderscoreWithIDTable,
        each [R1 = Text.Replace(_, "_", " "), P = Text.Proper(R1), R = Text.Replace(P, "Id", "ID")][R]
    ),

    // Determinar el resultado final basado en las tablas no nulas proporcionadas
    finalResult =
        if CamelCaseTable <> null then
            transformedCamelCaseTable
        else if UnderscoreTable <> null then
            transformedUnderscoreTable
        else if UnderscoreWithKeyTable <> null then
            transformedUnderscoreWithKeyTable
        else if UnderscoreWithIDTable <> null then
            transformedUnderscoreWithIDTable
        else
            error "No tables provided or all tables are null."
in
    finalResult
</code></pre>

Espero que encuentres útiles estas funciones y que te ayuden a mejorar la legibilidad de los nombres de las columnas en tus proyectos de Power Query. ¡No dudes en adaptarlas según tus necesidades y compartir tus propias variaciones!

---
