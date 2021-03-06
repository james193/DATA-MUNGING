graph2();
function graph2() {
    var margin = {top: 20, right: 20, bottom: 50, left: 150},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    // parse the date / time
    var parseTime = d3v3.timeParse("%Y");

    // set the ranges
    var x = d3v3.scaleTime().range([0, width]);
    var y = d3v3.scaleLinear().range([height, 0]);

    // define the line
    var valueline = d3v3.line()
        .x(function(d) { return x(d.year); })
        .y(function(d) { return y(d.countArrested); });
    // define the line
    var valueline2 = d3v3.line()
        .x(function(d) { return x(d.year); })
        .y(function(d) { return y(d.countNotArrested); });

    // append the svg obgect to the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    var svg = d3v3.select("#graph2").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    function draw(data) {
        // format the data
        data.forEach(function(d) {
            d.year = parseTime(d.year);
            d.countArrested = +d.countArrested;
            d.countNotArrested = +d.countNotArrested;
        });
        // Scale the range of the data
        x.domain(d3v3.extent(data, function(d) { return d.year; }));
        y.domain([0, d3v3.max(data, function(d) {
            return Math.max(d.countArrested, d.countNotArrested);
        })]);

        // Add the valueline path.
        svg.append("path")
            .data([data])
            .attr("class", "line1")
            .attr("d", valueline);
        // Add the valueline path.
        svg.append("path")
            .data([data])
            .attr("class", "line2")
            .attr("d", valueline2);
        // Add the X Axis
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3v3.axisBottom(x));

        // Add the Y Axis
        svg.append("g")
            .call(d3v3.axisLeft(y));

        svg.append("g")
            .append("text")
            .attr("transform", "translate(0," + height + ")")
            .attr("x", 450)
            .attr("y", 30)
            .attr("dx", ".100em")
            .attr("dy", ".30000em")
            .style("text-anchor", "end")
            .text("Years");
        svg.append("g")
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", -60)
            .attr("dy", ".100em")
            .attr("x", -60)
            .attr("dx", ".100em")
            .style("text-anchor", "end")
            .text("Number of Cases");
    }
    // Get the data
    d3.json("output_2.json", function(error, data) {
        if (error) throw error;
        draw(data);
    });
}