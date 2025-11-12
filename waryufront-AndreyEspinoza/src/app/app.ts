import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuTipoNotificacion } from './components/menu-tipo-notificacion/menu-tipo-notificacion';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MenuTipoNotificacion],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('waryu');
}
