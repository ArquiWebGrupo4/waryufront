import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Distritofavoritolistar } from './distritofavoritolistar/distritofavoritolistar';
@Component({
  selector: 'app-distritofavorito',
  imports: [Distritofavoritolistar,RouterOutlet],
  templateUrl: './distritofavorito.html',
  styleUrl: './distritofavorito.css',
})
export class Distritofavorito {
  constructor(public route: ActivatedRoute) {}
}
