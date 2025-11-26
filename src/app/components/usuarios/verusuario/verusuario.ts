import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UsuarioService } from '../../../services/usuario-service';
import { Usuarios } from '../../../models/Usuarios';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-verusuario',
  imports: [CommonModule, RouterLink, MatCardModule],
  templateUrl: './verusuario.html',
  styleUrl: './verusuario.css',
})

export class Verusuario implements OnInit {
  usuario!: Usuarios;
  id!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private uS: UsuarioService
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    // llamar al servicio
    this.uS.listIdTodo(this.id).subscribe((data) => {
      this.usuario = data;
    });
  }
}