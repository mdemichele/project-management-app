// set dimensions
var width = 450;
var height = 450;
var margin = 40;

var tools_budget = document.getElementById("tool-budget").innerHTML;

var material_budget = document.getElementById("material-budget").innerHTML;


var data = {Tools: parseInt(tools_budget), Materials: parseInt(material_budget) };

console.log(data);

var radius = Math.min(width, height) / 2 - margin;

var svg = d3.select("#budget-pie-chart")
  .append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
    
// Determine the color of each slice 
var color = d3.scaleOrdinal()
  .domain(data)
  .range(["#98abc5", "#c38a37", "#dc3b33", "#6b486b", "#a05d56"]);

var pie = d3.pie()
  .value(function(d) { return d.value; })

var data_ready = pie(d3.entries(data))

// Shape Helper 
var arcGenerator = d3.arc().innerRadius(0).outerRadius(radius);

svg.selectAll('mySlices')
  .data(data_ready)
  .enter()
  .append('path')
    .attr('d', arcGenerator)
    .attr('fill', function(d){ return(color(d.data.key)) })
    .attr("stroke", "white")
    .style("stroke-width", "2px")
    .style("opacity", 0.7)
    .style("transition", 2.0);
    
// Define Text Labels Styles 
svg.selectAll('mySlices')
  .data(data_ready)
  .enter()
  .append('text')
  .text(function(d){ return `${d.data.key}: \n$${d.data.value}` })
  .attr("transform", function(d) { return "translate(" + arcGenerator.centroid(d) + ")";  })
  .style("text-anchor", "middle")
  .style("font-size", 10);
    
  
  
  
  