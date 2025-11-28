import { Component } from '@angular/core';
import { Cantidadincidentextipo } from '../cantidadincidentextipo/cantidadincidentextipo';
import { ContarPorTipoIncidente } from '../contar-por-tipo-incidente/contar-por-tipo-incidente';
import { ReporteContarPorNivel } from '../reportes/ReporteIncidente/reporte-contar-por-nivel/reporte-contar-por-nivel';
import { Distritopeligroso } from '../distritopeligroso/distritopeligroso';
@Component({
  selector: 'app-dashboard',
  imports: [Cantidadincidentextipo, ContarPorTipoIncidente, ReporteContarPorNivel, Distritopeligroso],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  titulo = 'Dashboard General';
}
