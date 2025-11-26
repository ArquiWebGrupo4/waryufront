import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { IncidentesService } from '../../../services/incidentes-service';
import { Incidentes } from '../../../models/Incidentes';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-verincidente',
  imports: [CommonModule, RouterLink, MatCardModule],
  templateUrl: './verincidente.html',
  styleUrl: './verincidente.css',
})

export class Verincidente implements OnInit {
  incidente!: Incidentes;
  id!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private iS: IncidentesService
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.iS.listIdTodo(this.id).subscribe((data: any) => {
      const nombreUsuario = data.usuario.nombreusuario;
      data.usuario['nombreUsuario'] = nombreUsuario;
      this.incidente = data;
    });
  }
}