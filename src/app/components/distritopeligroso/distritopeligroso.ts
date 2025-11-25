import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { DistritoService } from '../../services/distrito-service';


@Component({
  selector: 'app-distritopeligroso',
  imports: [MatIconModule, BaseChartDirective],
  templateUrl: './distritopeligroso.html',
  styleUrl: './distritopeligroso.css',
})
export class Distritopeligroso implements OnInit {
  hasData = false;
  
    barChartOptions: ChartOptions = {
      responsive: true,
    }
    barChartLabels: string[] = [];
    barChartType: ChartType = 'line';
    barChartLegend = true;
    barChartData: ChartDataset[] = [];
    constructor(private dS: DistritoService) {}
  
    ngOnInit(): void {
      this.dS.getDistritosPeligrosos().subscribe((data) => {
        if (data.length > 0) {
          this.hasData = true;
          this.barChartLabels = data.map((item) => item.distrito);
          const colors = data.map(() => this.getRandomColor());
          this.barChartData = [
            {
              data: data.map((item) => item.total),
              label: 'Distrito con mayor cantidad de incidentes peligrosos',
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
