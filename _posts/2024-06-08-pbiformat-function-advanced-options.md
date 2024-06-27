---

title: "Exploring the Power of the pbiFormat() Function in Deneb"  
author: csalcedodatabi  
date: 2024-06-08 01:00:00 +0800  
categories: [Blogging, Tutorial]  
tags: [Deneb, Vega-Lite, pbiFormat]  
pin: true 
image:  
  path: /assets/img/post-funcion-pbiformat/pbiFormat.gif  
  alt: "Understanding the use of pbiFormat"  
description: "A comprehensive guide on the basic and advanced usage of the pbiFormat function in Deneb for Power BI"  

---

**pbiFormat():** A function to format data into a custom format in **Deneb**, allowing users to use Power BI format strings instead of the ``D3`` format convention. This means you can customize how numbers and dates are displayed in your charts.

## **Basic Example in Vega-Lite:**

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

The following image illustrates the projected result of applying these formats:

![Projecting Result](/assets/img/post-funcion-pbiformat/1_pbiFormat.png)

This basic form uses formats utilized in Power BI, which are also employed with the [**DAX FORMAT**](https://dax.guide/format/) function. As seen in the highlighted line, the number is 1980.126, and the format is #,0.00. By specifying two decimal places, the number is rounded up to 1980.13, which is important to understand.

The following table shows the pbiFormat snippet and the format, in case you want to use it, as the previous image does not allow copying the code.

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
        <td><code>pbiFormat(1980.12, '#,#.##;(#,#.##);-')</code></td>
        <td>1,980.12</td>
        <td>Positive Custom</td>
      </tr>
      <tr>
        <td><code>pbiFormat(-1980.12, '#,#.##;(#,#.##);-')</code></td>
        <td>(1,980.12)</td>
        <td>Negative Custom</td>
      </tr>
      <tr>
        <td><code>pbiFormat(0, '#,#.##;(#,#.##);-')</code></td>
        <td>-</td>
        <td>Zero Custom</td>
      </tr>
      <tr>
        <td><code>pbiFormat(null, '#,#.##;(#,#.##);-')</code></td>
        <td>(Blank)</td>
        <td>Blank Custom</td>
      </tr>
    </tbody>
  </table>
</div>

### Example of a More Elegant Format

In this section, I present an example of a more elegant data format using the `pbiFormat` function. This method allows formatting sales values in different scales, from integers to trillions, thus facilitating their visual interpretation.

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
}
</code></pre>

The following image illustrates the projected result of applying these formats:

![Projecting Result](/assets/img/post-funcion-pbiformat/2_pbiFormat.png)

The following table shows the <code>pbiFormat</code> snippet and the format, in case you want to use it, as the previous image does not allow copying the code.

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
        <td><code>pbiFormat(datum['$Sales'],'$#,0')</code></td>
        <td>$1,980</td>
        <td>Integer</td>
      </tr>
      <tr>
        <td><code>pbiFormat(datum['$Sales'],'$#,0,.0#K')</code></td>
        <td>$1.98K</td>
        <td>Thousands</td>
      </tr>
      <tr>
        <td><code>pbiFormat(datum['$Sales'],'$#,0,,.0#M')</code></td>
        <td>$1.98M</td>
        <td>Millions</td>
      </tr>
      <tr>
        <td><code>pbiFormat(datum['$Sales'],'$#,0,,,.0#B')</code></td>
        <td>$1.98B</td>
        <td>Billions</td>
      </tr>
      <tr>
        <td><code>pbiFormat(datum['$Sales'],'$#,0,,,,.0#T')</code></td>
        <td>$1.98T</td>
        <td>Trillions</td>
      </tr>
    </tbody>
  </table>
</div>

## Example of Formatting Dates

In this section, we demonstrate how to use the `pbiFormat` function to format dates in different styles. The following example transforms a dataset by applying various date and time formats.

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
    }
  ]
}
</code></pre>

The following graphic shows the projected result of applying these formats:

![Projecting Result](/assets/img/post-funcion-pbiformat/3_pbiFormat.png)

The following table shows the pbiFormat snippet and the format, in case you want to use it, as the previous image does not allow copying the code.

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

>Note: While exploring the use of this function in Deneb, I discovered that when formatting the month in any of its presentations (full month, abbreviated month, etc.), the letter "M" in the format string must be uppercase. As of writing this article, this behavior differs from the DAX FORMAT function.
{: .prompt-warning }

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
  <h2>Advanced Exploration of the pbiFormat Function</h2>
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
      "calculate": "pbiFormat(datum['$Sales'], datum['$Sales__format'], { value : if(datum['$Sales'] >= 1e12, 1e12, if(datum['$Sales'] >= 1e9, 1e9, if(datum['$Sales'] >= 1e6, 1e6, if(datum['$Sales'] >= 1e3, 1e3, 0 )))), precision: datum['Precision Value'] })",
      "as": "SalesFormatted"
    },...
  ],...
}
</code></pre>

### Explanation of the `pbiFormat` Function

The `pbiFormat` function in Deneb is used to format data into custom formats. Here’s a concise breakdown of its usage with an example:

<pre class="highlight"><code>
pbiFormat(datum['$Sales'], datum['$Sales__format'], {
    value: if(datum['$Sales'] >= 1e12, 1e12,
              if(datum['$Sales'] >= 1e9, 1e9,
                 if(datum['$Sales'] >= 1e6, 1e6,
                    if(datum['$Sales'] >= 1e3, 1e3, 0)))),
    precision: datum['Precision Value']
})
</code></pre>

#### Key Components

1. **`datum['$Sales']`**: The value to be formatted.
2. **`datum['$Sales__format']`**: The format string.
3. **`value`**: Sets the formatting scale based on conditions:
   - `>= 1e12` (trillion): Use `1e12`
   - `>= 1e9` (billion): Use `1e9`
   - `>= 1e6` (million): Use `1e6`
   - `>= 1e3` (thousand): Use `1e3`
   - Else: Use `0`
4. **`precision: datum['Precision Value']`**: A dynamic parameter that adjusts the number of decimal places displayed.

### Note

>For this example, I've used dynamic parameters for both the format and precision. However, you can use fixed formats, such as '#0,0.00', and set precision values like 1, 2, or 3, depending on your needs. As mentioned earlier, these parameters are optional, and the function can be used without them.
{: .prompt-tip }

#### Example Output

The formatted results are displayed as:

- `1000000000026` ➔ `$1.0T`
- `1000000026` ➔ `$1.0bn`
- `1000026` ➔ `$1.0M`
- `1026` ➔ `$1.0K`
- `926` ➔ `$926.0`

This example illustrates how `pbiFormat` dynamically formats sales values into readable scales based on their magnitude, as shown in the following gif image.

![Projected Result](/assets/img/post-funcion-pbiformat/pbiFormat.gif )

## Example of Date Formatting by Culture

In this example, we demonstrate how to format a date using different cultural settings. We use the `pbiFormat` function to transform the date into various region-specific formats. Below is the sample code:

<pre class="highlight"><code>
{
  "data": {
    "name": "dataset"
  },
  "transform": [
    {
      "calculate": "pbiFormat(datum['Date'], 'mm/dd/yyyy', {format: 'dd MMMM yyyy', cultureSelector: 'pt-BR'})",
      "as": "Formatted_Brazil_pt-BR"
    },
    {
      "calculate": "pbiFormat(datum['Date'], 'mm/dd/yyyy', {format: 'dd MMMM yyyy', cultureSelector: 'ru-RU'})",
      "as": "Formatted_Russia_ru-RU"
    },
    {
      "calculate": "pbiFormat(datum['Date'], 'mm/dd/yyyy', {format: 'dd MMMM yyyy', cultureSelector: 'en-US'})",
      "as": "Formatted_USA_en-US"
    },
    {
      "calculate": "pbiFormat(datum['Date'], 'mm/dd/yyyy', {format: 'MM/dd/yyyy', cultureSelector: 'en-GB'})",
      "as": "Formatted_UK_en-GB"
    },
    {
      "calculate": "pbiFormat(datum['Date'], '', {format: 'MM/dd/yyyy hh:mm:ss a', cultureSelector: 'en-US'})",
      "as": "Formatted_USA_With_Time_en-US"
    },
    {
      "calculate": "pbiFormat(datum['Date'], '', {format: 'dd/MM/yyyy HH:mm:ss', cultureSelector: 'en-GB'})",
      "as": "Formatted_UK_With_Time_en-GB"
    },...
  ],...
}
</code></pre>

In this code:

- `Formatted_Brazil_pt-BR`: Formats the date as `dd MMMM yyyy` with the `pt-BR` (Brazil) culture.
- `Formatted_Russia_ru-RU`: Formats the date as `dd MMMM yyyy` with the `ru-RU` (Russia) culture.
- `Formatted_USA_en-US`: Formats the date as `dd MMMM yyyy` with the `en-US` (United States) culture.
- `Formatted_UK_en-GB`: Formats the date as `MM/dd/yyyy` with the `en-GB` (United Kingdom) culture.
- `Formatted_USA_With_Time_en-US`: Formats the date and time as `MM/dd/yyyy hh:mm:ss a` with the `en-US` (United States) culture.
- `Formatted_UK_With_Time_en-GB`: Formats the date and time as `dd/MM/yyyy HH:mm:ss` with the `en-GB` (United Kingdom) culture.

This approach ensures that dates are consistently and culturally accurately represented, which is crucial for international applications.

<style>
  .responsive-table {
    width: 100%;
    overflow-x: auto;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
    font-size: 14px;
    text-align: left;
    table-layout: auto;
  }
  table th, table td {
    padding: 8px 12px;
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

## Download the Files Used Here

[🔽 pbiFormat_Function.pbix](https://github.com/CSalcedoDataBI/PowerBI-Deneb/raw/main/Exploring_the_Power_of_the_pbiFormat/Files/pbiFormat_Function.pbix) (3.47 MB)

---

### Conclusion

In conclusion, the `pbiFormat` function is incredibly powerful for dynamically formatting values. This capability allows us to define templates with all necessary logic and reuse them across our projects, eliminating the need to manually format our visuals each time. In this academic case, I have only demonstrated some common examples, but there are many more possibilities worth exploring. Additionally, we haven't covered formatting for X or Y axes, which can be done simply in Vega-Lite, but Vega allows you to leverage the full potential of this function.

### References

For more detailed information and advanced usage, you can refer to the following resources:

- [D3 Format](https://d3js.org/d3-format)
- [Power BI Custom Format Strings](https://learn.microsoft.com/en-us/power-bi/create-reports/desktop-custom-format-strings?WT.mc_id=DP-MVP-5003712#supported-custom-format-syntax)
- [Deneb Formatting](https://deneb-viz.github.io/formatting)
- [DAX FORMAT Function](https://dax.guide/format/)
