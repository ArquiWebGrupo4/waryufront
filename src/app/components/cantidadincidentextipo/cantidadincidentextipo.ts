import { MatIconModule } from '@angular/material/icon';
import {
  ChartDataset,
  ChartOptions,
  ChartType,
} from './../../../../node_modules/chart.js/dist/types/index.d';
import { Component, OnInit } from '@angular/core';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { IncidentesService } from '../../services/incidentes-service';

@Component({
  selector: 'app-cantidadincidentextipo',
  imports: [MatIconModule,BaseChartDirective],
  templateUrl: './cantidadincidentextipo.html',
  styleUrl: './cantidadincidentextipo.css',
  providers: [provideCharts(withDefaultRegisterables())],
})
export class Cantidadincidentextipo implements OnInit {
  hasData = false;

  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];
  constructor(private iS: IncidentesService) {}

  ngOnInit(): void {
    this.iS.getcontar().subscribe((data) => {
      if (data.length > 0) {
        this.hasData = true;
        this.barChartLabels = data.map((item) => item.tipoIncidente);
        // Generar colores automáticamente
        const colors = data.map(() => this.getRandomColor());
        this.barChartData = [
          {
            data: data.map((item) => item.cantidad),
            label: 'cantidad de incidentes por tipo',
            backgroundColor: colors,
          },
        ];
      } else {
        this.hasData = false;
      }
    });
  }
    // Función para generar colores aleatorios
private getRandomColor(): string {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  return `rgb(${r}, ${g}, ${b})`;
  }
  
  
}
