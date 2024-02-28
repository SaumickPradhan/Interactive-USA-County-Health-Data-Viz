// Resources: https://d3-graph-gallery.com/graph/scatter_basic.html, ChatGPT for creating constructor an initVis() and updateVis() methods, Tutorial 3: Making a Bar chart starter Template
class Scatterplot {
    constructor(_config, _attribute1, _attribute2) {
      this.config = {
        parentElement: _config.parentElement,
        containerWidth: _config.containerWidth || 350,
        containerHeight: _config.containerHeight || 200,
        margin: { top: 20, bottom: 40, right: 50, left: 65 },
      };
      this.attribute1 = _attribute1;
      this.attribute2 = _attribute2;
  
      this.initVis();
    }
  
    initVis() {
      const vis = this;
    
      // Create SVG element
      vis.svg = d3.select(vis.config.parentElement)
        .append("svg")
        .attr("width", vis.config.containerWidth + vis.config.margin.left + vis.config.margin.right)
        .attr("height", vis.config.containerHeight + vis.config.margin.top + vis.config.margin.bottom)
        .append("g")
        .attr("transform", `translate(${vis.config.margin.left},${vis.config.margin.top})`);
    
      // X-axis
      vis.xScale = d3.scaleLinear().range([0, vis.config.containerWidth]);
      vis.xAxis = vis.svg.append("g")
        .attr("transform", `translate(0,${vis.config.containerHeight})`);
    
      // Y-axis
      vis.yScale = d3.scaleLinear().range([vis.config.containerHeight, 0]);
      vis.yAxis = vis.svg.append("g");
    
      // Brush
      // Resource: Tutorial 9 and https://codesandbox.io/p/sandbox/github/UBC-InfoVis/2021-436V-examples/tree/master/d3-brushing-linking?file=%2Fjs%2FfocusContextVis.js%3A6086-6095

      vis.brushG = vis.svg.append("g")
        .attr("class", "brush");
    
      vis.brush = d3.brush()
        .extent([[0, 0], [vis.config.containerWidth, vis.config.containerHeight]])
        .on("start", () => {
          countyFilter = [];
        })
        .on("end", (area) => {
          vis.brushed(area, vis);
        });
    
      this.updateVis();
    }
  
 




    updateVis() {
      const vis = this;
  
      vis.updateData();
      vis.updateScales();
      vis.renderAxes();
      vis.renderLabels();
      vis.renderPoints();
      vis.setupEventListeners();
      vis.brushG.call(vis.brush);
  }
  
  updateData() {
      const vis = this;
      vis.data = csvData.filter(
          (d) => d[vis.attribute1] != -1 && d[vis.attribute2] != -1
      );
  }
  
  updateScales() {
      const vis = this;
      vis.xScale.domain([0, d3.max(vis.data, (d) => d[vis.attribute2])]);
      vis.yScale.domain([0, d3.max(vis.data, (d) => d[vis.attribute1])]);
  }
  
  renderAxes() {
      const vis = this;
      vis.xAxis.call(d3.axisBottom(vis.xScale));
      vis.yAxis.call(d3.axisLeft(vis.yScale));
  }
  
  renderLabels() {
      const vis = this;
      vis.svg
          .selectAll("text.xLabel")
          .data([vis.attribute2])
          .join("text")
          .attr("class", "xLabel")
          .attr(
              "transform",
              "translate(" +
                  vis.config.containerWidth / 2 +
                  " ," +
                  (vis.config.containerHeight + 35) +
                  ")"
          )
          .style("text-anchor", "middle")
          .text(attributes[vis.attribute2].label);
  
      vis.svg
          .selectAll("text.yLabel")
          .data([vis.attribute1])
          .join("text")
          .attr("class", "yLabel")
          .attr("transform", "rotate(-90)")
          .attr(
              "y",
              0 -
                  vis.config.margin.left +
                  (vis.attribute1 === "median_household_income" ? 0 : 15)
          )
          .attr("x", 0 - vis.config.containerHeight / 2)
          .attr("dy", "1em")
          .style("text-anchor", "middle")
          .text(attributes[vis.attribute1].label);
  }
  
  renderPoints() {
      const vis = this;
      vis.svg
          .selectAll("circle.regularPoint")
          .data(vis.data)
          .join("circle")
          .attr("class", "regularPoint")
          .attr("cx", (d) => vis.xScale(d[vis.attribute2]))
          .attr("cy", (d) => vis.yScale(d[vis.attribute1]))
          .attr("r", 2)
          .style(
              "fill",
              `color-mix(in srgb, ${attributes[vis.attribute1].color}, ${attributes[vis.attribute2].color}`
          )
          .style("fill-opacity", (d) => {
              if (countyFilter.length !== 0) {
                  if (
                      countyFilter.find(
                          (filteredCounty) => filteredCounty == d.cnty_fips
                      )
                  )
                      return 1;
                  else return 0.1;
              } else return 1;
          });
  }
  
  setupEventListeners() {
      const vis = this;
      d3.selectAll("circle.regularPoint")
          .on("mouseover", (event, d) => vis.handleMouseOver(event, d))
          .on("mousemove", vis.handleMouseMove)
          .on("mouseout", vis.handleMouseOut)
          .on("mousedown", (event) => vis.handleMouseDown(event));
  }
  
  handleMouseOver = (event, d) => {
    const vis = this;
    d3.select(event.currentTarget) // Use event.currentTarget instead of this
        .attr("stroke-width", "2")
        .attr("stroke", "white");
    tooltip.style("visibility", "visible").html(`
            <div class="tooltip-title">${d.display_name}</div>
            <div><b>${attributes[vis.attribute1].label}</b>: ${d[vis.attribute1]}</div>
            <div><b>${attributes[vis.attribute2].label}</b>: ${d[vis.attribute2]}</div>
        `);
}

handleMouseMove = (event) => {
    tooltip
        .style("top", event.pageY - 10 + "px")
        .style("left", event.pageX + 10 + "px");
}

handleMouseOut = () => {
    d3.select(event.currentTarget) // Use event.currentTarget instead of this
        .attr("stroke-width", "0");
    tooltip.style("visibility", "hidden");
}
  
  handleMouseDown(event) {
      const vis = this;
      vis.svg
          .select(".overlay")
          .node()
          .dispatchEvent(
              new MouseEvent("mousedown", {
                  bubbles: true,
                  clientX: event.clientX,
                  clientY: event.clientY,
                  pageX: event.pageX,
                  pageY: event.pageY,
                  view: window,
                  layerX: event.layerX,
                  layerY: event.layerY,
                  cancelable: true,
              })
          );
  }
  
  
    brushed(area, vis) {
      if (!area.sourceEvent) return; // Only transition after input
  
      const extent = area.selection;
  
      if (!extent) {
        // Reset the counties filter (include them all)
         countyFilter = [];
      } else {
        // Filter the counties
        const xRange = [vis.xScale.invert(extent[0][0]), vis.xScale.invert(extent[1][0])];
        const yRange = [vis.yScale.invert(extent[1][1]), vis.yScale.invert(extent[0][1])];
  
         countyFilter = csvData
          .filter((d) => {
            const attr1Val = d[vis.attribute1];
            const attr2Val = d[vis.attribute2];
  
            return (
              attr1Val >= yRange[0] &&
              attr1Val <= yRange[1] &&
              attr2Val >= xRange[0] &&
              attr2Val <= xRange[1]
            );
          })
          .map((d) => d.cnty_fips);
      }
  
      newSelection(vis);
    }
  }


