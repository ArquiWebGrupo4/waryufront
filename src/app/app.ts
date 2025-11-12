import { Component, signal } from '@angular/core';
import { Menu } from './components/menu/menu';
import { RouterOutlet } from '@angular/router';
import { environment } from '../environments/environment'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [Menu, RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('waryu');
}
