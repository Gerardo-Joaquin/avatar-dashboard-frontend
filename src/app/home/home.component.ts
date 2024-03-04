import { Component, OnInit, ViewChild } from '@angular/core';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts'
import { ChartConfiguration, ChartData, ChartEvent, ChartType, Color } from 'chart.js'
import { DashbaordService } from 'app/core/services/dashbaord.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public barChartType: ChartType = 'bar';
  public barChartOptions: ChartConfiguration['options'] = {
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 10,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
  };
  public barChartData: ChartData<'bar'> = {
    labels: ['Pañales', 'Talco', 'Toallas', 'Producto y'],
    datasets: [
      { data: [65, 59, 80, 81], label: 'Mujeres' },
      { data: [28, 48, 40, 19], label: 'Hombres' },
    ],
    
  };
  public chartClicked({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: object[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: object[];
  }): void {
    console.log(event, active);
  }
  public pieChartOptions: ChartConfiguration['options'] = {
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
  };
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: ['Positivas', 'Negativas'],
    datasets: [
      {
        data: [120, 65],
        backgroundColor: [
          'rgba(76,174,142,0.5)',
          'rgba(231, 76, 60, 0.5)'
        ]
      },
    ],
  };
  public pieChartType: ChartType = 'pie';

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [10, 9, 20, 30, 10, 55, 40],
        label: 'Hombre',
        backgroundColor: 'rgba(80,80,255,0.2)',
        borderColor: 'rgba(80,80,255,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(80,80,255,0.8)',
        fill: 'origin',
      },
      {
        data: [70, 90, 100, 80, 120, 107, 90],
        label: 'Mujer',
        backgroundColor: 'rgba(255,2,200,0.2)',
        borderColor: 'rgba(255,2,200,1)',
        pointBackgroundColor: 'rgba(77,83,96,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(255,2,200,0.8)',
        fill: 'origin',
      },
    ],
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'],
  };

  public lineChartOptions: any = {
    elements: {
      line: {
        tension: 0.5,
      },
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      y: {
        position: 'left',
      },
      y1: {
        position: 'right',
        grid: {
          color: 'rgba(255,0,0,0.3)',
        },
        ticks: {
          color: 'red',
        },
      },
    },

    plugins: {
      legend: { display: true },
      annotation: {
        annotations: [
          {
            type: 'line',
            scaleID: 'x',
            value: 'March',
            borderColor: 'orange',
            borderWidth: 2,
            label: {
              display: true,
              position: 'center',
              color: 'orange',
              content: 'LineAnno',
              font: {
                weight: 'bold',
              },
            },
          },
        ],
      },
    },
  };

  public lineChartType: ChartType = 'line';




  commentsUsers: any[] = []
  constructor(
    private dashboard: DashbaordService
  ) { }

  ngOnInit() {
    this.dashboard.getCommentsUsers().subscribe(data => {
      if (!data.error) {
        this.commentsUsers = data.data
      }
    })
  }

}
