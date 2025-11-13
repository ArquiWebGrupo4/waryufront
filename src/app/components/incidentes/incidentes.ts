import { Component } from '@angular/core';
import { Incidenteslistar } from './incidenteslistar/incidenteslistar';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-incidentes',
  imports: [Incidenteslistar, RouterOutlet],
  templateUrl: './incidentes.html',
  styleUrl: './incidentes.css',
})
export class Incidentes {
  constructor(public route: ActivatedRoute) {}
}
