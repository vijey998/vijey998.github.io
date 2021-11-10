import { Component, OnInit, Input } from '@angular/core';
import * as HighchartsArearange from 'highcharts';
declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');

Boost(HighchartsArearange);
noData(HighchartsArearange);
More(HighchartsArearange);
noData(HighchartsArearange);
@Component({
  selector: 'app-daily-chart',
  templateUrl: './daily-chart.component.html',
  styleUrls: ['./daily-chart.component.css'],
})
export class DailyChartComponent implements OnInit {
  @Input() weather: any;
  title = 'highchart-app-arearange';
  highchartsArearange = HighchartsArearange;
  arearange: any;
  chartOptions: HighchartsArearange.Options = {};

  constructor() {}

  ngOnInit(): void {
    this.arearange = new Array(15);
    this.weather.data.timelines[0].intervals.forEach((node: any, i: number) => {
      var x = Date.parse(node.startTime);
      var minTemp = node.values.temperatureMin;
      var maxTemp = node.values.temperatureMax;
      this.arearange[i] = [x, minTemp, maxTemp];
    });
    this.chartOptions = {
      chart: {
        type: 'arearange',
        zoomType: 'x',
        scrollablePlotArea: {
          minWidth: 600,
          scrollPositionX: 1,
        },
      },

      title: {
        text: 'Temperature Ranges (Min, Max)',
      },

      xAxis: {
        type: 'datetime',
        accessibility: {
          rangeDescription: 'Temperature for next 15 days',
        },
      },

      yAxis: {
        title: {
          text: null,
        },
      },

      tooltip: {
        shared: true,
        valueSuffix: '°F',
        xDateFormat: '%A, %b %e',
      },

      legend: {
        enabled: false,
      },

      series: [
        {
          name: 'Temperatures',
          data: this.arearange,
          type: 'arearange',
          color: {
            linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
            stops: [
              [0, '#FFA500'],
              [1, '#C1E1EC'],
            ],
          },
        },
      ],
    };
    console.log("Here");
    //HighchartsArearange.setOptions(this.chartOptions);
    //HighchartsArearange.chart('container-arearange', this.chartOptions);
  }
}
