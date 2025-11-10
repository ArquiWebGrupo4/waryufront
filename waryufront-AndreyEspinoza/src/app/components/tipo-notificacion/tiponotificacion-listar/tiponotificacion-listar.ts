import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Tipo_Notificacion } from '../../../models/Tipo_notificacion';
import { TipoNotificacionService } from '../../../services/tipo-notificacion-service';

@Component({
  selector: 'app-tiponotificacion-listar',
  imports: [MatTableModule, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './tiponotificacion-listar.html',
  styleUrl: './tiponotificacion-listar.css',
})

export class TiponotificacionListar implements OnInit {
  dataSource: MatTableDataSource<Tipo_Notificacion> = new MatTableDataSource();

  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4'];

  constructor(private tS:TipoNotificacionService) {}

  ngOnInit(): void {
    this.tS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.tS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  eliminar(id:number) {
    this.tS.delete(id).subscribe((data) => {
      this.tS.list().subscribe(data => {
        this.tS.setList(data)
      })
    });
  }
}
