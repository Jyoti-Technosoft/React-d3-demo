import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";

import "./ElectricVehicleCharging.css";

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
      date: "2024-04-01",
      charge: "7:15 AM",
      total: 100,
      duration: "13h 45m",
      used: 70,
      standby: 10,
      remainingBattery: 20,
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
      used: 55,
      standby: 5,
      remainingBattery: 30,
    },
  ];
  const svgRef = useRef();
  const areaSvgRef = useRef();
  const [filteredData, setFilteredData] = useState(data);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedData, setSelectedData] = useState(null);
  const options = ["monthly", "weekly", "daily"];
  const initialState = [[
    { date: new Date('2024-04-08T08:00:00'), state: 'discharging', batteryPercent: 80 },
    { date: new Date('2024-04-08T09:00:00'), state: 'discharging', batteryPercent: 75 },
    { date: new Date('2024-04-08T10:00:00'), state: 'discharging', batteryPercent: 70 },
    { date: new Date('2024-04-08T11:00:00'), state: 'discharging', batteryPercent: 70 },
    { date: new Date('2024-04-08T11:00:00'), state: 'charging', batteryPercent: 70 }, // Start charging at 11 AM
    { date: new Date('2024-04-08T12:00:00'), state: 'charging', batteryPercent: 80 },
    { date: new Date('2024-04-08T13:00:00'), state: 'charging', batteryPercent: 90 },
    { date: new Date('2024-04-08T13:00:00'), state: 'discharging', batteryPercent: 90 },
    { date: new Date('2024-04-08T14:00:00'), state: 'discharging', batteryPercent: 85 }, // Stop charging at 2 PM
    { date: new Date('2024-04-08T15:00:00'), state: 'discharging', batteryPercent: 80 },
    { date: new Date('2024-04-08T16:00:00'), state: 'discharging', batteryPercent: 75 },
    { date: new Date('2024-04-08T17:00:00'), state: 'discharging', batteryPercent: 70 },
    { date: new Date('2024-04-08T18:00:00'), state: 'discharging', batteryPercent: 50 },
    { date: new Date('2024-04-08T18:00:00'), state: 'charging', batteryPercent: 50 },
    { date: new Date('2024-04-08T19:00:00'), state: 'charging', batteryPercent: 60 },
    { date: new Date('2024-04-08T19:00:00'), state: 'discharging', batteryPercent: 60 },
    { date: new Date('2024-04-08T20:00:00'), state: 'discharging', batteryPercent: 50 },
    { date: new Date('2024-04-08T20:00:00'), state: 'charging', batteryPercent: 50 },
    { date: new Date('2024-04-08T21:00:00'), state: 'charging', batteryPercent: 80 },
    { date: new Date('2024-04-08T22:00:00'), state: 'charging', batteryPercent: 90 },
    { date: new Date('2024-04-08T22:00:00'), state: 'discharging', batteryPercent: 90 },
    { date: new Date('2024-04-08T22:00:00'), state: 'standby', batteryPercent: 90 },
    { date: new Date('2024-04-08T23:00:00'), state: 'standby', batteryPercent: 87 },
    { date: new Date('2024-04-09T00:00:00'), state: 'standby', batteryPercent: 85 },
    { date: new Date('2024-04-09T00:00:00'), state: 'discharging', batteryPercent: 85 },
    { date: new Date('2024-04-09T01:00:00'), state: 'discharging', batteryPercent: 80 },
    { date: new Date('2024-04-09T02:00:00'), state: 'discharging', batteryPercent: 75 },
    // { date: new Date('2024-04-10T02:00:00'), state: 'charging', batteryPercent: 75 },
    // { date: new Date('2024-04-10T03:00:00'), state: 'charging', batteryPercent: 75 },
  ], [
    // { date: new Date('2024-04-08T08:00:00'), state: 'discharging', batteryPercent: 90 },
    // { date: new Date('2024-04-08T09:00:00'), state: 'discharging', batteryPercent: 85 },
    // { date: new Date('2024-04-08T10:00:00'), state: 'discharging', batteryPercent: 75 },
    // { date: new Date('2024-04-08T11:00:00'), state: 'discharging', batteryPercent: 75 },
    { date: new Date('2024-04-08T11:00:00'), state: 'charging', batteryPercent: 75 }, // Start charging at 11 AM
    { date: new Date('2024-04-08T12:00:00'), state: 'charging', batteryPercent: 80 },
    { date: new Date('2024-04-08T13:00:00'), state: 'charging', batteryPercent: 90 },
    { date: new Date('2024-04-08T13:00:00'), state: 'discharging', batteryPercent: 90 },
    { date: new Date('2024-04-08T14:00:00'), state: 'discharging', batteryPercent: 85 }, // Stop charging at 2 PM
    { date: new Date('2024-04-08T15:00:00'), state: 'discharging', batteryPercent: 80 },
    { date: new Date('2024-04-08T16:00:00'), state: 'discharging', batteryPercent: 75 },
    { date: new Date('2024-04-08T17:00:00'), state: 'discharging', batteryPercent: 70 },
    { date: new Date('2024-04-08T18:00:00'), state: 'discharging', batteryPercent: 50 },
    { date: new Date('2024-04-08T18:00:00'), state: 'charging', batteryPercent: 50 },
    { date: new Date('2024-04-08T19:00:00'), state: 'charging', batteryPercent: 60 },
    { date: new Date('2024-04-08T19:00:00'), state: 'discharging', batteryPercent: 60 },
    { date: new Date('2024-04-08T20:00:00'), state: 'discharging', batteryPercent: 50 },
    { date: new Date('2024-04-08T20:00:00'), state: 'charging', batteryPercent: 50 },
    { date: new Date('2024-04-08T21:00:00'), state: 'charging', batteryPercent: 80 },
    { date: new Date('2024-04-08T22:00:00'), state: 'charging', batteryPercent: 90 },
    { date: new Date('2024-04-08T22:00:00'), state: 'discharging', batteryPercent: 90 },
    { date: new Date('2024-04-08T22:00:00'), state: 'standby', batteryPercent: 90 },
    { date: new Date('2024-04-08T23:00:00'), state: 'standby', batteryPercent: 87 },
    { date: new Date('2024-04-09T00:00:00'), state: 'standby', batteryPercent: 85 },
    { date: new Date('2024-04-09T00:00:00'), state: 'discharging', batteryPercent: 85 },
    { date: new Date('2024-04-09T01:00:00'), state: 'discharging', batteryPercent: 80 },
    { date: new Date('2024-04-09T02:00:00'), state: 'discharging', batteryPercent: 75 },
    // { date: new Date('2024-04-10T02:00:00'), state: 'charging', batteryPercent: 75 },
    // { date: new Date('2024-04-10T03:00:00'), state: 'charging', batteryPercent: 75 },
  ], [
    { date: new Date('2024-04-08T08:00:00'), state: 'discharging', batteryPercent: 80 },
    { date: new Date('2024-04-08T09:00:00'), state: 'discharging', batteryPercent: 75 },
    { date: new Date('2024-04-08T10:00:00'), state: 'discharging', batteryPercent: 70 },
    { date: new Date('2024-04-08T11:00:00'), state: 'discharging', batteryPercent: 70 },
    { date: new Date('2024-04-08T11:00:00'), state: 'charging', batteryPercent: 70 }, // Start charging at 11 AM
    { date: new Date('2024-04-08T12:00:00'), state: 'charging', batteryPercent: 80 },
    { date: new Date('2024-04-08T13:00:00'), state: 'charging', batteryPercent: 90 },
    { date: new Date('2024-04-08T13:00:00'), state: 'discharging', batteryPercent: 90 },
    { date: new Date('2024-04-08T14:00:00'), state: 'discharging', batteryPercent: 85 }, // Stop charging at 2 PM
    { date: new Date('2024-04-08T15:00:00'), state: 'discharging', batteryPercent: 80 },
    { date: new Date('2024-04-08T16:00:00'), state: 'discharging', batteryPercent: 75 },
    { date: new Date('2024-04-08T17:00:00'), state: 'discharging', batteryPercent: 70 },
    { date: new Date('2024-04-08T18:00:00'), state: 'discharging', batteryPercent: 50 },
    // { date: new Date('2024-04-08T18:00:00'), state: 'charging', batteryPercent: 50 },
    // { date: new Date('2024-04-08T19:00:00'), state: 'charging', batteryPercent: 60 },
    // { date: new Date('2024-04-08T19:00:00'), state: 'discharging', batteryPercent: 60 },
    // { date: new Date('2024-04-08T20:00:00'), state: 'discharging', batteryPercent: 50 },
    // { date: new Date('2024-04-08T20:00:00'), state: 'charging', batteryPercent: 50 },
    // { date: new Date('2024-04-08T21:00:00'), state: 'charging', batteryPercent: 80 },
    // { date: new Date('2024-04-08T22:00:00'), state: 'charging', batteryPercent: 90 },
    // { date: new Date('2024-04-08T22:00:00'), state: 'discharging', batteryPercent: 90 },
    // { date: new Date('2024-04-08T22:00:00'), state: 'standby', batteryPercent: 90 },
    // { date: new Date('2024-04-08T23:00:00'), state: 'standby', batteryPercent: 87 },
    // { date: new Date('2024-04-09T00:00:00'), state: 'standby', batteryPercent: 85 },
    // { date: new Date('2024-04-09T00:00:00'), state: 'discharging', batteryPercent: 85 },
    // { date: new Date('2024-04-09T01:00:00'), state: 'discharging', batteryPercent: 80 },
    // { date: new Date('2024-04-09T02:00:00'), state: 'discharging', batteryPercent: 75 },
    // { date: new Date('2024-04-10T02:00:00'), state: 'charging', batteryPercent: 75 },
    // { date: new Date('2024-04-10T03:00:00'), state: 'charging', batteryPercent: 75 },
  ], [
    { date: new Date('2024-04-08T08:00:00'), state: 'discharging', batteryPercent: 80 },
    { date: new Date('2024-04-08T09:00:00'), state: 'discharging', batteryPercent: 75 },
    { date: new Date('2024-04-08T10:00:00'), state: 'discharging', batteryPercent: 70 },
    { date: new Date('2024-04-08T11:00:00'), state: 'discharging', batteryPercent: 70 },
    { date: new Date('2024-04-08T11:00:00'), state: 'charging', batteryPercent: 70 }, // Start charging at 11 AM
    { date: new Date('2024-04-08T12:00:00'), state: 'charging', batteryPercent: 80 },
    { date: new Date('2024-04-08T13:00:00'), state: 'charging', batteryPercent: 90 },
    { date: new Date('2024-04-08T13:00:00'), state: 'discharging', batteryPercent: 90 },
    { date: new Date('2024-04-08T14:00:00'), state: 'discharging', batteryPercent: 85 }, // Stop charging at 2 PM
    { date: new Date('2024-04-08T15:00:00'), state: 'discharging', batteryPercent: 80 },
    { date: new Date('2024-04-08T16:00:00'), state: 'discharging', batteryPercent: 75 },
    { date: new Date('2024-04-08T17:00:00'), state: 'discharging', batteryPercent: 70 },
    { date: new Date('2024-04-08T18:00:00'), state: 'discharging', batteryPercent: 50 },
    { date: new Date('2024-04-08T18:00:00'), state: 'charging', batteryPercent: 50 },
    { date: new Date('2024-04-08T19:00:00'), state: 'charging', batteryPercent: 60 },
    { date: new Date('2024-04-08T19:00:00'), state: 'discharging', batteryPercent: 60 },
    { date: new Date('2024-04-08T20:00:00'), state: 'discharging', batteryPercent: 50 },
    { date: new Date('2024-04-08T20:00:00'), state: 'charging', batteryPercent: 50 },
    { date: new Date('2024-04-08T21:00:00'), state: 'charging', batteryPercent: 80 },
    { date: new Date('2024-04-08T22:00:00'), state: 'charging', batteryPercent: 90 },
    { date: new Date('2024-04-08T22:00:00'), state: 'discharging', batteryPercent: 90 },
    { date: new Date('2024-04-08T22:00:00'), state: 'standby', batteryPercent: 90 },
    { date: new Date('2024-04-08T23:00:00'), state: 'standby', batteryPercent: 87 },
    { date: new Date('2024-04-09T00:00:00'), state: 'standby', batteryPercent: 85 },
    { date: new Date('2024-04-09T00:00:00'), state: 'discharging', batteryPercent: 85 },
    { date: new Date('2024-04-09T01:00:00'), state: 'discharging', batteryPercent: 80 },
    { date: new Date('2024-04-09T02:00:00'), state: 'discharging', batteryPercent: 75 },
    // { date: new Date('2024-04-10T02:00:00'), state: 'charging', batteryPercent: 75 },
    // { date: new Date('2024-04-10T03:00:00'), state: 'charging', batteryPercent: 75 },
  ], [
    { date: new Date('2024-04-08T08:00:00'), state: 'discharging', batteryPercent: 80 },
    { date: new Date('2024-04-08T09:00:00'), state: 'discharging', batteryPercent: 75 },
    { date: new Date('2024-04-08T10:00:00'), state: 'discharging', batteryPercent: 70 },
    { date: new Date('2024-04-08T11:00:00'), state: 'discharging', batteryPercent: 70 },
    { date: new Date('2024-04-08T11:00:00'), state: 'charging', batteryPercent: 70 }, // Start charging at 11 AM
    { date: new Date('2024-04-08T12:00:00'), state: 'charging', batteryPercent: 80 },
    { date: new Date('2024-04-08T13:00:00'), state: 'charging', batteryPercent: 90 },
    { date: new Date('2024-04-08T13:00:00'), state: 'discharging', batteryPercent: 90 },
    { date: new Date('2024-04-08T14:00:00'), state: 'discharging', batteryPercent: 85 }, // Stop charging at 2 PM
    { date: new Date('2024-04-08T15:00:00'), state: 'discharging', batteryPercent: 80 },
    { date: new Date('2024-04-08T16:00:00'), state: 'discharging', batteryPercent: 75 },
    { date: new Date('2024-04-08T17:00:00'), state: 'discharging', batteryPercent: 70 },
    { date: new Date('2024-04-08T18:00:00'), state: 'discharging', batteryPercent: 50 },
    { date: new Date('2024-04-08T18:00:00'), state: 'charging', batteryPercent: 50 },
    { date: new Date('2024-04-08T19:00:00'), state: 'charging', batteryPercent: 60 },
    { date: new Date('2024-04-08T19:00:00'), state: 'discharging', batteryPercent: 60 },
    { date: new Date('2024-04-08T20:00:00'), state: 'discharging', batteryPercent: 50 },
    { date: new Date('2024-04-08T20:00:00'), state: 'charging', batteryPercent: 50 },
    { date: new Date('2024-04-08T21:00:00'), state: 'charging', batteryPercent: 80 },
    { date: new Date('2024-04-08T22:00:00'), state: 'charging', batteryPercent: 90 },
    { date: new Date('2024-04-08T22:00:00'), state: 'discharging', batteryPercent: 90 },
    { date: new Date('2024-04-08T22:00:00'), state: 'standby', batteryPercent: 90 },
    { date: new Date('2024-04-08T23:00:00'), state: 'standby', batteryPercent: 87 },
    { date: new Date('2024-04-09T00:00:00'), state: 'standby', batteryPercent: 85 },
    { date: new Date('2024-04-09T00:00:00'), state: 'discharging', batteryPercent: 85 },
    { date: new Date('2024-04-09T01:00:00'), state: 'discharging', batteryPercent: 80 },
    { date: new Date('2024-04-09T02:00:00'), state: 'discharging', batteryPercent: 75 },
    // { date: new Date('2024-04-10T02:00:00'), state: 'charging', batteryPercent: 75 },
    // { date: new Date('2024-04-10T03:00:00'), state: 'charging', batteryPercent: 75 },
  ]];
  const [lastAddedData, setLastAddedData] = useState(null);
  const [rawData, setRawData] = useState(initialState[0]);
  const [windowSize,setWindowSize] = useState('100%')

  useEffect(() => {
    const updateWidth = () => {
    const svg = d3.select(svgRef.current);

    d3.select(svgRef.current).selectAll("*").remove() // Clear the previous graph
    setWindowSize(((window.innerWidth*2)/3) + 10)
    // Set up dimensions and margins
    const margin = { top: 0, right: 30, bottom: 30, left: 60 };
    const width = window.innerWidth - margin.left - margin.right - (window.innerWidth/3) ;
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
      .domain([0, d3.max(filteredData, (d) => d.total) + 5])
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
      .attr("width", x.bandwidth())
      .attr("class", "bar")
      .on("click", (event, d) => {
        const randomIndex = Math.floor(Math.random() * 5);
        setSelectedData(d.data);
        setRawData(initialState[randomIndex]);
      });

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y))
      .append("text")
      .attr("x", -margin.left - 130)
      .attr("y", -40)
      .attr("fill", "currentColor")
      .attr("text-anchor", "middle")
      .attr("transform", "rotate(-90)")
      .style("font-size", "16px")
      .text("Battery Usage");



    svg
      .append("text")
      .attr("transform", `translate(${(width / 2) + 60}, ${height + margin.top + 50})`) // Positioning x-axis label
      .style("text-anchor", "middle")
      .text("Date");

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
        `translate(${width - margin.right + 100}, ${margin.top + 10})`
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

    // Detailed area chart
    // if (selectedData) {
    d3.select(areaSvgRef.current).selectAll("*").remove();
    const areaSvg = d3
      .select(areaSvgRef.current)
      .attr("width", width + margin.left + margin.right + 200)
      .attr("height", height + margin.top + margin.bottom + 50)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    d3.select(areaSvg.current).selectAll("*").remove()  // Clear the previous graph

    const randomIndex = Math.floor(Math.random() * rawData.length);

    let currentData = rawData[0];
    let paths = [];
    let pathData = [[]]; // Initialize pathData as an array of arrays

    for (let i = 0; i < rawData.length; i++) {
      if (rawData[i].state !== currentData.state) {
        paths.push(currentData.state);
        pathData.push([rawData[i]]);
        currentData = rawData[i];
      } else {
        pathData[pathData.length - 1].push(rawData[i]);
      }
    }

    paths.push(currentData.state);

    // Create time and linear scales
    const xScale = d3
      .scaleTime()
      .domain(d3.extent(rawData, (d) => d.date))
      .range([0, width]);
    const yScale = d3.scaleLinear().domain([0, 105]).range([height, 0]);

    // Define area functions for driving and charging
    const areaDriving = d3
      .area()
      .x((d) => xScale(d.date))
      .y0(height)
      .y1((d) => yScale(d.batteryPercent));

    const areaCharging = d3
      .area()
      .x((d) => xScale(d.date))
      .y0(height)
      .y1((d) => yScale(d.batteryPercent));
    
    areaSvg
      .append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 50})`) // Positioning x-axis label
      .style("text-anchor", "middle")
      .text("Time");

      areaSvg
      .append("text")
      .attr("transform", "rotate(-90)")  // Rotate the y-axis label
      .attr("y", 0 - margin.left)  // Positioning y-axis label
      .attr("x", 0 - height / 2)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Battery Percent");

    pathData.forEach((data, index) => {
      const path = areaSvg
        .append("path")
        .datum(data)
        .attr("fill", paths[index] === "discharging" ? "#77C3EC" : paths[index] === "charging" ? "#B8E2F2" : "#5388a5")
        .attr("opacity", 0.5)
        .attr(
          "d",
          paths[index] === "discharging" ? areaDriving : areaCharging
        )
        .on("mousemove", function (event) {
          const xPos = d3.pointer(event)[0];
          const dateAtX = xScale.invert(xPos);

          // Find the data point closest to the x position
          const bisectDate = d3.bisector((d) => d.date).left;
          const i = bisectDate(data, dateAtX, 1);
          const d0 = data[i - 1];
          const d1 = data[i];
          const d = dateAtX - d0.date > d1.date - dateAtX ? d1 : d0;

          d3.select(this)
            .select("title")
            .text(`${d.state}: ${Math.round(d.batteryPercent)}%`);
        })
        .on("mouseout", function () {
          d3.select(this).select("title").text("");
        })
        .append("title");
    });

    // Add X axis
    areaSvg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(xScale));

    // Add Y axis
    areaSvg.append("g").call(d3.axisLeft(yScale));
    const legendData = [
      { state: "charging", color: "#B8E2F2" },
      { state: "standby", color: "#5388a5" },
      { state: "discharging", color: "#77C3EC" },
    ];

    const legend2 = areaSvg
      .append("g")
      .attr("transform", `translate(${width - margin.right + 70}, ${margin.top + 10})`); // Adjust the position of the legend

    legend2
      .selectAll("rect")
      .data(legendData)
      .enter()
      .append("rect")
      .attr("x", 0)
      .attr("y", (d, i) => i * 20)
      .attr("width", 10)
      .attr("height", 10)
      .attr("fill", (d) => d.color);

    legend2
      .selectAll("text")
      .data(legendData)
      .enter()
      .append("text")
      .attr("x", 15)
      .attr("y", (d, i) => i * 20 + 9)
      .text((d) => d.state)
      .attr("fill", 'black');
  }

      updateWidth();

      // Event listener for window resize
      window.addEventListener('resize', updateWidth);

      // Cleanup
      return () => {
          window.removeEventListener('resize', updateWidth);
      };



  }, [filteredData, rawData, selectedData]);

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

  const addData = () => {
    let rawDataCopy = [...rawData];
    let data = rawDataCopy[rawDataCopy.length - 1];
    let lastDate = new Date(data.date);
    if (lastAddedData !== null) {
      if (lastAddedData === "discharging") {
        rawDataCopy.push(
          { date: new Date(lastDate), state: 'charging', batteryPercent: data.batteryPercent });
        rawDataCopy.push({ date: new Date(lastDate.setHours(lastDate.getHours() + 1)), state: 'charging', batteryPercent: data.batteryPercent + 5 }); setLastAddedData('charging');
      } else {
        rawDataCopy.push({
          date: new Date(lastDate),
          state: 'discharging',
          batteryPercent: data.batteryPercent
        });
        rawDataCopy.push({
          date: new Date(lastDate.setHours(lastDate.getHours() + 1)),
          state: 'discharging',
          batteryPercent: data.batteryPercent - 5
        });
        setLastAddedData('discharging');
      }
    } else {
      rawDataCopy.push({
        date: new Date(lastDate.setHours(lastDate.getHours() + 1)),
        state: 'discharging',
        batteryPercent: data.batteryPercent - 5
      });
      setLastAddedData('discharging');
    }
    setRawData(rawDataCopy);
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <select
          className="custom-select form-select"
          value={selectedOption}
          onChange={(e) => handleFilter(e.target.value)}
          style={{ width: "200px" }}
        >
          <option selected={true}>Select All</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <svg ref={svgRef} width={"100%"} height={500}></svg>

      <div style={{ display: "flex", position: "relative" }}>
        <svg ref={areaSvgRef} width={"100%"} height={500}></svg>
        <div
          style={{
            position: "absolute",
            display: "flex",
            flexDirection: "column",
            marginTop: "200px",
            left: windowSize,
          }}
        >
          <button className="addButton" onClick={() => addData()}>
            Add Data
          </button>
          <button
            className="resetButton"
            onClick={() => setRawData(initialState[0])}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default ElectricVehicleCharging;
