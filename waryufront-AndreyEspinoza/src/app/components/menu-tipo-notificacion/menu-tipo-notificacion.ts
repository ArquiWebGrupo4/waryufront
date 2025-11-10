import { Component } from '@angular/core';
import {MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu-tipo-notificacion',
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, MatMenuModule, RouterLink],
  templateUrl: './menu-tipo-notificacion.html',
  styleUrl: './menu-tipo-notificacion.css',
})
export class MenuTipoNotificacion {

}
