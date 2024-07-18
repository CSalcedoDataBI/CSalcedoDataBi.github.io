---
title: "Stacked Bar Chart with Rounded Corners Template"
author: csalcedodatabi
date: 2024-07-10 23:34:00 +0800
categories: [Deneb, Template]
tags: [Deneb, Vega-Lite, Power BI]
pin: false
image:
  path: /assets/img/template-stacked-bar-chart-rounded-corners/template_stacked_bar_chart_rounded_corners.png
  alt: "Stacked Bar Chart with Rounded Corners"
description: "This template for a Stacked Bar Chart with Rounded Corners is adapted from the [official Vega-Lite example](https://vega.github.io/vega-lite/examples/stacked_bar_count_corner_radius_mark.html) and customized for Deneb in Power BI. Please note that cross-filtering interactivity is not possible due to the use of the 'aggregate' function."
---


## Download the files used here

[🔽 Stacked_Bar_Chart_With_Rounded_Corners.pbix](https://github.com/CSalcedoDataBI/PowerBI-Deneb/raw/main/Stacked_Bar_Chart_With_Rounded_Corners/Files/Stacked_Bar_Chart_With_Rounded_Corners.pbix) (2.02 MB)

[🔽 Template_Stacked_Bar_Chart_With_Rounded_Corners.json:](https://github.com/CSalcedoDataBI/PowerBI-Deneb/blob/c4f1200ff84e36171cbc719c04c8ce6eb387ccfd/Stacked_Bar_Chart_With_Rounded_Corners/Files/Template_Stacked_Bar_Chart_With_Rounded_Corners.json) (2.46 KB)

### References

- [Vega-Lite Stacked Bar Chart with Rounded Corners Example](https://vega.github.io/vega-lite/examples/stacked_bar_count_corner_radius_mark.html): This example illustrates a stacked bar chart with rounded corners using Vega-Lite, serving as a foundational guide for creating complex visualizations.
- [Advanced Options for the pbiFormat Function](https://csalcedodatabi.github.io/posts/pbiformat-function-advanced-options/): A detailed guide on using the pbiFormat function for advanced formatting options.
- [Formatting in Deneb](https://deneb-viz.github.io/formatting): A comprehensive resource on formatting techniques in Deneb.
- [Schemes in Deneb](https://deneb-viz.github.io/schemes): This resource offers insights into the various schemes available in Deneb, helping to customize and enhance the visual appeal of your charts.
- [Categorical Schemes](https://vega.github.io/vega/docs/schemes/#categorical): Information on categorical schemes in Vega, useful for categorization and visual differentiation in charts.

### Copy the Template Below👇✔

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
      "selection": false,
      "highlight": false,
      "dataPointLimit": 50
    },
    "information": {
      "name": "Stacked Bar Chart With Rounded Corners",
      "description": "Based on an official Vega-Lite example and adapted for use in Deneb within Power BI, it should be noted that cross-filtering interactivity is limited when using 'aggregate'. Author: Cristobal Salcedo Beltran. Contact: csalcedo90@gmail.com.",
      "author": "Cristobal Salcedo Beltran",
      "uuid": "43117c42-9880-4a5e-9526-27d9a4954b1d",
      "generated": "2024-07-16T22:46:34.108Z"
    },
    "dataset": [
      {
        "key": "__0__",
        "name": "Date",
        "description": "",
        "type": "dateTime",
        "kind": "column"
      },
      {
        "key": "__1__",
        "name": "Category",
        "description": "",
        "type": "text",
        "kind": "column"
      }
    ]
  },
  "config": {
    "axisY": {
      "labelFontSize": 18,
      "tickCount": 6,
      "gridDash": [4, 8]
    },
    "axisX": {
      "labelFontSize": 18,
      "offset": 1,
      "labelExpr": "[pbiFormat(datum.value,'MMM')]"
    },
    "legend": {
      "orient": "top",
      "labelFontSize": 18
    }
  },
  "description": "Based on an official Vega-Lite example and adapted for use in Deneb within Power BI, it should be noted that cross-filtering interactivity is limited when using 'aggregate'. Author: Cristobal Salcedo Beltran. Contact: csalcedo90@gmail.com.",
  "data": {"name": "dataset"},
  "title": {
    "text": "Weather Distribution by Month",
    "fontSize": 30
  },
  "name": "Mark_BarChart",
  "mark": {
    "type": "bar",
    "cornerRadiusTopLeft": 15,
    "cornerRadiusTopRight": 15,
    "tooltip": true
  },
  "encoding": {
    "x": {
      "timeUnit": "month",
      "field": "__0__",
      "type": "ordinal",
      "title": null
    },
    "y": {
      "aggregate": "count",
      "type": "quantitative",
      "title": null
    },
    "color": {
      "field": "__1__",
      "type": "nominal",
      "scale": {
        "domain": [
          "sun",
          "fog",
          "drizzle",
          "rain",
          "snow"
        ],
        "scheme": "pbiColorNominal"
      },
      "title": null
    }
  }
}
</code></pre>
