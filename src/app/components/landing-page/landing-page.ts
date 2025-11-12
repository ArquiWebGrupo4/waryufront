import { Component, OnInit } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {environment} from '../../../environments/environment';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-landing-page',
  imports: [MatToolbarModule,MatButtonModule,MatIconModule, MatListModule, FormsModule, CommonModule],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.css',
})
export class LandingPage implements OnInit {
  mostrarLogin = false;
  useridInput: string = '';
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {}

  login() {
    environment.userid = Number(this.useridInput); 
    console.log('Usuario logueado con ID:', environment.userid);
    this.mostrarLogin = false; // ocultar formulario después de aceptar
    this.router.navigate(['distritos']);
  }

}
