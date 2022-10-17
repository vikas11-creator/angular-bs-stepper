import { Component, OnInit } from '@angular/core';
import * as echarts from 'echarts';

@Component({
  selector: 'app-grid-system',
  templateUrl: './grid-system.component.html',
  styleUrls: ['./grid-system.component.css'],
})
export class GridSystemComponent implements OnInit {
  dataSet= [820, 932, 901, 934, 1290, 1330, 1320];
  constructor() {}
  ngOnInit() {
    this.loadLineChart('exposure-graph',this.dataSet);
    this.loadLineChart('deposits-graph',this.dataSet);
    this.loadLineChart('securities-graph',this.dataSet);
    this.loadLineChart('liabilities-graph',this.dataSet);
    var chartDom = document.getElementById('main');
    var myChart = echarts.init(chartDom);
    
    var option;

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
        right: '10%',
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
    option && myChart.setOption(option);
  }
  
  loadLineChart(id,data){
    const lineChartDomExposure = document.getElementById(id);
    const lineChartExposure = echarts.init(lineChartDomExposure);
    const optionLineChart = {
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
          data:data,
          type: 'line',
          smooth: true,
        },
      ],
    };
    optionLineChart && lineChartExposure.setOption(optionLineChart);
  }
}
