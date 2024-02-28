//Resource: Tutorial 7b and https://codesandbox.io/p/sandbox/github/UBC-InfoVis/2021-436V-examples/tree/master/d3-choropleth-map?file=%2Fjs%2FchoroplethMap.js%3A3685-4381 and Blackbox.ai
class Choropleth {
    /**
   * Class constructor with basic configuration
   * @param {Object}
   * @param {Array}
   */
    constructor(_config, _attributeName, _num) {
      this.config = {
        parentElement: _config.parentElement,
        containerWidth: _config.containerWidth || 800,
        containerHeight: _config.containerHeight || 475,
        margin: _config.margin || { top: 5, right: 5, bottom: 10, left: 5 },
        color: attributes[_attributeName].color,
        tooltipPadding: 10,
        legendBottom: 50,
        legendLeft: 50,
        legendRectHeight: 12,
        legendRectWidth: 200,
      };
      this.us = jsonData;
      this.number = _num;
      this.attributeName = _attributeName;
      this.active = d3.select(null);
  
      this.initVis();
    }

    initVis() {
      let vis = this;
    
      vis.calculateDimensions();
      vis.appendSVG();
      vis.appendChartGroup();

      vis.defineProjection();
      vis.defineGeoPath();

      vis.appendMapGroup();
      vis.appendStateBorders();

      vis.appendLinearGradient();

      vis.appendLegendGroup();
      vis.appendLegendRectangle();

      vis.appendBrushGroup();
      vis.defineBrushBehavior();
    
      vis.appendCountiesGroup();
    
      this.updateVis();
    }
    
    calculateDimensions() {
      let vis = this;
      vis.width = vis.config.containerWidth - vis.config.margin.left - vis.config.margin.right;
      vis.height = vis.config.containerHeight - vis.config.margin.top - vis.config.margin.bottom;
    }
    
    appendSVG() {
      let vis = this;
      vis.svg = d3.select(vis.config.parentElement)
        .append("svg")
        .attr("width", vis.config.containerWidth)
        .attr("height", vis.config.containerHeight);
    }
    
    appendChartGroup() {
      let vis = this;
      vis.chart = vis.svg.append("g")
        .attr("transform", `translate(${vis.config.margin.left},${vis.config.margin.top})`);
    }
    
    defineProjection() {
      let vis = this;
      vis.projection = d3.geoAlbersUsa()
        .translate([vis.width / 2, vis.height / 2])
        .scale(vis.width);
    }
    
    defineGeoPath() {
      let vis = this;
      vis.geoPath = d3.geoPath().projection(vis.projection);
    }
    
    appendMapGroup() {
      let vis = this;
      vis.g = vis.svg.append("g")
        .attr("transform", `translate(${vis.config.margin.left},${vis.config.margin.top})`)
        .attr("width", vis.width + vis.config.margin.left + vis.config.margin.right)
        .attr("height", vis.height + vis.config.margin.top + vis.config.margin.bottom);
    }
    
    appendStateBorders() {
      let vis = this;
      vis.svg.append("path")
        .datum(topojson.mesh(vis.us, vis.us.objects.states, (a, b) => a !== b))
        .attr("id", "state-borders")
        .attr("d", vis.geoPath)
        .attr("transform", `translate(${vis.config.margin.left},${vis.config.margin.top})`);
    }
    
    appendLinearGradient() {
      let vis = this;
      vis.linearGradient = vis.svg.append("defs").append("linearGradient")
        .attr("id", `legend-gradient-${vis.number}`);
    }
    
    appendLegendGroup() {
      let vis = this;
      vis.legend = vis.chart.append("g")
        .attr("transform", `translate(${vis.config.legendLeft},${vis.height - vis.config.legendBottom})`);
    }
    
    appendLegendRectangle() {
      let vis = this;
      vis.legendRect = vis.legend.append("rect")
        .attr("width", vis.config.legendRectWidth)
        .attr("height", vis.config.legendRectHeight);
    }
    
    appendBrushGroup() {
      let vis = this;
      vis.brushG = vis.g.append("g").attr("class", "brush");
    }
    
    defineBrushBehavior() {
      let vis = this;
      vis.brush = d3.brush()
        .extent([[0, 0], [vis.config.containerWidth, vis.config.containerHeight]])
        .on("start", () => (countyFilter = []))
        .on("end", result => vis.brushed(result, vis));
    }
    
    appendCountiesGroup() {
      let vis = this;
      vis.countiesGroup = vis.g.append("g").attr("id", "counties");
    }
  


    updateVis() {
      const vis = this;
  
      vis.config.color = attributes[vis.attributeName].color;
  
      const filteredData = jsonData.objects.counties.geometries.filter(
          (d) => d.properties[vis.attributeName] != -1
      );
  
      vis.legendTitle = vis.legend
          .selectAll(".legend-title")
          .data([vis.attributeName])
          .join("text")
          .attr("class", "legend-title")
          .attr("dy", ".35em")
          .attr("y", -10)
          .text(attributes[vis.attributeName].label)
          .style(
              "display",
              vis.attributeName === "urban_rural_status" ? "none" : "block"
          );
  
      const attributeExtent = d3.extent(
          filteredData,
          (d) => d.properties[vis.attributeName]
      );
  
      vis.colorScale = vis.attributeName === "urban_rural_status"
          ? d3.scaleOrdinal()
              .domain(["Rural", "Small City", "Suburban", "Urban"])
              .range(["#ffe6f2", "#ffb3d9", "#ff80bf", "#ff66b3"])
          : d3.scaleLinear()
              .domain(attributeExtent)
              .range(["#ffffff", vis.config.color])
              .interpolate(d3.interpolateHcl);
  
      vis.counties = vis.countiesGroup
          .selectAll("path")
          .data(topojson.feature(vis.us, vis.us.objects.counties).features)
          .join("path")
          .attr("d", vis.geoPath)
          .attr("fill", (d) => {
              const coloredOrStripe =
                  d.properties[vis.attributeName] != -1
                      ? vis.colorScale(d.properties[vis.attributeName])
                      : "url(#lightstripe)";
              return countyFilter.length !== 0
                  ? countyFilter.find(
                      (filteredCounty) => filteredCounty == d.properties.cnty_fips
                  )
                      ? coloredOrStripe
                      : "gray"
                  : coloredOrStripe;
          });
  
      vis.counties
          .on("mouseover", function (event, d) {
              const attrVal = d.properties[vis.attributeName];
              d3.select(this).attr("stroke-width", "2").attr("stroke", "white");
              tooltip.style("visibility", "visible").html(`
            <div class="tooltip-title">${d.properties.display_name}</div>
            ${
                  attrVal == -1
                      ? "<div><i>No data available</i></div>"
                      : `<div><b>${
                          attributes[vis.attributeName].label
                      }</b>: ${attrVal}</div>`
              }
            `);
          })
          .on("mousemove", function (event) {
              tooltip
                  .style("top", event.pageY - 10 + "px")
                  .style("left", event.pageX + 10 + "px");
          })
          .on("mouseout", function () {
              d3.select(this).attr("stroke-width", "0");
              tooltip.style("visibility", "hidden");
          })
          .on("mousedown", function (event) {
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
                          layerX: event.layerX,
                          layerY: event.layerY,
                          cancelable: true,
                          view: window,
                      })
                  );
          });
  
      vis.legendStops = [
          {
              color: "#ffffff",
              value: attributeExtent[0],
              offset: 0,
          },
          {
              color: vis.config.color,
              value: attributeExtent[1],
              offset: 100,
          },
      ];
  
      const legendRectWidth = vis.config.legendRectWidth;
  
      vis.legend.selectAll("rect.choroplethColor")
          .data(["Rural", "Small City", "Suburban", "Urban"])
          .join("rect")
          .attr("class", "choroplethColor")
          .attr("width", 18)
          .attr("height", 18)
          .style("fill", (d) => vis.colorScale(d))
          .style("stroke", (d) => vis.colorScale(d))
          .attr("transform", (d, index) => `translate(${vis.config.margin.left + index * 100},${0})`)
          .style("display", vis.attributeName === "urban_rural_status" ? "block" : "none");
  
      vis.legend.selectAll("text.choroplethColorLabel")
          .data(["Rural", "Small City", "Suburban", "Urban"])
          .join("text")
          .attr("class", "choroplethColorLabel")
          .attr("x", 22)
          .attr("y", 14)
          .text((d) => d)
          .attr("transform", (d, index) => `translate(${vis.config.margin.left + index * 100},${0})`)
          .style("display", vis.attributeName === "urban_rural_status" ? "block" : "none");
  
      vis.legend.selectAll(".legend-label")
          .data(vis.legendStops)
          .join("text")
          .attr("class", "legend-label")
          .attr("text-anchor", "middle")
          .attr("dy", ".35em")
          .attr("y", 20)
          .attr("x", (d, index) => index === 0 ? 0 : legendRectWidth)
          .text((d) => Math.round(d.value * 10) / 10)
          .style("display", vis.attributeName === "urban_rural_status" ? "none" : "block");
  
      vis.linearGradient.selectAll("stop")
          .data(vis.legendStops)
          .join("stop")
          .attr("offset", (d) => d.offset)
          .attr("stop-color", (d) => d.color)
          .style("display", vis.attributeName === "urban_rural_status" ? "none" : "block");
  
      vis.legendRect.attr("fill", `url(#legend-gradient-${vis.number})`)
          .style("display", vis.attributeName === "urban_rural_status" ? "none" : "block");
  
      vis.brushG.call(vis.brush);
  }



 //Resource: https://codesandbox.io/p/sandbox/github/UBC-InfoVis/2021-436V-examples/tree/master/d3-brushing-linking?file=%2Fjs%2FfocusContextVis.js%3A117%2C3-119%2C6

  
    brushed(result, vis) {
      if (!result.sourceEvent) 
      {return;} 
  
      const extent = result.selection;
  
      if (!extent) {
        
         countyFilter = [];
      } else {
         countyFilter = topojson
          .feature(vis.us, vis.us.objects.counties)
          .features.filter((d) => {
       
            const boundingBox = vis.geoPath.bounds(d);
            const xMin = boundingBox[0][0];
            const yMin = boundingBox[0][1];
            const xMax = boundingBox[1][0];
            const yMax = boundingBox[1][1];
  
            return (
              xMax >= extent[0][0] &&
              xMin <= extent[1][0] &&
              yMax >= extent[0][1] &&
              yMin <= extent[1][1]
            );
          })
          .map((d) => d.properties.cnty_fips);
      }
  
      newSelection(vis);
    }
  }
