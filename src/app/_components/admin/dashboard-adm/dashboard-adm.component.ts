import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { PostManagementService } from 'src/app/_services/postManagement/post-management.service';
@Component({
  selector: 'app-dashboard-adm',
  templateUrl: './dashboard-adm.component.html',
  styleUrls: ['./dashboard-adm.component.css'],
})
export class DashboardAdmComponent implements OnInit {
  constructor(private postManagementService: PostManagementService) {}

  ngOnInit(): void {
    this.updateDashboard();
  }
  pieChartArray: any[] = [];

  pieChartOptions: ChartOptions = {
    responsive: true,
    layout: {
      padding: {
        left: 10,
        right: 10,
        top: 10,
        bottom: 0,
      },
    },
    legend: {
      position: 'left',
    },
  };
  pieChartLabels: Label[] = ['Food', 'Non-Food', 'Wanted', 'Borrow'];
  pieChartData: number[] = [];
  pieChartType: ChartType = 'pie';
  pieChartLegend = true;
  pieChartColors = [
    {
      backgroundColor: [
        'rgba(255,0,0,0.3)',
        'rgba(0,255,0,0.3)',
        'rgba(0,0,255,0.3)',
      ],
    },
  ];

  pieChartOptions2: ChartOptions = {
    responsive: true,
    layout: {
      padding: {
        left: 10,
        right: 10,
        top: 10,
        bottom: 0,
      },
    },
    legend: {
      position: 'left',
    },
  };
  pieChartLabels2: Label[] = ['Individuals', 'Organizations', 'Others'];
  pieChartData2: number[] = [];
  pieChartType2: ChartType = 'pie';
  pieChartLegend2 = true;
  pieChartColors2 = [
    {
      backgroundColor: [
        'rgba(240,0,150,0.3)',
        'rgba(0,225,700,0.3)',
        'rgba(100,0,275,0.3)',
      ],
    },
  ];
  setPieChartData(data: any) {
    this.pieChartData = [
      data.foodCounts,
      data.nonFoodCounts,
      data.wantedCounts,
      data.borrowCounts,
    ];
  }
  updateDashboard() {
    this.postManagementService.getDashboardCounts().subscribe((result) => {
      if (result?.status == '0') {
        debugger;
        if (result?.data) {
          this.setPieChartData(result?.data[0]);
          this.updateTaxDashboard();
        }
      }
    });
  }

  setTaxPieChartData(data: any) {
    this.pieChartData2 = [
      data.individualCounts,
      data.organizationalCounts,
      data.otherCounts,
    ];
  }
  updateTaxDashboard() {
    this.postManagementService.GetDashboardTaxCounts().subscribe((result) => {
      if (result?.status == '0') {
        if (result?.data) {
          console.log(result.data);
          this.setTaxPieChartData(result?.data[0]);
        }
      }
    });
  }
}
