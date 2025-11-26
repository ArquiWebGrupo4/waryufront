import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Notificacionlistar } from './notificacionlistar/notificacionlistar';

@Component({
  selector: 'app-notificacion',
  imports: [RouterOutlet,Notificacionlistar],
  templateUrl: './notificacion.html',
  styleUrl: './notificacion.css',
})
export class Notificacion {
  constructor(public route:ActivatedRoute) {}
}
