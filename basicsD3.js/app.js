const canvas = d3.select(".container");

const svg = canvas.append("svg").attr("width", 1000).attr("height", 600);

const g = svg.append("g").attr("transform", "translate(220,100)");

g.append("rect")
  .attr("x", 100)
  .attr("y", 100)
  .attr("width", 200)
  .attr("height", 200)
  .attr("fill", "red");
g.append("line")
  .attr("x1", 40)
  .attr("x2", 260)
  .attr("y1", 100)
  .attr("y2", 200)
  .attr("stroke", "blue")
  .attr("stroke-width", 3);
g.append("text")
  .attr("x", 500)
  .attr("y", 350)
  .attr("fill", "green")
  .text("hello there")
  .style("font-family", "arial")
  .style("font-size", 50);
