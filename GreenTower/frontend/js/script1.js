/*-----------------*/
/*--- POR HACER ---*/
/*-----------------*/


/*------------------*/
/*--- ESENCIALES ---*/
/*------------------*/

/*--- variables ---*/
let info_del_buscador = navigator.userAgent;
let margin = {top: 300, right: 20, bottom: 30, left: 50};
let width = 900;
let height = 410;

/*--- New scales and parsers ---*/

// escalas de distancia | 07.11.2020 | yeiipi
let X = d3.scaleTime().range([0,width-margin.left]);
let Y = d3.scaleLinear().range([height,margin.left]);

// escalas de color | 07.11.2020 | yeiipi  
let fonendoscopioCOLOR = d3.scaleLinear().range([0,1]);

// parser tiempo | 07.11.2020 | yeiipi
let formatoFechaTiempo = d3.timeParse("%m-%d-%Y|%H:%M:%S");


/*------------------------*/
/*------ Svg space ------*/
/*----------------------*/

// Ejes | 17.10.2020 | jpi
let xEje = d3.axisBottom(X).ticks(20);
let yEje = d3.axisLeft(Y).ticks(20);


// cuerpito | 17.10.2020 | jpi
let cuerpito = d3.select("body");

let torso = cuerpito.append("svg")
    .append("g")
    .attr("transform","translate(" + margin.left + "," + margin.top + ")");

let piernas = cuerpito.append("svg")
    .append("g")
    .attr("transform","translate(" + margin.left + "," + margin.top + ")");

let fonendoscopio = cuerpito.append("div")
    .attr("class","tooltip")
    .style("opacity",0)

/*-----------------*/
/*--- FUNCIONES ---*/
/*-----------------*/

/*--- Comportamiento del fonendoscopio ---*/

function dotOn(d) {
    fetch ('http://127.0.0.1:8001/api/planta/1/').then( responce => {
        return responce.json();
    }).then(data => {

        let min;
        let max;

        if (info_del_buscador.includes("Firefox")) {
            // console.log("U in Firefox");
            dat = d.explicitOriginalTarget.__data__
        } else if (info_del_buscador.includes("Chrome")) {
            // console.log("U in chrome");
            dat = d.toElement.__data__
        } else {
            let error = "Es necesario utilizar Chrome o firefox";
            console.warn(`Error: ${error}`)
        }

        let tm;
        if (dat.tipo_magnitud == '1') {
            tm = 'Temperatura';
            console.log(tm)
            min = data.temp_min
            max = data.temp_max
        } else if (dat.tipo_magnitud == '2') {
            tm = 'Humedad';
            console.log(tm)
            min = data.humedad_min
            max = data.humedad_max
        } else if (dat.tipo_magnitud == '3') {
            tm = 'Ph';
            console.log(tm)
            min = data.ph_min
            max = data.ph_max
        } else if (dat.tipo_magnitud == '4') {
            tm = 'Luz';
            console.log(tm)
            min = data.luz_min
            max = data.luz_max
        }
        console.log(`min val ${min}`)
        console.log(`max val ${max}`)

        fonendoscopioCOLOR.domain([min,max])
        fonendoscopio.transition()
            .duration(200)
            .style("fill",)
            .style("opacity",1);

    }).catch(err => {
        console.warn(err);
    })
}

function dotWork(d){
    // console.log("dotWork")
    textA = "Tipo: ";
    textB = "Magnitud: ";
    textC = "Fecha: ";
    textD = "Hora: ";

    let n;

    if (info_del_buscador.includes("Firefox")) {
        // console.log("U in Firefox");
        dat = d.explicitOriginalTarget.__data__
    } else if (info_del_buscador.includes("Chrome")) {
        // console.log("U in chrome");
        dat = d.toElement.__data__
    } else {
        let error = "Es necesario utilizar Chrome o firefox";
        console.warn(`Error: ${error}`)
    }

    let tm;
    if (dat.tipo_magnitud == '1') {
        tm = 'Temperatura';
    } else if (dat.tipo_magnitud == '2') {
        tm = 'Humedad';
    } else if (dat.tipo_magnitud == '3') {
        tm = 'Ph';
    } else if (dat.tipo_magnitud == '4') {
        tm = 'Luz';
    }

    n = fonendoscopioCOLOR(dat.magnitud);
    let fF = new Date(Date.parse(dat.datetime));
    textA += tm + " ";
    textB += dat.magnitud + " ";
    textC += fF.getDate()+"/"+fF.getMonth()+"/"+fF.getFullYear()+" ";
    textD += fF.getHours()+":"+fF.getUTCMinutes()+":"+fF.getUTCSeconds()+" ";

    // No funcionó con el  | 07.11.2020 | yeiipi
    let lA = textA.length;
    let lB = textB.length;
    let lC = textC.length;
    let lD = textD.length;
    let MM = Math.max(lA,lB,lC,lD);


    fonendoscopio
        .html(textA+"<br/>"+textB+"<br/>"+textC+"<br/>"+textD)
        .style("width",(MM*12)+"px")
        .style("color",""+d3.interpolateViridis(n))
        .style("left", (event.pageX) + "px")
        .style("top", (event.pageY) + "px");

}

function dotOff () {
    // console.log("dotOff")
    fonendoscopio.transition()
        .duration(200)
        .style("opacity",0);
}


/*--- Corrida inicial ---*/
fetch ('http://127.0.0.1:8001/api/medida/temperatura/').then( responce => {
        return responce.json();
    }).then(data => {

        X.domain(d3.extent(data,function (d) {return new Date(Date.parse(d.datetime))}));
        Y.domain([0,d3.max(data, function (d) { return +d.magnitud; })]);

        /*-----------------*/
        /*--- PPOP EJES ---*/
        /*-----------------*/

        /*--- Texto descriptor de ejes ---*/

        descX = torso.append("text")
            .attr("class","descrip")
            .attr("text-anchor","end")
            .attr("x",width/2)
            .attr("y",130)
            .text("Tiempo");

        descY = torso.append("text")
            .attr("class","descrip")
            .attr("text-anchor","end")
            .attr("x",50)
            .attr("y",-290)
            .text("Temperatura");

        /*--- Ejes como tal ---*/

        torso.append("g")
            .attr("class","x_axis")
            .attr("transform","translate(0,90)")
            .call(xEje);

        torso.append("g")
            .attr("class","y_axis")
            .attr("transform","translate(-15,-320)")
            .call(yEje);

        /*----------------*/
        /*--- VIZ DATA ---*/
        /*----------------*/

        /*--- Lineas ---*/
        torso.append("path")
            .datum(data)
            .join('g')
            .attr("class","linea")
            .attr("fill","none")
            .attr("stroke","#698969")
            .attr("stroke-width",2.5)
            .attr("d",d3.line()
                .x(function (d) { return X(new Date(Date.parse(d.datetime))) })
                .y(function (d) { return Y(d.magnitud)})
            )
            .attr("transform","translate(15,-320)");

        /*--- Puntos ---*/
        piernas.selectAll("circle").data(data).join('g')
            .append("circle")
            .attr("cx",function (d) { return X(new Date(Date.parse(d.datetime))) })
            .attr("cy",function (d) { return Y(d.magnitud)})
            .attr("r",7)
            .style("fill","#695E5E")
            .style("opacity",0.3)
            .attr("transform","translate(15,-320)")
            .on("mouseover",function (d) {
                dotOn(d);
                d3.select(this).style("opacity",1);
            })
            .on("mousemove", function (d){
                dotWork(d);
            })
            .on("mouseout", function (d){
                dotOff();
                d3.select(this).style("opacity",0.3)
            })

    }).catch(err => {
        console.warn(err);
    })

/*-------------------*/
/*--- FETCH LOCAL ---*/
/*---- CON CSV -----*/
/*-------------------*/
// d3.csv("../csv/temperatura.csv").then(
//     function (data) {
        // X.domain(d3.extent(data,function (d) {return formatoFechaTiempo(d.fecha_tiempo)}));
        // Y.domain([0,d3.max(data, function (d) { return +d.magnitud; })]);
        //
        // /*-----------------*/
        // /*--- PPOP EJES ---*/
        // /*-----------------*/
        //
        // /*--- Texto descriptor de ejes ---*/
        //
        // descX = torso.append("text")
        //     .attr("class","descrip")
        //     .attr("text-anchor","end")
        //     .attr("x",width/2)
        //     .attr("y",130)
        //     .text("Tiempo");
        //
        // descY = torso.append("text")
        //     .attr("class","descrip")
        //     .attr("text-anchor","end")
        //     .attr("x",50)
        //     .attr("y",-290)
        //     .text("Temperatura");
        //
        // /*--- Ejes como tal ---*/
        //
        // torso.append("g")
        //     .attr("class","x_axis")
        //     .attr("transform","translate(0,90)")
        //     .call(xEje);
        //
        // torso.append("g")
        //     .attr("class","y_axis")
        //     .attr("transform","translate(-15,-320)")
        //     .call(yEje);
        //
        // /*----------------*/
        // /*--- VIZ DATA ---*/
        // /*----------------*/
        //
        // /*--- Lineas ---*/
        // torso.append("path")
        //     .datum(data)
        //     .attr("class","linea")
        //     .attr("fill","none")
        //     .attr("stroke","#698969")
        //     .attr("stroke-width",2.5)
        //     .attr("d",d3.line()
        //         .x(function (d) { return X(formatoFechaTiempo(d.fecha_tiempo)) })
        //         .y(function (d) { return Y(d.magnitud)})
        //     )
        //     .attr("transform","translate(15,-320)");
        //
        // /*--- Puntos ---*/
        // piernas.selectAll("circle") .data(data) .enter()
        //     .append("circle")
        //         .attr("cx",function (d) { return X(formatoFechaTiempo(d.fecha_tiempo)) })
        //         .attr("cy",function (d) { return Y(d.magnitud)})
        //         .attr("r",7)
        //         .style("fill","#695E5E")
        //         .style("opacity",0.3)
        //         .attr("transform","translate(15,-320)")
        //         .on("mouseover",function (d) {
        //             dotOn();
        //             d3.select(this).style("opacity",1);
        //         })
        //         .on("mousemove", function (d){
        //             dotWork(d);
        //         })
        //         .on("mouseout", function (d){
        //             dotOff();
        //             d3.select(this).style("opacity",0.3)
        //         })
//     }
// );

/*--- Update functions ---*/
function temperatura() {
    fetch ('http://127.0.0.1:8001/api/medida/temperatura/').then( responce => {
        return responce.json();
    }).then(data => {
        // Update de texto para el tipo de magnitud | 06.11.2020 | yeiipi
        descY.transition().duration(200).ease(d3.easeLinear).text("Temperatura").attr("x",50);

        X.domain(d3.extent(data,function (d) {return new Date(Date.parse(d.datetime))}));
        Y.domain([0,d3.max(data, function (d) { return +d.magnitud; })]);


        torso.select(".x_axis")
            .transition()
            .duration(200)
            .ease(d3.easeLinear)
            .call(xEje);

        torso.select(".y_axis")
            .transition()
            .duration(200)
            .ease(d3.easeLinear)
            .call(yEje);

        torso.select(".linea")
            .datum(data)
            .attr("fill","none")
            .attr("stroke","#698969")
            .attr("stroke-width",2.5)
            .transition()
            .duration(200)
            .ease(d3.easeLinear)
            .attr("d",d3.line()
                .x(function (d) { return X(new Date(Date.parse(d.datetime))) })
                .y(function (d) { return Y(d.magnitud)})
            )
            .attr("transform","translate(15,-320)");

        let pie = piernas.selectAll("circle").data(data);

        // update | 07.11.2020 | yeiipi
        pie.transition()
            .attr("cx",function (d) { return X(new Date(Date.parse(d.datetime))) })
            .attr("cy",function (d) { return Y(d.magnitud)});

        // enter | 07.11.2020 | yeiipi
        pie.enter().append("circle")
            .attr("cx",function (d) { return X(formatoFechaTiempo(d.fecha_tiempo)) })
            .attr("cy",function (d) { return Y(d.magnitud)})
            .attr("r",7)
            .style("fill","#695E5E")
            .style("opacity",0.3)
            .attr("transform","translate(15,-320)")
            .on("mouseover",function (d) {
                dotOn(d);
                d3.select(this).style("opacity",1);
            })
            .on("mousemove", function (d){
                dotWork(d);
            })
            .on("mouseout", function (d){
                dotOff();
                d3.select(this).style("opacity",0.3)
            })

        // remove | 07.11.2020 | yeiipi
        pie.exit()
            .transition()
            .style("opacity",0)
        .remove();
        }).catch(err => {
        console.warn(err);
    })
}

function humedad() {
    fetch ('http://127.0.0.1:8001/api/medida/humedad/').then( responce => {
        return responce.json();
    }).then(data => {
        // Update de texto para el tipo de magnitud | 06.11.2020 | yeiipi
        descY.transition().duration(200).ease(d3.easeLinear).text("Humedad").attr("x",50);

        X.domain(d3.extent(data,function (d) {return new Date(Date.parse(d.datetime))}));
        Y.domain([0,d3.max(data, function (d) { return +d.magnitud; })]);


        torso.select(".x_axis")
            .transition()
            .duration(200)
            .ease(d3.easeLinear)
            .call(xEje);

        torso.select(".y_axis")
            .transition()
            .duration(200)
            .ease(d3.easeLinear)
            .call(yEje);

        torso.select(".linea")
            .datum(data)
            .attr("fill","none")
            .attr("stroke","#698969")
            .attr("stroke-width",2.5)
            .transition()
            .duration(200)
            .ease(d3.easeLinear)
            .attr("d",d3.line()
                .x(function (d) { return X(new Date(Date.parse(d.datetime))) })
                .y(function (d) { return Y(d.magnitud)})
            )
            .attr("transform","translate(15,-320)");

        let pie = piernas.selectAll("circle").data(data);

        // update | 07.11.2020 | yeiipi
        pie.transition()
            .attr("cx",function (d) { return X(new Date(Date.parse(d.datetime))) })
            .attr("cy",function (d) { return Y(d.magnitud)});

        // enter | 07.11.2020 | yeiipi
        pie.enter().append("circle")
            .attr("cx",function (d) { return X(formatoFechaTiempo(d.fecha_tiempo)) })
            .attr("cy",function (d) { return Y(d.magnitud)})
            .attr("r",7)
            .style("fill","#695E5E")
            .style("opacity",0.3)
            .attr("transform","translate(15,-320)")
            .on("mouseover",function (d) {
                dotOn(d);
                d3.select(this).style("opacity",1);
            })
            .on("mousemove", function (d){
                dotWork(d);
            })
            .on("mouseout", function (d){
                dotOff();
                d3.select(this).style("opacity",0.3)
            })

        // remove | 07.11.2020 | yeiipi
        pie.exit()
            .transition()
            .style("opacity",0)
            .remove();
    }).catch(err => {
        console.warn(err);
    })

}

function ph() {
    fetch ('http://127.0.0.1:8001/api/medida/ph/').then( responce => {
        return responce.json();
    }).then(data => {
        // Update de texto para el tipo de magnitud | 06.11.2020 | yeiipi
        descY.transition().duration(200).ease(d3.easeLinear).text("Ph").attr("x",50);

        X.domain(d3.extent(data,function (d) {return new Date(Date.parse(d.datetime))}));
        Y.domain([0,d3.max(data, function (d) { return +d.magnitud; })]);


        torso.select(".x_axis")
            .transition()
            .duration(200)
            .ease(d3.easeLinear)
            .call(xEje);

        torso.select(".y_axis")
            .transition()
            .duration(200)
            .ease(d3.easeLinear)
            .call(yEje);

        torso.select(".linea")
            .datum(data)
            .attr("fill","none")
            .attr("stroke","#698969")
            .attr("stroke-width",2.5)
            .transition()
            .duration(200)
            .ease(d3.easeLinear)
            .attr("d",d3.line()
                .x(function (d) { return X(new Date(Date.parse(d.datetime))) })
                .y(function (d) { return Y(d.magnitud)})
            )
            .attr("transform","translate(15,-320)");

        let pie = piernas.selectAll("circle").data(data);

        // update | 07.11.2020 | yeiipi
        pie.transition()
            .attr("cx",function (d) { return X(new Date(Date.parse(d.datetime))) })
            .attr("cy",function (d) { return Y(d.magnitud)});

        // enter | 07.11.2020 | yeiipi
        pie.enter().append("circle")
            .attr("cx",function (d) { return X(formatoFechaTiempo(d.fecha_tiempo)) })
            .attr("cy",function (d) { return Y(d.magnitud)})
            .attr("r",7)
            .style("fill","#695E5E")
            .style("opacity",0.3)
            .attr("transform","translate(15,-320)")
            .on("mouseover",function (d) {
                dotOn(d);
                d3.select(this).style("opacity",1);
            })
            .on("mousemove", function (d){
                dotWork(d);
            })
            .on("mouseout", function (d){
                dotOff();
                d3.select(this).style("opacity",0.3)
            })

        // remove | 07.11.2020 | yeiipi
        pie.exit()
            .transition()
            .style("opacity",0)
            .remove();
    }).catch(err => {
        console.warn(err);
    })
}

function luz() {
    fetch ('http://127.0.0.1:8001/api/medida/luz/').then( responce => {
        return responce.json();
    }).then(data => {
        // Update de texto para el tipo de magnitud | 06.11.2020 | yeiipi
        descY.transition().duration(200).ease(d3.easeLinear).text("Luz").attr("x",50);

        X.domain(d3.extent(data,function (d) {return new Date(Date.parse(d.datetime))}));
        Y.domain([0,d3.max(data, function (d) { return +d.magnitud; })]);


        torso.select(".x_axis")
            .transition()
            .duration(200)
            .ease(d3.easeLinear)
            .call(xEje);

        torso.select(".y_axis")
            .transition()
            .duration(200)
            .ease(d3.easeLinear)
            .call(yEje);

        torso.select(".linea")
            .datum(data)
            .attr("fill","none")
            .attr("stroke","#698969")
            .attr("stroke-width",2.5)
            .transition()
            .duration(200)
            .ease(d3.easeLinear)
            .attr("d",d3.line()
                .x(function (d) { return X(new Date(Date.parse(d.datetime))) })
                .y(function (d) { return Y(d.magnitud)})
            )
            .attr("transform","translate(15,-320)");

        let pie = piernas.selectAll("circle").data(data);

        // update | 07.11.2020 | yeiipi
        pie.transition()
            .attr("cx",function (d) { return X(new Date(Date.parse(d.datetime))) })
            .attr("cy",function (d) { return Y(d.magnitud)});

        // enter | 07.11.2020 | yeiipi
        pie.enter().append("circle")
            .attr("cx",function (d) { return X(formatoFechaTiempo(d.fecha_tiempo)) })
            .attr("cy",function (d) { return Y(d.magnitud)})
            .attr("r",7)
            .style("fill","#695E5E")
            .style("opacity",0.3)
            .attr("transform","translate(15,-320)")
            .on("mouseover",function (d) {
                dotOn(d);
                d3.select(this).style("opacity",1);
            })
            .on("mousemove", function (d){
                dotWork(d);
            })
            .on("mouseout", function (d){
                dotOff();
                d3.select(this).style("opacity",0.3)
            })

        // remove | 07.11.2020 | yeiipi
        pie.exit()
            .transition()
            .style("opacity",0)
            .remove();
    }).catch(err => {
        console.warn(err);
    })
}




