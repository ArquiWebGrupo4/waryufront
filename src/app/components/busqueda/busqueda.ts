import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Busquedalistar } from './busquedalistar/busquedalistar';
@Component({
  selector: 'app-busqueda',
  imports: [Busquedalistar, RouterOutlet],
  templateUrl: './busqueda.html',
  styleUrl: './busqueda.css',
})
export class Busqueda {
  constructor(public route: ActivatedRoute) {}
}
