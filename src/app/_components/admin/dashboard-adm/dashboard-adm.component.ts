import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
@Component({
  selector: 'app-dashboard-adm',
  templateUrl: './dashboard-adm.component.html',
  styleUrls: ['./dashboard-adm.component.css']
})
export class DashboardAdmComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  dddistricts: any[] = [];
  totalCount: number = 0;
  motorcycleCount: number = 0;
  motorcarsCount: number = 0;
  othersCount: number = 0;
  totalRecovery: string = '';
  pieChartArray: any[] = [];

  motorCarsData : any[] = [];
  motorCyclesData : any[] = [];
  otherVehiclesData : any[] = [];
  totalData : any[] = [];


  pieChartOptions: ChartOptions = {
    responsive: true,
    layout:{
      padding: {
        left : 10,
        right: 10,
        top:10,
        bottom:0
      }
    },
    legend: {
      position: 'left',
    }
  };
  pieChartLabels: Label[] = ['Motor Cars', 'Motor Cycles', 'Other Vehicles'];
  pieChartData: number[] = [];
  pieChartType: ChartType = 'pie';
  pieChartLegend = true;
  pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
    },
  ];



  pieChartOptions2: ChartOptions = {
    responsive: true,
    layout:{
      padding: {
        left : 10,
        right: 10,
        top:10,
        bottom:0
      }
    },
    legend: {
      position: 'left',
    }
  };
  pieChartLabels2: Label[] = [];
  pieChartData2: number[] = [];
  pieChartType2: ChartType = 'pie';
  pieChartLegend2 = true;
  pieChartColors2 = [ {
    backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
  },
];
}
