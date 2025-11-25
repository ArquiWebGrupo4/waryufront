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

import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { IncidentesService } from '../../../services/incidentes-service';
import { Incidentes } from '../../../models/Incidentes';
@Component({
  selector: 'app-reporteincidentelistar',
  imports: [MatTableModule, MatButtonModule, MatIconModule, RouterLink, CommonModule, MatPaginatorModule,
    ReactiveFormsModule, MatSelectModule, MatFormFieldModule
  ],
  providers: [],
  templateUrl: './reporteincidentelistar.html',
  styleUrl: './reporteincidentelistar.css',
})
export class Reporteincidentelistar implements OnInit, AfterViewInit {
  datasource: MatTableDataSource<Reporte_Incidente> = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'id_Usuario', 'id_Incidente', 'descripcion', 'fecha', 'ce', 'cd'];

  constructor(private riS: ReporteIncidenteService,private snackBar: MatSnackBar) {}
  form: FormGroup;
  listaincidentes: Incidentes[] = [];
  constructor(private riS: ReporteIncidenteService, private fb: FormBuilder, private iS:IncidentesService) {
    this.form = this.fb.group({
      fk: ['']
    });
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  private resetPaginator() {
      this.datasource.paginator = this.paginator;
      this.paginator.firstPage();
    }
  ngOnInit(): void {
    this.riS.list().subscribe((data) => {
      this.datasource.data = data;
    });
    this.riS.getList().subscribe((data) => {
      this.datasource.data = data;
    });
    this.iS.list().subscribe((incidentes) => {
      this.listaincidentes = incidentes;
    });
    this.form.get('fk')?.valueChanges.subscribe((id_Incidente) => {
      this.filtrarporIncidente(id_Incidente);
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
  filtrarporIncidente(valor: string){
    if(!valor){
      this.riS.list().subscribe(data=>{
        this.datasource.data = data;
        this.resetPaginator();
      });
    } else {
      this.riS.list().subscribe(data=>{
        const filtrados = data.filter((df: any) =>  df.incidente.id_Incidente  === valor);
        this.datasource.data = filtrados;
        this.resetPaginator();
      });
    }
  }
}
