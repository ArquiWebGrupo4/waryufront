import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';


import { Reporte_Incidente } from '../../../models/Reporte_Incidente';
import { ReporteIncidenteService } from '../../../services/reporte-incidente-service';

@Component({
  selector: 'app-reporteincidentelistar',
  imports: [MatTableModule, MatButtonModule, MatIconModule, RouterLink,CommonModule],
  templateUrl: './reporteincidentelistar.html',
  styleUrl: './reporteincidentelistar.css',
})
export class Reporteincidentelistar implements OnInit {
  datasource: MatTableDataSource<Reporte_Incidente> = new MatTableDataSource();

    displayedColumns: string[] = ['id', 'descripcion', 'fecha', 'id_incidente', 'id_usuario','ce','cd'];
    constructor(private riS: ReporteIncidenteService) {}

    ngOnInit(): void {
      this.riS.list().subscribe((data) => {
        this.datasource = new MatTableDataSource(data);
      });
      this.riS.getList().subscribe((data) => {
        this.datasource = new MatTableDataSource(data);
      });
    }
    eliminar(id: number) {
      this.riS.delete(id).subscribe((data) => {
        this.riS.list().subscribe(data=>{
          this.riS.setList(data)
        })
    });
  }

}
