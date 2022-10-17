import { Component, OnInit } from '@angular/core';
import * as echarts from 'echarts';

@Component({
  selector: 'app-grid-system',
  templateUrl: './grid-system.component.html',
  styleUrls: ['./grid-system.component.css'],
})
export class GridSystemComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    var chartDom = document.getElementById('main');
    var myChart = echarts.init(chartDom);
    var lineChartDomExposure = document.getElementById('exposure-graph');
    var lineChartDomDeposits = document.getElementById('deposits-graph');
    var lineChartDomSecurities = document.getElementById('securities-graph');
    var lineChartDomLiabilities = document.getElementById('liabilities-graph');
    var lineChartExposure = echarts.init(lineChartDomExposure);
    var lineChartDeposits = echarts.init(lineChartDomDeposits);
    var lineChartSecurities = echarts.init(lineChartDomSecurities);
    var lineChartLiabilities = echarts.init(lineChartDomLiabilities);
    var option;
    var optionLineChart;

    option = {
      dataset: {
        source: [
          ['amount', 'Department'],
          [2, 'HR'],
          [2, 'Accounts'],
          [3, 'IT'],
          [5, 'RMD'],
          [24, 'Treasury'],
        ],
      },
      grid: {
        containLabel: true,
        left: '10%',
        bottom: '0%',
        right: '5%',
        top: '5%',
      },
      xAxis: { name: 'amount', show: false, width: 500 },
      yAxis: { type: 'category', fontSize: 25, fontWeight: 'bold' },
      series: [
        {
          type: 'bar',
          encode: {
            x: 'amount',
            y: 'product',
          },
        },
      ],
      label: {
        show: true,
        position: 'right',
        color: 'black',
        fontSize: 12,
        fontWeight: 'bold',
      },
    };
    optionLineChart = {
      xAxis: {
        type: 'category',
        show: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: {
        type: 'value',
        show: false,
      },
      grid: {
        containLabel: false,
        left: '2%',
        bottom: '0%',
        right: '2%',
        top: '15%',
      },
      series: [
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line',
          smooth: true,
        },
      ],
    };

    option && myChart.setOption(option);
    optionLineChart && lineChartExposure.setOption(optionLineChart);
    optionLineChart && lineChartDeposits.setOption(optionLineChart);
    optionLineChart && lineChartSecurities.setOption(optionLineChart);
    optionLineChart && lineChartLiabilities.setOption(optionLineChart);
  }
}
