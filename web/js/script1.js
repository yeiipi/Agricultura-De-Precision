//TODO 01.11.2020 | yeiipi: Obtener los datos de una base de datos en vivo
//TODO 01.11.2020 | yeiipi: Crear metodo para enviar señales al arduino
//TODO 01.11.2020 | yeiipi: Mirar que pasa con Chrome {temperatura.csv}


/*--- variables ---*/
let margin = {top: 300, right: 20, bottom: 30, left: 50};
let width = 900;
let height = 410;

let onOff = "off";

/*--- New scales and parsers ---*/

let X = d3.scaleTime().range([0,width-margin.left]);
let Y = d3.scaleLinear().range([height,margin.left]);

let formatoFechaTiempo = d3.timeParse("%m-%d-%Y|%H:%M:%S");

/*------------------------*/
/*------ Svg space ------*/
/*----------------------*/

// Ejes | 17.10.2020 | jpi
let xEje = d3.axisBottom(X).ticks(20);
let yEje = d3.axisLeft(Y).ticks(20);


// cuerpito | 17.10.2020 | jpi
let cuerpito = d3.select("body")
    .append("svg")
    .append("g")
    .attr("transform","translate(" + margin.left + "," + margin.top + ")");


/*--- Obtener Datos ---*/

d3.csv("../temperatura.csv").then(
    function (data) {
        X.domain(d3.extent(data,function (d) {return formatoFechaTiempo(d.fecha_tiempo)}));
        Y.domain([0,d3.max(data, function (d) { return +d.magnitud; })]);

        cuerpito.append("g")
            .attr("class","x_axis")
            .attr("transform","translate(0,70)")
            .call(xEje);

        cuerpito.append("g")
            .attr("class","y_axis")
            .attr("transform","translate(0,-340)")
            .call(yEje);

        cuerpito.append("path")
            .datum(data)
            .attr("class","linea")
            .attr("fill","none")
            .attr("stroke","#698969")
            .attr("stroke-width",1.5)
            .attr("d",d3.line()
                .x(function (d) { return X(formatoFechaTiempo(d.fecha_tiempo)) })
                .y(function (d) { return Y(d.magnitud)})
            )
            .attr("transform","translate(0,-340)")
    }
);

/*--- Update functions ---*/

function temperatura() {
    //console.log("temperatura");
    d3.csv("../temperatura.csv").then(
        function (data) {
            X.domain(d3.extent(data,function (d) {return formatoFechaTiempo(d.fecha_tiempo)}));
            Y.domain([0,d3.max(data, function (d) { return +d.magnitud; })]);

            cuerpito.select(".x_axis")
                .transition()
                .duration(200)
                .ease(d3.easeLinear)
                .call(xEje);

            cuerpito.select(".y_axis")
                .transition()
                .duration(200)
                .ease(d3.easeLinear)
                .call(yEje);

            cuerpito.select(".linea")
                .datum(data)
                .attr("fill","none")
                .attr("stroke","#698969")
                .attr("stroke-width",1.5)
                .transition()
                .duration(200)
                .ease(d3.easeLinear)
                .attr("d",d3.line()
                    .x(function (d) { return X(formatoFechaTiempo(d.fecha_tiempo)) })
                    .y(function (d) { return Y(d.magnitud)})
                )
                .attr("transform","translate(0,-340)")
        }
    );

}

function humedad() {
    console.log("humedad");
    d3.csv("../humedad.csv").then(
        function (data) {
            X.domain(d3.extent(data,function (d) {return formatoFechaTiempo(d.fecha_tiempo)}));
            Y.domain([0,d3.max(data, function (d) { return +d.magnitud; })]);

            cuerpito.select(".x_axis")
                .transition()
                .duration(200)
                .ease(d3.easeLinear)
                .call(xEje);

            cuerpito.select(".y_axis")
                .transition()
                .duration(200)
                .ease(d3.easeLinear)
                .call(yEje);

            cuerpito.select(".linea")
                .datum(data)
                .attr("fill","none")
                .attr("stroke","#698969")
                .attr("stroke-width",1.5)
                .transition()
                .duration(200)
                .ease(d3.easeLinear)
                .attr("d",d3.line()
                    .x(function (d) { return X(formatoFechaTiempo(d.fecha_tiempo)) })
                    .y(function (d) { return Y(d.magnitud)})
                )
                .attr("transform","translate(0,-340)")
        }
    );
}

function luz() {
    console.log("luz");
    d3.csv("../luz.csv").then(
        function (data) {
            X.domain(d3.extent(data,function (d) {return formatoFechaTiempo(d.fecha_tiempo)}));
            Y.domain([0,d3.max(data, function (d) { return +d.magnitud; })]);

            cuerpito.select(".x_axis")
                .transition()
                .duration(200)
                .ease(d3.easeLinear)
                .call(xEje);

            cuerpito.select(".y_axis")
                .transition()
                .duration(200)
                .ease(d3.easeLinear)
                .call(yEje);

            cuerpito.select(".linea")
                .datum(data)
                .attr("fill","none")
                .attr("stroke","#698969")
                .attr("stroke-width",1.5)
                .transition()
                .duration(200)
                .ease(d3.easeLinear)
                .attr("d",d3.line()
                    .x(function (d) { return X(formatoFechaTiempo(d.fecha_tiempo)) })
                    .y(function (d) { return Y(d.magnitud)})
                )
                .attr("transform","translate(0,-340)")
        }
    );
}

function ph() {
    //console.log("ph");
    d3.csv("../ph.csv").then(
        function (data) {
            X.domain(d3.extent(data,function (d) {return formatoFechaTiempo(d.fecha_tiempo)}));
            Y.domain([0,d3.max(data, function (d) { return +d.magnitud; })]);

            cuerpito.select(".x_axis")
                .transition()
                .duration(200)
                .ease(d3.easeLinear)
                .call(xEje);

            cuerpito.select(".y_axis")
                .transition()
                .duration(200)
                .ease(d3.easeLinear)
                .call(yEje);

            cuerpito.select(".linea")
                .datum(data)
                .attr("fill","none")
                .attr("stroke","#698969")
                .attr("stroke-width",1.5)
                .transition()
                .duration(200)
                .ease(d3.easeLinear)
                .attr("d",d3.line()
                    .x(function (d) { return X(formatoFechaTiempo(d.fecha_tiempo)) })
                    .y(function (d) { return Y(d.magnitud)})
                )
                .attr("transform","translate(0,-340)")
        }
    );
}

function agua() {
    console.log("más agüita");
}

function luzonoff() {
    if (onOff == "off" ) {
        onOff = "on";
    } else if (onOff == "on") {
        onOff = "off";
    }
    console.log(onOff);
}



