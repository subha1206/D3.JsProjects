// const data = [
//   { width: 30, height: 450, fill: "pink" },
//   { width: 50, height: 450, fill: "red" },
//   { width: 50, height: 450, fill: "green" },
// ];

// const svg = d3.select("svg");

// const rects = svg
//   .selectAll("rect")
//   .data(data)
//   .attr("width", (d) => d.width)
//   .attr("height", (d) => d.height)
//   .attr("fill", (d) => d.fill)
//   .attr("x", (d, i) => i * 50)
//   .attr("y", 20);

// rects
//   .enter()
//   .append("rect")
//   .attr("width", (d) => d.width)
//   .attr("height", (d) => d.height)
//   .attr("fill", (d) => d.fill)
//   .attr("x", (d, i) => i * 100)
//   .attr("y", 20);

const canvas = d3.select(".container");
const svg = canvas.append("svg").attr("width", 800).attr("height", 600);

d3.json("./planet.json").then((data) => {
  const circles = svg.selectAll("circle").data(data);

  // add attrr for existing(good practice)

  circles
    .attr("cy", 200)
    .attr("cx", (d) => d.dis)
    .attr("r", (d) => d.rad)
    .attr("fill", (d) => d.fill);

  // create new circlesusing enter selection

  circles
    .enter()
    .append("circle")
    .attr("cy", 200)
    .attr("cx", (d) => d.dis )
    .attr("r", (d) => d.rad)
    .attr("fill", (d) => d.fill);
});
