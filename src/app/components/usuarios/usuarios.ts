import { Component } from '@angular/core';
import { Usuarioslistar } from "./usuarioslistar/usuarioslistar";
import { RouterOutlet, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-usuarios',
  imports: [Usuarioslistar, RouterOutlet],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.css',
})
export class Usuarios {
  constructor(public route:ActivatedRoute) {}
}
