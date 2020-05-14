// include the data considered for the tree layout
const json = {
  name: "India Covid Zones",
  color: "red",
  children: [
    {
      name: "Maharashtra",
      color: "red",
      children: [
        {
          name: "Mumbai",
          color: "red",
        },
        {
          name: "Pune",
          color: "red",
        },
        {
          name: "Thane",
          color: "red",
        },
        {
          name: "Nashik",
          color: "red",
        },
        {
          name: "Aurangabad",
          color: "red",
        },
        {
          name: "Palghar",
          color: "red",
        },
      ],
    },
    {
      name: "Gujarat",
      color: "red",
      children: [
        {
          name: "Ahmedabad",
          color: "red",
        },
        {
          name: "Surat",
          color: "red",
        },
        {
          name: "Vadodara",
          color: "red",
        },
        {
          name: "Gandhinagar",
          color: "red",
        },
        {
          name: "Bhavnagar",
          color: "red",
        },
        {
          name: "Banaskantha",
          color: "red",
        },
      ],
    },
    {
      name: "Tamil Nadu",
      color: "red",
      children: [
        {
          name: "Chennai",
          color: "red",
        },
        {
          name: "Thiruvallur",
          color: "red",
        },
        {
          name: "Cuddalore",
          color: "orange",
        },
        {
          name: "Chengalpattu",
          color: "orange",
        },
        {
          name: "Ariyalur",
          color: "orange",
        },
        {
          name: "Kancheepuram",
          color: "red",
        },
      ],
    },
    {
      name: "West Bengal",
      color: "red",
      children: [
        {
          name: "Kolkata",
          color: "red",
        },
        {
          name: "Howrah",
          color: "red",
        },
        {
          name: "North 24 Parganas",
          color: "red",
        },
        {
          name: "Hooghly",
          color: "orange",
        },
        {
          name: "South 24 Parganas",
          color: "orange",
        },
      ],
    },
    {
      name: "Kerala",
      color: "green",
      children: [
        {
          name: "Alappuzha",
          color: "green",
        },
        {
          name: "Thrissur",
          color: "green",
        },
        {
          name: "Kannur",
          color: "red",
        },
        {
          name: "Kasaragod",
          color: "orange",
        },
        {
          name: "Ernakulam",
          color: "green",
        },
      ],
    },
    {
      name: "Himachal Pradesh",
      color: "orange",
      children: [
        {
          name: "Una",
          color: "orange",
        },
        {
          name: "Kangra",
          color: "orange",
        },
        {
          name: "Chamba",
          color: "orange",
        },
        {
          name: "Bilaspur",
          color: "green",
        },
        {
          name: "Mandi",
          color: "green",
        },
      ],
    },
  ],
};

const container = d3.select(".container");

const margin = {
  top: 40,
  right: 20,
  bottom: 40,
  left: 20,
};
const width = 850 - margin.left - margin.right;
const height = 600 - margin.top - margin.bottom;

const svgCanvas = container
  .append("svg")
  .attr(
    "viewBox",
    `0 0 ${width + margin.left + margin.right} ${
      height + margin.top + margin.bottom
    }`
  )
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

const tree = d3.tree().size([width, height]);

const hierarchy = d3.hierarchy(json);

const nodes = tree(hierarchy);
console.log(nodes);

// return all nodes from the modified dataset
// console.log(nodes.descendants());
// console.log(nodes.descendants().slice(1));

const link = svgCanvas
  .selectAll("path")
  .data(nodes.descendants().slice(1))
  .enter()
  .append("path")
  .attr("d", (d) => {
    return `
        M ${d.x} ${d.y}
        C 
        ${d.x} ${(d.y + d.parent.y) / 2}
        ${d.parent.x} ${(d.y + d.parent.y) / 2}
        ${d.parent.x} ${d.parent.y}
        `;
  })
  .attr("stroke-width", 2)
  .attr("stroke", (d) => (d.data.color ? d.data.color : "red"))
  .attr("fill", "none");

// include a circle and text element each
const node = svgCanvas
  .selectAll("g")
  // considering all nodes
  .data(nodes.descendants())
  .enter()
  .append("g")

  // translate the group elements on the basis of the x and y coordinates of each data point
  .attr("transform", (d) => `translate(${d.x}, ${d.y})`);

// include a circle for each data point
node
  .append("circle")
  .attr("r", 5)
  .attr("fill", (d) => (d.data.color ? d.data.color : "red"));

node
  .append("text")
  .style("text-anchor", "middle")
  .attr("dx", (d) => (d.height === 0 ? "1.5rem" : "0"))
  .attr("dy", (d) => (d.height === 0 ? "-2rem" : "-1rem"))
  .style("writing-mode", (d) =>
    d.height === 0 ? "vertical-rl" : "horizontal-tb"
  )
  .attr("transform", (d, i) => (d.height === 0 ? `scale(0.8)` : "scale(1.1)"))
  // include the text representative of each data point
  .text((d) => d.data.name);
