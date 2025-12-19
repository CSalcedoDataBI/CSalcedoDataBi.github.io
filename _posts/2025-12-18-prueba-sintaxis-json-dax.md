---
layout: post
title: "Prueba de Sintaxis JSON y DAX"
date: 2025-12-18 22:00:00 -0500
categories: [Test]
tags: [json, dax, test]
---

## Prueba de Resaltado JSON - Estilo Deneb

A continuación probamos el nuevo resaltado de sintaxis JSON con colores vibrantes:

```json
{
  "name": "CSalcedoDataBI",
  "type": "visualization",
  "description": "Ejemplo de JSON con colores Deneb",
  "config": {
    "enabled": true,
    "count": 42,
    "threshold": 3.14,
    "values": [12, 23, 47, 6, 52, 19],
    "url": "https://deneb.guide",
    "isActive": false,
    "tags": null
  },
  "encoding": {
    "color": {
      "field": "Category",
      "type": "nominal",
      "scale": {"scheme": "tableau10"}
    }
  }
}
```

## Prueba de Código DAX

El código DAX debe mantener su formato original sin cambios:

```dax
EVALUATE
SUMMARIZECOLUMNS(
    'Product'[Category],
    'Date'[Year],
    "Total Sales", SUM('Sales'[Amount]),
    "Total Quantity", SUM('Sales'[Quantity]),
    "Average Price", AVERAGE('Sales'[Price])
)
ORDER BY 'Date'[Year] DESC

Sales YoY % = 
VAR CurrentSales = [Total Sales]
VAR PreviousYearSales = 
    CALCULATE(
        [Total Sales],
        DATEADD('Date'[Date], -1, YEAR)
    )
RETURN
    DIVIDE(
        CurrentSales - PreviousYearSales,
        PreviousYearSales
    )
```

## Prueba de JSON Anidado

```json
{
  "data": {
    "name": "table",
    "values": [
      {"category": "A", "value": 28},
      {"category": "B", "value": 55},
      {"category": "C", "value": 43}
    ]
  },
  "scales": [
    {
      "name": "xscale",
      "type": "band",
      "domain": {"data": "table", "field": "category"},
      "range": "width"
    }
  ],
  "config": {
    "nullValue": null,
    "isValid": true,
    "precision": 0.001
  }
}
```

## Colores Esperados (Modo Oscuro)

- **Keys**: <span style="color: #36ACAA">Teal vibrante (#36ACAA)</span>
- **Strings**: <span style="color: #E3116C">Magenta (#E3116C)</span>
- **Numbers**: <span style="color: #90E0EF">Cyan claro (#90E0EF)</span>
- **Booleans/null**: <span style="color: #FFB703">Naranja (#FFB703)</span>
