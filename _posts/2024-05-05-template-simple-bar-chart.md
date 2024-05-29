---
title: "Simple Bar Chart Template"
author: csalcedodatabi
date: 2024-04-03 23:34:00 +0800
categories: [Deneb, Template]
tags: [Deneb, Vega-Lite, Template]
pin: false
image:
  path: /assets/img/template-simple-bar-chart/simple_bar_chart.gif
  alt: "Simple Bar Chart with Cross-Filtering"
description: "This simple bar chart template is based on the official Vega-Lite example and has been adapted for Deneb in Power BI with added interactivity (Cross-filtering)."
---

## Descarga los archivos utilizados aquí

[🔽 Simple_Bar_Chart_Deneb_VegaLite.pbix](https://github.com/CSalcedoDataBI/PowerBI-Deneb/raw/main/Simple_Bar_Chart/Files/Simple_Bar_Chart.pbix) (2.04 MB)

[🔽 Template_Simple_Bar_Chart_Deneb_VegaLite.json:](https://github.com/CSalcedoDataBI/PowerBI-Deneb/blob/34abf4e1d64e132a41cdc554d11e9c87843db620/Simple_Bar_Chart/Files/Simple_Bar_Chart.json) (2.1 KB)

### Copy Template

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
      "selection": true,
      "highlight": false,
      "dataPointLimit": 50
    },
    "information": {
      "name": "Simple Bar Chart Template",
      "description": "This simple bar chart template is based on the official Vega-Lite example and has been adapted for Deneb in Power BI with added interactivity (Cross-filtering). Author: Cristobal Salcedo Beltran. Contact: csalcedo90@gmail.com.",
      "author": "Cristobal Salcedo",
      "uuid": "19669a01-08fc-477c-a357-9a1c6c134a1e",
      "generated": "2024-05-29T03:47:47.358Z"
    },
    "dataset": [
      {
        "key": "__0__",
        "name": "Category Name",
        "description": "Name of the category",
        "type": "text",
        "kind": "column"
      },
      {
        "key": "__1__",
        "name": "Measure",
        "description": "Quantitative measure associated with each category",
        "type": "numeric",
        "kind": "measure"
      }
    ]
  },
  "config": {
    "axis": {
      "labelColor": "#605E5C",
      "labelFontSize": 18,
      "titleFontSize": 20
    },
    "axisX": {
      "labelPadding": 5,
      "labelAngle": 0
    },
    "axisY": {
      "labelPadding": 10
    }
  },
  "description": "Simple Bar Chart template based on the official Vega-Lite example adapted for Deneb Power BI with added interactivity (Cross-filtering). Author: Cristobal Salcedo Beltran. Contact: csalcedo90@gmail.com.",
  "data": {
    "name": "dataset"
  },
  "mark": {
    "type": "bar"
  },
  "encoding": {
    "x": {
      "field": "__0__",
      "type": "nominal",
      "axis": {
        "labelAngle": 0
      }
    },
    "y": {
      "field": "__1__",
      "type": "quantitative"
    },
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
}

</code></pre>
