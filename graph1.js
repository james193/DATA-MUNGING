// set the dimensions of the canvas
graph1();

function graph1() {

    var margin = {top: 30, right: 20, bottom: 40, left: 150},
        width = 900 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;
    // set the ranges
    var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);

    var y = d3.scale.linear().range([height, 0]);
    // define the axis
    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(11);

    // add the SVG element
    var svg = d3.select("#graph1").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // load the data
    d3.json("output_1.json", function(error, data) {

        data.forEach(function(d) {
            d.year = d.year;
            d.countOver500 = +d.countOver500;
            d.countUnder500 = +d.countUnder500;
        });

        // scale the range of the data
        x.domain(data.map(function(d) { return d.year; }));
        y.domain([0, d3.max(data, function(d) { return d.countOver500; })]);
        y.domain([0, d3.max(data, function(d) { return d.countUnder500; })]);

        // add axis
        svg.append("g")
            // .attr("class", "x axis")
            // .attr("transform", "translate(0," + height + ")")
            // .call(xAxis)

            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", "-.55em")
            .attr("transform", "rotate(-90)");

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", -60)
            .attr("dy", ".100em")
            .style("text-anchor", "end")
            .text("Number of Thefts");
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
             .attr("class", "x axis")
             .attr("transform", "translate(0," + height + ")")
             .call(xAxis)
             .append("text")  
             .attr("x", (width / 2))
             .attr("y", (height/2)) //set your y attribute here
             .style("text-anchor", "middle")
             .text("Users ordered by contribution");

        // Add bar chart
        svg.selectAll("bar1")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar1")
            .attr("x", function(d) { return x(d.year); })
            .attr("width", (x.rangeBand() / 2))
            .attr("y", function(d) { return y(d.countOver500); })
            .attr("height", function(d) { return height - y(d.countOver500); });

        svg.selectAll("bar2")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar2")
            .attr("x", function(d) { return x(d.year); })
            .attr("width", (x.rangeBand() / 4))
            .attr("y", function(d) { return y(d.countUnder500); })
            .attr("height", function(d) { return height - y(d.countUnder500); });
    });
}