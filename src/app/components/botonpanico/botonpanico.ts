import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Interactuar } from './interactuar/interactuar';
@Component({
  selector: 'app-botonpanico',
  imports: [RouterOutlet, Interactuar],
  templateUrl: './botonpanico.html',
  styleUrl: './botonpanico.css',
})
export class Botonpanico {
  constructor(public route:ActivatedRoute) {}
}
