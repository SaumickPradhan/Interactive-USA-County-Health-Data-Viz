# Interactive-USA-County-Health-Data-Viz

**An Interactive Data Visualization Application to analyze the health, economics, environment, demographics, and healthcare across different counties in the United States**


<h2>Description</h2>

Interactive-USA-County-Health-Data-Viz is a Javascript Interactive Data Viz Web application using D3 JavaScript library and TopoJson. The motivation behind the project is to provide a comprehensive and interactive tool for exploring and understanding various factors related to health, economics, environment, demographics, and healthcare across different counties in the United States. By using the data from the US Heart and Stroke Atlas, the project aims to offer insights into how multilpe factors interact with each other. It can be used to show the interdependence or independence of variour attributes and how it affects the society. 

We use chart distributions, correlations and spatial distributions to gain a deeper understanding of the complex interplay between different factors influencing public health and well-being.



<h2>Video Presentation</h2>

[https://youtu.be/8Fe_6UhcPd0](https://youtu.be/R4DOaYfwUuk)


<h2>Check It Out</h2>

[https://interactive-usa-county-health-data-viz.vercel.app/](https://interactive-usa-county-health-data-viz.vercel.app/).

<h2>Getting Started</h2>

Navigate to your folder. Eg: for home directory

```
cd ~
```

Clone the repository

```
git clone https://github.com/SaumickPradhan/Interactive-USA-County-Health-Data-Viz.git
```

Run the Application locally with localhost or using the deployment

<h2>Data Source</h2>

This data is pulled from the [US Heart and Stroke Atlas](https://www.cdc.gov/dhdsp/maps/atlas/index.htm).

For this project, we have pulled the data together into a single file in ./data/national_health_data.csv

<details>
<summary><b>Following are the attributes used:</b></summary>

| Attribute                              | Explanation                                                                                       |
|----------------------------------------|---------------------------------------------------------------------------------------------------|
| cnty_fips                              | County FIPS code, a unique identifier for each county in the United States.                      |
| display_name                           | County name, including state abbreviation, for easy identification.                              |
| poverty_perc                           | Percentage of the population living below the poverty line.                                       |
| median_household_income                | Median income of households in the county.                                                        |
| education_less_than_high_school_percent| Percentage of the population with less than a high school education.                              |
| air_quality                            | Measure of air pollution or air quality index (AQI).                                              |
| park_access                           | Availability and accessibility of parks and recreational areas within the county.                  |
| percent_inactive                       | Percentage of the population leading a sedentary lifestyle, lacking physical activity.            |
| percent_smoking                       | Prevalence of smoking among the population.                                                       |
| urban_rural_status                    | Categorization of counties into rural, urban, suburban, or small city based on population density and development status. |
| elderly_percentage                    | Percentage of the population classified as elderly (typically aged 65 and above).                 |
| number_of_hospitals                   | Count of hospitals within the county, indicating healthcare infrastructure.                      |
| number_of_primary_care_physicians     | Count of primary care physicians available within the county.                                      |
| percent_no_heath_insurance            | Percentage of the population lacking health insurance coverage.                                    |
| percent_high_blood_pressure           | Prevalence of high blood pressure within the population.                                           |
| percent_coronary_heart_disease        | Prevalence of coronary heart disease within the population.                                        |
| percent_stroke                        | Prevalence of stroke within the population.                                                        |
| percent_high_cholesterol              | Prevalence of high cholesterol levels within the population.                                       |


</details>


<details><summary><b>Sketches</b></summary>

<img width="576" alt="image" src="https://github.com/SaumickPradhan/Interactive-USA-County-Health-Data-Viz/assets/85262444/0efe1f39-4642-4270-9ab7-b82ae66560f7">

<img width="515" alt="image" src="https://github.com/SaumickPradhan/Interactive-USA-County-Health-Data-Viz/assets/85262444/5b630b87-3bb9-4f94-a13e-8c22a2300c3e">

<img width="523" alt="image" src="https://github.com/SaumickPradhan/Interactive-USA-County-Health-Data-Viz/assets/85262444/c6384707-3d60-47bf-b364-fd05bb45e035">

<img width="516" alt="image" src="https://github.com/SaumickPradhan/Interactive-USA-County-Health-Data-Viz/assets/85262444/a97e5331-ddb6-4025-ba79-285c06e835e8">

</details>



<h2>Visualization components</h2>

<details>
  <summary><b>1. Attributes Catalog</b> </summary>
  
  <b>We have a catalog with all the attributes along with their color keys</b>

<img width="868" alt="image" src="https://github.com/SaumickPradhan/Interactive-USA-County-Health-Data-Viz/assets/85262444/6e4334af-afe9-4c8e-b18d-7a96588f9856">
</details>


<details>
  <summary><b>2. Reset Button</b> </summary>
  
  <b>Rest button to refresh the attributes and re align the page</b>
  

<img width="164" alt="image" src="https://github.com/SaumickPradhan/Interactive-USA-County-Health-Data-Viz/assets/85262444/3b9a647e-6acb-4451-baef-3234e5ec47f4">

</details>


<details>
  <summary><b>3. Color Section</b> </summary>
  
  <b>Following are the reasons to select the colors</b>

- Economics: Yellow/ orange color to signify money
  
- Environment: Cool colors to signify the nature

- Behavioral factors: Dark colors
  
- Demographics: Little colors to show bar chart difference

- Health care: Green colors for health care
  
- Health: Red colors 

</details>


<details>
  <summary><b>4. Select Attributes</b> </summary>
  <b>Drop downs to select the attributes</b>

<img width="1135" alt="image" src="https://github.com/SaumickPradhan/Interactive-USA-County-Health-Data-Viz/assets/85262444/ce02fe2a-b0d8-422e-9a0a-1434340962a5">

</details>


<details>
  <summary><b>5. Comparing Distributions of Counties with Charts</b> </summary>
  <b>Using Histograms and Bar charts to show the data depending on the selected attribute</b>

<img width="1215" alt="image" src="https://github.com/SaumickPradhan/Interactive-USA-County-Health-Data-Viz/assets/85262444/6be3575b-f49c-4c62-99e0-546d5913d19c">

<img width="579" alt="image" src="https://github.com/SaumickPradhan/Interactive-USA-County-Health-Data-Viz/assets/85262444/39ab975c-60fa-40f9-b4b1-e4446e64ce99">

<details>
<summary><b>Details on Demand using Tool Tip</b></summary>
<b>Hovering over the charts will provide extra information about that data point</b>
<img width="607" alt="image" src="https://github.com/SaumickPradhan/Interactive-USA-County-Health-Data-Viz/assets/85262444/75254cba-953b-4b57-9f2d-e19d8b468691">
</details>

<details>
<summary><b>Brushing and Linking</b></summary>
<b>Selecting and dragging a section on the chart will lead to focusing the data on only a certain section on all other visualizations as well</b>
<img width="600" alt="image" src="https://github.com/SaumickPradhan/Interactive-USA-County-Health-Data-Viz/assets/85262444/e0bcbac8-880b-495b-b89f-818878d75390">

</details>
</details>


<details>
  <summary><b>6. Correlation between Selected Attributes with Scatter plot</b> </summary>
  <b>Using scatter plot to show the relation between the selected attributes</b>

<img width="680" alt="image" src="https://github.com/SaumickPradhan/Interactive-USA-County-Health-Data-Viz/assets/85262444/c2cfac8b-1fb8-4ef4-ad50-91c39d020406">

<details>
<summary><b>Details on Demand using Tool Tip</b></summary>
<b>Hovering over the plot will provide extra information about that data point</b>
<img width="672" alt="image" src="https://github.com/SaumickPradhan/Interactive-USA-County-Health-Data-Viz/assets/85262444/d0dd946b-f3aa-4737-8b0b-eb7bb6680f07">

</details>

<details>
<summary><b>Sliding Brushing and Linking</b></summary>
<b>Selecting and dragging a section on the plot will lead to focusing the data on only a certain section on all other visualizations as well</b>
<img width="655" alt="image" src="https://github.com/SaumickPradhan/Interactive-USA-County-Health-Data-Viz/assets/85262444/5ccfc229-45b3-4dcb-a58f-add9a3715750">

</details>
</details>



<details>
  <summary><b>7. Comparing Distributions of Counties with Maps</b> </summary>
  <b>Using two Side by Side Maps to compare the magnitude of the selected attributes in various USA counties along with a legend bar</b>

<img width="1325" alt="image" src="https://github.com/SaumickPradhan/Interactive-USA-County-Health-Data-Viz/assets/85262444/067a925f-5e86-4826-a2f0-7566eba6bb4a">

<img width="710" alt="image" src="https://github.com/SaumickPradhan/Interactive-USA-County-Health-Data-Viz/assets/85262444/9555c323-9094-4cd0-b1ac-ff2595a86e23">


<details>
<summary><b>Details on Demand using Tool Tip</b></summary>
<b>Hovering over the maps will provide extra information about that data point</b>
<img width="567" alt="image" src="https://github.com/SaumickPradhan/Interactive-USA-County-Health-Data-Viz/assets/85262444/060217b6-f2e3-4fd5-ad44-75e7f519e9d0">
</details>

<details>
<summary><b>Brushing and Linking</b></summary>
<b>Selecting and dragging a section on the Map will lead to focusing the data on only a certain section on all the visualizations</b>
<img width="1282" alt="image" src="https://github.com/SaumickPradhan/Interactive-USA-County-Health-Data-Viz/assets/85262444/b56add0a-9faa-4910-8b8e-109fc9b23795">

</details>
</details>

<details>
<summary><b>8. Toggle Magnifying Glass</b></summary>
<b>The button helps magnify over a particular section of the map to see the counties</b>
<img width="264" alt="image" src="https://github.com/SaumickPradhan/Interactive-USA-County-Health-Data-Viz/assets/85262444/d1d8bbe7-5f6c-4c61-8640-d1802fca8ee7">
</details>


<h2>Interesting Findings from the Application</h2>

<details>
<summary><b>Relation between High school completion and smoking percent</b></summary>
<b>It is interesting to note that higher that counties with higher number of High school dropouts have a relative higher number of smoking percent</b>
<img width="681" alt="image" src="https://github.com/SaumickPradhan/Interactive-USA-County-Health-Data-Viz/assets/85262444/9f8f7ff4-b72c-415d-87fa-84e4eb149591">
</details>

<details>
<summary><b>Less Health Insurances in Texas</b></summary>
  
<b>Counties in Texas have less number of health insuraces as compared to other counties</b>
  
<img width="573" alt="image" src="https://github.com/SaumickPradhan/Interactive-USA-County-Health-Data-Viz/assets/85262444/6e5d9d25-b291-4235-96d4-12b7dad80c13">
</details>

<details>
<summary><b>Majority Rural counties</b></summary>
<b>Majority of the counties are rural, especially in Central USA</b>
  
<img width="559" alt="image" src="https://github.com/SaumickPradhan/Interactive-USA-County-Health-Data-Viz/assets/85262444/ed2d689b-023d-40b6-be4e-2c281ab58cdf">
  <img width="614" alt="image" src="https://github.com/SaumickPradhan/Interactive-USA-County-Health-Data-Viz/assets/85262444/fe69bbb1-405b-4a4f-a7cf-75cda321ded7">

</details>


<details>
<summary><b>Park access Index</b></summary>
<b>The western part of USA has a lot of Park access index. This sounds correct, given the vast open land and national parks in this area.</b>
  
<img width="573" alt="image" src="https://github.com/SaumickPradhan/Interactive-USA-County-Health-Data-Viz/assets/85262444/6c030b71-1881-405a-9cdf-9d45617e5106">

</details>



<h2>Application Architecture</h2>

<details>
<summary><b>Libraries Used</b></summary>
- [Javascript D3](https://d3js.org/)
- [TopoJson](https://github.com/topojson/us-atlas)
- Counties-10m.json for Choropleth maps
</details>

<details>
<summary><b>Directory Structure</b></summary>

<b>Every .js file has class that we instantiate in main.js</b>
  
- CSS

  - style.css: ALl the styling for index.html
    
- data

  - attributes.json: All feature attributes stored here with color and label in json format
 
  - counties-10m.json: Used in choropleth, from online resource.
 
  - national_health_data.csv: Pre processed dataset
    
- js
  
  - choropleth.js: File with choropleth class and all its brushing and tooltip functions
    
  - d3.v6.min.js: D3 file
    
  - histoBarChart.js : File with class for combinedChart which helps create distribution charts based on attribute chart type and all its brushing and tooltip functions
    
  - main.js: The runner file for all .js classes. It does all the data preprocessing and object instantiation of classes. It also have error handling capabilities.
    
  - scatterplot.js: File with scatterplot class and all its brushing and tooltip functions
    
  - topojson.v3.js: Used for choropleth
    
index.html: Runner page

README.md



</details>



<details>
<summary><b>Future works</b></summary>
<b>1. </b> Tracking changes in attributes for each type of county category

<b>2. </b> Creating functions for brushing and tool tip for code resuability 

<b>3. </b> Improve styling and spacing in the page
  
</details>







