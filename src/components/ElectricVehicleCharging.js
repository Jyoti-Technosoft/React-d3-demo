import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

const ElectricVehicleCharging = () => {
  const data = {
    "2022-03-01": [
      {
        charge: "8:00 AM",
        total: 100,
        duration: "11h",
        used: 80,
        standby: 10,
        remainingBattery: 10,
      },
      {
        charge: "7:00 PM",
        total: 80,
        duration: "13h",
        used: 40,
        standby: 5,
        remainingBattery: 35,
      },
    ],
    "2022-03-02": [
      {
        charge: "7:15 AM",
        total: 100,
        duration: "13h 45m",
        used: 70,
        standby: 10,
        remainingBattery: 20,
      },
      {
        charge: "9:00 PM",
        total: 100,
        duration: "11h 15m",
        used: 40,
        standby: 5,
        remainingBattery: 55,
      },
    ],
  };

  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const stackKeys = ["total", "used", "standby", "remainingBattery"];

    const stack = d3.stack().keys(stackKeys);

    const stackedData = stack(Object.values(data)[0]);

    const dates = Object.keys(data);

    const x = d3
      .scaleBand()
      .domain(dates)
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(stackedData[stackedData.length - 1], (d) => d[1])])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const colors = ["#98abc5", "#8a89a6", "#7b6888", "#6b486b"];

    const color = d3.scaleOrdinal().domain(stackKeys).range(colors);

    svg
      .selectAll("g")
      .data(stackedData)
      .join("g")
      .attr("fill", (d) => color(d.key))
      .selectAll("rect")
      .data((d) => d)
      .join("rect")
      .attr("x", (d, i) => x(d.data))
      .attr("y", (d) => y(d[1]))
      .attr("height", (d) => y(d[0]) - y(d[1]))
      .attr("width", x.bandwidth());

    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).tickSizeOuter(0));

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y))
      .append("text")
      .attr("x", -margin.left)
      .attr("y", 10)
      .attr("fill", "currentColor")
      .attr("text-anchor", "start")
      .text("Battery Usage");

    const legendWidth = 200;
    const legendHeight = 50;
    const legendItemWidth = legendWidth / stackKeys.length;

    const legend = d3
      .select("#legend")
      .append("svg")
      .attr("width", legendWidth)
      .attr("height", legendHeight);

    legend
      .selectAll("rect")
      .data(stackKeys)
      .enter()
      .append("rect")
      .attr("x", (d, i) => i * legendItemWidth)
      .attr("y", 0)
      .attr("width", legendItemWidth)
      .attr("height", legendHeight)
      .style("fill", (d, i) => colors[i]);

    legend
      .selectAll("text")
      .data(stackKeys)
      .enter()
      .append("text")
      .text((d) => d)
      .attr("x", (d, i) => i * legendItemWidth + legendItemWidth / 2)
      .attr("y", legendHeight / 2 + 5)
      .attr("text-anchor", "middle")
      .style("font-size", "12px");
  }, [data]);

  return (
    <div>
      <svg ref={svgRef} width={600} height={400}></svg>
      <div id="legend"></div>
    </div>
  );
};

export default ElectricVehicleCharging;
