const svg = d3
  .select(".container")
  .append("svg")
  .attr("width", 600)
  .attr("height", 600);

const margins = { top: 20, right: 20, bottom: 100, left: 100 };
const graphWidth = 600 - margins.left - margins.right;
const graphHeight = 600 - margins.top - margins.bottom;

const group = svg
  .append("g")
  .attr("width", graphWidth)
  .attr("height", graphHeight)
  .attr("transform", `translate(${margins.left}, ${margins.top})`);

const xAxisGroup = group
  .append("g")
  .attr("transform", `translate(0,${graphHeight})`);
const yAxisGroup = group.append("g");

d3.json("./menu.json").then((data) => {
  // scale creating for x and y-axis
  const y = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.orders)])
    //   .range([0,graphHeight]); to chnage the y-axis orientation we have to swith the values
    .range([graphHeight, 0]);

  const x = d3
    .scaleBand()
    .domain(data.map((item) => item.name))
    .range([0, graphWidth])
    .paddingInner(0.2)
    .paddingOuter(0.2);

  // min max and extent just for example
  /**
 *  const min = d3.min(data, (d) => d.orders);
  const max = d3.max(data, (d) => d.orders);
  const extent = d3.extent(data, (d) => d.orders);
  console.log(min, max, extent);
 */

  const rects = group.selectAll("rect").data(data);

  rects
    .enter()
    .append("rect")
    .attr("width", x.bandwidth)
    //   for the invarse bar height
    .attr("height", (d) => graphHeight - y(d.orders))
    .attr("fill", "coral")
    .attr("x", (d) => x(d.name))
    .attr("y", (d) => y(d.orders));

  //create and call the axis
  const xAxis = d3.axisBottom(x);
  const yAxis = d3
    .axisLeft(y)
    .ticks(3)
    .tickFormat((d) => d + " Orders");

  xAxisGroup.call(xAxis);
  yAxisGroup.call(yAxis);

  xAxisGroup
    .selectAll("text")
    .attr("transform", "rotate(-40)")
    .attr("text-anchor", "end")
    .attr("fill", "red");
});
