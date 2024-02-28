//Resources: https://d3-graph-gallery.com/graph/histogram_basic.html, ChatGPT for creating constructor an initVis() and updateVis() methods, Tutorial 3: Making a Bar chart starter Template

class CombinedChart {
    constructor(_config, _attributeName, _num, _chartType) {
        this.config = {
            parentElement: _config.parentElement,
            containerWidth: _config.containerWidth || 300,
            containerHeight: _config.containerHeight || 200,
            margin: { top: 15, bottom: 45, right: 25, left: 55 },
        };
        this.statusTypes = ["Rural", "Small City", "Suburban", "Urban"]; 
        this.attributeName = _attributeName;
        this.chartType = _chartType; // 'barchart' or 'histogram'
        this.number = _num;

        this.initVis();
    }


    initVis() {
        const vis = this;
    
        vis.svg = d3
            .select(vis.config.parentElement)
            .append("svg")
            .attr(
                "width",
                vis.config.containerWidth +
                vis.config.margin.left +
                vis.config.margin.right
            )
            .attr(
                "height",
                vis.config.containerHeight +
                vis.config.margin.top +
                vis.config.margin.bottom
            )
            .append("g")
            .attr(
                "transform",
                `translate(${vis.config.margin.left},${vis.config.margin.top})`
            );
    
        vis.y = d3.scaleLinear().range([vis.config.containerHeight, 0]);
        vis.yAxis = vis.svg.append("g");
 
        vis.svg
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - vis.config.margin.left)
            .attr("x", 0 - vis.config.containerHeight / 2)
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text("Number of Counties");
        vis.svg
            .selectAll("text.xLabel")
            .data([vis.attributeName])
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
            .text(attributes[vis.attributeName].label);
    
        // Resource: Tutorial 9 and https://codesandbox.io/p/sandbox/github/UBC-InfoVis/2021-436V-examples/tree/master/d3-brushing-linking?file=%2Fjs%2FfocusContextVis.js%3A6086-6095
        vis.brushG = vis.svg.append("g").attr("class", "brush");
            vis.x = null;
            vis.xAxis = null;
        // CHECK THIS!!!!!!!!!!!!
        vis.brush = d3
            .brushX()
            .extent([
                [0, 0],
                [vis.config.containerWidth, vis.config.containerHeight],
            ])
            // Reset the filtered counties
            .on("start", () => (countyFilter = []))
            .on("end", (area) => vis.brushed(area, vis));
           
        // Initialize based on chart type
        if (vis.chartType === 'histogram') {
            vis.x = d3.scaleLinear().range([0, vis.config.containerWidth]);
            vis.xAxis = vis.svg
                .append("g")
                .attr("transform", `translate(0,${vis.config.containerHeight})`);
            //console.log(vis.chartType);
            vis.updateVis();
        } else if (vis.chartType === 'barchart') {
            vis.x = d3.scaleBand()
                .domain(vis.statusTypes)
                .range([0, vis.config.containerWidth]);
            vis.xAxis = vis.svg
                .append("g")
                .attr("transform", `translate(0,${vis.config.containerHeight})`)
                .call(d3.axisBottom(vis.x));
                //console.log(vis.chartType);
    
            vis.updateVis();
        }
    }

    /**
   * Prepare the data and scales before we render it.
   */

    // Resource: https://codesandbox.io/p/sandbox/github/UBC-InfoVis/2021-436V-examples/tree/master/d3-brushing-linking?file=%2Fjs%2FfocusContextVis.js%3A6086-6095
  updateVis() {
    const vis = this;
    
    vis.data = csvData.filter(
        (d) =>
            d[vis.attributeName] != -1 &&
            (countyFilter.length == 0 ||
                (countyFilter.length != 0 &&
                    countyFilter.find(
                        (filteredCounty) => filteredCounty == d.cnty_fips
                    )))
    );
        // ERROR HERE CHECK PLEASE
        // vis.x.domain([0, d3.max(vis.data, (d) => d[vis.attributeName])]);
        // vis.xAxis.call(d3.axisBottom(vis.x));

        if (vis.chartType === 'histogram') {
            vis.x.domain([0, d3.max(vis.data, (d) => d[vis.attributeName])]);
            vis.xAxis.call(d3.axisBottom(vis.x));
        
            vis.svg
                .selectAll("text.xLabel")
                .text(attributes[vis.attributeName].label);
            const histogram = d3
                .histogram()
                .value((d) => d[vis.attributeName])
                .domain(vis.x.domain())
                .thresholds(vis.x.ticks(50));

            const bins = histogram(vis.data);

            vis.y.domain([0, d3.max(bins, (d) => d.length)]);
            vis.yAxis.call(d3.axisLeft(vis.y));

            vis.svg
                .selectAll(`rect.bar-${vis.number}`)
                .data(bins)
                .join("rect")
                .attr("class", `bar-${vis.number}`)
                .attr("x", 1)
                .attr(
                    "transform",
                    (d) => `translate(${vis.x(d.x0)}, ${vis.y(d.length)})`
                )
                .attr("width", (d) => vis.x(d.x1) - vis.x(d.x0))
                .attr("height", (d) => vis.config.containerHeight - vis.y(d.length))
                .style("fill", attributes[vis.attributeName].color);
                d3.selectAll(`rect.bar-${this.number}`)
                .on("mouseover", function (event, d) {
                  d3.select(this).attr("stroke-width", "2").attr("stroke", "white");
                  tooltip.style("visibility", "visible").html(`
                  <div class="tooltip-title">${
                    d.length
                  } ${d.length === 1 ? "County" : "Counties"}</div>
                    <div><b>${
                      attributes[vis.attributeName].label
                    }</b>: ${d.x0}-${d.x1}</div>
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
                        view: window,
                        layerX: event.layerX,
                        layerY: event.layerY,
                        cancelable: true,
                      })
                    );
                });
          
              vis.brushG.call(vis.brush);
        } else if (vis.chartType === 'barchart') {
            let statusCounts = [0, 0, 0, 0];
            vis.data.forEach(
                (county) =>
                    statusCounts[vis.statusTypes.indexOf(county[vis.attributeName])]++
            );

            vis.y.domain([0, Math.max(...statusCounts)]);
            vis.yAxis.call(d3.axisLeft(vis.y));

                const barWidth = (vis.config.containerWidth - (statusCounts.length - 1) * 5) / statusCounts.length; 

            vis.svg
                .selectAll("rect.barchart-bar")
                .data(statusCounts)
                .join("rect")
                .attr("class", "barchart-bar")
                .attr("x", (d, index) => index * (barWidth + 5)) 
                .attr("y", (d) => vis.y(d))
                .attr("width", barWidth) 
                .attr("height", (d) => vis.config.containerHeight - vis.y(d))
                .style("fill", attributes[vis.attributeName].color);

            d3.selectAll("rect.barchart-bar")
            .on("mouseover", function (event, d) {
              const mouseLoc = d3.pointer(event)[0];
              const bandwidth = vis.x.bandwidth();
              const hoveredStatus = vis.statusTypes.find((type) => {
                const barStart = vis.x(type);
                const barEnd = barStart + bandwidth;
                return barEnd >= mouseLoc && barStart <= mouseLoc;
              });
              d3.select(this).attr("stroke-width", "2").attr("stroke", "white");
              tooltip.style("visibility", "visible").html(`
                  <div class="tooltip-title">${d} ${d === 1 ? "County" : "Counties"}</div>
                  <div>Status: ${hoveredStatus}</div>
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
                    view: window,
                    layerX: event.layerX,
                    layerY: event.layerY,
                    cancelable: true,
                  })
                );
            });
      
          vis.brushG.call(vis.brush);
        }

        
    }
    //Resource: https://codesandbox.io/p/sandbox/github/UBC-InfoVis/2021-436V-examples/tree/master/d3-brushing-linking?file=%2Fjs%2FfocusContextVis.js%3A117%2C3-119%2C6

    brushed(area, vis) {
        if (!area.sourceEvent) 
        {return; 
        }

        const extent = area.selection;

        if (!extent) {
            countyFilter = [];
        } else {
            if (vis.chartType === 'histogram') {
                const range = [vis.x.invert(extent[0]), vis.x.invert(extent[1])];

                countyFilter = csvData
                    .filter((d) => {
                        const attrVal = d[vis.attributeName];
                        return attrVal >= range[0] && attrVal <= range[1];
                    }).map((d) => d.cnty_fips);

            } else if (vis.chartType === 'barchart') {
                const brushStart = extent[0];
                const brushEnd = extent[1];
                const bandwidth = vis.x.bandwidth();
                const filteredStatuses = [];
                vis.statusTypes.forEach((type) => {
                    const barStart = vis.x(type);
                    const barEnd = barStart + bandwidth;

                    if (barEnd >= brushStart && barStart <= brushEnd)
                        filteredStatuses.push(type);
                });

                countyFilter = csvData
                    .filter((d) => filteredStatuses.includes(d[vis.attributeName]))
                    .map((d) => d.cnty_fips);
            }
        }

        newSelection(vis);

        vis.brushG.call(vis.brush.move, null);
    }
}