import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';

import { Reporte_Incidente } from '../../../models/Reporte_Incidente';
import { ReporteIncidenteService } from '../../../services/reporte-incidente-service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reporteincidentelistar',
  imports: [MatTableModule, MatButtonModule, MatIconModule, RouterLink, CommonModule, MatPaginatorModule],
  templateUrl: './reporteincidentelistar.html',
  styleUrl: './reporteincidentelistar.css',
})
export class Reporteincidentelistar implements OnInit, AfterViewInit {
  datasource: MatTableDataSource<Reporte_Incidente> = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'id_Usuario', 'id_Incidente', 'descripcion', 'fecha', 'ce', 'cd'];

  constructor(private riS: ReporteIncidenteService,private snackBar: MatSnackBar) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.riS.list().subscribe((data) => {
      this.datasource.data = data;
    });
    this.riS.getList().subscribe((data) => {
      this.datasource.data = data;
    });
  }

  ngAfterViewInit(): void {
    this.datasource.paginator = this.paginator;
  }

  eliminar(id: number) {
    this.riS.delete(id).subscribe(() => {
      this.riS.list().subscribe((data) => {
        this.riS.setList(data);
        this.snackBar.open('Eliminado', 'Cerrar', { duration: 3000 });
      });
    });
  }
}
