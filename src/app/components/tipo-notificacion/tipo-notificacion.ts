import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { TiponotificacionListar } from './tiponotificacion-listar/tiponotificacion-listar';
@Component({
  selector: 'app-tipo-notificacion',
  imports: [RouterOutlet, TiponotificacionListar],
  templateUrl: './tipo-notificacion.html',
  styleUrl: './tipo-notificacion.css',
})
export class TipoNotificacion {
  constructor(public route:ActivatedRoute) {}
}
