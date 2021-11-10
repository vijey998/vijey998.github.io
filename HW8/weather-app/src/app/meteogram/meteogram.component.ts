import { Component, OnInit, Input } from '@angular/core';
import * as HighchartsMeteogram from 'highcharts';
declare var require: any;
let noData = require('highcharts/modules/no-data-to-display');
let Windbarb=require('highcharts/modules/windbarb');

//Boost(HighchartsMeteogram);
//noData(HighchartsMeteogram);
//More(HighchartsMeteogram);
//noData(HighchartsMeteogram);
Windbarb(HighchartsMeteogram);
noData(HighchartsMeteogram);
@Component({
  selector: 'app-meteogram',
  templateUrl: './meteogram.component.html',
  styleUrls: ['./meteogram.component.css']
})
/*
export class MeteogramComponent1 implements OnInit {
  @Input() weather: any;
  title = 'highchart-app';
  highcharts = HighchartsMeteogram;
  constructor() { }

  ngOnInit(): void {
    var x = new Meteogram(this.weather,'container-meteogram');
  }


}
*/
export class MeteogramComponent implements OnInit {
  // Parallel arrays for the chart data, these are populated as the JSON file
  // is loaded
  @Input() weather: any;
  //@Input() flag:any;
  title = 'highchart-app-meteogram';
  highchartsMeteogram = HighchartsMeteogram;
  json:any;
  container:any;  
  chartOptionsMeteo: HighchartsMeteogram.Options = {};
  /*
  constructor(
    json:any, 
    container:any)
    {this.json=json;
    this.container=container;
    this.parseYrData();}*/
  symbols:any = [];
  humidity:any = [];
  humidityError:any = [];
  winds:any = [];
  temperatures:any = [];
  pressures:any = [];
  drawBlocksForWindArrows(chart:any){};
  getChartOptions(){};
  onChartLoad(chart:any){};
  createChart(){};
  parseYrData(){};
  chart:any;
  constructor(){}
  ngOnInit(): void {
    //var x = new MeteogramComponent(this.weather,'container-meteogram');
    this.json=this.weather;
    this.container='container-meteogram';
    /*
    if(this.flag==false){
      console.log(this.flag);
      console.log("Setting 0");
      HighchartsMeteogram.setOptions({});
    }
    else{
    this.getChartOptions();
    this.parseYrData();}*/
    this.getChartOptions();
    this.parseYrData();
    
  }
}

MeteogramComponent.prototype.drawBlocksForWindArrows = function(chart) {
  const xAxis = chart.xAxis[0];

  for (
      let pos = xAxis.min, max = xAxis.max, i = 0; pos <= max + 36e5; pos += 36e5, i += 1
  ) {
      // Get the X position
      const isLast = pos === max + 36e5,
          x = Math.round(xAxis.toPixels(pos)) + (isLast ? 0.5 : -0.5);

      // Draw the vertical dividers and ticks
      //const isLong =
      //    this.resolution > 36e5 ? pos % this.resolution === 0 : i % 2 === 0;
      const isLong=true;
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

MeteogramComponent.prototype.getChartOptions = function() {  
  this.chartOptionsMeteo=
     {
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
      /*
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
      },*/

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
                  enabled: false,
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
                  enabled: true, ///TODO
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
              type:'line',
              data: this.pressures,
              marker: {
                  enabled: false,
              },
              shadow: false,
              tooltip: {
                  valueSuffix: " inHg",
              },
              dashStyle: "ShortDot",
              yAxis: 2,
          },
          {
              name: "Wind",
              type: "windbarb",
              id: "windbarbs",
              color: "black",
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


MeteogramComponent.prototype.onChartLoad = function(chart) {
  this.drawBlocksForWindArrows(chart);
};

MeteogramComponent.prototype.createChart = function() {
  this.chart = new HighchartsMeteogram.Chart(this.chartOptionsMeteo, (chart) => {
      this.onChartLoad(chart);
  });
};
/*
Meteogram.prototype.error = function() {
  document.getElementById("loading").innerHTML =
      '<i class="fa fa-frown-o"></i> Failed loading data, please try again later';
};
*/
MeteogramComponent.prototype.parseYrData = function() {
  let pointStart:number;
  /*
  if (!this.json) {
      return this.error();
  }*/
  this.json.data.timelines[1].intervals.forEach((node:any, i:number) => {
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


