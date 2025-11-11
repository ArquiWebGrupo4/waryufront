import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LandingPage } from './components/landing-page/landing-page';
import { TipoIncidente } from './components/tables/tipo-incidente/tipo-incidente';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TipoIncidente],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('waryu');
}
