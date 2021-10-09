var codeDict = {
    "1000Day": "images/clear_day.svg",
    "1000Night": "images/clear_night.svg",
    "1100Day": "images/mostly_clear_day.svg",
    "1100Night": "images/mostly_clear_night.svg",
    "1101Day": "images/partly_cloudy_day.svg",
    "1101Night": "images/partly_cloudy_night.svg",
    "1102": "images/mostly_cloudy.svg",
    "1001": "images/cloudy.svg",
    "2000": "images/fog.svg",
    "2100": "images/fog_light.svg",
    "8000": "images/tstorm.svg",
    "5001": "images/flurries.svg",
    "5100": "images/snow_light.svg",
    "5000": "images/snow.svg",
    "5101": "images/snow_heavy.svg",
    "7102": "images/ice_pellets_light.svg",
    "7000": "images/ice_pellets.svg",
    "7101": "images/ice_pellets_heavy.svg",
    "4000": "images/drizzle.svg",
    "6000": "images/freezing_drizzle.svg",
    "6200": "images/freezing_rain_light.svg",
    "6001": "images/freezing_rain.svg",
    "6201": "images/freezing_rain_heavy.svg",
    "4200": "images/rain_light.svg",
    "4001": "images/rain.svg",
    "4201": "images/rain_heavy.svg",
    "3000": "images/light_wind.svg",
    "3001": "images/wind.svg",
    "3002": "images/strong_wind.svg",
};
// Global variable
var jsonFile;

function image(code) {
    var d = new Date();
    var hour = d.getUTCHours();
    hour -= 7;
    if (hour < 0) hour = 24 + hour;
    if (code == 1000 || code == 1100 || code == 1101) {
        if (hour >= 1 && hour < 13) {
            // Change to Night if night icons are to be included
            code += "Day";
        } else {
            code += "Day";
        }
    }
    return codeDict[code];
}

function parseDate(x) {
    var y = new Date(x);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var month = months[y.getMonth()];
    var date = y.getDate() + "";
    if (date.length == 1)
        date = "0" + date;
    var year = y.getFullYear();
    var day = days[y.getDay()];
    return (day + ", " + date + " " + month + " " + year);
}

function parseTime(x) {
    var y = new Date(x);
    hour = y.getUTCHours();
    hour -= 7;
    if (hour < 0) hour = 24 + hour;
    if (hour < 12) return (hour + "AM");
    else if (hour == 12) return (hour + "PM");
    else return ((hour - 12) + "PM");
}

function descp(x) {
    var description = {
        0: "Unknown",
        1000: "Clear",
        1001: "Cloudy",
        1100: "Mostly Clear",
        1101: "Partly Cloudy",
        1102: "Mostly Cloudy",
        2000: "Fog",
        2100: "Light Fog",
        3000: "Light Wind",
        3001: "Wind",
        3002: "Strong Wind",
        4000: "Drizzle",
        4001: "Rain",
        4200: "Light Rain",
        4201: "Heavy Rain",
        5000: "Snow",
        5001: "Flurries",
        5100: "Light Snow",
        5101: "Heavy Snow",
        6000: "Freezing Drizzle",
        6001: "Freezing Rain",
        6200: "Light Freezing Rain",
        6201: "Heavy Freezing Rain",
        7000: "Ice Pellets",
        7101: "Heavy Ice Pellets",
        7102: "Light Ice Pellets",
        8000: "Thunderstorm",
    }
    return description[x];
}

function precipType(x) {
    var precip = {
        0: "N/A",
        1: "Rain",
        2: "Snow",
        3: "Freezing Rain",
        4: "Ice Pellets",
    }
    return precip[x];
}

function noRecords() {
    var x = document.getElementById("cardSection");
    disable_inputs(0);
    x.innerHTML + = `
        <br/>
        <div style="box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
        width: 13cm;
        height: 1.2cm;
        margin: auto;
        text-align: center;
        font-family: 'Lato', sans-serif;
        background-color: white;
        padding-top:0.5cm;
        color:#2e5984";
        font-weight:400;>
            No records have been found.
        </div>
    `
}

function geocoding() {
    var lng, lat, xml_http_request, json_file, address;

    if (document.getElementById("curLoc").checked) {
        var ipinfo_url = "https://ipinfo.io?token=68ef393effbdfb";
        xml_http_request = new XMLHttpRequest(ipinfo_url);
        xml_http_request.open("GET", ipinfo_url, false);
        xml_http_request.send();
        json_file = JSON.parse(xml_http_request.responseText);
        lng = (json_file.loc).split(',')[1];
        lat = (json_file.loc).split(',')[0];
        address = json_file.city + ", " + json_file.region + ", " + json_file.country;
        console.log(lng + " " + lat);
    } else {
        var geocoding_resp = get_loc();
        if (geocoding_resp.results.length == 0) {
            noRecords();
            return;
        }
        lng = geocoding_resp.results[0].geometry.location.lng;
        lat = geocoding_resp.results[0].geometry.location.lat;
        address = geocoding_resp.results[0].formatted_address;
        console.log(lng + " " + lat);

        function get_loc() {
            var street = document.getElementById("street").value;
            var city = document.getElementById("city").value;
            var state = document.getElementById("state").value;
            var geocoding_url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + street.replace(' ', '+') +
                ",+" + city + ",+" + state + "&key=AIzaSyAc7H889Wfuxy4690EjwxNH8hy1KABFDKI";
            console.log(geocoding_url);
            xml_http_request = new XMLHttpRequest(geocoding_url);
            xml_http_request.open("GET", geocoding_url, false);
            xml_http_request.send();
            json_file = JSON.parse(xml_http_request.responseText);
            return json_file;
            //return "temp";
        }
    }

    var weather_url =
        "/getWeather?lat=" + lat + "&lng=" + lng;
    xml_http_request = new XMLHttpRequest(weather_url);
    xml_http_request.open("GET", weather_url, false);
    xml_http_request.send();
    json_file = JSON.parse(xml_http_request.responseText);
    jsonFile = json_file;
    generate_table(json_file, address);
}

function disable_inputs(x) {

    if (x == 0) {
        document.getElementById("street").value = "";
        document.getElementById("city").value = "";
        document.getElementById("state").value = "";
        document.getElementById("cardSection").innerHTML = ``;
        document.getElementById("tableOrGraphSection").innerHTML = ``;
        document.getElementById("street").disabled = false;
        document.getElementById("city").disabled = false;
        document.getElementById("state").disabled = false;
        document.getElementById("state").required = true;
        document.getElementById("city").required = true;
        document.getElementById("street").required = true;

    }
    if (x == 1) {
        document.getElementById("street").disabled =
            document.getElementById("curLoc").checked;
        document.getElementById("city").disabled =
            document.getElementById("curLoc").checked;
        document.getElementById("state").disabled =
            document.getElementById("curLoc").checked;

        document.getElementById("state").required = !document.getElementById("curLoc").checked;
        document.getElementById("city").required = !document.getElementById("curLoc").checked;
        document.getElementById("street").required = !document.getElementById("curLoc").checked;
    }
}

// Generate Cuurent Weather Card and Weather Table
function generate_table(json_file, address) {
    var cardLoc = address;
    var x = document.getElementById("cardSection");
    x.innerHTML = `
    <br/>
    <div class="card-first">
        <br/>
        <div style="padding-left:20px">${cardLoc}</div> </br>
        <div class="grid-container">
            <div><img src="${image(
              json_file.data.timelines[2].intervals[0].values.weatherCode
            )}" style="width:2.5cm;height:2.5cm;"><span style="font-size:14px;padding-left:3px;">&nbsp;&nbsp;${descp(
                json_file.data.timelines[2].intervals[0].values.weatherCode
              )}</span></div>
            <div class="temperature">${
              json_file.data.timelines[2].intervals[0].values.temperature
            }&#xb0;</div>
            
        </div>    
        <br/>
        <table style="font-size:13px;width:100%;text-align:center;">
            <thead>
                <tr><th>Humidity</th><th>Pressure</th><th>Wind Speed</th><th>Visibility</th><th>Cloud Cover</th><th>UV Index</th>
                </tr>
            </thead>
            <tbody>
                <tr class="card-images">
                    <td><img src="https://cdn2.iconfinder.com/data/icons/weather-74/24/weather-16-512.png" style="height: 0.75cm;width: 0.75cm;"></td>
                    <td><img src="https://cdn2.iconfinder.com/data/icons/weather-74/24/weather-25-512.png" style="height: 0.75cm;width: 0.75cm;"></td>
                    <td><img src="https://cdn2.iconfinder.com/data/icons/weather-74/24/weather-27-512.png" style="height: 0.75cm;width: 0.75cm;"></td>
                    <td><img src="https://cdn2.iconfinder.com/data/icons/weather-74/24/weather-30-512.png" style="height: 0.75cm;width: 0.75cm;"></td>
                    <td><img src="https://cdn2.iconfinder.com/data/icons/weather-74/24/weather-28-512.png" style="height: 0.75cm;width: 0.75cm;"></td>
                    <td><img src="https://cdn2.iconfinder.com/data/icons/weather-74/24/weather-24-512.png" style="height: 0.75cm;width: 0.75cm;"></td>
                </tr>
                <tr class="card-images">
                    <td>${
                      json_file.data.timelines[2].intervals[0].values.humidity
                    }%</td>
                    <td>${
                      json_file.data.timelines[2].intervals[0].values
                        .pressureSeaLevel
                    }inHg</td>
                    <td>${
                      json_file.data.timelines[2].intervals[0].values.windSpeed
                    }mph</td>
                    <td>${
                      json_file.data.timelines[2].intervals[0].values.visibility
                    }mi</td>
                    <td>${
                      json_file.data.timelines[2].intervals[0].values.cloudCover
                    }%</td>
                    <td>${
                      json_file.data.timelines[2].intervals[0].values.uvIndex
                    }</td>
                </tr>
            </tbody>
        </table>
    </div>`;
    var w = document.getElementById("tableOrGraphSection");
    w.innerHTML = `
    <table id="weatherTable"  class="two-week-table" style="margin: auto;">
    <thead>
        <tr><th>Date</th><th>Status</th><th>Temp Low</th><th>Temp High</th><th>Wind Speed</th>
        </tr>
    </thead>
    <tbody id="weather-table">
    `;

    // Generate Table
    var y = document.getElementById("weather-table");
    for (var i = 0; i < json_file.data.timelines[0].intervals.length; i++) {
        y.innerHTML += `
        <tr class="card-images" onClick="graph(${i})"> 
        <td>${parseDate(
          json_file.data.timelines[0].intervals[i].startTime
        )}</td>
          <td><img src="${image(
            json_file.data.timelines[0].intervals[i].values.weatherCode
          )}" style="width:1cm;height:1cm;float:left; margin: 0px 0px 0px 0px;"><span style:"floaf:left">${descp(
      json_file.data.timelines[0].intervals[i].values.weatherCode
    )}</span></td>
          <td>${
            json_file.data.timelines[0].intervals[i].values.temperatureMin
          }</td>
          <td>${
            json_file.data.timelines[0].intervals[i].values.temperatureMax
          }</td>
          <td>${json_file.data.timelines[0].intervals[i].values.windSpeed}</td>
        </tr>
        
        `;
    }
    w.innerHTML += `</tbody>
    </table>`;
}

// Function to generate weather card and graphs after clicking on a table row
function graph(i) {
    var json_file = jsonFile;
    var y = document.getElementById("cardSection");
    y.innerHTML = `
    <div style="font-family: 'Lato', sans-serif;font-size:32px;margin:1cm;">Daily Weather Details</div>
    <div class="card">
        <div class="current-weather">
            <div class="grid-container-current-weather">
                <div style="float:left;color:#4e698c;font-weight:700;font-size:20px;line-height:1.1cm;">
                    ${parseDate(
                        json_file.data.timelines[0].intervals[i].startTime
                    )}<br/>
                    ${descp(
                        json_file.data.timelines[0].intervals[i].values.weatherCode
                    )}<br/>
                    <span style="font-size:28px;">
                    ${
                        json_file.data.timelines[0].intervals[i].values.temperatureMin
                    }&#xb0;F/${
                        json_file.data.timelines[0].intervals[i].values.temperatureMax
                    }&#xb0;F<br/>
                    </span>
                </div>
                <div style="float:left;margin-left:1.75cm;">
                    <img src="${image(
                    json_file.data.timelines[0].intervals[i].values.weatherCode
                    )}" style="width:3cm;height:3cm;">
                </div><br/>
            </div> <br/>
            <div style="float:none; color:white; font-weight:bold;padding-left:5cm;line-height:0.75cm;" class="current-weather-bottom">
                <div><span style="font-size:14px;font-weight:400;">Precipitation</span>:<span> ${
                    precipType(json_file.data.timelines[0].intervals[i].values.precipitationType)
                }</span></div>
                <div><span >Chance of Rain</span>:<span> ${
                    json_file.data.timelines[0].intervals[i].values.precipitationProbability
                }%</span></div>
                <div><span>Wind Speed</span>:<span> ${
                    json_file.data.timelines[0].intervals[i].values.windSpeed
                }mph</span></div>
                <div><span>Humidity</span>:<span> ${
                    json_file.data.timelines[0].intervals[i].values.humidity
                }%</span></div>
                <div><span>Visibility</span>:<span> ${
                    json_file.data.timelines[0].intervals[i].values.visibility
                }mi</span></div>
                <div><span>Sunrise/Sunset</span>:<span> ${
                    parseTime(json_file.data.timelines[0].intervals[i].values.sunriseTime)
                }/${
                    parseTime(json_file.data.timelines[0].intervals[i].values.sunsetTime)
                }</span></div><br/>
            </div>
        </div>   
    </div>
    `;
    var x = document.getElementById("tableOrGraphSection");
    x.innerHTML = `
    <div style="font-family: 'Lato', sans-serif;font-size:32px;margin:1cm;">Weather Charts</div>
    <button class="collapsible"></button>
    <div class="content" style="align-content: center;
    text-align: center;
    align-items: center;">
        <br/>
        <figure class="highcharts-figure-arearange" style="align-items:center;">
        <div id="container-arearange" ></div>
        </figure>
        <figure class="highcharts-figure-meteogram">
        <div id="container-meteogram">
            <div id="loading">
            <i class="fa fa-spinner fa-spin"></i> Loading data from external
            source
            </div>
        </div>
        </figure>
    </div>
    `;
    var coll = document.getElementsByClassName("collapsible");
    var k;

    for (k = 0; k < coll.length; k++) {
        coll[k].addEventListener("click", function() {
            this.classList.toggle("active");
            var content = this.nextElementSibling;
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    }
    window.meteogram = new Meteogram(json_file, "container-meteogram");
    var arearange = new Array(15);
    json_file.data.timelines[0].intervals.forEach((node, i) => {
        var x = Date.parse(node.startTime);
        var minTemp = node.values.temperatureMin;
        var maxTemp = node.values.temperatureMax;
        arearange[i] = [x, minTemp, maxTemp];
    });
    Highcharts.chart("container-arearange", {
        chart: {
            type: "arearange",
            zoomType: "x",
            scrollablePlotArea: {
                minWidth: 600,
                scrollPositionX: 1,
            },
            color: "#FF0000",
        },

        title: {
            text: "Temperature Ranges (Min, Max)",
        },

        xAxis: {
            type: "datetime",
            accessibility: {
                rangeDescription: "Temperature for next 15 days",
            },
        },

        yAxis: {
            title: {
                text: null,
            },
        },

        tooltip: {
            crosshairs: true,
            shared: true,
            valueSuffix: "°F",
            xDateFormat: "%A, %b %e",
        },

        legend: {
            enabled: false,
        },

        series: [{
            name: "Temperatures",
            data: arearange,
            color: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                stops: [
                    [0, "#FFA500"],
                    [1, "#C1E1EC"],
                ],
            },
        }, ],
    });


}

function Meteogram(json, container) {
    // Parallel arrays for the chart data, these are populated as the JSON file
    // is loaded
    this.symbols = [];
    this.humidity = [];
    this.humidityError = [];
    this.winds = [];
    this.temperatures = [];
    this.pressures = [];

    // Initialize
    this.json = json;
    this.container = container;

    // Run
    this.parseYrData();
}

Meteogram.prototype.drawBlocksForWindArrows = function(chart) {
    const xAxis = chart.xAxis[0];

    for (
        let pos = xAxis.min, max = xAxis.max, i = 0; pos <= max + 36e5; pos += 36e5, i += 1
    ) {
        // Get the X position
        const isLast = pos === max + 36e5,
            x = Math.round(xAxis.toPixels(pos)) + (isLast ? 0.5 : -0.5);

        // Draw the vertical dividers and ticks
        const isLong =
            this.resolution > 36e5 ? pos % this.resolution === 0 : i % 2 === 0;

        chart.renderer
            .path([
                "M",
                x,
                chart.plotTop + chart.plotHeight + (isLong ? 0 : 28),
                "L",
                x,
                chart.plotTop + chart.plotHeight + 32,
                "Z",
            ])
            .attr({
                stroke: chart.options.chart.plotBorderColor,
                "stroke-width": 1,
            })
            .add();
    }

    // Center items in block
    chart.get("windbarbs").markerGroup.attr({
        translateX: chart.get("windbarbs").markerGroup.translateX + 8,
    });
};

Meteogram.prototype.getChartOptions = function() {
    return {
        chart: {
            renderTo: this.container,
            marginBottom: 70,
            marginRight: 40,
            marginTop: 50,
            plotBorderWidth: 1,
            height: 310,
            alignTicks: false,
            scrollablePlotArea: {
                minWidth: 720
            }
        },

        defs: {
            patterns: [{
                id: "humidity-error",
                path: {
                    d: [
                        "M",
                        3.3,
                        0,
                        "L", -6.7,
                        10,
                        "M",
                        6.7,
                        0,
                        "L", -3.3,
                        10,
                        "M",
                        10,
                        0,
                        "L",
                        0,
                        10,
                        "M",
                        13.3,
                        0,
                        "L",
                        3.3,
                        10,
                        "M",
                        16.7,
                        0,
                        "L",
                        6.7,
                        10,
                    ].join(" "),
                    stroke: "#68CFE8",
                    strokeWidth: 1,
                },
            }, ],
        },

        title: {
            text: "Hourly Weather (For Next 5 Days)",
            align: "center",
            style: {
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
            },
        },

        credits: {
            text: "Forecast",
            position: {
                x: -40,
            },
        },

        tooltip: {
            shared: true,
            useHTML: true,
            headerFormat: "<small>{point.x:%A, %b %e, %H:%M} - {point.point.to:%H:%M}</small><br>" +
                "<b>{point.point.symbolName}</b><br>",
        },

        xAxis: [{
                // Bottom X axis
                type: "datetime",
                tickInterval: 2 * 36e5, // two hours
                minorTickInterval: 36e5, // one hour
                tickLength: 0,
                gridLineWidth: 1,
                gridLineColor: "rgba(128, 128, 128, 0.1)",
                startOnTick: false,
                endOnTick: false,
                minPadding: 0,
                maxPadding: 0,
                offset: 30,
                showLastLabel: true,
                labels: {
                    format: "{value:%H}",
                },
                crosshair: true,
            },
            {
                // Top X axis
                linkedTo: 0,
                type: "datetime",
                tickInterval: 24 * 3600 * 1000,
                labels: {
                    format: '{value:<span style="font-size: 12px; font-weight: bold">%a</span> %b %e}',
                    align: "left",
                    x: 3,
                    y: -5,
                },
                opposite: true,
                tickLength: 20,
                gridLineWidth: 1,
            },
        ],

        yAxis: [{
                // temperature axis
                title: {
                    text: null,
                },
                labels: {
                    format: "{value}°",
                    style: {
                        fontSize: "10px",
                    },
                    x: -3,
                },
                plotLines: [{
                    // zero plane
                    value: 0,
                    color: "#BBBBBB",
                    width: 1,
                    zIndex: 2,
                }, ],
                maxPadding: 0.3,
                minRange: 8,
                tickInterval: 1,
                gridLineColor: "rgba(128, 128, 128, 0.1)",
            },
            {
                // humidity axis
                title: {
                    text: null,
                },
                labels: {
                    enabled: false,
                },
                gridLineWidth: 0,
                tickLength: 0,
                minRange: 10,
                min: 0,
            },
            {
                // Air pressure
                allowDecimals: false,
                title: {
                    // Title on top of axis
                    text: "inHg",
                    offset: 0,
                    align: "high",
                    rotation: 0,
                    style: {
                        fontSize: "10px",
                        color: "#FFA500",
                    },
                    textAlign: "left",
                    x: 3,
                },
                labels: {
                    style: {
                        fontSize: "8px",
                        color: "#FFA500",
                    },
                    y: 2,
                    x: 3,
                },
                gridLineWidth: 0,
                opposite: true,
                showLastLabel: false,
            },
        ],

        legend: {
            enabled: false,
        },

        plotOptions: {
            series: {
                pointPlacement: "between",
            },
        },

        series: [{
                name: "Temperature",
                data: this.temperatures,
                type: "spline",
                marker: {
                    enabled: false,
                    states: {
                        hover: {
                            enabled: true,
                        },
                    },
                },
                tooltip: {
                    pointFormat: '<span style="color:{point.color}">\u25CF</span> ' +
                        "{series.name}: <b>{point.y}°F</b><br/>",
                },
                zIndex: 1,
                color: "#FF3333",
                negativeColor: "#48AFE8",
            },
            {
                name: "Humidity",
                data: this.humidityError,
                type: "column",
                color: "url(#humidity-error)",
                yAxis: 1,
                groupPadding: 0,
                pointPadding: 0,
                tooltip: {
                    valueSuffix: " %",
                    pointFormat: '<span style="color:{point.color}">\u25CF</span> ' +
                        "{series.name}: <b>{point.minvalue} % - {point.maxvalue} %</b><br/>",
                },
                grouping: false,
                dataLabels: {
                    enabled: this.hasHumidityError,
                    filter: {
                        operator: ">",
                        property: "maxValue",
                        value: 0,
                    },
                    style: {
                        fontSize: "8px",
                        color: "gray",
                    },
                },
            },
            {
                name: "Humidity",
                data: this.humidity,
                type: "column",
                color: "#68CFE8",
                yAxis: 1,
                groupPadding: 0,
                pointPadding: 0,
                grouping: false,
                dataLabels: {
                    enabled: !this.hasHumidityError,
                    filter: {
                        operator: ">",
                        property: "y",
                        value: 0,
                    },
                    style: {
                        fontSize: "8px",
                        color: "gray",
                    },
                },
                tooltip: {
                    valueSuffix: " %",
                },
            },
            {
                name: "Air pressure",
                color: "#FFA500",
                data: this.pressures,
                marker: {
                    enabled: false,
                },
                shadow: false,
                tooltip: {
                    valueSuffix: " inHg",
                },
                dashStyle: "shortdot",
                yAxis: 2,
            },
            {
                name: "Wind",
                type: "windbarb",
                id: "windbarbs",
                color: Highcharts.getOptions().colors[1],
                lineWidth: 1.5,
                data: this.winds,
                vectorLength: 18,
                yOffset: -15,
                tooltip: {
                    valueSuffix: " mph",
                },
            },
        ],
    };
};


Meteogram.prototype.onChartLoad = function(chart) {
    this.drawBlocksForWindArrows(chart);
};

Meteogram.prototype.createChart = function() {
    this.chart = new Highcharts.Chart(this.getChartOptions(), (chart) => {
        this.onChartLoad(chart);
    });
};

Meteogram.prototype.error = function() {
    document.getElementById("loading").innerHTML =
        '<i class="fa fa-frown-o"></i> Failed loading data, please try again later';
};

Meteogram.prototype.parseYrData = function() {
    let pointStart;

    if (!this.json) {
        return this.error();
    }
    this.json.data.timelines[1].intervals.forEach((node, i) => {
        const x = Date.parse(node.startTime),
            to = x + 36e5;

        if (to > pointStart + 1000 * 36e5) {
            return;
        }

        this.temperatures.push({
            x,
            y: node.values.temperature,
            to,
        });

        this.humidity.push({
            x,
            y: node.values.humidity,
        });

        if (i % 2 === 0) {
            this.winds.push({
                x,
                value: node.values.windSpeed,
                direction: node.values.windDirection,
            });
        }

        this.pressures.push({
            x,
            y: node.values.pressureSeaLevel,
        });

        if (i === 0) {
            pointStart = (x + to) / 2;
        }
    });

    // Create the chart when the data is loaded
    this.createChart();
};