import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Nivelxpeligrolistar } from './nivelxpeligrolistar/nivelxpeligrolistar';

@Component({
  selector: 'app-nivelxpeligro',
  imports: [RouterOutlet,Nivelxpeligrolistar],
  templateUrl: './nivelxpeligro.html',
  styleUrl: './nivelxpeligro.css',
})
export class Nivelxpeligro {
  constructor(public route:ActivatedRoute) {}
}
