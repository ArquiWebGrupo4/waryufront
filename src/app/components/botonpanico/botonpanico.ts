import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Botonpanicolistar } from './botonpanicolistar/botonpanicolistar';
@Component({
  selector: 'app-botonpanico',
  imports: [RouterOutlet, Botonpanicolistar],
  templateUrl: './botonpanico.html',
  styleUrl: './botonpanico.css',
})
export class Botonpanico {
  constructor(public route:ActivatedRoute) {}
}
