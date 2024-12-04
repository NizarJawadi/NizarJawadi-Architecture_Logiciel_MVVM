import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
//import { ChartModule } from 'angular-highcharts';
import { Chart, ChartModule } from 'angular-highcharts';
import * as Highcharts from 'highcharts';





@Component({
  selector: 'app-sales-by-month',
  standalone: true,
  imports: [ChartModule, RouterLink],
  templateUrl: './sales-by-month.component.html',
  styleUrls: ['./sales-by-month.component.scss'], 
  template: `<div [chart]="chart"></div>`
})

export class SalesByMonthComponent  implements OnInit{

  
  chart = new Chart({
    chart: {
      type: 'line',
      height: 325
    },
    title: {
      text: 'Monthly sales'
    },
    xAxis: {
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
      ]
    },
    yAxis: {
      title: {
        text: 'Revenue in TND'
      }
    },
    series: [
      {
        name: "Sfax",
        type: "line",
        color: '#044342',
        data: [70, 69, 95, 145, 182, 215, 252, 265, 233, 183, 139, 196]
      },
      {
        name: 'Tunis',
        type: 'line',
        color: '#7e0505',
        data: [
          47, 52, 44, 35, 58, 69, 32, 53, 71, 82, 99, 159
        ]
      },
      {
        name: 'Sousse',
        type: 'line',
        color: '#ed9e20',
        data: [
          17, 22, 14, 25, 18, 19, 22, 43, 11, 32, 29, 59
        ]
      },
    ],
    credits: {
      enabled: false
    }
    
  })

  constructor() { }

  ngOnInit(): void {
  }
}
