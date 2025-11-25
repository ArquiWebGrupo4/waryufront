import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { IncidentesService } from '../../../../services/incidentes-service';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { MatIconModule } from '@angular/material/icon';



@Component({
  selector: 'app-reporte-contar-por-nivel',
  imports: [MatIconModule, BaseChartDirective],
  templateUrl: './reporte-contar-por-nivel.html',
  styleUrl: './reporte-contar-por-nivel.css',
  providers: [provideCharts(withDefaultRegisterables())],

})
export class ReporteContarPorNivel implements OnInit {
  hasData = false;
  barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 1,
        callback: function (value) {
          return Number.isInteger(value) ? value : '';
        }
      }
    }
  }
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartData: ChartDataset[]=[];

  constructor(private iS: IncidentesService){}

  ngOnInit(): void {
    this.iS.getcontarxnivel().subscribe((data)=>{
      if(data.length >0){
        this.hasData=true;
        this.barChartLabels = data.map((item) => item.nivelDeIncidente);
        this.barChartData = [
          {
            data: data.map((item) => item.cantidad),
            label: 'Cantidad de Incidentes por Nivel de Peligro (1 a 10)',
            backgroundColor:[
              '#c94d4d',
              '#353131ff'
            ],
          },
        ];
      } else{
        this.hasData = false;
      }
    })
  }

}
