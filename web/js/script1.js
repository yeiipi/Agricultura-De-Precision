/*--- variables ---*/
let margin = {top: 300, right: 20, bottom: 30, left: 50};
let width = 900;
let height = 410;

let onOff = "off";

/*--- New scales and parsers ---*/

let X = d3.scaleTime().range([0,width-40]);
let Y = d3.scaleLinear().range([height,40]);

let formatoFechaTiempo = d3.timeParse("%m-%d-%Y|%H:%M:%S");


/*------------------------*/
/*------ Svg space ------*/
/*----------------------*/

// Ejes | 17.10.2020 | jpi
let xEje = d3.axisBottom(escalaEnX).ticks(11);
let yEje = d3.axisLeft(escalaEnY).ticks(10);


// cuerpito | 17.10.2020 | jpi
let cuerpito = d3.select("body")
    .append("svg")
    .append("g")
    .attr("transform","translate(" + margin.left + "," + margin.top + ")");


/*--- Obtener Datos ---*/

d3.csv("../temperatura.csv").then(function (Data) {

    let D = Data;

    D.forEach(function(d) {
        d.magnitud = +d.magnitud;
        d.fecha_tiempo = formatoFechaTiempo(d.fecha_tiempo);
        d.f = formatoFechaTiempo(d.fecha_tiempo);
    });

    // definir nuevo dominio para la gráfica | 17.10.2020 | jpi
    escalaEnX.domain(d3.extent(D, function(d) { return d.fecha_tiempo;}));
    escalaEnY.domain([0,d3.max(D, function(d) { return d.magnitud;})]);

    // agregar las lineas | 17.10.2020 | jpi
    cuerpito.append("path")
        .datum(D)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("d", linea);


    // agregar los ejes al cuerpito | 17.10.2020 | jpi
    // x
    cuerpito.append("g")
        .attr("class","x_axis")
        .attr("transform", "translate(0,110)")
        .call(xEje);
    // y
    cuerpito.append("g")
        .attr("class","y_axis")
        .attr("transform", "translate(0,-300)")
        .call(yEje);
});

/*--- Update functions ---*/

function temperatura() {
    console.log("temperatura");
}

function humedad() {
    console.log("humedad");
}

function luz() {
    console.log("luz");
}

function ph() {
    console.log("ph");
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



