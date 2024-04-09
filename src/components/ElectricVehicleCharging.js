import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";

const ElectricVehicleCharging = () => {
  const data = [
    {
      date: "2024-03-01",
      charge: "8:00 AM",
      total: 100,
      duration: "11h",
      used: 80,
      standby: 10,
      remainingBattery: 10,
    },
    {
      date: "2024-03-01",
      charge: "7:00 PM",
      total: 80,
      duration: "13h",
      used: 40,
      standby: 5,
      remainingBattery: 35,
    },
    {
      date: "2024-04-01",
      charge: "7:15 AM",
      total: 100,
      duration: "13h 45m",
      used: 70,
      standby: 10,
      remainingBattery: 20,
    },
    {
      date: "2024-04-01",
      charge: "9:00 PM",
      total: 100,
      duration: "11h 15m",
      used: 40,
      standby: 5,
      remainingBattery: 55,
    },
    {
      date: "2024-04-02",
      charge: "10:00 PM",
      total: 100,
      duration: "15h",
      used: 80,
      standby: 10,
      remainingBattery: 10,
    },
    {
      date: "2024-04-07",
      charge: "8:00 PM",
      total: 100,
      duration: "12h",
      used: 60,
      standby: 5,
      remainingBattery: 35,
    },
    {
      date: "2024-04-09",
      charge: "9:00 PM",
      total: 90,
      duration: "12h",
      used: 50,
      standby: 5,
      remainingBattery: 30,
    },
  ];

  const svgRef = useRef();
  const [filteredData, setFilteredData] = useState(data);
  const [selectedOption, setSelectedOption] = useState("");
  const options = ["monthly", "weekly", "daily"];

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    // Clear the previous graph
    svg.selectAll("*").remove();

    // Set up dimensions and margins
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // Append a group element to SVG
    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Extract unique dates from the data
    const dates = [...new Set(filteredData.map((d) => d.date))];

    // Set up scales
    const x = d3.scaleBand().domain(dates).range([0, width]).padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(filteredData, (d) => d.total)])
      .range([height, 0]);

    const stackKeys = ["used", "standby", "remainingBattery"];

    // Set up color scale
    const color = d3
      .scaleOrdinal()
      .domain(stackKeys)
      .range(["#1f77b4", "#ff7f0e", "#2ca02c"]);

    // Stack the data
    const stack = d3
      .stack()
      .keys(stackKeys)
      .order(d3.stackOrderNone)
      .offset(d3.stackOffsetNone);

    const series = stack(filteredData);

    // Draw bars
    g.selectAll(".serie")
      .data(series)
      .enter()
      .append("g")
      .attr("fill", (d) => color(d.key))
      .selectAll("rect")
      .data((d) => d)
      .enter()
      .append("rect")
      .attr("x", (d) => x(d.data.date))
      .attr("y", (d) => y(d[1]))
      .attr("height", (d) => y(d[0]) - y(d[1]))
      .attr("width", x.bandwidth());

    // Draw x-axis
    g.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x));

    // Draw y-axis
    g.append("g").call(d3.axisLeft(y));

    const legend = svg
      .append("g")
      .attr(
        "transform",
        `translate(${width - margin.right + 100}, ${margin.top})`
      );

    legend
      .selectAll("rect")
      .data(stackKeys)
      .join("rect")
      .attr("x", 0)
      .attr("y", (d, i) => i * 20)
      .attr("width", 10)
      .attr("height", 10)
      .attr("fill", (d) => color(d));

    legend
      .selectAll("text")
      .data(stackKeys)
      .join("text")
      .attr("x", 15)
      .attr("y", (d, i) => i * 20 + 9)
      .text((d) => d);
  }, [data]);

  const handleFilter = (option) => {
    setSelectedOption(option);
    let filtered = [];
    const today = new Date();
    const startOfWeek = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - today.getDay()
    );
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    switch (option) {
      case "monthly":
        filtered = data.filter((entry) => {
          const entryDate = new Date(entry.date);
          return (
            entryDate.getMonth() === startOfMonth.getMonth() &&
            entryDate.getFullYear() === startOfMonth.getFullYear()
          );
        });
        break;
      case "weekly":
        filtered = data.filter((entry) => {
          const entryDate = new Date(entry.date);
          return (
            entryDate >= startOfWeek &&
            entryDate <=
              new Date(
                startOfWeek.getFullYear(),
                startOfWeek.getMonth(),
                startOfWeek.getDate() + 6
              )
          );
        });
        break;
      case "daily":
        filtered = data.filter((entry) => {
          const entryDate = new Date(entry.date);
          return (
            entryDate.getDate() === today.getDate() &&
            entryDate.getMonth() === today.getMonth() &&
            entryDate.getFullYear() === today.getFullYear()
          );
        });
        break;
      default:
        filtered = data;
    }
    setFilteredData(filtered);
  };

  return (
    <div>
      <select
        value={selectedOption}
        onChange={(e) => handleFilter(e.target.value)}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <svg ref={svgRef} width={"100%"} height={500}></svg>
    </div>
  );
};

export default ElectricVehicleCharging;
