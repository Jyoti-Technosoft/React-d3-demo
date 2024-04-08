import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";

const ElectricVehicleCharging = () => {
  const data = [
    {
      date: "2022-03-01",
      usage: [
        {
          charge: "8:00 AM",
          total: "100%",
          duration: "11h",
          used: "80%",
          standby: "10%",
          remainingBattery: "10%",
        },
        {
          charge: "7:00 PM",
          total: "80%",
          duration: "13h",
          used: "40%",
          standby: "5%",
          remainingBattery: "35%",
        },
      ],
    },
    {
      date: "2022-03-02",
      usage: [
        {
          charge: "7:15 AM",
          total: "100%",
          duration: "13h 45m",
          used: "70%",
          standby: "10%",
          remainingBattery: "20%",
        },
        {
          charge: "9:00 PM",
          total: "100%",
          duration: "11h 15m",
          used: "40%",
          standby: "5%",
          remainingBattery: "55%",
        },
      ],
    },
  ];
  const svgRef = useRef();
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand()
      .domain(filteredData.map(d => d.date))
      .range([0, width])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([0, 100])
      .range([height, 0]);

    const color = d3.scaleOrdinal()
      .domain(["total", "used", "standby", "remainingBattery"])
      .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b"]);

    const stack = d3.stack()
      .keys(["total", "used", "standby", "remainingBattery"])
      .order(d3.stackOrderNone)
      .offset(d3.stackOffsetNone);

    const series = stack(filteredData.map(d => d.usage));

    svg.selectAll(".bar")
      .data(series)
      .enter().append("g")
      .attr("fill", d => color(d.key))
      .selectAll("rect")
      .data(d => d)
      .enter().append("rect")
      .attr("x", (d, i) => x(filteredData[i].date))
      .attr("y", d => y(d[1]))
      .attr("height", d => y(d[0]) - y(d[1]))
      .attr("width", x.bandwidth());

    svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x));

    svg.append("g")
      .call(d3.axisLeft(y).ticks(null, "s"))
      .append("text")
      .attr("x", 2)
      .attr("y", y(y.ticks().pop()) + 0.5)
      .attr("dy", "0.32em")
      .attr("fill", "#000")
      .attr("font-weight", "bold")
      .attr("text-anchor", "start")
      .text("Battery Usage");

  }, [filteredData]);

  const handleFilter = (type) => {
    let filtered;
    switch (type) {
      case 'monthly':
        // filtered = data.filter(entry => entry.date.includes('-03-'));
        break;
      case 'weekly':
        // Implement weekly filtering logic
        break;
      case 'daily':
        // Implement daily filtering logic
        break;
      default:
        filtered = data;
    }
    setFilteredData(filtered);
  }

  return (
    <div>
      <button onClick={() => handleFilter('monthly')}>Monthly</button>
      <button onClick={() => handleFilter('weekly')}>Weekly</button>
      <button onClick={() => handleFilter('daily')}>Daily</button>
      <svg ref={svgRef}></svg>
    </div>
  );

};

export default ElectricVehicleCharging;

  /** demo2 **/

  // const [maxUsed, setMaxUsed] = useState(0);
  // const [maxStandby, setMaxStandby] = useState(0);

  // useEffect(() => {
  //   const usedValues = data.flatMap((d) => d.usage.map((u) => u.used));
  //   const standbyValues = data.flatMap((d) => d.usage.map((u) => u.standby));

  //   setMaxUsed(d3.max(usedValues));
  //   setMaxStandby(d3.max(standbyValues));
  // }, [data]);

  // const xScale = d3
  //   .scaleBand()
  //   .range([0, 500])
  //   .domain(data.map((d) => d.date));
  // const yScaleUsed = d3.scaleLinear().range([200, 0]).domain([0, maxUsed]);
  // const yScaleStandby = d3
  //   .scaleLinear()
  //   .range([150, 0])
  //   .domain([0, maxStandby]);

  // const xAxis = d3.axisBottom(xScale);
  // const yAxisUsed = d3.axisLeft(yScaleUsed);
  // const yAxisStandby = d3.axisLeft(yScaleStandby);

  // d3.select(".x-axis").call(xAxis);
  // d3.select(".y-axis").call(yAxisUsed);
  // d3.select(".y-axis2").call(yAxisStandby);

  // return (
  //   <svg width={500} height={350}>
  //     <g transform={`translate(0, ${200})`}>
  //       {data.map((d, i) => (
  //         <g key={i}>
  //           <rect
  //             x={xScale(d.date)}
  //             y={yScaleStandby(d.usage.standby)}
  //             width={xScale.bandwidth()}
  //             height={yScaleStandby(0) - yScaleStandby(d.usage.standby)}
  //             fill="#ffeb3b"
  //           />
  //           <rect
  //             x={xScale(d.date)}
  //             y={yScaleUsed(d.usage.used)}
  //             width={xScale.bandwidth()}
  //             height={yScaleUsed(0) - yScaleUsed(d.usage.used)}
  //             fill="#4caf50"
  //           />
  //         </g>
  //       ))}
  //     </g>
  //     <g className="x-axis" />
  //     <g className="y-axis" />
  //     <g className="y-axis2" />
  //   </svg>
  // );

  /** demo1 **/

  // const svgRef = useRef();

  // useEffect(() => {
  //   const margin = { top: 20, right: 30, bottom: 30, left: 60 };
  //   const width = 600 - margin.left - margin.right;
  //   const height = 400 - margin.top - margin.bottom;

  //   const svg = d3
  //     .select(svgRef.current)
  //     .attr("width", width + margin.left + margin.right)
  //     .attr("height", height + margin.top + margin.bottom)
  //     .append("g")
  //     .attr("transform", `translate(${margin.left},${margin.top})`);

  //   const dates = data.map((d) => d.date);
  //   const chargeTimes = data.flatMap((d) => d.usage.map((u) => u.charge));
  //   const x = d3.scaleBand().domain(dates).range([0, width]).padding(0.1);

  //   const y = d3.scaleLinear().domain([0, 100]).range([height, 0]);

  //   const color = d3
  //     .scaleOrdinal()
  //     .domain(["used", "standby", "remainingBattery"])
  //     .range(["#1f77b4", "#ff7f0e", "#2ca02c"]);

  //   svg
  //     .append("g")
  //     .selectAll("g")
  //     .data(data)
  //     .enter()
  //     .append("g")
  //     .attr("transform", (d) => `translate(${x(d.date)},0)`)
  //     .selectAll("rect")
  //     .data((d) => d.usage)
  //     .enter()
  //     .append("rect")
  //     .attr("x", (d) => x(d.date))
  //     .attr("y", (d) => y(parseInt(d.total)))
  //     .attr("height", (d) => y(0) - y(parseInt(d.total)))
  //     .attr("width", x.bandwidth())
  //     .attr("fill", (d) => color("total"));

  //   const xAxis = d3.axisBottom(x);
  //   svg.append("g").attr("transform", `translate(0,${height})`).call(xAxis);

  //   const yAxis = d3.axisLeft(y);
  //   svg.append("g").call(yAxis);
  // }, [data]);

  // return <svg ref={svgRef}></svg>;
