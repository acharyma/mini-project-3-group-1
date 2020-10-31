d3.csv('cleanData.csv', d3.autoType).then(data=>{
    console.log(data);

    const margin = ({top: 20, right: 20, bottom: 20, left: 20});
    const width = 650 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;
    


    const svg = d3.select(".chart-container1").append("svg").attr("width", width + margin.left + margin.right) .attr("height", height + margin.top + margin.bottom) .append("g") .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    var actualData = data.filter(d => d.agriculturePercentGDP != "..");

    let domainTime = d3.extent(actualData, (d => d.time));
    let domainAg = d3.extent(actualData, (d => d.agriculturePercentGDP));
    console.log(domainTime);
    console.log(domainAg);

    const xScale = d3.scaleLinear().domain(domainTime).range([0, width]);
    const yScale = d3.scaleLinear().domain(domainAg).range([height, 0]);

    const xAxis = d3.axisBottom().scale(xScale).tickFormat(d3.format("d"));
    const yAxis = d3.axisLeft().scale(yScale);

    const ordinalColorScale = d3.scaleOrdinal(d3.schemeTableau10);

    svg.append("g")
    .attr("class", "axis x-axis").attr("transform", `translate(0, ${height})`)
    .call(xAxis);

    svg.append("g")
    .attr("class", "axis y-axis")
    .call(yAxis);

    

    svg.append("text")
        .attr("text-anchor", "end")
        .attr("x", width - 30)
        .attr("y", height - 10)
        .text("Year");

    svg.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .attr("y",8)
        .attr("dy", "6px")
        .attr("transform", "rotate(-90)")
        .text("Agricultural % added to GDP")
        .style("font-size", "10px");


    
    // svg.selectAll("lines")
    //     .data(data)
    //     .enter()
    //     .append("path")
    //     .attr("fill", (d) => ordinalColorScale(d.countryName))
    //     .attr('x', d => xScale(d.time))
    //     .attr('y', d => yScale(d.agriculturePercentGDP))
    
     //Define line generator
     var line = d3.line()
     .x(function(d) { return xScale(d.time); })
     .y(function(d) { return yScale(d.agriculturePercentGDP); });

     svg.append("path")
       .datum(data)
       .attr("class", "line")
       .attr("fill", "orange")
       .attr("d", line);
    

    // // Add the line
    // svg.append("path")
    //   .datum(data)
    //   .attr("fill", "orange")
    //   .attr("d", d3.line()
    //     .xScale(d => (d.time))
    //     .yScale((d) => (d.agriculturePercentGDP)))
    // .attr("stroke-width", 4);

    

    

//     svg
//     .selectAll("circle")
//     .data(data)
//     .enter()
//     .append("circle")
//     .attr("fill", (d) => ordinalColorScale(d.countryName))
//     // .attr("fill", "orange")
//     .attr('cx', d=>xScale(d.time))
//     .attr('cy', d=>yScale(d.agriculturePercentGDP))
//     .attr("r", 2)
//     .on("mouseenter", (event, d) => {
//         // show the tooltip
//         const pos = d3.pointer(event, window);
//         d3
//         .select(".tooltip")
//         .style("position", "fixed")
//         .style("left", pos[0] + 10 + "px")
//         .style("top", pos[1] + 10 + "px")
//         .style("padding", 5 + "px")
//         .style("background", "darkgrey")
//         .style("font-size", "9px")
//         .style("display", "block").html(`
//             <div>
//             <span>
//             Country:</span>
//             <span>
//             ${d.countryName}</span>
//             </div>
            
//             <div>
//             <span>
//             Income:</span>
//             <span>
//             ${"$" + d3.format(",.2r")(d.agriculturePercentGDP)}</span>
//             </div>

//             <div>
//             <span>
//             Population:</span>
//             <span>
//             ${d3.format(",.2r")(d.time)}</span>
//             </div>
//         `);
//     })
//     .on("mouseleave", (event, d) => {
//         // hide the tooltip
//         d3.select(".tooltip").style("display","none");
//     });
    

});