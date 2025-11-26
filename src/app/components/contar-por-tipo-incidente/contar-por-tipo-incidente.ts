import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';

import { ReporteIncidenteService } from '../../services/reporte-incidente-service';

@Component({
  selector: 'app-contar-por-tipo-incidente',
  imports: [MatIconModule, BaseChartDirective],
  templateUrl: './contar-por-tipo-incidente.html',
  styleUrl: './contar-por-tipo-incidente.css',
  providers: [provideCharts(withDefaultRegisterables())],

})

export class ContarPorTipoIncidente implements OnInit{
  hasData = false;

  barChartOptions: ChartOptions = {
    responsive: true,
  }
  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];
  constructor(private rS: ReporteIncidenteService) {}

  ngOnInit(): void {
    this.rS.getContarTipoIncidente().subscribe((data) => {
      if (data.length > 0) {
        this.hasData = true;
        this.barChartLabels = data.map((item) => item.incidente);
        const colors = data.map(() => this.getRandomColor());
        this.barChartData = [
          {
            data: data.map((item) => item.cantidad),
            label: 'Cantidad por tipo de incidente',
            backgroundColor: colors,
          },
        ]
      } else {
        this.hasData = false
      }
    });
  }

  private getRandomColor(): string {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgb(${r}, ${g}, ${b})`
  }

}
