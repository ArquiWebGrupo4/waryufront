import { Component} from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import {Tipoincidentelistar} from './tipoincidentelistar/tipoincidentelistar';

@Component({
  selector: 'app-tipo-incidente',
  imports: [RouterOutlet, Tipoincidentelistar],
  templateUrl: './tipo-incidente.html',
  styleUrl: './tipo-incidente.css',
})
export class TipoIncidente {
  constructor(public route:ActivatedRoute) {}
}
