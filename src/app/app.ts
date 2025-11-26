import { Component, signal } from '@angular/core';
import { Menu } from './components/menu/menu';
import { RouterOutlet } from '@angular/router';
import { environment } from '../environments/environment'
import { CommonModule } from '@angular/common';
import {  OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  imports: [Menu, RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('waryu');
  
  currentRoute: string = '';

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.currentRoute = event.urlAfterRedirects;
    });
  }

  isRoute(routePath: string): boolean {
    return this.currentRoute.includes(routePath);
  }
}
