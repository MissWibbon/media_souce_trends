
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 50
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// SVG
var svg = d3
  .select("body")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// IMPORT DATA

d3.csv("Timeline.csv").then(function(TimelineData) {

  // parse time
  var parseTime = d3.timeParse("%b-%y");

  // Format the data
  TimelineData.forEach(function(data) {
    data.date = parseTime(data.date);
    data.CNN = +data.CNN;
    data.FOX = +data.FOX;
  });

// SCALES
  var xTimeScale = d3.scaleTime()
    .domain(d3.extent(TimelineData, d => d.date))
    .range([0, width]);

  var yLinearScale = d3.scaleLinear().range([height, 0]);

 // set up Y- domain
  var CNNMax = d3.max(TimelineData, d => d.CNN);

  // find the max of the FOX data
  var FOXMax = d3.max(TimelineData, d => d.FOX);

  var yMax;
  if (CNNMax > FOXMax) {
    yMax = CNNMax;
  }
  else {
    yMax = FOXMax;
  }


  yLinearScale.domain([0, yMax]);


 // CREATE AXES
  var bottomAxis = d3.axisBottom(xTimeScale).tickFormat(d3.timeFormat("%b-%y"));
  var leftAxis = d3.axisLeft(yLinearScale);

 
  // Add x-axis
  chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  // Add y-axis
  chartGroup.append("g").call(leftAxis);

 // LINE GENERTATOR

  // Line generator for CNN data
  var line1 = d3.line()
    .x(d => xTimeScale(d.date))
    .y(d => yLinearScale(d.CNN));

  // Line generator for FOX data
  var line2 = d3.line()
    .x(d => xTimeScale(d.date))
    .y(d => yLinearScale(d.FOX));

  // Append a path for line1
  chartGroup
    .append("path")
    .attr("d", line1(TimelineData))
    .classed("line blue", true);

  // Append a path for line2
  chartGroup
    .data([TimelineData])
    .append("path")
    .attr("d", line2)
    .classed("line red", true);

}).catch(function(error) {
  console.log(error);
});
