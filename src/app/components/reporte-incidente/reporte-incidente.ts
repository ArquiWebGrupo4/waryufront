import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import {Reporteincidentelistar} from './reporteincidentelistar/reporteincidentelistar';

@Component({
  selector: 'app-reporte-incidente',
  imports: [RouterOutlet, Reporteincidentelistar],
  templateUrl: './reporte-incidente.html',
  styleUrl: './reporte-incidente.css',
})
export class ReporteIncidente {
  constructor(public route:ActivatedRoute) {}

}
