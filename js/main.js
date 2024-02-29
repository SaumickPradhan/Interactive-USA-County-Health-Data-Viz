const attributes = {};
let jsonData, csvData;


window.onload = function() {
  // Check if the current zoom level is not 150%, then suggest the user to zoom in
  if (window.devicePixelRatio !== 1.5) {
      alert("Please zoom the browser to 150% for optimal viewing experience.");
  }
};

function resetAndZoom() {
  location.reload();
  document.body.style.zoom = "150%";
}
// TO DO :
const magnifyingGlass = document.getElementById('magnifyingGlass');
  const toggleButton = document.getElementById('toggleButton');
  let isMagnifying = false;

  toggleButton.addEventListener('click', () => {
    isMagnifying = !isMagnifying;
    if (isMagnifying) {
      magnifyingGlass.style.display = 'block';
    } else {
      magnifyingGlass.style.display = 'none';
    }
  });
  //W3 schools
  document.addEventListener('mousemove', (event) => {
    if (isMagnifying) {
      const mouseX = event.clientX;
      const mouseY = event.clientY;
      magnifyingGlass.style.left = mouseX + 'px';
      magnifyingGlass.style.top = mouseY + 'px';
      // Capture the content around the cursor and display it in the magnifying glass
      // Update the background image of the magnifying glass to reflect the captured content
      // Adjust the position and size of the magnified content as needed
      // This part depends on your specific implementation and may involve more complex logic
    }
  });


const tooltip = d3
    .select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("position", "absolute")
    .style("visibility", "hidden");

let countyFilter;
let newSelection;

fetch('data/attributes.json')
  .then(response => response.json())
  .then(data => {
    Object.assign(attributes, data);

  Promise.all([
    d3.csv("data/national_health_data.csv"),
    d3.json("data/counties-10m.json"),
  ])
    .then((data) => {
      csvData = data[0];
      jsonData = data[1];
      
      const attributesAvailable = Object.keys(csvData[0]);
  

      csvData.forEach((d) => {
        attributesAvailable.forEach((attribute) => {
          if (attribute === "display_name")
            newVal = d[attribute]
              .replaceAll('"', "")
              .replaceAll("(", "")
              .replaceAll(")", "");
          else if (attribute === "urban_rural_status") newVal = d[attribute];
          else newVal = +d[attribute];
          d[attribute] = newVal;
        });
      });
  
      // Resource: Tutorial 7b: Combine the datasets O(N^2) but N is "small"
      jsonData.objects.counties.geometries.forEach((geom) => {
        csvData.forEach((county) => {
          if (geom.id == county.cnty_fips) {
            attributesAvailable.forEach((attribute) => {
              geom.properties[attribute] = county[attribute]; 
            });
          }
        });
      });
  
      // Resource: W3 schools innerHTML
      const GlobalAttribute1 = document.getElementById("select-attribute-1");
      const GlobalAttribute2 = document.getElementById("select-attribute-2");
    
      let optionsHTML = "";
      Object.entries(attributes).forEach((attribute) => {
          // Generate HTML for option menu
          optionsHTML += `<option value="${attribute[0]}">${attribute[1].label}</option>`;
      });
    
      // Set innerHTML of select menu
      GlobalAttribute1.innerHTML = optionsHTML;
      GlobalAttribute2.innerHTML = optionsHTML;
      GlobalAttribute2.selectedIndex = 1;
       countyFilter = [];
      // Resource: Chat GPT for creating objects and https://stackoverflow.com/questions/66943983/when-we-use-d3-js-to-draw-histograms-bar-charts-can-we-use-scaleordinal
       let barchartAttri1 = new CombinedChart({parentElement: "#barchart1"},'urban_rural_status',1,'barchart');
       let barchartAttri2 = new CombinedChart({parentElement: "#barchart2"},'urban_rural_status',2,'barchart');
                 
           let histogramAttri1 = new CombinedChart({parentElement: "#histogram1"},GlobalAttribute1.value, 1,'histogram');
         let histogramAttri2 = new CombinedChart({parentElement: "#histogram2"},GlobalAttribute2.value, 2,'histogram');
        
         let scatterplot = new Scatterplot({parentElement: "#scatterplot"}, GlobalAttribute1.value, GlobalAttribute2.value);
         let choropletgAttri1 = new Choropleth({parentElement: '#choropleth1', containerWidth: 460, // Adjust width as needed
           containerHeight: 375,
           margin: { top: 5, right: 5, bottom: 10, left: 5 },
         }, GlobalAttribute1.value, 1);
     
         let choropletgAttri2 = new Choropleth({
           parentElement: '#choropleth2', containerWidth: 460, // Adjust width as needed
           containerHeight: 375,
           margin: { top: 5, right: 5, bottom: 10, left: 5 },
         }, GlobalAttribute2.value, 2);
     

    newSelection = (currentVis) => {
      const updateAttribute1 = GlobalAttribute1.value;
      const updateAttribute2 = GlobalAttribute2.value;
  
      const updateVisBasedOnAttribute = (attribute, vis) => {
          if (attribute === "urban_rural_status") {
              vis.updateVis();
          } else {
              vis.updateVis();
          }
      };
  
      updateVisBasedOnAttribute(updateAttribute1, barchartAttri1);
      updateVisBasedOnAttribute(updateAttribute2, barchartAttri2);


      updateVisBasedOnAttribute(updateAttribute1, histogramAttri1);
      updateVisBasedOnAttribute(updateAttribute2, histogramAttri2);
      
      scatterplot.updateVis();
      choropletgAttri1.updateVis();
      choropletgAttri2.updateVis();

      
      // Resource: 9 Brushing and Linking
      const resetBrush = (vis) => {
          vis.brushG.call(vis.brush.move, null);
      };
  
      resetBrush(histogramAttri1);
      resetBrush(histogramAttri2);


      if (currentVis !== barchartAttri1) resetBrush(barchartAttri1);
      if (currentVis !== barchartAttri2) resetBrush(barchartAttri2);


      if (currentVis !== scatterplot) resetBrush(scatterplot);


      if (currentVis !== choropletgAttri1) resetBrush(choropletgAttri1);
      if (currentVis !== choropletgAttri2) resetBrush(choropletgAttri2);
  };



      // Resource: W3 schools onchange, Blackbox, chat gpt
      GlobalAttribute1.onchange = (event) => {
        const selectedAttr = event.target.value;
        const histogram1Element = document.getElementById("histogram1");
        const barchart1Element = document.getElementById("barchart1");
   
        if (selectedAttr === "urban_rural_status") {
          histogram1Element.style.display = "none";
          barchart1Element.style.display = "block";
        } else {
          histogram1Element.style.display = "block";
          barchart1Element.style.display = "none";
        }

        histogramAttri1.attributeName = selectedAttr;
        //console.log(histogramAttri1.attributeName);
        scatterplot.attribute1 = selectedAttr;
        //console.log(scatterplot.attribute1);
        choropletgAttri1.attributeName = selectedAttr;
        //console.log(choroplethAttri1.attributeName);
  
        newSelection(null);
      };

      GlobalAttribute2.onchange = (event) => {
        const selectedAttr = event.target.value;
        const histogram2Element = document.getElementById("histogram2");
        const barchart2Element = document.getElementById("barchart2");
  
        if (selectedAttr === "urban_rural_status") {
          histogram2Element.style.display = "none";
          barchart2Element.style.display = "block";
          // Check 
        } else {
          histogram2Element.style.display = "block";
          barchart2Element.style.display = "none";
          //remove
        }
        histogramAttri2.attributeName = selectedAttr;
        //console.log(histogramAttri2.attributeName);
        scatterplot.attribute2 = selectedAttr;
        //console.log(scatterplot.attribute2);
        choropletgAttri2.attributeName = selectedAttr;
        //console.log(choroplethAttri2.attributeName);
  
        newSelection(null);
      };

    })
    .catch((error) => {
      console.error("Data Loading Error!", error);
    });


  })
  .catch(error => console.error('Error fetching attributes!', error));

