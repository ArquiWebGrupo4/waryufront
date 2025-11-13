import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Tipo_Notificacion } from '../../../models/Tipo_notificacion';
import { TipoNotificacionService } from '../../../services/tipo-notificacion-service';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-tiponotificacion-listar',
  imports: [MatTableModule, MatButtonModule, MatIconModule, RouterLink, MatPaginatorModule],
  templateUrl: './tiponotificacion-listar.html',
  styleUrl: './tiponotificacion-listar.css',
})
export class TiponotificacionListar implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<Tipo_Notificacion> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4'];

  constructor(private tS: TipoNotificacionService) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.tS.list().subscribe((data) => {
      this.dataSource.data = data;
    });
    this.tS.getList().subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  eliminar(id: number) {
    this.tS.delete(id).subscribe(() => {
      this.tS.list().subscribe((data) => {
        this.tS.setList(data);
      });
    });
  }
}
