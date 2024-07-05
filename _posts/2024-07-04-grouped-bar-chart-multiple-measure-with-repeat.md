---
title: "Grouped Bar Chart (Multiple Measure with Repeat Template"
author: csalcedodatabi
date: 2024-07-28 23:34:00 +0800
categories: [Deneb, Template]
tags: [Deneb, Vega-Lite, Template]
pin: false
image:
  path: /assets/img/template-grouped-bar-chart-with-cross-filtering/grouped-bar-chart-with-cross-filtering.gif
  alt: "Grouped Bar Chart (Multiple Measure with Repeat) With Cross-Filtering"
description: "This Grouped Bar Chart With Cross-Filtering template is based on the official Vega-Lite example and has been adapted for Deneb in Power BI with added interactivity (cross-filtering)."
---
### Grouped Bar Chart With Cross-Filtering Template

This interactive bar chart visualizes data by grouping categories and applying cross-filtering for enhanced data exploration. Based on the [**official Vega-Lite example**](https://vega.github.io/vega-lite/examples/bar_grouped_repeated.html) and adapted for Deneb in Power BI, this chart features advanced cross-filtering and sorting capabilities. Enhanced labeling ensures improved clarity and usability. Additionally, the `pbiColor` function adjusts the bar colors according to the first, second, and third colors defined in the Power BI theme, ensuring a consistent and cohesive visual design.

`pbiColor` 👇😍

![`pbiColor`](/assets/img/template-grouped-bar-chart-with-cross-filtering/grouped-bar-chart-with-cross-filtering.PNG)



## Download the files used here

[🔽 Grouped_Bar_Chart_With_Cross_Filtering.pbix](https://github.com/CSalcedoDataBI/PowerBI-Deneb/raw/main/Group_Bar_Chart_With_Cross_Filtering/Files/Group_Bar_Chart_With_Cross_Filtering.pbix) (4.31 MB)

[🔽 Template_Grouped_Bar_Chart_With_Cross_Filtering_VegaLite.json:](https://github.com/CSalcedoDataBI/PowerBI-Deneb/blob/e1bba130571abfe85f9a02dc8d5b1eef97b89c1a/Group_Bar_Chart_With_Cross_Filtering/Files/Group_Bar_Chart_With_Cross_Filtering.json) (4.01 KB)

### References

- [Grouped Bar Chart (Multiple Measure with Repeat)](https://vega.github.io/vega-lite/examples/bar_grouped_repeated.html): This example showcases a Grouped Bar Chart (Multiple Measure with Repeat) using Vega-Lite, providing the foundation for creating complex, interactive visualizations.
- 
- [Deneb Schemes](https://deneb-viz.github.io/schemes): This resource offers insights into various schemes available in Deneb, helping to customize and improve the visual appeal of your charts.

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
      "selection": false,
      "highlight": false,
      "dataPointLimit": 50
    },
    "information": {
      "name": "Grouped Bar Chart (Multiple Measure with Repeat)",
      "description": "Based on an official Vega-Lite example and adapted for use in Deneb within Power BI, it should be noted that cross-filtering interactivity is limited when using 'repeat'. Author: Cristobal Salcedo Beltran. Contact: csalcedo90@gmail.com.",
      "author": "Cristobal Salcedo Beltran",
      "uuid": "3daea56b-488c-467b-9627-5cf0d503e056",
      "generated": "2024-07-04T05:32:15.995Z"
    },
    "dataset": [
      {
        "key": "__0__",
        "name": "Major Genre",
        "description": "Primary classification of the data, representing different genres or segments.",
        "type": "text",
        "kind": "column"
      },
      {
        "key": "__1__",
        "name": "US Gross",
        "description": "Quantitative measurement",
        "type": "numeric",
        "kind": "measure"
      },
      {
        "key": "__2__",
        "name": "Worldwide Gross",
        "description": "Quantitative measurement",
        "type": "numeric",
        "kind": "measure"
      }
    ]
  },
  "config": {
    "axisX": {
      "title": "",
      "labelAngle": -45,
      "labelFontSize": 18,
      "labelExpr": "[split(datum.value,' ')[0],split(datum.value,' ')[1]]",
      "labelColor": "black"
    },
    "axisY": {
      "labelAngle": 0,
      "gridDash": [4, 8],
      "gridColor": "black",
      "gridOpacity": 0.4,
      "gridWidth": 1.5,
      "tickCount": 6,
      "labelFontSize": 16,
      "labelExpr": "pbiFormat(datum['value'], '$#,0,,,.# bn')"
    },
    "legend": {
      "orient": "top",
      "labelFontSize": 18
    }
  },
  "description": "This Grouped Bar Chart (Multiple Measure with Repeat) visualizes the Worldwide and US Gross Earnings by Major Film Genre. Based on an official Vega-Lite example and adapted for use in Deneb within Power BI, it should be noted that cross-filtering interactivity is limited when using 'repeat'. Author: Cristobal Salcedo Beltran. Contact: csalcedo90@gmail.com.",
  "data": {"name": "dataset"},
  "title": {
    "text": "Worldwide and US Gross Earnings by Major Film Genre (in billions USD)",
    "fontSize": 25
  },
  "transform": [
    {"filter": "datum['__0__']!== null"}
  ],
  "repeat": {
    "layer": ["__2__", "__1__"]
  },
  "spec": {
    "mark": {"type": "bar"},
    "encoding": {
      "x": {
        "field": "__0__",
        "type": "nominal"
      },
      "y": {
        "aggregate": "sum",
        "field": {"repeat": "layer"},
        "type": "quantitative",
        "title": ""
      },
      "color": {
        "datum": {"repeat": "layer"},
        "type": "nominal",
        "scale": {
          "range": [
            {"expr": "pbiColor(0)"},
            {"expr": "pbiColor(1)"}
          ]
        }
      },
      "xOffset": {
        "datum": {"repeat": "layer"}
      }
    }
  }
}

</code></pre>
